import { AccessorNode } from "../elements/accessor-node";
import { ClassNode } from "../elements/class-node";
import { Configuration } from "../configuration/configuration";
import { ElementNode } from "../elements/element-node";
import { ElementNodeGroup } from "../elements/element-node-group";
import { GetterNode } from "../elements/getter-node";
import { InterfaceNode } from "../elements/interface-node";
import { MethodNode } from "../elements/method-node";
import { PropertyNode } from "../elements/property-node";
import { SetterNode } from "../elements/setter-node";
import { WriteModifier } from "../elements/write-modifier";
import ts from "typescript";
import { TypeAliasNode } from "../elements/type-alias-node";
import { config } from "process";

export class SourceCodePrinter
{
    // #region Properties (16)

    private static abstractRegex;
    private static accessorRegex;
    private static addPublic;
    private static asyncRegex;
    private static constRegex;
    private static getAbstract;
    private static getAsync;
    private static getConst;
    private static getReadOnly;
    private static getStatic;
    private static getterRegex;
    private static newLine;
    private static readonlyRegex;
    private static setterRegex;
    private static spacesRegex;
    private static staticRegex;

    // #endregion Properties (16)

    // #region Static Block Declarations (1)

    static {
        this.newLine = "\r\n";
        this.spacesRegex = "\\s*";
        this.staticRegex = `(static${this.spacesRegex})?`;
        this.readonlyRegex = `(readonly${this.spacesRegex})?`;
        this.constRegex = `(const${this.spacesRegex})?`;
        this.abstractRegex = `(abstract${this.spacesRegex})?`;
        this.asyncRegex = `(async${this.spacesRegex})?`;
        this.getterRegex = `get${this.spacesRegex}`;
        this.setterRegex = `set${this.spacesRegex}`;
        this.accessorRegex = `accessor${this.spacesRegex}`;
        this.getAsync = (isAsync: boolean) => isAsync ? "async " : "";
        this.getStatic = (isStatic: boolean) => isStatic ? "static " : "";
        this.getAbstract = (isAbstract: boolean) => isAbstract ? "abstract " : "";
        this.getReadOnly = (writeMode: WriteModifier) => writeMode === WriteModifier.readOnly ? "readonly " : "";
        this.getConst = (writeMode: WriteModifier) => writeMode === WriteModifier.const ? "const " : "";
        this.addPublic = (strings: string[]) => "public " + strings.filter(s => s !== "").map(s => s.trim()).join(" ");
    }

    // #endregion Static Block Declarations (1)

    // #region Public Static Methods (2)

    public static print(sourceCode: string, nodeGroups: ElementNodeGroup[], configuration: Configuration)
    {
        const indentation = this.getIndentation(sourceCode);
        const printedSourceCode = this.printNodeGroups(sourceCode, nodeGroups, configuration);

        return this.addNewLine(this.removeConsecutiveEmptyLines(indentation + printedSourceCode.trim()));
    }

    public static removeRegions(sourceCode: string)
    {
        const newLine = "\n";
        const emptyLine = "";
        let anythingRegex = ".";
        let startRegionRegex = "#region";
        let endRegionRegex = "#endregion";
        let spaceRegex = "\\s";

        let startRegionsRegex = new RegExp(`^//${spaceRegex}*${startRegionRegex}${spaceRegex}+${anythingRegex}+$`, "i");
        let endRegionsRegex = new RegExp(`^//${spaceRegex}*${endRegionRegex}(${spaceRegex}+${anythingRegex}+)?$`, "i");
        let lines: string[] = sourceCode.split(newLine);
        let lines2: string[] = [];

        for (let i = 0; i < lines.length; i++)
        {
            if (!startRegionsRegex.test(lines[i].trim()) &&
                !endRegionsRegex.test(lines[i].trim()))
            {
                lines2.push(lines[i]);
            }
            else
            {
                while (lines.length > i &&
                    lines[i] === emptyLine)
                {
                    i++;
                }

                while (lines2.length > 0 &&
                    lines2[lines2.length - 1] === emptyLine)
                {
                    lines2.pop();
                }
            }
        }

        return lines2.join(newLine);
    }

    // #endregion Public Static Methods (2)

    // #region Private Static Methods (13)

    private static addNewLine(sourceCode: string): string
    {
        return this.append(sourceCode, this.newLine);
    }

    private static addPrivateModifierIfStartingWithHash(node: ElementNode, sourceCode: string)
    {
        // TODO: implement
        return sourceCode;
    }

