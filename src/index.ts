import * as figlet from 'figlet';

import { Command, Option } from 'commander';
import { Glob, glob, globStream, globStreamSync, globSync } from 'glob'

import Watcher from 'watcher';

const program = new Command();

console.log(figlet.textSync("TypeScript Class Organizer CLI"));


program.version("1.0.0")
    .description("CLI tool for organizing TypeScript code")
    .addOption(new Option("-w, --watch", "Watches TypeScript files for changes").default(false, "false"))
    .addOption(new Option("-i, --input <string>", "Glob pattern to TypeScript source files").default("./**/*.ts", "./**/*.ts"))
    .addOption(new Option("-c, --configuration <string>", "Path to TypeScript Class Organizer configuration file").default("./tsco.json", "./tsco.json"))
    .parse(process.argv);

const watchFiles = program.opts().watch ?? false;
const configurationFilePath = program.opts().configuration;

const typeScriptSourceFileGlobPattern = program.opts().input;
const typeScriptSourceFiles = await glob([typeScriptSourceFileGlobPattern]);

if (watchFiles)
{
    const watcher = new Watcher(typeScriptSourceFileGlobPattern);

    watcher.on('add', filePath => console.log(filePath));
    watcher.on('change', filePath => console.log(filePath));
}