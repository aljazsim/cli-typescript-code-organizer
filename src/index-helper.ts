import { Command, Option } from "commander";
import { glob } from "glob";
import Watcher from "watcher";

import { Configuration } from "./configuration/configuration.js";
import { getFullPath, writeFile } from "./helpers/file-system-helper.js";
import { SourceCodeOrganizer } from "./source-code/source-code-organizer.js";

// #region Functions (2)

async function matchSourceCode(filePath: any, configuration: Configuration)
{
    const includedFilePaths = await glob(configuration.files.include, { ignore: configuration.files.exclude });

    if (includedFilePaths.some(fp => getFullPath(fp) === getFullPath(filePath)))
    {
        return true;
    }
    else
    {
        return false;
    }
}

async function organizeSourceCode(filePath: any, configuration: Configuration)
{
    await SourceCodeOrganizer.organizeSourceCodeFile(filePath, configuration);
}

// #endregion Functions

// #region Exported Functions (5)

export function displayHelp()
{
    console.log("Organizes TypeScript source files.");
    console.log("");
    console.log("Usage:");
    console.log("tsco [-i] [-w] [-c <configuration file>]");
    console.log("");
    console.log("Options:");
    console.log("-h or --help                                                               displays help");
    console.log("-v or --version                                                            displays version");
    console.log("-i or --initialize                                                         generates configuration file at ./tsco.json with default values");
    console.log("-c <configuration file path> or --configuration <configuration file path>  specifies configuration file path");
    console.log("-w or --watch                                                              watches TypeScript files for changes and organizes file on file add or file change");
    console.log("Examples:");
    console.log("tsco                                                                       organizes TypeScript files using configuration file at ./tsco.json or uses default settings if no configuration file exists");
    console.log("tsco -i -c ./configuration/tsco.json                                       generates configuration file at ./configuration/tsco.json with default values");
    console.log("tsco -w -c ./configuration/tsco.json                                       watches TypeScript files for changes and organizes file on file add or file change");

}

export function displayVersion()
{
    console.log("1.0.0");
}

export async function initializeConfigurationFile(configurationFilePath: string, configuration: Configuration)
{
    await writeFile(configurationFilePath, JSON.stringify(configuration, null, 4), true);

    console.log(`tsco configuration file created at ${getFullPath(configurationFilePath)}`);
}

export function parseCommandLineArguments(commandLineArguments: string[])
{
    const defaultConfigurationFilePath = "./tsco.json";
    let command = new Command();

    commandLineArguments = commandLineArguments.filter(arg => arg && arg.trim().length > 0);

    command = command.name("tsco");
    command = command.description("CLI tool for organizing TypeScript code");
    command = command.addOption(new Option("-h, --help", "displays help").default(false, "false"));
    command = command.addOption(new Option("-i, --initialize", "generate default configuration file").default(false, "false"));
    command = command.addOption(new Option("-c, --configuration <string>", "set path to configuration file").default("./tsco.json", "./tsco.json"));
    command = command.addOption(new Option("-w, --watch", "watches TypeScript files for changes").default(false, "false"));
    command.parse(commandLineArguments.filter(a => a !== "-v" && a !== "--version"));

    return {
        version: process.argv.some(a => a === "-v" || a === "--version"), // something's up with command version setting
        help: command.opts().help === true,
        initialize: command.opts().initialize === true,
        watch: command.opts().watch === true,
        configurationFilePath: command.opts().configuration as string ?? defaultConfigurationFilePath,
    };
}

export async function run(configuration: Configuration, watch: boolean)
{
    // organize files
    for (const filePath of await glob(configuration.files.include, { ignore: configuration.files.exclude }))
    {
        await organizeSourceCode(filePath, configuration);
    }

    if (watch)
    {
        // watch for file changes
        const watcher = new Watcher(".", { recursive: true });

        watcher.on('add', async (filePath) => matchSourceCode(filePath, configuration) || await organizeSourceCode(filePath, configuration));
        watcher.on('change', async (filePath) => matchSourceCode(filePath, configuration) || await organizeSourceCode(filePath, configuration));

        await watcher.watch();
    }
}

// #endregion Exported Functions