    private static addPublicModifierIfMissing(node: ElementNode, sourceCode: string)
    {
        if (node.accessModifier === null)
        {
            let regex: RegExp | null = null;
            let replaceWith: string | null = null;

            if (node instanceof MethodNode)
            {
                regex = new RegExp(`${this.staticRegex}${this.abstractRegex}${this.asyncRegex}${node.name}`);
                replaceWith = this.addPublic([this.getStatic(node.isStatic), this.getAbstract(node.isAbstract), this.getAsync(node.isAsync), node.name]);
            }
            else if (node instanceof PropertyNode)
            {
                regex = new RegExp(`${this.staticRegex}${this.abstractRegex}${this.constRegex}${this.readonlyRegex}${node.name}`);
                replaceWith = this.addPublic([this.getStatic(node.isStatic), this.getAbstract(node.isAbstract), this.getConst(node.writeMode), this.getReadOnly(node.writeMode), node.name]);
            }
            else if (node instanceof AccessorNode)
            {
                regex = RegExp(`${this.staticRegex}${this.abstractRegex}${this.accessorRegex}${node.name}`);
                replaceWith = this.addPublic([this.getStatic(node.isStatic), this.getAbstract(node.isAbstract), "accessor", node.name]);
            }
            else if (node instanceof GetterNode)
            {
                regex = RegExp(`${this.staticRegex}${this.abstractRegex}${this.getterRegex}${node.name}`);
                replaceWith = this.addPublic([this.getStatic(node.isStatic), this.getAbstract(node.isAbstract), "get", node.name]);
            }
            else if (node instanceof SetterNode)
            {
                regex = new RegExp(`${this.staticRegex}${this.abstractRegex}${this.setterRegex}${node.name}`);
                replaceWith = this.addPublic([this.getStatic(node.isStatic), this.getAbstract(node.isAbstract), "set", node.name]);
            }

            if (regex && replaceWith)
            {
                sourceCode = this.replaceAfterDecorators(sourceCode, node.decorators, regex, replaceWith);
            }
        }

        return sourceCode;
    }

    private static addRegionEnd(indentation: string, region: { caption: string, nodeCount: number; }, regionConfiguration: { addRegionCaptionToRegionEnd: boolean, addMemberCountInRegionName: boolean, addRegionIndentation: boolean; })
    {
        let sourceCode = "";

        sourceCode = this.addNewLine(sourceCode);
        sourceCode = this.addNewLine(sourceCode);
        sourceCode = this.append(sourceCode, `${regionConfiguration.addRegionIndentation ? indentation : ""}// #endregion` + (regionConfiguration.addRegionCaptionToRegionEnd ? ` ${region.caption}` : "") + (regionConfiguration.addMemberCountInRegionName ? ` (${region.nodeCount})` : ""));

        return sourceCode;
    }

    private static addRegionStart(indentation: string, region: { caption: string, nodeCount: number; }, regionConfiguration: { addMemberCountInRegionName: boolean, addRegionIndentation: boolean; })
    {
        let sourceCode = "";

        sourceCode = `${regionConfiguration.addRegionIndentation ? indentation : ""}// #region` + (region.caption ? ` ${region.caption}` : "") + (regionConfiguration.addMemberCountInRegionName ? ` (${region.nodeCount})` : "");
        sourceCode = this.addNewLine(sourceCode);
        sourceCode = this.addNewLine(sourceCode);

        return sourceCode;
    }

