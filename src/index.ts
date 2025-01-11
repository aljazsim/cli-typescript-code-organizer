import { Command, Option } from 'commander';
import * as figlet from 'figlet';



import { glob } from 'glob';
import Watcher from 'watcher';
import { getFullPath, writeFile } from './helpers/file-system-helper.js';
import { SourceCodeOrganizer } from './source-code/source-code-organizer.js';
import { Configuration } from './configuration/configuration.js';





let program = new Command();

program = program.name("tsco");
program = program.description("CLI tool for organizing TypeScript code");
program = program.version("1.0.0");
program = program.addOption(new Option("-h, --help", "displays help").default(false, "false"));
program = program.addOption(new Option("-i, --initialize", "generate default configuration file").default(false, "false"));
program = program.addOption(new Option("-c, --configuration <string>", "set path to configuration file").default("./tsco.json", "./tsco.json"));
program = program.addOption(new Option("-w, --watch", "watches TypeScript files for changes").default(false, "false"));
program.parse(process.argv.filter(a => a !== "-v" && a !== "--version"));

const version = process.argv.some(a => a === "-v" || a === "--version");
const help = program.opts().help === true;
const initialize = program.opts().initialize === true;
const watch = program.opts().watch === true;
const configurationFilePath = program.opts().configuration as string ?? "./tsco.json";
const configuration = await Configuration.getConfiguration(configurationFilePath);

if (version)
{
    // display version (commander breaks when you specify -v or --version)
    console.log(program.version());
}
else if (help)
{
    // display help
    figlet.textSync("tsco")
    console.log(program.helpInformation());
}
else if (initialize)
{
    // generate default configuration
    await writeFile(configurationFilePath, JSON.stringify(Configuration.getDefaultConfiguration(), null, 4), true);

    console.log(`tsco configuration file created at ${getFullPath(configurationFilePath)}`);
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
