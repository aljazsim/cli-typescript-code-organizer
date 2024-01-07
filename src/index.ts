import * as figlet from 'figlet';

import { Command } from 'commander';

console.log(figlet.textSync("TypeScript Class Organizer CLI"));

const program = new Command();

program
    .version("1.0.0")
    .description("CLI tol for organizing TypeScript code")
    .option("-w, --watch", "Watches directory for TypeScript file changes")
    .option("-i, --input", "Path to TypeScript source file or root directory")
    .option("-c, --configuration", "Path to TypeScript Class Organizer configuration file (by default is tsco.json in current directory)")
    .parse(process.argv);

const options = program.opts();