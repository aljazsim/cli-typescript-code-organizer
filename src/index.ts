
import * as figlet from 'figlet';



import { glob } from 'glob';
import Watcher from 'watcher';
import { getFullPath, writeFile } from './helpers/file-system-helper.js';
import { SourceCodeOrganizer } from './source-code/source-code-organizer.js';
import { Configuration } from './configuration/configuration.js';
import { displayHelp, displayVersion, initializeConfigurationFile, parseCommandLineArguments, run } from './index-helper.js';





const commandLineArguments = parseCommandLineArguments(process.argv);
const configuration = await Configuration.getConfiguration(commandLineArguments.configurationFilePath);



if (commandLineArguments.version)
{
    displayVersion();
}
else if (commandLineArguments.help)
{
    displayHelp();
}
else if (commandLineArguments.initialize)
{
    initializeConfigurationFile(commandLineArguments.configurationFilePath, Configuration.getDefaultConfiguration());
}
else
{
    run(configuration, commandLineArguments.watch);
}


