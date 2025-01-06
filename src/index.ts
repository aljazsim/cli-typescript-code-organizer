import * as figlet from 'figlet';

import { Command, Option } from 'commander';

import Watcher from 'watcher';
import { glob } from 'glob';
import { getFullPath, writeFile } from './helpers/file-system-helper.js';
import { Configuration } from './configuration/configuration.js';
import { SourceCodeOrganizer } from './source-code/source-code-organizer.js';

const program = new Command();

// console.log(figlet.textSync("TypeScript Code Organizer CLI"));

program.name("tsco")
    .description("CLI tool for organizing TypeScript code")
    .version("1.0.0")
    .addOption(new Option("-h, --help", "displays help").default(false, "false"))
    .addOption(new Option("-i, --initialize", "generate default configuration file").default(false, "false"))
    .addOption(new Option("-c, --configuration <string>", "set path to configuration file").default("./tsco.json", "./tsco.json"))
    .addOption(new Option("-w, --watch", "watches TypeScript files for changes").default(false, "false"))
    .parse(process.argv.filter(a => a !== "-v" && a !== "--version"));

const help = program.opts().help === true;
const initialize = program.opts().initialize === true;
const watch = program.opts().watch === true;
const configurationFilePath = program.opts().configuration as string ?? "./tsco.json";
const configuration = await Configuration.getConfiguration(configurationFilePath);

if (process.argv.some(a => a === "-v" || a === "--version"))
{
    // display version (commander breaks when you specify -v or --version)
    console.log(program.version());
}
else if (help)
{
    // display help
    console.log(program.helpInformation());
}
else if (initialize)
{
    // generate default configuration
    await writeFile(configurationFilePath, JSON.stringify(Configuration.getDefaultConfiguration(), null, 4), true);

    console.log(`TSCO configuration file created at ${getFullPath(configurationFilePath)}`);
}
else
{
    // run on all files
    const filePaths = await glob(configuration.files.include, { ignore: configuration.files.exclude });

    for (const filePath of filePaths)
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
