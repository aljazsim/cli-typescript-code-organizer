"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var figlet = require("figlet");
var commander_1 = require("commander");
var glob_1 = require("glob");
var watcher_1 = require("watcher");
var program = new commander_1.Command();
console.log(figlet.textSync("TypeScript Class Organizer CLI"));
program.version("1.0.0")
    .description("CLI tool for organizing TypeScript code")
    .addOption(new commander_1.Option("-w, --watch", "Watches TypeScript files for changes").default(false, "false"))
    .addOption(new commander_1.Option("-i, --input <string>", "Glob pattern to TypeScript source files").default("./**/*.ts", "./**/*.ts"))
    .addOption(new commander_1.Option("-c, --configuration <string>", "Path to TypeScript Class Organizer configuration file").default("./tsco.json", "./tsco.json"))
    .parse(process.argv);
var watchFiles = (_a = program.opts().watch) !== null && _a !== void 0 ? _a : false;
var configurationFilePath = program.opts().configuration;
var typeScriptSourceFileGlobPattern = program.opts().input;
var typeScriptSourceFiles = await (0, glob_1.glob)([typeScriptSourceFileGlobPattern]);
if (watchFiles) {
    var watcher = new watcher_1.default(typeScriptSourceFileGlobPattern);
    watcher.on('add', function (filePath) { return console.log(filePath); });
    watcher.on('change', function (filePath) { return console.log(filePath); });
}
//# sourceMappingURL=index.js.map