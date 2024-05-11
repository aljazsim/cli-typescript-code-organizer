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
import { TypeNode } from "typescript";

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

    private static printClass(node: ClassNode, configuration: Configuration)
    {
        const beforeMembers = node.getSubString(0, node.membersStart).trimStart();
        const members = this.printNodeGroups(node.organizeMembers(configuration.classes.groups, configuration.classes.groupMembersWithDecorators), configuration);
        const afterMembers = node.getSubString(node.membersEnd + 1, node.end).trimEnd();
        let nodeSourceCode = new SourceCode();

        nodeSourceCode.add(beforeMembers);
        nodeSourceCode.addNewLine();
        nodeSourceCode.add(members);
        nodeSourceCode.add(afterMembers);

        if (configuration.classes.addPublicModifierIfMissing)
        {
            // add public modifier if missing
            nodeSourceCode.addPublicModifierIfMissing(node);
        }

        if (configuration.classes.addPrivateModifierIfStartingWithHash)
        {
            // add private modifier if starting with hash
            nodeSourceCode.addPrivateModifierIfStartingWithHash(node);
        }

        return nodeSourceCode;
    }

    private static printInterface(node: InterfaceNode, configuration: Configuration)
    {
        const beforeMembers = node.getSubString(0, node.membersStart).trimStart();
        const members = this.printNodeGroups(node.organizeMembers(configuration.interfaces.groups), configuration);
        const afterMembers = node.getSubString(node.membersEnd + 1, node.end).trimEnd();
        const nodeSourceCode = new SourceCode();

        nodeSourceCode.add(beforeMembers);
        nodeSourceCode.addNewLine();
        nodeSourceCode.add(members);
        nodeSourceCode.add(afterMembers);

        return nodeSourceCode;
    }

    private static printNode(node: ElementNode, configuration: Configuration)
    {
        let nodeSourceCode = new SourceCode(node.sourceCode);

        if (node instanceof InterfaceNode)
        {
            nodeSourceCode = this.printInterface(node, configuration);
        }
        else if (node instanceof ClassNode)
        {
            nodeSourceCode = this.printClass(node, configuration);
        }
        else if (node instanceof TypeAliasNode)
        {
            nodeSourceCode = this.printNode(node, configuration);
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

    private static printType(nodeSourceCode: SourceCode, node: TypeAliasNode, configuration: Configuration)
    {
        // const beforeMembers = node.getSubString(0, node.membersStart).trimStart();
        // const members = this.printNodeGroups(node.organizeMembers(configuration.types.groups), configuration);
        // const afterMembers = node.getSubString(node.membersEnd + 1, node.end).trimEnd();

        // nodeSourceCode = new SourceCode();
        // nodeSourceCode.add(beforeMembers);
        // nodeSourceCode.addNewLine();
        // nodeSourceCode.add(members);
        // nodeSourceCode.add(afterMembers);

        return nodeSourceCode;
    }

    // #endregion Private Static Methods (6)
}
