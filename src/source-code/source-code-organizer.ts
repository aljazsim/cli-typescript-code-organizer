import ts, { SourceFile } from "typescript";

import { Configuration } from "../configuration/configuration.js";
import { ImportConfiguration } from "../configuration/import-configuration.js";
import { ElementNodeGroup } from "../elements/element-node-group.js";
import { ElementNode } from "../elements/element-node.js";
import { ImportNode } from "../elements/import-node.js";
import { ModuleMemberType } from "../enums/module-member-type.js";
import { distinct, except, intersect, remove } from "../helpers/array-helper.js";
import { compareStrings } from "../helpers/comparing-helper.js";
import { getFileExtension } from "../helpers/file-system-helper.js";
import { getClasses, getEnums, getExpressions, getFunctions, getImports, getInterfaces, getTypeAliases, getVariables, order } from "../helpers/node-helper.js";
import { SourceCodeAnalyzer } from "./source-code-analyzer.js";
import { SourceCodePrinter } from "./source-code-printer.js";
import { SourceCode } from "./source-code.js";
import { VariableNode } from "../elements/variable-node.js";
import { ClassNode } from "../elements/class-node.js";

export class SourceCodeOrganizer
{
    // #region Public Static Methods (1)

    public static async organizeSourceCode(sourceCodeFilePath: string, sourceCode: string, configuration: Configuration)
    {
        const ignoreComment1Regex = new RegExp("//\\s*tsco:ignore");
        const ignoreComment2Regex = new RegExp("//\\s*<auto-generated\\s*/>");

        if (sourceCode &&
            !ignoreComment1Regex.test(sourceCode) &&
            !ignoreComment2Regex.test(sourceCode))
        {
            try 
            {
                const sourceCodeWithoutRegions = new SourceCode(sourceCode);
                sourceCodeWithoutRegions.removeRegions(); // strip regions, they will get re-generated

                const sourceFile = ts.createSourceFile(sourceCodeFilePath, sourceCodeWithoutRegions.toString(), ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
                const elements = SourceCodeAnalyzer.getNodes(sourceFile, configuration);
                const topLevelGroups = await this.organizeModuleMembers(elements, configuration, sourceFile); // TODO: move this to module node

                return SourceCodePrinter.print(topLevelGroups, configuration).toString();
            }
            catch (error)
            {
                console.error(error);
            }
        }
        else
        {
            console.log(`tsco ignoring ${sourceCodeFilePath}`);
        }

        return sourceCode;
    }

    // #endregion Public Static Methods

    // #region Private Static Methods (5)

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
                        firstImport.namedImports = distinct((firstImport.namedImports ?? []).concat(secondImport.namedImports ?? []));

                        remove(imports, secondImport);
                    }
                }
            }
        }
    }

    private static async organizeImports(imports: ImportNode[], configuration: ImportConfiguration, sourceFile: SourceFile)
    {
        this.mergeImportsWithSameReferences(imports);

        if (configuration.removeUnusedImports)
        {
            this.removeUnusedImports(imports, sourceFile);
        }

        this.removeEmptyImports(imports);

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
            const moduleImports = imports.filter(i => i.isModuleReference);
            const stringLiteralImports = imports.filter(i => !i.isModuleReference && !i.nameBinding && !i.namedImports && !i.namespace);
            const fileImports = imports.filter(i => !i.isModuleReference && (i.nameBinding || i.namedImports || i.namespace));

            if (configuration.separateImportGroups)
            {
                const moduleImportGroup = new ElementNodeGroup("Module Imports", [], moduleImports, false, null);
                const stringLiteralImportGroup = new ElementNodeGroup("String Literal Imports", [], stringLiteralImports, false, null);
                const fileImportGroup = new ElementNodeGroup("File Imports", [], fileImports, false, null);

                return new ElementNodeGroup("Imports", [moduleImportGroup, stringLiteralImportGroup, fileImportGroup], [], false, null);
            }
            else
            {
                imports = moduleImports.concat(stringLiteralImports).concat(fileImports);
            }
        }

        return new ElementNodeGroup("Imports", [], imports, false, null);
    }

    private static async organizeModuleMembers(elements: ElementNode[], configuration: Configuration, sourceFile: SourceFile)
    {
        const regions: ElementNodeGroup[] = [];
        const imports = getImports(elements);
        const interfaces = getInterfaces(elements);
        const classes = getClasses(elements, false);
        const types = getTypeAliases(elements);
        const enums = getEnums(elements);
        const functions = getFunctions(elements, configuration.modules.members.treatArrowFunctionVariablesAsMethods, configuration.modules.members.treatArrowFunctionConstantsAsMethods, false);
        const exportedFunctions = getFunctions(elements, configuration.modules.members.treatArrowFunctionVariablesAsMethods, configuration.modules.members.treatArrowFunctionConstantsAsMethods, true);
        const constants = getVariables(elements, true, false, configuration.modules.members.treatArrowFunctionConstantsAsMethods ? false : null);
        const exportedConstants = getVariables(elements, true, true, configuration.modules.members.treatArrowFunctionConstantsAsMethods ? false : null);
        const variables = getVariables(elements, false, false, configuration.modules.members.treatArrowFunctionVariablesAsMethods ? false : null);
        const exportedVariables = getVariables(elements, false, true, configuration.modules.members.treatArrowFunctionVariablesAsMethods ? false : null);
        const expressions = getExpressions(elements);

        if (imports.length > 0)
        {
            regions.push(await this.organizeImports(imports.map(i => i as ImportNode), configuration.imports, sourceFile));
        }

        const vars = Array<string>()
            .concat(variables.map(v => v.name))
            .concat(exportedVariables.map(v => v.name))
            .concat(constants.map(v => v.name))
            .concat(exportedConstants.map(v => v.name));

        if (variables.map(v => v as VariableNode).some(v => intersect(vars, v.dependencies).length > 0) ||
            exportedVariables.map(v => v as VariableNode).some(v => intersect(vars, v.dependencies).length > 0) ||
            constants.map(v => v as VariableNode).some(v => intersect(vars, v.dependencies).length > 0) ||
            exportedConstants.map(v => v as VariableNode).some(v => intersect(vars, v.dependencies).length > 0) ||
            classes.map(v => v as ClassNode).some(v => intersect(vars, v.dependencies).length > 0))
        {
            // dependencies between module members -> skip module element sorting to prevent breaking dependency order
            regions.push(new ElementNodeGroup(null, [], except(elements, imports), false, null));

            console.log(`tsco skip module sorting in ${sourceFile.fileName}, because dependencies between module members were found`);
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
                    else if (memberType === ModuleMemberType.types)
                    {
                        elementNodes = types;
                    }
                    else if (memberType === ModuleMemberType.interfaces)
                    {
                        elementNodes = interfaces;
                    }
                    else if (memberType === ModuleMemberType.classes)
                    {
                        elementNodes = classes;
                    }
                    else if (memberType === ModuleMemberType.functions)
                    {
                        elementNodes = functions;
                    }
                    else if (memberType === ModuleMemberType.exportedFunctions)
                    {
                        elementNodes = exportedFunctions;
                    }
                    else if (memberType === ModuleMemberType.constants)
                    {
                        elementNodes = constants;
                    }
                    else if (memberType === ModuleMemberType.exportedConstants)
                    {
                        elementNodes = exportedConstants;
                    }
                    else if (memberType === ModuleMemberType.variables)
                    {
                        elementNodes = variables;
                    }
                    else if (memberType === ModuleMemberType.exportedVariables)
                    {
                        elementNodes = exportedVariables;
                    }

                    if (elementNodes.length > 0)
                    {
                        memberGroups.push(new ElementNodeGroup(null, [], order(sortDirection, elementNodes, placeAbove, placeBelow, false), false, null));
                    }
                }

                if (memberGroups.length > 0)
                {
                    const isRegion = enums.length + types.length + interfaces.length + classes.length > 1 ||
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
                // expressions go to the end because of dependencies
                regions.push(new ElementNodeGroup(null, [], expressions, false, null));
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

    // #endregion Private Static Methods
}
