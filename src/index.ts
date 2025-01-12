import { Configuration } from "./configuration/configuration.js";
import { displayHelp, displayVersion, initialize as initialize, parseCommandLineArguments, organize, watch } from "./index-helper.js";

const commandLineArguments = parseCommandLineArguments(process.argv);
const configuration = await Configuration.getConfiguration(commandLineArguments.configurationFilePath);

if (commandLineArguments.version)
{
    displayVersion();
}
else if (commandLineArguments.help || (!commandLineArguments.initialize && !commandLineArguments.organize && !commandLineArguments.watch))
{
    displayHelp();
}
else
{
    if (commandLineArguments.initialize)
    {
        initialize(commandLineArguments.configurationFilePath, Configuration.getDefaultConfiguration());
    }

    if (commandLineArguments.organize)
    {
        await organize(commandLineArguments.sourceDirectoryPath, configuration);
    }

    if (commandLineArguments.watch)
    {
        await watch(commandLineArguments.sourceDirectoryPath, configuration);
    }
} 
