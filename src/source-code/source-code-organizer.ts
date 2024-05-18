import { getClasses, getEnums, getExpressions, getFunctions, getImports, getInterfaces, getTypeAliases, getVariables, groupByPlaceAboveBelow } from "../helpers/node-helper";
import { readFile, writeFile } from "../helpers/file-system-helper";

import { Configuration } from "../configuration/configuration";
import { ElementNode } from "../elements/element-node";
import { ElementNodeGroup } from "../elements/element-node-group";
import { ModuleMemberType } from "../enums/module-member-type";
import { SourceCode } from "./source-code";
import { SourceCodeAnalyzer } from "./source-code-analyzer";
import { SourceCodePrinter } from "./source-code-printer";
import ts from "typescript";

export class SourceCodeOrganizer
{
    // #region Public Static Methods (3)

    public static organizeSourceCode(sourceCode: string, configuration: Configuration)
    {
        const ignoreComment1Regex = new RegExp("//\\s*tsco:ignore");
        const ignoreComment2Regex = new RegExp("//\\s*<auto-generated\\s*/>");

        if (sourceCode &&
            !ignoreComment1Regex.test(sourceCode) &&
            !ignoreComment2Regex.test(sourceCode))
        {
            try 
            {
                let sourceCodeWithoutRegions = new SourceCode(sourceCode);
                sourceCodeWithoutRegions.removeRegions(); // strip regions, they will get re-generated

                let sourceFile = ts.createSourceFile("temp.ts", sourceCodeWithoutRegions.toString(), ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
                let elements = SourceCodeAnalyzer.getNodes(sourceFile, configuration);
                let topLevelGroups = this.organizeModuleMembers(elements, configuration); // TODO: move this to module node

                return SourceCodePrinter.print(topLevelGroups, configuration).toString();
            }
            catch (error)
            {
                console.error(error);
            }
        }

        return sourceCode;
    }

    public static async organizeSourceCodeFile(sourceCodeFilePath: string, configuration: Configuration)
    {
        let sourceCode = "";
        let organizedSourceCode = "";

        try 
        {
            sourceCode = await readFile(sourceCodeFilePath);
        }
        catch
        {
            return;
        }

        try 
        {
            organizedSourceCode = this.organizeSourceCode(sourceCode, configuration);
        }
        catch
        {
            return;
        }

        if (organizedSourceCode !== sourceCode)
        {
            await writeFile(sourceCodeFilePath, organizedSourceCode);
        }
    }

    // #endregion Public Static Methods (3)

    // #region Private Static Methods (1)

    private static organizeModuleMembers(elements: ElementNode[], configuration: Configuration)
    {
        let regions: ElementNodeGroup[] = [];
        const imports = getImports(elements);
        const interfaces = getInterfaces(elements);
        const classes = getClasses(elements, configuration.classes.groupMembersWithDecorators);
        const types = getTypeAliases(elements);
        const enums = getEnums(elements);
        const functions = getFunctions(elements, configuration.modules.treatArrowFunctionPropertiesAsMethods, false);
        const exportedFunctions = getFunctions(elements, configuration.modules.treatArrowFunctionPropertiesAsMethods, true);
        const constants = getVariables(elements, true, false, configuration.modules.treatArrowFunctionPropertiesAsMethods ? false : null);
        const exportedConstants = getVariables(elements, true, true, configuration.modules.treatArrowFunctionPropertiesAsMethods ? false : null);
        const variables = getVariables(elements, false, false, null);
        const exportedVariables = getVariables(elements, false, true, null);
        let expressions = getExpressions(elements);

        if (imports.length > 0)
        {
            regions.push(new ElementNodeGroup("Imports", [], imports, false));
        }

        for (const memberTypeGroup of configuration.modules.groups)
        {
            const memberGroups: ElementNodeGroup[] = [];

            for (const memberType of memberTypeGroup.memberTypes)
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
                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(elementNodes, [], [], false), false));
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

                regions.push(new ElementNodeGroup(memberTypeGroup.caption, memberGroups, [], isRegion));
            }
        }

        if (expressions.length > 0)
        {
            regions.push(new ElementNodeGroup(null, [], expressions, false));
        }

        return regions;
    }

    // #endregion Private Static Methods (1)
}
