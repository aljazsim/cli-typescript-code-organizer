import * as figlet from 'figlet';

import { Command, Option } from 'commander';
import { getFullPath, writeFile } from './helpers/file-system-helper';

import { Configuration } from './configuration/configuration';
import { SourceCodeOrganizer } from "./source-code/source-code-organizer";
import Watcher from 'watcher';
import { glob } from 'glob';

const program = new Command();

console.log(figlet.textSync("TypeScript Class Organizer CLI"));

program.version("1.0.0")
    .description("CLI tool for organizing TypeScript code")
    .addOption(new Option("-i, --initialize", "Generates a default configuration file").default(false, "false"))
    .addOption(new Option("-c, --configuration <string>", "Path to TypeScript Class Organizer configuration file").default("./tsco.json", "./tsco.json"))
    .addOption(new Option("-w, --watch", "Watches TypeScript files for changes").default(false, "false"))
    .parse(process.argv);

const initialize = program.opts().initialize ?? false;
const watch = program.opts().watch ?? false;
const configurationFilePath = program.opts().configuration ?? "./tsco.json";
const configuration = await Configuration.getConfiguration(configurationFilePath);

if (initialize)
{
    await writeFile(configurationFilePath, JSON.stringify(Configuration.getDefaultConfiguration()), true);
}
else
{
    // run on all files
    for (const filePath of await glob(configuration.files.include, { ignore: configuration.files.exclude }))
    {
        await SourceCodeOrganizer.organizeSourceCodeFile(filePath, configuration);
    }

    if (watch)
    {
        // run on file changes
        const watcher = new Watcher(".", { recursive: true });

        watcher.on('add', async filePath => await organizeSourceCode(filePath, configuration));
        watcher.on('change', async filePath => await organizeSourceCode(filePath, configuration));

        await watcher.watch();
    }

}

async function organizeSourceCode(filePath: any, configuration: Configuration)
{
    const includedFilePaths = await glob(configuration.files.include, { ignore: configuration.files.exclude });

    if (includedFilePaths.some(fp => getFullPath(fp) === getFullPath(filePath)))
    {
        await SourceCodeOrganizer.organizeSourceCodeFile(filePath, configuration);
    }
}

