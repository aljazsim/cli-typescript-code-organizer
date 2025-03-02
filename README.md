# TypeScript Code Organizer Command Line Interface

TypeScript Code Organizer Command Line Interface (or `tsco` for short) is a command line tool for organizing TypeScript source code in a project workspace. It allows software developers to organize import statements, modules, classes, interfaces and type members and helps them keep their source code more consistent and easier to navigate. It is highly configurable and allows sharing of the configuration across the development team.

Here is an example of TypeScript code **before organizing**:

```typescript
interface ICube {
    move(): void,
    readonly surface: number,
    depth: number,

    height: number,
    readonly volume: number,

    width: number,
    translate(): Promise<void>,
    color: string,
    load(): Promise<void>,
    reload(): Promise<void>,


    rotate():void,
}
```

Here is the same TypeScript code **after organizing**:

```typescript
interface ICube {
    // #region Properties (6)

    readonly surface: number,
    readonly volume: number,

    color: string,
    depth: number,
    height: number,
    width: number,

    // #endregion

    // #region Methods (5)

    load(): Promise<void>,
    move(): void,
    reload(): Promise<void>,
    rotate(): void,
    translate(): Promise<void>,

    // #endregion
}
```

Everything from import statements, regions, grouping to sorting can be configured!

## Installation

In order to install TypeScript Code Organizer ensure you have `npm` installed, open a terminal window and run:

```
npm install -g tsco-cli
```

## Usage

With `tsco` you can:

- display help (`--help` or `-h`)
- display current version (`--version` or `-v`)
- initialize your workspace (`--initialize` or `-i`)
- organize TypeScript files (`--organize` or `-o`)
- watch TypeScript files for changes (`--watch` or `-w`)

You can run `tsco` in one or more of these three modes, by specifying appropriate flags:

```
tsco [--help] [--version] [--initialize] [--organize] [--watch] [--configuration <configuration file path>] [--sources <sources directory path>]
```

You can also use the shorthand notation:

```
tsco [-h] [-v] [-i] [-o] [-w] [-c <configuration file path>] [-s <sources directory path>]
```

Optional parameters:

- configuration file path (`--configuration` or `-c`) specifies the location of the `tsco` configuration file (default configuration file path is at `./tsco.json`, or if the file cannot be loaded a default configuration is used)
- sources directory path (`--sources` or `-s`) specifies the location of TypeScript files (default value is `./`)

### Initializing a configuration file

First you will need to generate a configuration file that will let `tsco` know how you want your TypeScript files organized. If you don't have a configuration file you can generate a [default configuration file](./src/configuration/default-configuration.ts) with:

```
tsco --initialize [--configuration <configuration file path>]
```

or

```
tsco -i [-c <configuration file path>]
```

This will create a default configuration file in the specified configuration file path or create a configuration file called `tsco.json` in the current directory. The configuration file is a JSON file and can be committed to a repository ensuring identical code organizing settings across the development team. `tsco` will still work without a configuration file using default settings.

Example:

```
tsco --initialize --configuration ./some-directory/tsco.json
```

or

```
tsco -i -c ./some-directory/tsco.json
```

No TypeScript files will be organized during initialization.

### Organizing TypeScript files

When running the `tsco` command, it will recursively scan the specified sources directory and organize TypeScript files. If no sources directory is specified, `./` will be used. Just run the following command in a terminal window:

```
tsco --organize [--configuration <configuration file path>] [--sources <sources directory path>]
```

or

```
tsco -o [-s <sources directory path>] [-c <configuration file path>]
```

If there are files or directories you'd like to explicitly include or exclude, you can do so in the configuration file (see below). Example:

```
tsco --organize --configuration ./src/tsco.json --sources ./src
```

or

```
tsco -o -c ./src/tsco.json -s ./src
```

### Monitoring for file changes

If you'd like TypeScript files to be organized every time there is a change, you can run:

```
tsco --watch [--configuration <configuration file path>] [--sources <sources directory path>]
```

