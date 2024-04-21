import * as figlet from 'figlet';
import { Command, Option } from 'commander';
import { glob } from 'glob';
import { Configuration } from './configuration/configuration';
import Watcher from 'watcher';
import { organize } from './organizer';
const fs = require('fs');
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
if (initialize) {
    if (await fs.exists(configurationFilePath)) {
        await fs.unlink(configurationFilePath);
    }
    await fs.writeFile(configurationFilePath, JSON.stringify(Configuration.getDefaultConfiguration()));
}
if (watchFiles) {
    // run on file changes
    const watcher = new Watcher(typeScriptSourceFileGlobPattern);
    watcher.on('add', filePath => organize(filePath, configuration));
    watcher.on('change', filePath => organize(filePath, configuration));
}
else {
    // run once
    for (const filePath of await glob([typeScriptSourceFileGlobPattern])) {
        organize(filePath, configuration);
    }
}
//# sourceMappingURL=index.js.map