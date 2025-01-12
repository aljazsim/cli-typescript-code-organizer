import { Command, Option } from "commander";
import { glob } from "glob";
import Watcher from "watcher";
import { Configuration } from "./configuration/configuration.js";
import { getFullPath, joinPath, writeFile } from "./helpers/file-system-helper.js";
import { SourceCodeOrganizer } from "./source-code/source-code-organizer.js";
import { config } from "process";

// #region Functions (8)

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
    console.log("tsco -i -o -w -c /config.json -s ./src/                                    generates configuration file with default values at ./config.json, organizes TypeScript files in ./src/ recursively using configuration file at ./config.json and keeps monitoring ./src/ for file changes");
}

export function displayVersion()
{
    console.log("1.0.0");
}

export async function initialize(configurationFilePath: string, configuration: Configuration)
{
    await writeFile(configurationFilePath, JSON.stringify(configuration, null, 4), true);

    console.log(`tsco configuration file created at ${getFullPath(configurationFilePath)}`);
}

async function matchSourceCode(filePath: any, include: string[], exclude: string[])
{
    const includedFilePaths = await glob(include, { ignore: exclude });

    if (includedFilePaths.some(fp => getFullPath(fp) === getFullPath(filePath)))
    {
        return true;
    }
    else
    {
        return false;
    }
}

export async function organize(sourcesDirectoryPath: string, configuration: Configuration)
{
    console.log("tsco organizing files");

    const include = configuration.files.include.map(fp => getFullPath(joinPath(sourcesDirectoryPath, fp)))
    const exclude = configuration.files.exclude.map(fp => getFullPath(joinPath(sourcesDirectoryPath, fp)))

    // organize files
    for (const filePath of await glob(include, { ignore: exclude }))
    {
        await organizeSourceCode(filePath, configuration);
    }
}

async function organizeSourceCode(filePath: any, configuration: Configuration)
{
    await SourceCodeOrganizer.organizeSourceCodeFile(filePath, configuration);
}

export function parseCommandLineArguments(commandLineArguments: string[])
{
    const defaultConfigurationFilePath = "./tsco.json";
    let command = new Command();

    commandLineArguments = commandLineArguments.filter(arg => arg && arg.trim().length > 0);

    command = command.name("tsco");
    command = command.description("CLI tool for organizing TypeScript code");
    command = command.addOption(new Option("-h, --help").default(false, "false"));
    command = command.addOption(new Option("-i, --initialize").default(false, "false"));
    command = command.addOption(new Option("-o, --organize").default(false, "false"));
    command = command.addOption(new Option("-w, --watch").default(false, "false"));
    command = command.addOption(new Option("-c, --configuration <string>").default("./tsco.json", "./tsco.json"));
    command = command.addOption(new Option("-s, --sources <string>").default("./", "./"));
    command.parse(commandLineArguments.filter(a => a !== "-v" && a !== "--version"));

    return {
        version: process.argv.some(a => a === "-v" || a === "--version"), // something's up with command version setting
        help: command.opts().help === true,

        initialize: command.opts().initialize === true,
        organize: command.opts().organize === true,
        watch: command.opts().watch === true,

        sourceDirectoryPath: command.opts().sources as string ?? ".",
        configurationFilePath: command.opts().configuration as string ?? defaultConfigurationFilePath,
    };
}

export async function watch(sourcesDirectoryPath: string, configuration: Configuration)
{
    console.log("tsco watching files");

    const include = configuration.files.include.map(fp => getFullPath(joinPath(sourcesDirectoryPath, fp)))
    const exclude = configuration.files.exclude.map(fp => getFullPath(joinPath(sourcesDirectoryPath, fp)))

    // watch for file changes
    const watcher = new Watcher(".", { recursive: true });

    watcher.on('add', async (filePath) => matchSourceCode(filePath, include, exclude) || await organizeSourceCode(filePath, configuration));
    watcher.on('change', async (filePath) => matchSourceCode(filePath, exclude, exclude) || await organizeSourceCode(filePath, configuration));

    await watcher.watch();
}

// #endregion Functions (8)
