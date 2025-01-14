import { glob } from "glob";
import Watcher from "watcher";

import { Configuration } from "./configuration/configuration.js";
import { getFullPath, joinPath, writeFile } from "./helpers/file-system-helper.js";
import { SourceCodeOrganizer } from "./source-code/source-code-organizer.js";

// #region Functions (1)

async function organizeSourceCode(sourcesDirectoryPath: string, filePath: string, configuration: Configuration)
{
    const include = configuration.files.include.map(fp => joinPath(sourcesDirectoryPath, fp))
    const exclude = configuration.files.exclude.map(fp => joinPath(sourcesDirectoryPath, fp))
    const filePaths = await glob(include, { ignore: exclude });

    filePath = getFullPath(filePath);

    if (filePaths.map(fp => getFullPath(fp)).some(fp => fp === filePath))
    {
        return await SourceCodeOrganizer.organizeSourceCodeFile(filePath, configuration);
    }
    else
    {
        return false;
    }
}

// #endregion Functions

// #region Exported Functions (6)

export function displayHelp()
{
    console.log("Organizes TypeScript source files.");
    console.log("");
    console.log("Usage:");
    console.log("tsco [-i] [-o] [-w] [-c <configuration file path>] [-s <sources directory path>]");
    console.log("");
    console.log("Options:");
    console.log("-h or --help                                                               displays help");
    console.log("-v or --version                                                            displays version");
    console.log("-i or --initialize                                                         generates configuration file with default values");
    console.log("-o or --organize                                                           organizes TypeScript files in the sources directory recursively");
    console.log("-w or --watch                                                              watches sources directory for changes and organizes TypeScript files on file add or file change");
    console.log("-c <configuration file path> or --configuration <configuration file path>  specifies configuration file path (default: ./tsco.json)");
    console.log("-s <sources directory path> or --sources <sources directory path>          specifies TypeScript sources directory path (default: ./)");
    console.log("");
    console.log("Examples:");
    console.log("tsco                                                                       displays help since no options specified were specified");
    console.log("tsco -i                                                                    generates configuration file with default values at ./tsco.json");
    console.log("tsco -o                                                                    organizes TypeScript files in ./ recursively using configuration file at ./tsco.json");
    console.log("tsco -w                                                                    watches ./ recursively and organizes TypeScript files on add or change using configuration file at ./tsco.json");
    console.log("tsco -i -o -w -c ./src/tsco.json -s ./src/                                 generates configuration file with default values at ./config.json, organizes TypeScript files in ./src/ recursively using configuration file at ./config.json and keeps monitoring ./src/ for file changes");
}

export function displayVersion()
{
    console.log("1.0.0");
}

export async function initialize(configurationFilePath: string, configuration: Configuration)
{
    await writeFile(configurationFilePath, JSON.stringify(configuration, null, 4), true);

    console.log(`tsco created configuration file at ${getFullPath(configurationFilePath)}`);
}

export async function organize(sourcesDirectoryPath: string, configuration: Configuration)
{
    console.log(`tsco organizing files in ${sourcesDirectoryPath}`);

    const include = configuration.files.include.map(fp => getFullPath(joinPath(sourcesDirectoryPath, fp)))
    const exclude = configuration.files.exclude.map(fp => getFullPath(joinPath(sourcesDirectoryPath, fp)))
    const filePaths = await glob(include, { ignore: exclude });
    let allFileCount = 0;
    let organizedFileCount = 0;

    // organize files
    for (const filePath of filePaths.sort())
    {
        allFileCount++;

        if (await organizeSourceCode(sourcesDirectoryPath, filePath, configuration))
        {
            organizedFileCount++;
        }
    }

    console.log(`tsco organized ${organizedFileCount} files, skipped ${allFileCount - organizedFileCount}`);
}

export function parseCommandLineArguments(commandLineArguments: string[])
{
    const defaultSourceDirectoryPath = process.cwd();
    const defaultConfigurationFilePath = "./tsco.json";
    const getArgument = (args: string[], short: string, long: string) =>
    {
        args = args
            .filter(a => a.startsWith(long) || a.startsWith(short))
            .map(a => a.replace(long, "").replace(short, ""))

        return args.length == 1 ? args[0].trim().replace(/['"`]+/g, '').trim() : null;
    };

    return {
        version: commandLineArguments.some(a => a === "-v" || a === "--version"),
        help: commandLineArguments.some(a => a === "-v" || a === "--version"),

        initialize: commandLineArguments.some(a => a === "-i" || a === "--initialize"),
        organize: commandLineArguments.some(a => a === "-o" || a === "--organize"),
        watch: commandLineArguments.some(a => a === "-w" || a === "--watch"),

        sourceDirectoryPath: getArgument(commandLineArguments, "-s", "--sources") ?? defaultSourceDirectoryPath,
        configurationFilePath: getArgument(commandLineArguments, "-c", "--configuration") ?? defaultConfigurationFilePath,
    };
}

export async function watch(sourcesDirectoryPath: string, configuration: Configuration)
{
    console.log(`tsco watching files in ${sourcesDirectoryPath}`);

    // watch for file changes
    const watcher = new Watcher(sourcesDirectoryPath, { recursive: true, ignoreInitial: true, debounce: 500, persistent: true });

    watcher.on('add', async (filePath) => await organizeSourceCode(sourcesDirectoryPath, filePath, configuration));
    watcher.on('change', async (filePath) => await organizeSourceCode(sourcesDirectoryPath, filePath, configuration));
}

// #endregion Exported Functions
