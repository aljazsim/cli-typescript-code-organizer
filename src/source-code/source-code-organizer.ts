import { getFileName, readFile, writeFile } from "../helpers/file-system-helper";

import { ClassMemberGroupConfiguration } from "../configuration/class-member-group-configuration";
import { ClassNode } from "../elements/class-node";
import { Configuration } from "../configuration/configuration";
import { ElementNodeGroup } from "../elements/element-node-group";
import { InterfaceMemberGroupConfiguration } from "../configuration/interface-member-group-configuration";
import { InterfaceNode } from "../elements/interface-node";
import { SourceCodePrinter } from "./source-code-printer";
import ts from "typescript";
import { SourceCodeAnalyzer } from "./source-code-analyzer";
import { ModuleMemberGroupConfiguration } from "../configuration/module-member-group-configuration";
import { InterfaceMemberType } from "../enums/interface-member-type";
import { getClasses, getEnums, getExpressions, getFunctions, getImports, getInterfaces, getTypeAliases, getVariables, groupByPlaceAboveBelow } from "../helpers/node-helper";
import { ClassMemberType } from "../enums/class-member-type";
import { compareNumbers } from "../helpers/comparing-helper";
import { ModuleMemberType } from "../enums/module-member-type";
import { ElementNode } from "../elements/element-node";
import { TypeAliasNode } from "../elements/type-alias-node";
import { ModuleConfiguration } from "../configuration/module-configuration";

export class SourceCodeOrganizer
{
    // #region Public Static Methods (3)

    public static organizeSourceCode(sourceCodeFileName: string, sourceCode: string, configuration: Configuration)
    {
        const ignoreComment1Regex = new RegExp("//\\s*tsco:ignore");
        const ignoreComment2Regex = new RegExp("//\\s*<auto-generated\\s*/>");

        if (sourceCode &&
            !ignoreComment1Regex.test(sourceCode) &&
            !ignoreComment2Regex.test(sourceCode))
        {
            try 
            {
                let sourceFile = ts.createSourceFile(sourceCodeFileName, sourceCode, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
                let elements = SourceCodeAnalyzer.getNodes(sourceFile, configuration.classes.treatArrowFunctionPropertiesAsMethods);
                let topLevelGroups = this.organizeModuleMembers(elements, configuration.modules);

                return SourceCodePrinter.print(topLevelGroups, sourceCode, configuration);
            }
            catch
            {
            }
        }

        return sourceCode;
    }

    public static async organizeSourceCodeFile(sourceCodeFilePath: string, configuration: Configuration)
    {
        const sourceCodeFileName = getFileName(sourceCodeFilePath);
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
            organizedSourceCode = this.organizeSourceCode(sourceCode, sourceCodeFileName, configuration);
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

    public static refactorThisMethod(sourceCode: string, fileName: string, configuration: Configuration)
    {
        sourceCode = removeRegions(sourceCode);

        let sourceFile = ts.createSourceFile(fileName, sourceCode, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
        let elements = SourceCodeAnalyzer.getNodes(sourceFile, configuration.members.treatArrowFunctionPropertiesAsMethods);

        // having expressions could reorganize code in incorrect way because of code dependencies and declaration order
        if (expressions.length === 0)
        {
            if (groups.slice(1).some(g => g.nodes.length > 1))
            {
                // organize top level elements (ignore imports)
                sourceCode = print(groups, sourceCode, 0, sourceCode.length, "", configuration);
            }
        }

        // organize members within top level elements (interfaces, classes)
        sourceFile = ts.createSourceFile(fileName, sourceCode, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);

        elements = SourceCodeAnalyzer.getNodes(sourceFile, configuration.members.treatArrowFunctionPropertiesAsMethods);

        // remove regions from output
        if (!configuration.regions.useRegions)
        {
            sourceCode = removeRegions(sourceCode);
        }

        // remove multiple empty lines
        sourceCode = formatLines(sourceCode);

        return sourceCode;
    }

    // #endregion Public Static Methods (3)

    // #region Private Static Methods (1)

    private static organizeModuleMembers(elements: ElementNode[], configuration: ModuleConfiguration)
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

        if (configuration.order)
        {
            for (const memberTypeGroup of configuration.groups)
            {
                const placeAbove = memberTypeGroup.placeAbove;
                const placeBelow = memberTypeGroup.placeBelow;
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
                    else if (memberType === ModuleMemberType.variables)
                    {
                        elementNodes = variables;
                    }

                    memberGroups.push(new ElementNodeGroup(null, [], groupByPlaceAboveBelow(elementNodes, placeAbove, placeBelow, false), false));
                }

                regions.push(new ElementNodeGroup(memberTypeGroup.caption, memberGroups, [], true));
            }
        }
        else
        {
            regions.push(new ElementNodeGroup(null, [], elements, false));
        }

        return regions;
    }

    // #endregion Private Static Methods (1)
}