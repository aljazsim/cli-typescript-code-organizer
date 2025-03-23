import ts, { SourceFile } from "typescript";

import { Configuration } from "../configuration/configuration.js";
import { ImportConfiguration } from "../configuration/import-configuration.js";
import { ElementNodeGroup } from "../elements/element-node-group.js";
import { ElementNode } from "../elements/element-node.js";
import { ImportNode } from "../elements/import-node.js";
import { ModuleMemberType } from "../enums/module-member-type.js";
import { except, intersect, remove } from "../helpers/array-helper.js";
import { compareStrings } from "../helpers/comparing-helper.js";
import { directoryExists, getDirectoryPath, getFileExtension, getFilePathWithoutExtension, getFiles, getFullPath, getRelativePath, joinPath } from "../helpers/file-system-helper.js";
import { getClasses, getEnums, getExpressions, getFunctions, getImports, getInterfaces, getNodeDependencies, getNodeNames, getTypeAliases, getVariables, order } from "../helpers/node-helper.js";
import { SourceCodeAnalyzer } from "./source-code-analyzer.js";
import { spacesRegex } from "./source-code-constants.js";
import { resolveDeclarationDependenciesOrder } from "./source-code-dependency-resolver.js";
import { log, logError } from "./source-code-logger.js";
import { SourceCodePrinter } from "./source-code-printer.js";
import { SourceCode } from "./source-code.js";

export class SourceCodeOrganizer
{
    // #region Public Static Methods (1)

