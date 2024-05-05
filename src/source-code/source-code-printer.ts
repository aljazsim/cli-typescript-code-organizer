import ts from "typescript";
import { Configuration } from "../configuration/configuration";
import { removeRegions } from "../helpers/region-helper";
import { SourceCodeAnalyzer } from "./source-code-analyzer";
import { getClasses, getEnums, getExpressions, getFunctions, getImports, getInterfaces, getTypeAliases, getVariables } from "../helpers/node-helper";
import { ClassNode } from "../elements/class-node";
import { ElementNodeGroup } from "../elements/element-node-group";
import { InterfaceNode } from "../elements/interface-node";
import { compareNumbers } from "../helpers/comparing-helper";
import { PropertyNode } from "../elements/property-node";
import { AccessorNode } from "../elements/accessor-node";
import { GetterNode } from "../elements/getter-node";
import { SetterNode } from "../elements/setter-node";
import { MethodNode } from "../elements/method-node";
import { WriteModifier } from "../elements/write-modifier";
import { ElementNode } from "../elements/element-node";

export class SourceCodePrinter
{
    // #region Public Static Methods (1)

    public static print(groups: ElementNodeGroup[], sourceCode: string, configuration: Configuration)
    {
        // configuration
        const addMemberCountInRegionName = configuration.regions.addMemberCountInRegionName;
        const addRegionCaptionToRegionEnd = configuration.regions.addRegionCaptionToRegionEnd;
        const addRegionIndentation = configuration.regions.addRegionIndentation;
        const treatArrowFunctionPropertiesAsMethod = configuration.members.treatArrowFunctionPropertiesAsMethods;
        const addPublicModifierIfMissing = configuration.members.addPublicModifierIfMissing;

        let sourceCode2: string;
        let count = 0;
        let members = "";
        const newLine = "\r\n";
        const spacesRegex = "\\s*";
        const staticRegex = `(static${spacesRegex})?`;
        const readonlyRegex = `(readonly${spacesRegex})?`;
        const constRegex = `(const${spacesRegex})?`;
        const abstractRegex = `(abstract${spacesRegex})?`;
        const asyncRegex = `(async${spacesRegex})?`;
        const getterRegex = `get${spacesRegex}`;
        const setterRegex = `set${spacesRegex}`;
        const accessorRegex = `accessor${spacesRegex}`;
        const getAsync = (isAsync: boolean) => isAsync ? "async " : "";
        const getStatic = (isStatic: boolean) => isStatic ? "static " : "";
        const getAbstract = (isAbstract: boolean) => isAbstract ? "abstract " : "";
        const getReadOnly = (writeMode: WriteModifier) => writeMode === WriteModifier.readOnly ? "readonly " : "";
        const getConst = (writeMode: WriteModifier) => writeMode === WriteModifier.const ? "const " : "";
        const addPublic = (strings: string[]) => "public " + strings.filter(s => s !== "").map(s => s.trim()).join(" ");
        let nodeGroups: ElementNode[][] = [];

        for (let group of groups)
        {
            if (group.nodes &&
                group.nodes.length > 0)
            {
                count = group.nodes.length;
                nodeGroups = [group.nodes];
            }
            else if (group.nodeSubGroups &&
                group.nodeSubGroups.length > 0)
            {
                count = group.nodeSubGroups.reduce((sum, x) => sum + x.nodes.length, 0);
                nodeGroups = group.nodeSubGroups.map(x => x.nodes).filter(x => x.length > 0);
            }
            else
            {
                count = 0;
                nodeGroups = [];
            }

            if (count > 0)
            {
                if (group.isRegion)
                {
                    members += newLine;
                    members += `${addRegionIndentation ? indentation : ""}// #region`;
                    members += group.caption ? ` ${group.caption}` : "";
                    members += addMemberCountInRegionName ? ` (${count})` : "";
                    members += newLine;
                }

                members += newLine;

                for (let nodeGroup of nodeGroups)
                {
                    for (let i = 0; i < nodeGroup.length; i++)
                    {
                        const node = nodeGroup[i];
                        let comment = sourceCode.substring(node.fullStart, node.start).trim();
                        let code = sourceCode.substring(node.start, node.end).trim();

                        if (addPublicModifierIfMissing)
                        {
                            if (node.accessModifier === null)
                            {
                                let regex: RegExp | null = null;
                                let replaceWith: string | null = null;

                                if (node instanceof MethodNode)
                                {
                                    regex = new RegExp(`${staticRegex}${abstractRegex}${asyncRegex}${node.name}`);
                                    replaceWith = addPublic([getStatic(node.isStatic), getAbstract(node.isAbstract), getAsync(node.isAsync), node.name]);
                                }
                                else if (node instanceof PropertyNode)
                                {
                                    regex = new RegExp(`${staticRegex}${abstractRegex}${constRegex}${readonlyRegex}${node.name}`);
                                    replaceWith = addPublic([getStatic(node.isStatic), getAbstract(node.isAbstract), getConst(node.writeMode), getReadOnly(node.writeMode), node.name]);
                                }
                                else if (node instanceof AccessorNode)
                                {
                                    regex = RegExp(`${staticRegex}${abstractRegex}${accessorRegex}${node.name}`);
                                    replaceWith = addPublic([getStatic(node.isStatic), getAbstract(node.isAbstract), "accessor", node.name]);
                                }
                                else if (node instanceof GetterNode)
                                {
                                    regex = RegExp(`${staticRegex}${abstractRegex}${getterRegex}${node.name}`);
                                    replaceWith = addPublic([getStatic(node.isStatic), getAbstract(node.isAbstract), "get", node.name]);
                                }
                                else if (node instanceof SetterNode)
                                {
                                    regex = new RegExp(`${staticRegex}${abstractRegex}${setterRegex}${node.name}`);
                                    replaceWith = addPublic([getStatic(node.isStatic), getAbstract(node.isAbstract), "set", node.name]);
                                }

                                if (regex && replaceWith)
                                {
                                    code = this.replaceAfterDecorators(code, node.decorators, regex, replaceWith);
                                }
                            }
                        }

                        if (comment !== "")
                        {
                            members += `${indentation}${comment}${newLine}`;
                        }

                        members += `${indentation}${code}`;
                        members += newLine;

                        if (code.endsWith("}"))
                        {
                            members += newLine;
                        }
                        else if (node instanceof PropertyNode &&
                            node.isArrowFunction &&
                            treatArrowFunctionPropertiesAsMethod)
                        {
                            // arrow function property -> add a new line
                            members += newLine;
                        }
                    }

                    members += newLine;
                }

                if (group.isRegion)
                {
                    members += newLine;
                    members += `${addRegionIndentation ? indentation : ""}// #endregion`;
                    members += addRegionCaptionToRegionEnd ? ` ${group.caption}` : "";
                    members += addMemberCountInRegionName ? ` (${count})` : "";
                    members += newLine;
                }

                members += newLine;
            }
        }

        sourceCode2 = sourceCode.substring(0, start).trimEnd();
        sourceCode2 += newLine;
        sourceCode2 += (addRegionIndentation ? indentation : "") + members.trim();
        sourceCode2 += newLine;
        sourceCode2 += sourceCode.substring(end, sourceCode.length).trimStart();

        return sourceCode2.trimStart();
    }

