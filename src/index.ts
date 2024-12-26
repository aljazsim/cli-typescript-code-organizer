import * as figlet from 'figlet';

import { Command, Option } from 'commander';
import { deleteFile, fileExists, writeFile } from './helpers/file-system-helper';

import { Configuration } from './configuration/configuration';
import { SourceCodeOrganizer } from "./source-code/source-code-organizer";
import Watcher from 'watcher';
import { glob } from 'glob';

const program = new Command();

console.log(figlet.textSync("TypeScript Class Organizer CLI"));

program.version("1.0.0")
    .description("CLI tool for organizing TypeScript code")
    .addOption(new Option("-i, --initialize", "Generates a default configuration file").default(false, "false"))
    .addOption(new Option("-w, --watch", "Watches TypeScript files for changes").default(false, "false"))
    .addOption(new Option("-sc, --sourceCode <string>", "Glob pattern to TypeScript source code files").default("./**/*.ts", "./**/*.ts"))
    .addOption(new Option("-c, --configuration <string>", "Path to TypeScript Class Organizer configuration file").default("./tsco.json", "./tsco.json"))
    .parse(process.argv);

const initialize = program.opts().initialize ?? false;
const watchFiles = program.opts().watch ?? false;
const defaultConfigurationFilePath = "./tsco.json";
const configurationFilePath = program.opts().configuration ?? defaultConfigurationFilePath;
const configuration = await Configuration.getConfiguration(configurationFilePath);
const typeScriptSourceFileGlobPattern = program.opts().sourceCode;

if (initialize)
{
    if (await fileExists(configurationFilePath))
    {
        await deleteFile(configurationFilePath);
    }

    await writeFile(configurationFilePath, JSON.stringify(Configuration.getDefaultConfiguration()));
}

if (watchFiles)
{
    // run on file changes
    const watcher = new Watcher(typeScriptSourceFileGlobPattern);

    watcher.on('add', async filePath => await SourceCodeOrganizer.organizeSourceCodeFile(filePath, configuration));
    watcher.on('change', async filePath => await SourceCodeOrganizer.organizeSourceCodeFile(filePath, configuration));
}
else
{
    // run once
    for (const filePath of await glob([typeScriptSourceFileGlobPattern]))
    {
        await SourceCodeOrganizer.organizeSourceCodeFile(filePath, configuration);
    }
}