or

```
tsco -w [--configuration <configuration file path>] [--sources <sources directory path>]
```

This will monitor the sources directory recursively for new files or file changes. TypScript code will get organized ass soon as `tsco` detects a new file or a file change. To terminate `tsco` running in watch mode, press `CTRL + C`.

## Configuration

You can create a new default configuration file by running `tsco --initialize` in the terminal window which will create `./tsco.json` . The configuration file is in JSON format and can be modified to suit individual TypeScript organization preferences.

### File Configuration Section

Files configuration section specifies which files are included and which ones are excluded when running `tsco`. You can use glob patterns to specify files or directories. Here's an example of the default files configuration section:

```json
{
    "files": {
        "include": ["./**/*.ts"], <-- file/directory patterns to include
        "exclude": ["./**/*.d.ts", "node_modules/**", "dist/**", "out/**"] <-- file/directory patterns to exclude
    }
}
```

### Import Statement Organization Configuration Section

Import statement organization configuration section specifies how TypeScript import statements get organized. Here's an example of the default import statement configuration section:

```json
{
    "imports": {
        "removeUnusedImports": true, <-- removes unused imports when set to true
        "sortImportsBySource": true, <-- sorts import statements by the referenced file or module
        "sortImportsByName": true, <-- sorts imported references within individual import statement
        "groupImportsBySource": true, <-- groups imports statements by: module imports, non-TypeScript file imports, TypeScript file imports
        "separateImportGroups": true, <-- separates imports statement groups with a new line (only works if groupImportsBySource os set to true)
        "quote": "double" <-- "double" uses double quotes and "single" uses single quotes when specifying import sources
    },
    }
```

### Module Organization Configuration Section

Module organization configuration section specifies how module level elements (enums, types, interfaces, classes, functions, variables and constants) will be organized. Here's an example of the default module organization configuration section:

```json
{
    "modules": {
        "regions": {
            "addRegions": false, <-- inserts regions (#region and #endregion comments) when set to true
            "addMemberCountInRegionName": false, <-- inserts member count in region name when set to true
            "addRegionCaptionToRegionEnd": false <-- inserts regions name to region end when set to true
        },
        "members": {
            "treatArrowFunctionVariablesAsMethods": false, <-- treats arrow function variables as methods when set to true
            "treatArrowFunctionConstantsAsMethods": true <-- treats arrow function constants as methods when set to true
        },
        "memberGroups": [
            <-- see member group configuration below
        ]
    },
}
```

### Class Organization Configuration Section

Class organization configuration specifies how class level elements (properties, constructors, indexes, accessors, getters, setters and methods) will be organized. Here's an example of the default class organization configuration section:

```json
{
    "modules": {
        "regions": {
            "addRegions": false, <-- inserts regions when set to true
            "addMemberCountInRegionName": false, <-- inserts member count in region name when set to true
            "addRegionCaptionToRegionEnd": false <-- inserts regions name to region end when set to true
        },
        "members": {
            "addPublicModifierIfMissing": true, <-- inserts public access modifier if no access modifier specified when set to true
            "addPrivateModifierIfStartingWithHash": false, <-- inserts private access modifier if member starts with '#' when set to true
            "groupMembersWithDecorators": false,  <-- groups members with same decorators when set to true (decorators are treated as part of the member name when sorting)
            "treatArrowFunctionPropertiesAsMethods": false, <-- treats arrow function properties as methods when set to true
            "treatArrowFunctionReadOnlyPropertiesAsMethods": true <-- treats arrow function readonly properties as methods when set to true
        },
        "memberGroups": [
            <-- see member group configuration below
        ]
    },
}
```

### Interface Organization Configuration Section

Interface organization configuration specifies how interface level elements (readonly properties, properties, indexes, getters and setters and methods) will be organized. Here's an example of the default interface organization configuration section:

```json
{
    "modules": {
        "regions": {
            "addRegions": false, <-- inserts regions when set to true
            "addMemberCountInRegionName": false, <-- inserts member count in region name when set to true
            "addRegionCaptionToRegionEnd": false <-- inserts regions name to region end when set to true
        },
        "members": {
            "treatArrowFunctionPropertiesAsMethods": false, <-- treats arrow function properties as methods when set to true
            "treatArrowFunctionReadOnlyPropertiesAsMethods": true <-- treats arrow function readonly properties as methods when set to true
        },
        "memberGroups": [
            <-- see member group configuration below
        ]
    },
}
```

### Type Organization Configuration Section

Type organization configuration specifies how type level elements (properties, indexes, and methods) will be organized. Here's an example of the default type organization configuration section:

```json
{
    "modules": {
        "regions": {
            "addRegions": false, <-- inserts regions when set to true
            "addMemberCountInRegionName": false, <-- inserts member count in region name when set to true
            "addRegionCaptionToRegionEnd": false <-- inserts regions name to region end when set to true
        },
        "members": {
            "treatArrowFunctionPropertiesAsMethods": false, <-- treats arrow function properties as methods when set to true
        },
        "memberGroups": [
            <-- see member group configuration below
        ]
    },
}
```

### Member Group Configuration

Specifies how members are grouped together when organizing modules, classes, interfaces and types. Here's an example of the default member group configuration section:

```json
{
    "memberGroups": [
        {
                "sortDirection": "asc", <-- member group sorting direction (can be "asc" for ascending, "desc" for descending or "none" for no sorting)
                "caption": "Enums", <-- member group caption (will be used as a region name when using regions)
                "memberTypes": ["enums"], <-- member group module members (see tables below)
                "memberTypesGrouped": true, <-- member groups will be grouped by member type when set to true or merged with other member types when set to false (only works if there's more than one member type specified in the member types)
                "placeAbove": [], <-- member name patterns for placing particular members on top of the member group (supports exact match, wildcard patterns and regex)
                "placeBelow": [] <-- member name patterns for placing particular members on bottom of the member group (supports exact match, wildcard patterns and regex)
            },
            ...
        ]
}
```

Member types are dependant on where are they being used: modules, classes, interfaces or types.

#### Module Member Types

| Structures   | Functions           | Variables           |
| ------------ | ------------------- | ------------------- |
| `enums`      | `functions`         | `constants`         |
| `types`      | `exportedFunctions` | `exportedConstants` |
| `interfaces` |                     | `variables`         |
| `classes`    |                     | `exportedVariables` |

#### Class Member Types

| Properties                          | Constructors              | Accessors                    | Getters and Setters                  | Methods                    |
| ----------------------------------- | ------------------------- | ---------------------------- | ------------------------------------ | -------------------------- |
| `privateStaticReadOnlyProperties`   | `staticBlockDeclarations` | `publicStaticAccessors`      | `publicAbstractGettersAndSetters`    | `publicStaticMethods`      |
| `privateReadOnlyProperties`         | `constructors`            | `publicAccessors`            | `publicGettersAndSetters`            | `publicMethods`            |
| `privateStaticProperties`           |                           | `publicAbstractAccessors`    | `publicStaticGettersAndSetters`      | `publicAbstractMethods`    |
| `privateProperties`                 |                           | `protectedStaticAccessors`   | `protectedStaticGettersAndSetters`   | `protectedStaticMethods`   |
| `protectedStaticReadOnlyProperties` |                           | `protectedAccessors`         | `protectedGettersAndSetters`         | `protectedMethods`         |
| `protectedReadOnlyProperties`       |                           | `protectedAbstractAccessors` | `protectedAbstractGettersAndSetters` | `protectedAbstractMethods` |
| `protectedStaticProperties`         |                           | `privateStaticAccessors`     | `privateStaticGettersAndSetters`     | `privateStaticMethods`     |
| `protectedProperties`               |                           | `privateAccessors`           | `privateGettersAndSetters`           | `privateMethods`           |
| `publicStaticReadOnlyProperties`    |                           |                              |                                      |
| `publicReadOnlyProperties`          |                           |                              |                                      |
| `publicStaticProperties`            |                           |                              |                                      |
| `publicProperties`                  |                           |                              |                                      |