    // #endregion Public Static Methods (1)

    // #region Private Static Methods (3)

    private static formatLines(sourceCode: string)
    {
        const newLine = "\r\n";
        let emptyLineRegex = new RegExp(`^\\s*$`);
        let newLineRegex = new RegExp(`\r?\n|\r`);
        let openingBraceRegex = new RegExp(`^.*\{\\s*$`);
        let closingBraceRegex = new RegExp(`^\\s*\}\\s*$`);

        let lines: string[] = sourceCode.split(newLineRegex);

        for (let i = 0; i < lines.length - 1; i++)
        {
            if (openingBraceRegex.test(lines[i]) &&
                emptyLineRegex.test(lines[i + 1]))
            {
                // remove empty line after {
                lines.splice(i + 1, 1);

                i--;
            }
            else if (emptyLineRegex.test(lines[i]) &&
                closingBraceRegex.test(lines[i + 1]))
            {
                // remove empty line before }
                lines.splice(i, 1);

                i--;
            }
            else if (emptyLineRegex.test(lines[i]) &&
                emptyLineRegex.test(lines[i + 1]))
            {
                lines.splice(i, 1);

                i--;
            }
        }

        return lines.join(newLine);
    }

    private static getIndentation(sourceCode: string): string
    {
        let tab = "\t";
        let twoSpaces = "  ";
        let fourSpaces = twoSpaces + twoSpaces;

        for (const sourceCodeLine of sourceCode.split("\n"))
        {
            if (sourceCodeLine.startsWith(tab))
            {
                return tab;
            }
            else if (sourceCodeLine.startsWith(fourSpaces))
            {
                return fourSpaces;
            }
            else if (sourceCodeLine.startsWith(twoSpaces))
            {
                return twoSpaces;
            }
        }

        return twoSpaces;
    }

    private static replaceAfterDecorators(code: string, decorators: string[], replaceWhat: RegExp, replaceWith: string)
    {
        const afterDecoratorsStart = decorators.length === 0 ? 0 : (code.lastIndexOf(decorators[decorators.length - 1]) + decorators[decorators.length - 1].length);
        const codeDecorators = code.substring(0, afterDecoratorsStart);
        const codeAfterDecorators = code.substring(afterDecoratorsStart);

        return codeDecorators + codeAfterDecorators.replace(replaceWhat, replaceWith);
    }

    // #endregion Private Static Methods (3)
}