    public static async organizeSourceCode(sourceCodeFilePath: string, sourceCode: string, configuration: Configuration)
    {
        const ignoreComment1Regex = new RegExp(`//${spacesRegex}tsco${spacesRegex}:${spacesRegex}ignore${spacesRegex}`);
        const ignoreComment2Regex = new RegExp(`//${spacesRegex}<auto-generated${spacesRegex}/>${spacesRegex}`);

        if (sourceCode &&
            !ignoreComment1Regex.test(sourceCode) &&
            !ignoreComment2Regex.test(sourceCode))
        {
            try 
            {
                const sourceCodeWithoutRegions = new SourceCode(sourceCode);

                sourceCodeWithoutRegions.removeRegions(); // strip regions, they will get re-generated

                const fileHeader = sourceCodeWithoutRegions.removeFileHeader();

                const sourceFile = ts.createSourceFile(sourceCodeFilePath, sourceCodeWithoutRegions.toString(), ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
                const elements = SourceCodeAnalyzer.getNodes(sourceFile, configuration);
                const topLevelGroups = await this.organizeModuleMembers(elements, configuration, sourceFile, sourceCodeFilePath); // TODO: move this to module node

                return SourceCodePrinter.print(fileHeader, topLevelGroups, configuration).toString();
            }
            catch (error)
            {
                logError(`tsco could not organize ${sourceCodeFilePath}: ${error}`);
            }
        }
        else
        {
            log(`tsco ignoring ${sourceCodeFilePath}`);
        }

        return sourceCode;
    }

    // #endregion Public Static Methods

    // #region Private Static Methods (6)

    private static mergeImportsWithSameReferences(imports: ImportNode[])
    {
        const importsByReference = new Map<string, ImportNode[]>();

        for (const import1 of [...imports])
        {
            if (importsByReference.has(import1.source))
            {
                importsByReference.get(import1.source)!.push(import1);
            }
            else
            {
                importsByReference.set(import1.source, [import1]);
            }
        }

        for (const importGroup of importsByReference.values())
        {
            if (importGroup.length > 1)
            {
                const firstImport = importGroup[0];

                for (let i = 1; i < importGroup.length; i++)
                {
                    const secondImport = importGroup[i];

                    if (((!firstImport.nameBinding && secondImport.nameBinding) || (firstImport.nameBinding && !secondImport.nameBinding) || firstImport.nameBinding === secondImport.nameBinding) &&
                        ((!firstImport.namespace && secondImport.namespace) || (firstImport.namespace && !secondImport.namespace) || (firstImport.namespace && secondImport.namespace && firstImport.namespace === secondImport.namespace)))
                    {
                        firstImport.nameBinding = firstImport.nameBinding ?? secondImport.nameBinding;
                        firstImport.namespace = firstImport.namespace ?? secondImport.namespace;

                        remove(imports, secondImport)
                    }
                    else if (((!firstImport.nameBinding && secondImport.nameBinding) || (firstImport.nameBinding && !secondImport.nameBinding) || firstImport.nameBinding === secondImport.nameBinding) &&
                        (!firstImport.namespace && !secondImport.namespace))
                    {
                        firstImport.nameBinding = firstImport.nameBinding ?? secondImport.nameBinding;
                        firstImport.namedImports = firstImport.namedImports ?? [];

                        for (const secondNamedImport of secondImport.namedImports ?? [])
                        {
                            const match = firstImport.namedImports.find(ni => ni.name === secondNamedImport.name);

                            if (!match)
                            {
                                firstImport.namedImports.push(secondNamedImport);
                            }
                            else 
                            {
                                if (!match.typeOnly && secondNamedImport.typeOnly)
                                {
                                    match.typeOnly = true;
                                }

                                if (match.alias == null && !secondNamedImport.alias)
                                {
                                    match.alias = secondNamedImport.alias;
                                }
                            }
                        }

                        remove(imports, secondImport);
                    }
                }
            }
        }
    }

    private static async organizeImports(imports: ImportNode[], configuration: ImportConfiguration, sourceFile: SourceFile, sourceFilePath: string)
    {
        this.mergeImportsWithSameReferences(imports);

        if (configuration.removeUnusedImports)
        {
            this.removeUnusedImports(imports, sourceFile);
        }

        this.removeEmptyImports(imports);

        await this.updateImportSourceCasings(sourceFilePath, imports);

        if (configuration.sortImportsBySource)
        {
            imports = imports.sort((a, b) => compareStrings(a.source, b.source));
        }

        if (configuration.sortImportsByName)
        {
            imports.filter(i => i.namedImports).forEach(i => i.namedImports = i.namedImports!.sort((a, b) => compareStrings(a.name, b.name)));
        }

        if (configuration.groupImportsBySource)
        {
            const atNamespaceImports = imports.filter(i => i.isModuleReference && i.namespace && i.source.startsWith("@"));
            const namespaceImports = imports.filter(i => i.isModuleReference && i.namespace && !i.source.startsWith("@"));

            const atModuleImports = imports.filter(i => i.isModuleReference && !i.namespace && i.source.startsWith("@"));
            const moduleImports = imports.filter(i => i.isModuleReference && !i.namespace && !i.source.startsWith("@"));

            const stringLiteralImports = imports.filter(i => !i.isModuleReference && !i.nameBinding && !i.namedImports && !i.namespace);

            const fileNamespaceImports = imports.filter(i => !i.isModuleReference && !i.nameBinding && !i.namedImports && i.namespace);
            const fileImports = imports.filter(i => !i.isModuleReference && (i.nameBinding || i.namedImports) && !i.namespace);

            if (configuration.separateImportGroups)
            {
                const atNamespaceImportGroup = new ElementNodeGroup("@ Namespace Imports", [], atNamespaceImports, false, null);
                const namespaceImportGroup = new ElementNodeGroup("Namespace Imports", [], namespaceImports, false, null);
                const atModuleImportGroup = new ElementNodeGroup("@ Module Imports", [], atModuleImports, false, null);
                const moduleImportGroup = new ElementNodeGroup("Module Imports", [], moduleImports, false, null);
                const stringLiteralImportGroup = new ElementNodeGroup("String Literal Imports", [], stringLiteralImports, false, null);
                const fileNamespaceImportGroup = new ElementNodeGroup("File Namespace Imports", [], fileNamespaceImports, false, null);
                const fileImportGroup = new ElementNodeGroup("File Imports", [], fileImports, false, null);

                return new ElementNodeGroup("Imports", [atNamespaceImportGroup, namespaceImportGroup, atModuleImportGroup, moduleImportGroup, stringLiteralImportGroup, fileNamespaceImportGroup, fileImportGroup], [], false, null);
            }
            else
            {
                imports = atNamespaceImports.concat(namespaceImports).concat(atModuleImports).concat(moduleImports).concat(stringLiteralImports).concat(fileNamespaceImports).concat(fileImports);
            }
        }

        return new ElementNodeGroup("Imports", [], imports, false, null);
    }

    private static async organizeModuleMembers(elements: ElementNode[], configuration: Configuration, sourceFile: SourceFile, sourceFilePath: string)
    {
        const regions: ElementNodeGroup[] = [];
        const imports = getImports(elements);
        const interfaces = getInterfaces(elements, false);
        const exportedInterfaces = getInterfaces(elements, true);
        const classes = getClasses(elements, false, false);
        const exportedClasses = getClasses(elements, false, true);
        const types = getTypeAliases(elements, false);
        const exportedTypes = getTypeAliases(elements, true);
        const enums = getEnums(elements, false);
        const exportedEnums = getEnums(elements, true);

        const functions = getFunctions(elements, configuration.modules.members.treatArrowFunctionVariablesAsMethods, configuration.modules.members.treatArrowFunctionConstantsAsMethods, false);
        const exportedFunctions = getFunctions(elements, configuration.modules.members.treatArrowFunctionVariablesAsMethods, configuration.modules.members.treatArrowFunctionConstantsAsMethods, true);
        const constants = getVariables(elements, true, false, configuration.modules.members.treatArrowFunctionConstantsAsMethods ? false : null);
        const exportedConstants = getVariables(elements, true, true, configuration.modules.members.treatArrowFunctionConstantsAsMethods ? false : null);
        const variables = getVariables(elements, false, false, configuration.modules.members.treatArrowFunctionVariablesAsMethods ? false : null);
        const exportedVariables = getVariables(elements, false, true, configuration.modules.members.treatArrowFunctionVariablesAsMethods ? false : null);
        const expressions = getExpressions(elements);
        const objectElements = [
            ...interfaces,
            ...exportedInterfaces,
            ...classes,
            ...exportedClasses,
            ...types,
            ...exportedTypes,
            ...enums,
            ...exportedEnums,
            ...functions]

        if (imports.length > 0)
        {
            regions.push(await this.organizeImports(imports.map(i => i as ImportNode), configuration.imports, sourceFile, sourceFilePath));
        }

        if (intersect(getNodeDependencies([...classes, ...exportedClasses]), getNodeNames([...variables, ...exportedVariables, ...constants, ...exportedConstants])).length > 0)
        {
            // dependencies between module members -> skip module element sorting to prevent breaking declaration dependency order
            regions.push(new ElementNodeGroup(null, [], except(elements, imports), false, null));

            log(`tsco skipping module sorting in ${sourceFile.fileName}, because declaration dependencies between classes and variables were found`);
        }
        else
        {
            for (const memberGroup of configuration.modules.memberGroups)
            {
                const sortDirection = memberGroup.sortDirection;
                const placeAbove = memberGroup.placeAbove;
                const placeBelow = memberGroup.placeBelow;
                const memberGroups: ElementNodeGroup[] = [];

                for (const memberType of memberGroup.memberTypes)
                {
                    let elementNodes = Array<ElementNode>();

                    if (memberType === ModuleMemberType.enums)
                    {
                        elementNodes = enums;
                    }
                    else if (memberType === ModuleMemberType.exportedEnums)
                    {
                        elementNodes = exportedEnums;
                    }
                    else if (memberType === ModuleMemberType.types)
                    {
                        elementNodes = types;
                    }
                    else if (memberType === ModuleMemberType.exportedTypes)
                    {
                        elementNodes = exportedTypes;
                    }
                    else if (memberType === ModuleMemberType.interfaces)
                    {
                        elementNodes = interfaces;
                    }
                    else if (memberType === ModuleMemberType.exportedInterfaces)
                    {
                        elementNodes = exportedInterfaces;
                    }
                    else if (memberType === ModuleMemberType.classes)
                    {
                        elementNodes = classes;
                    }
                    else if (memberType === ModuleMemberType.exportedClasses)
                    {
                        elementNodes = exportedClasses;
                    }
                    else if (memberType === ModuleMemberType.functions)
                    {
                        elementNodes = functions;
                    }
                    else if (memberType === ModuleMemberType.exportedFunctions)
                    {
                        elementNodes = exportedFunctions;
                    }
                    else if (memberType === ModuleMemberType.constants && expressions.length === 0)
                    {
                        // don't create variable group if there are expressions
                        elementNodes = constants;
                    }
                    else if (memberType === ModuleMemberType.exportedConstants && expressions.length === 0)
                    {
                        // don't create variable group if there are expressions
                        elementNodes = exportedConstants;
                    }
                    else if (memberType === ModuleMemberType.variables && expressions.length === 0)
                    {
                        // don't create variable group if there are expressions
                        elementNodes = variables;
                    }
                    else if (memberType === ModuleMemberType.exportedVariables && expressions.length === 0)
                    {
                        // don't create variable group if there are expressions
                        elementNodes = exportedVariables;
                    }

                    if (elementNodes.length > 0)
                    {
                        memberGroups.push(new ElementNodeGroup(null, [], order(sortDirection, elementNodes, placeAbove, placeBelow, false), false, null));
                    }
                }

                if (memberGroups.length > 0)
                {
                    // if there's only 1 enum/interface/class/type -> no need for a region
                    // if there's at least 1 function/variable -> create a region
                    const isRegion = objectElements.length > 1 ||
                        functions.length > 0 ||
                        exportedFunctions.length > 0 ||
                        constants.length > 0 ||
                        exportedConstants.length > 0 ||
                        variables.length > 0 ||
                        exportedVariables.length > 0;

                    if (memberGroup.memberTypesGrouped)
                    {
                        regions.push(new ElementNodeGroup(memberGroup.caption, memberGroups, [], isRegion, configuration.modules.regions));
                    }
                    else 
                    {
                        regions.push(new ElementNodeGroup(memberGroup.caption, [], order(sortDirection, memberGroups.flatMap(mg => mg.nodes), placeAbove, placeBelow, false), isRegion, configuration.modules.regions));
                    }
                }
            }

            if (expressions.length > 0)
            {
                // this file contains a script -> leave variables and expressions alone, but organize imports, enums/interfaces/classes/types/functions
                regions.push(new ElementNodeGroup(null, [], except(elements, [...imports, ...objectElements, ...functions, ...exportedFunctions]), false, null));

                log(`tsco skipping variable sorting in ${sourceFile.fileName}, because expressions were found`);
            }
            else
            {
                // this file contains no executable code ->  deal with declaration dependency order
                resolveDeclarationDependenciesOrder(regions);
            }
        }

        return regions;
    }

    private static removeEmptyImports(imports: ImportNode[])
    {
        for (const import1 of imports.filter(i => i.isEmptyReference))
        {
            if (import1.isModuleReference || !getFileExtension(import1.source) || getFileExtension(import1.source) === ".ts" || getFileExtension(import1.source) === ".js")
            {
                remove(imports, import1);
            }
        }
    }

    private static removeUnusedImports(imports: ImportNode[], sourceFile: ts.SourceFile)
    {
        for (const import1 of imports)
        {
            if (import1.namedImports && import1.namedImports.length > 0)
            {
                for (const identifier of import1.namedImports)
                {
                    if (!SourceCodeAnalyzer.hasReference(sourceFile, identifier.name))
                    {
                        remove(import1.namedImports, identifier);

                        if (import1.namedImports?.length === 0)
                        {
                            import1.namedImports = null;
                        }
                    }
                }
            }

            if (import1.namespace)
            {
                if (!SourceCodeAnalyzer.hasReference(sourceFile, import1.namespace))
                {
                    import1.namespace = null;
                }
            }

            if (import1.nameBinding)
            {
                if (!SourceCodeAnalyzer.hasReference(sourceFile, import1.nameBinding))
                {
                    import1.nameBinding = null;
                }
            }
        }
    }

    private static async updateImportSourceCasings(filePath: string, imports: ImportNode[])
    {
        const directoryPath = getDirectoryPath(getFullPath(filePath));
        const typeScript = "ts";
        const javaScript = "js"

        for (const import1 of imports.filter(i => !i.isModuleReference))
        {
            let sourceFilePath = getFullPath(joinPath(directoryPath, import1.source));
            const sourceFilePathExtension = getFileExtension(sourceFilePath);

            if (sourceFilePathExtension === "")
            {
                sourceFilePath = `${sourceFilePath}.${typeScript}`;
            }
            else if (sourceFilePathExtension.toLowerCase() === `.${javaScript}`)
            {
                sourceFilePath = `${getFilePathWithoutExtension(sourceFilePath)}.${typeScript}`;
            }

            if (await directoryExists(getDirectoryPath(sourceFilePath)))
            {
                const filePaths = await getFiles(getDirectoryPath(sourceFilePath));

                if (filePaths.length > 0)
                {
                    const filePathMatchesCaseInsensitive = filePaths.filter(fp => fp.toLowerCase() === sourceFilePath.toLowerCase());

                    if (filePathMatchesCaseInsensitive.length === 1)
                    {
                        if (sourceFilePathExtension === "")
                        {
                            import1.source = getFilePathWithoutExtension(getRelativePath(directoryPath, filePathMatchesCaseInsensitive[0]));
                        }
                        else if (sourceFilePathExtension.toLowerCase() === `.${javaScript}`)
                        {
                            import1.source = getFilePathWithoutExtension(getRelativePath(directoryPath, filePathMatchesCaseInsensitive[0])) + `.${javaScript}`;
                        }
                        else
                        {
                            import1.source = getRelativePath(directoryPath, filePathMatchesCaseInsensitive[0]);
                        }
                    }
                }
            }
        }
    }

    // #endregion Private Static Methods
}