#### Interface Member Types

| Properties           | Indexes   | Getters and Setters | Methods   |
| -------------------- | --------- | ------------------- | --------- |
| `readOnlyProperties` | `indexes` | `gettersAndSetters` | `methods` |
| `properties`         |           |                     |

#### Type Member Types

| Properties   | Indexes   | Methods   |
| ------------ | --------- | --------- |
| `properties` | `indexes` | `methods` |

### Moving certain member types to the top or bottom of a group

You can put particular members to the top or bottom of the group by specifying them in the `placeAbove` and `placeBelow` arrays in that particular order. There are 3 ways to specify which members should be placet on top or bottom:

- using a string literal (e.g. `OnClick`)
- using a wildcard pattern (e.g. `On*`)
- using a regular expression (e.g. `On.+Completed`)

Members that match a pattern will then be organized by `sortDirection`. Here's an example of putting Angular lifecycle methods on top of the "Public methods" group:

```json
{
    "classes":{
        "memberGroups":[
            {
                "sortDirection": "asc",
                "caption": "Public Methods",
                "memberTypes": ["publicMethods"],
                "memberTypesGrouped": false,
                "placeAbove": [
                    "ngOnChanges", 
                    "ngOnInit", 
                    "ngDoCheck", 
                    "ngAfterContentInit", 
                    "ngAfterContentChecked", 
                    "ngAfterViewInit", 
                    "ngAfterViewChecked", 
                    "ngOnDestroy"
                ],
                "placeBelow": []
            },
        ]
    }
}
```

## Ignoring files

In order to prevent a TypeScript file being organized you can add the file to the exclude list in the configuration file files section or add one of the following comments to the top of the TypeScript file:

```typescript
// tsco:ignore
```

or

```typescript
// <auto-generated />
```

### Declaration dependencies

If `tsco` detects module member declaration dependencies it will skip organizing module members as it might cause a compile error after compilation. In example below declaration of variable a1 depends on the declaration of variable a3. If a1 were declared first we would get a compile error. Any class, interface or type members would still get organized, same goes for import statements.

```typescript
const a3 = 5;
const a1 = a3;
const a2 = 4;
```

## Using TSCO in VS Code

You can install the [TypeScript Code Organizer](https://marketplace.visualstudio.com/items?itemName=aljazsim.tsco) VS Code extension. It offers exact same functionality as the TypeScript Code Organizer CLI, but built into VS Code. See the Visual Studio Marketplace for instructions.

## Using TSCO With GIT pre-commit hook

Open a terminal window. Ensure `tsco` is installed globally (see above). Navigate to your project root. Install [Husky](https://typicode.github.io/husky/):

```
npm install --save-dev husky
```

Initialize Husky (this will create a pre-commit script in `.husky/` and updates the prepare script in `package.json`):

```
npx husky init
```

Open the `.husky/pre-commit` file in a text editor and add the following line (feel free to specify a custom configuration file path and source directory path):

```
tsco --organize
```

## Change log

### 1.0.0

- Skipping version 1.0.0 to keep version in sync with TypeScript Code Organizer VS Code Extension

### 2.0.3

- Initial release

### 2.0.7

- fix issue with missing typescript dependency
- fix module formatting issue
- fix issue with import statements with  comments
- fix issue with sorting members with dependencies
- fix organizing imports with type aliases

### 2.0.9

- fix issue with parsing command line arguments (courtesy of [Carlos Jesús Huchim Ahumada](https://github.com/huchim))
- fix issue with removing empty lines in code expressions
- fix issue with using typed imports

### 2.0.9

- add setting for expanding/collapsing imports
- fix issue with declaring modules
