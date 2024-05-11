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
import { WriteModifier } from "../enums/write-modifier";
import { TypeAliasNode } from "../elements/type-alias-node";
import { SourceCode } from "./source-code";

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

    // #region Public Static Methods (1)

    public static print(nodeGroups: ElementNodeGroup[], configuration: Configuration)
    {
        const printedSourceCode = this.printNodeGroups(nodeGroups, configuration);

        printedSourceCode.removeConsecutiveEmptyLines();
        printedSourceCode.trim();
        printedSourceCode.addNewLine();

        return printedSourceCode;
    }

    // #endregion Public Static Methods (1)

    // #region Private Static Methods (6)

    private static addPrivateModifierIfStartingWithHash(node: ElementNode, sourceCode: SourceCode)
    {
        // TODO: implement
        return sourceCode;
    }

    private static addPublicModifierIfMissing(node: ElementNode, sourceCode: SourceCode)
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

    private static printNode(node: ElementNode, configuration: Configuration)
    {
        let nodeSourceCode = new SourceCode(node.sourceCode);

        if (node instanceof InterfaceNode)
        {
            nodeSourceCode = this.printNodeGroups(node.organizeMembers(configuration.interfaces.groups), configuration);
        }
        else if (node instanceof ClassNode)
        {
            nodeSourceCode = this.printNodeGroups(node.organizeMembers(configuration.classes.groups, configuration.classes.groupMembersWithDecorators), configuration);

            // // if (configuration.classes.addPublicModifierIfMissing)
            // // {
            // //     // add public modifier if missing
            // //     nodeSourceCode = this.addPublicModifierIfMissing(node, nodeSourceCode);
            // // }

            // // if (configuration.classes.addPrivateModifierIfStartingWithHash)
            // // {
            // //     // add private modifier if starting with hash
            // //     nodeSourceCode = this.addPrivateModifierIfStartingWithHash(node, nodeSourceCode);
            // // }
        }
        else if (node instanceof TypeAliasNode)
        {
            nodeSourceCode = this.printNodeGroups(node.organizeMembers(configuration.types.groups), configuration);
        }

        if (node instanceof PropertyNode)
        {
            // arrow function property -> add a new line
            nodeSourceCode.addNewLineIf(node.isArrowFunction && configuration.classes.treatArrowFunctionPropertiesAsMethods);
        }

        nodeSourceCode.addNewLine();

        return nodeSourceCode;
    }

    private static printNodeGroup(nodeGroup: ElementNodeGroup, configuration: Configuration)
    {
        const nodeGroupSourceCode = new SourceCode();
        const nodeGroupNodeCount = nodeGroup.getNodeCount();

        // print subgroups
        nodeGroupSourceCode.add(this.printNodeGroups(nodeGroup.nodeSubGroups, configuration));

        // print nodes within a group
        for (const node of nodeGroup.nodes)
        {
            nodeGroupSourceCode.add(this.printNode(node, configuration));

            if (node instanceof MethodNode ||
                node instanceof GetterNode ||
                node instanceof SetterNode)
            {
                if (nodeGroup.nodes.indexOf(node) < nodeGroup.nodes.length - 1)
                {
                    // separate elements that end with '}' with an additional empty line
                    nodeGroupSourceCode.addNewLine();
                }
            }
        }

        if (configuration.regions.useRegions && nodeGroup.isRegion)
        {
            // wrap with region
            nodeGroupSourceCode.addRegion(nodeGroup.caption ?? "Region", nodeGroupNodeCount, configuration.regions);
        }

        return nodeGroupSourceCode;
    }

    private static printNodeGroups(nodeGroups: ElementNodeGroup[], configuration: Configuration)
    {
        const nodeGroupsSourceCode = new SourceCode();
        const nodeGroupsWithNodes = nodeGroups.filter(ng => ng.getNodeCount() > 0);

        for (let nodeGroup of nodeGroupsWithNodes)
        {
            if (nodeGroup.getNodeCount() > 0)
            {
                nodeGroupsSourceCode.add(this.printNodeGroup(nodeGroup, configuration));

                if (nodeGroupsWithNodes.length > 1 &&
                    nodeGroupsWithNodes.indexOf(nodeGroup) < nodeGroupsWithNodes.length - 1)
                {
                    // add empty line after non-last node group end
                    nodeGroupsSourceCode.addNewLine();
                }
            }
        }

        return nodeGroupsSourceCode;
    }

    private static replaceAfterDecorators(sourceCode: SourceCode, decorators: string[], replaceWhat: RegExp, replaceWith: string)
    {
        const code = sourceCode.toString();
        const afterDecoratorsStart = decorators.length === 0 ? 0 : (code.lastIndexOf(decorators[decorators.length - 1]) + decorators[decorators.length - 1].length);
        const codeDecorators = code.substring(0, afterDecoratorsStart);
        const codeAfterDecorators = code.substring(afterDecoratorsStart);

        return new SourceCode(codeDecorators + codeAfterDecorators.replace(replaceWhat, replaceWith));
    }

    // #endregion Private Static Methods (6)
}