    private static append(oldSourceCode: string, newSourceCode: string)
    {
        if (oldSourceCode.length > 0)
        {
            return this.addNewLine(oldSourceCode) + newSourceCode;
        } else
        {
            return newSourceCode;
        }
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

    private static getNodeCount(nodeGroup: ElementNodeGroup): number
    {
        return nodeGroup.nodes.length + nodeGroup.nodeSubGroups.reduce((sum: number, ng: ElementNodeGroup) => sum + this.getNodeCount(ng), 0);
    }

    private static printNode(sourceCode: string, node: ElementNode, configuration: Configuration)
    {
        const indentation = this.getIndentation(sourceCode);
        let nodeComment = sourceCode.substring(node.fullStart, node.start).trim();
        let nodeSourceCode = sourceCode.substring(node.start, node.end).trim();

        if (node instanceof InterfaceNode && configuration.interfaces.order)
        {
            nodeSourceCode = this.printNodeGroups(sourceCode, node.organizeMembers(configuration.interfaces.groups), configuration);
        }
        else if (node instanceof ClassNode && configuration.classes.order)
        {
            nodeSourceCode = this.printNodeGroups(sourceCode, node.organizeMembers(configuration.classes.groups, configuration.classes.groupMembersWithDecorators), configuration);

            if (configuration.classes.addPublicModifierIfMissing)
            {
                // add public modifier if missing
                nodeSourceCode = this.addPublicModifierIfMissing(node, nodeSourceCode);
            }

            if (configuration.classes.addPrivateModifierIfStartingWithHash)
            {
                // add private modifier if starting with hash
                nodeSourceCode = this.addPrivateModifierIfStartingWithHash(node, nodeSourceCode);
            }
        }
        else if (node instanceof TypeAliasNode && configuration.types.order)
        {
            nodeSourceCode = this.printNodeGroups(nodeSourceCode, node.organizeMembers(configuration.types.groups), configuration);
        }
        else if (node instanceof PropertyNode)
        {
            if (node.isArrowFunction && configuration.classes.treatArrowFunctionPropertiesAsMethods)
            {
                // arrow function property -> add a new line
                nodeSourceCode = this.addNewLine(nodeSourceCode);
            }
        }

        if (nodeComment !== "")
        {
            // add comment
            nodeSourceCode = this.append(nodeSourceCode, `${indentation}${nodeComment}${this.newLine}`);
        }

        nodeSourceCode = this.addNewLine(`${indentation}${nodeSourceCode}`);

        if (nodeSourceCode.endsWith("}"))
        {
            nodeSourceCode = this.addNewLine(nodeSourceCode);
        }

        return nodeSourceCode;
    }

    private static printNodeGroup(sourceCode: string, nodeGroup: ElementNodeGroup, configuration: Configuration)
    {
        const indentation = this.getIndentation(sourceCode);
        const useRegions = configuration.regions.useRegions;
        const addMemberCountInRegionName = configuration.regions.addMemberCountInRegionName;
        const addRegionCaptionToRegionEnd = configuration.regions.addRegionCaptionToRegionEnd;
        const addRegionIndentation = configuration.regions.addRegionIndentation;
        let nodeGroupSourceCode = "";
        let nodeGroupNodeCount = this.getNodeCount(nodeGroup);

        if (useRegions && nodeGroup.isRegion)
        {
            // add region start
            nodeGroupSourceCode = this.append(nodeGroupSourceCode, this.addRegionStart(indentation, { caption: nodeGroup.caption ?? "Region", nodeCount: nodeGroupNodeCount }, { addMemberCountInRegionName, addRegionIndentation }));
        }

        // print subgroups
        nodeGroupSourceCode = this.append(nodeGroupSourceCode, this.printNodeGroups(sourceCode, nodeGroup.nodeSubGroups, configuration));

        // print nodes within a group
        for (const node of nodeGroup.nodes)
        {
            nodeGroupSourceCode = this.append(nodeGroupSourceCode, this.printNode(sourceCode, node, configuration));
        }

        if (useRegions && nodeGroup.isRegion)
        {
            // add region end
            nodeGroupSourceCode = this.append(nodeGroupSourceCode, this.addRegionEnd(indentation, { caption: nodeGroup.caption ?? "Region", nodeCount: nodeGroupNodeCount }, { addRegionCaptionToRegionEnd, addMemberCountInRegionName, addRegionIndentation }));
        }

        return nodeGroupSourceCode;
    }

    private static printNodeGroups(sourceCode: string, nodeGroups: ElementNodeGroup[], configuration: Configuration)
    {
        let printedSourceCode = "";

        for (let nodeGroup of nodeGroups)
        {
            printedSourceCode = this.append(printedSourceCode, this.printNodeGroup(sourceCode, nodeGroup, configuration));

            if (nodeGroups.length > 1 &&
                nodeGroups.indexOf(nodeGroup) < nodeGroups.length - 1)
            {
                // add empty line after non-last node group end
                printedSourceCode = this.addNewLine(printedSourceCode);
            }
        }

        return printedSourceCode;
    }

    private static removeConsecutiveEmptyLines(sourceCode: string)
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

    private static replaceAfterDecorators(code: string, decorators: string[], replaceWhat: RegExp, replaceWith: string)
    {
        const afterDecoratorsStart = decorators.length === 0 ? 0 : (code.lastIndexOf(decorators[decorators.length - 1]) + decorators[decorators.length - 1].length);
        const codeDecorators = code.substring(0, afterDecoratorsStart);
        const codeAfterDecorators = code.substring(afterDecoratorsStart);

        return codeDecorators + codeAfterDecorators.replace(replaceWhat, replaceWith);
    }

    // #endregion Private Static Methods (13)
}
