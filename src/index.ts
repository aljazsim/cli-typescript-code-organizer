import { Configuration } from "./configuration/configuration.js";
import { displayHelp, displayVersion, initializeConfigurationFile, parseCommandLineArguments, run } from "./index-helper.js";

// #region Variables (2)

const commandLineArguments = parseCommandLineArguments(process.argv);
const configuration = await Configuration.getConfiguration(commandLineArguments.configurationFilePath);

// #endregion Variables

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
