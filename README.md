# TypeScript Code Organizer Command Line Interface

TypeScript Code Organizer Command Line Interface (or `tsco` for short) is a command line tool for organizing TypeScript source code in a workspace. It allows software developers to organize import statements, modules, classes, interfaces and type members and helps them keep their source code more consistent and easier to navigate. It is highly configurable and allows sharing of the configuration across the development team.

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
npm install tsco -g
```

## Usage

### Initializing a configuration file

First you will need to generate a configuration file that will let `tsco` know how you want your TypeScript files organized. If you don't have a configuration file you can generate a [default configuration file](./src/configuration/default-configuration.json) with:

```
tsco --initialize
```

or

```powershell
tsco -i
```

This will create a default configuration file called `tsco.json` in the current directory. The configuration file is a JSON file and can be committed to a repository ensuring identical code organizing settings across the development team. `tsco` will still work without a configuration file using default settings.

You can also create the configuration file at a different location using:

```
tsco --initialize --configuration ./some-directory/tsco.json
```

or

```powershell
tsco -i -c ./some-directory/tsco.json
```

No TypeScript files will be organized during initialization.

### Organizing TypeScript files

When running the `tsco` command, it will recursively organize TypeScript files from the current working directory down. Just run the following command in a terminal window:

```powershell
tsco
```

If there are files or directories you'd like to explicitly include or exclude, you can do so in the configuration file (see below). If you'd to use a configuration file at a different location, you can specify it with an argument:

```
tsco --configuration ./some-directory/tsco.json
```

or

```
tsco -c ./some-directory/tsco.json
```

### Monitoring for file changes

If you'd like TypeScript files to be organized every time there is a change, you can run:

```powershell
tsco --watch
```

or

```powershell
tsco -w
```

This will first organize all TypeScript files in the workspace and then monitor the workspace for new files or file changes. TypScript code will get organized ass soon as `tsco` detects a new file or a file change.

### Command line arguments

- `--initialize` or `-i` creates a new configuration file with default settings at default location ( `./tsco.json` )
- `--configuration` or `-c` specifies the configuration file path to be used
- `--watch` or `-w` monitors the workspace for changes

## Configuration

You can create a new default configuration file by running `tsco --initialize` in the terminal window which will create `./tsco.json` . The configuration file is in JSON format and can be modified to suit individual TypeScript organization preferences.

### File Configuration Section

Files configuration section specifies which files are included and which ones are excluded when running `tsco`. You can use glob patterns to specify files or directories. Here's an example of the default files configuration section:

```json
{
    "files": {
        "include": ["./**/*.ts"], <-- file/directory patterns to include
        "exclude": ["node_modules", "dist", "out"] <-- file/directory patterns to exclude
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
            "addPrivateModifierIfStartingWithHash": false, <-- inserts private access modifier if member starts wit '#' when set to true
            "groupMembersWithDecorators": false,  <-- groups members with same decorators when set to true
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

Interface organization configuration specifies how interface level elements (properties, indexes, accessors, getters, setters and methods) will be organized. Here's an example of the default interface organization configuration section:

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

Type organization configuration specifies how type level elements (properties, indexes, and methods) will be organized.

Here's an example of the default type organization configuration section:

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

Structures   | Functions           | Variables
------------ | ------------------- | -------------------
`enums`      | `functions`         | `constants`
`types`      | `exportedFunctions` | `exportedConstants`
`interfaces` |                     | `variables`
`classes`    |                     | `exportedVariables`

#### Class Member Types

Properties                          | Constructors              | Accessors                    | Getters and Setters                  | Methods
----------------------------------- | ------------------------- | ---------------------------- | ------------------------------------ | --------------------------
`privateStaticReadOnlyProperties`   | `staticBlockDeclarations` | `publicStaticAccessors`      | `publicAbstractGettersAndSetters`    | `publicStaticMethods`
`privateReadOnlyProperties`         | `constructors`            | `publicAccessors`            | `publicGettersAndSetters`            | `publicMethods`
`privateStaticProperties`           |                           | `publicAbstractAccessors`    | `publicStaticGettersAndSetters`      | `publicAbstractMethods`
`privateProperties`                 |                           | `protectedStaticAccessors`   | `protectedStaticGettersAndSetters`   | `protectedStaticMethods`
`protectedStaticReadOnlyProperties` |                           | `protectedAccessors`         | `protectedGettersAndSetters`         | `protectedMethods`
`protectedReadOnlyProperties`       |                           | `protectedAbstractAccessors` | `protectedAbstractGettersAndSetters` | `protectedAbstractMethods`
`protectedStaticProperties`         |                           | `privateStaticAccessors`     | `privateStaticGettersAndSetters`     | `privateStaticMethods`
`protectedProperties`               |                           | `privateAccessors`           | `privateGettersAndSetters`           | `privateMethods`
`publicStaticReadOnlyProperties`    |                           |                              |                                      |
`publicReadOnlyProperties`          |                           |                              |                                      |
`publicStaticProperties`            |                           |                              |                                      |
`publicProperties`                  |                           |                              |                                      |

#### Interface Member Types

Properties           | Indexes   | Getters and Setters | Methods
-------------------- | --------- | ------------------- | ---------
`readOnlyProperties` | `indexes` | `gettersAndSetters` | `methods`
`properties`         |           |                     |

#### Type Member Types

Properties   | Indexes   | Methods
------------ | --------- | ---------
`properties` | `indexes` | `methods`

### Moving certain member types to the top or bottom of a group

You can put particular members to the top or bottom of the group by specifying them in the `placeAbove` and `placeBelow` arrays in that particular order. There are 3 ways to specify which members should be placet on top or bottom:

- using a string literal (e.g. `OnClick`)
- using a wildcard pattern (e.g. `On*`)
- using a regular expression (e.g. `On.+Completed`)

Members that match a pattern will then be organized by `sortDirection`. Here's an example of putting Angular lifecycle methods on top of the public method group:

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

## Using TSCO With GIT pre-commit hook

## Change log

1.0.0 - Initial release
