#!/usr/bin/env node

// tsco:ignore 
import { Configuration } from "./configuration/configuration.js";
import { displayHelp, displayVersion, initialize, organizeFiles, parseCommandLineArguments, watch } from "./index-helper.js";

// #region Variables (2)

const commandLineArguments = parseCommandLineArguments(process.argv);
const configuration = await Configuration.getConfiguration(commandLineArguments.configurationFilePath);

// #endregion Variables

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
        await organizeFiles(commandLineArguments.sourceDirectoryPath, commandLineArguments.sourceFilePath, configuration);
    }

    if (commandLineArguments.watch)
    {
        await watch(commandLineArguments.sourceDirectoryPath, configuration);
    }
}
