import { ClassNode } from "../elements/class-node";
import { Configuration } from "../configuration/configuration";
import { ElementNode } from "../elements/element-node";
import { ElementNodeGroup } from "../elements/element-node-group";
import { GetterNode } from "../elements/getter-node";
import { InterfaceNode } from "../elements/interface-node";
import { MethodNode } from "../elements/method-node";
import { PropertyNode } from "../elements/property-node";
import { SetterNode } from "../elements/setter-node";
import { SourceCode } from "./source-code";
import { TypeAliasNode } from "../elements/type-alias-node";
import { FunctionNode } from "../elements/function-node";

export class SourceCodePrinter
{
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
        const beforeMembers = node.sourceCode.substring(0, node.membersStart).trim();
        const members = this.printNodeGroups(node.organizeMembers(configuration.classes), configuration);
        const afterMembers = node.sourceCode.substring(node.membersEnd).trim();
        const nodeSourceCode = new SourceCode();

        if (configuration.classes.members.addPublicModifierIfMissing)
        {
            // add public modifier if missing
            node.properties.forEach(p => members.addPublicModifierIfMissing(p));
            node.methods.forEach(m => members.addPublicModifierIfMissing(m));
            node.getters.forEach(g => members.addPublicModifierIfMissing(g));
            node.setters.forEach(s => members.addPublicModifierIfMissing(s));
            node.accessors.forEach(a => members.addPublicModifierIfMissing(a));
        }

        if (configuration.classes.members.addPrivateModifierIfStartingWithHash)
        {
            // add private modifier if starting with hash
            node.properties.forEach(p => members.addPrivateModifierIfStartingWithHash(p));
            node.methods.forEach(m => members.addPrivateModifierIfStartingWithHash(m));
            node.getters.forEach(g => members.addPrivateModifierIfStartingWithHash(g));
            node.setters.forEach(s => members.addPrivateModifierIfStartingWithHash(s));
            node.accessors.forEach(a => members.addPrivateModifierIfStartingWithHash(a));
        }

        nodeSourceCode.add(beforeMembers);
        nodeSourceCode.addNewLine();
        nodeSourceCode.add(members);
        nodeSourceCode.add(afterMembers);

        return nodeSourceCode;
    }

    private static printInterface(node: InterfaceNode, configuration: Configuration)
    {
        const beforeMembers = node.sourceCode.substring(0, node.membersStart).trim();
        const members = this.printNodeGroups(node.organizeMembers(configuration.interfaces), configuration);
        const afterMembers = node.sourceCode.substring(node.membersEnd).trim();
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
            nodeSourceCode = this.printType(node, configuration);
        }

        if (node instanceof PropertyNode)
        {
            // arrow function property -> add a new line
            nodeSourceCode.addNewLineIf(node.isArrowFunction && configuration.classes.members.treatArrowFunctionPropertiesAsMethods);
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
                node instanceof SetterNode ||
                node instanceof FunctionNode)
            {
                if (nodeGroup.nodes.indexOf(node) < nodeGroup.nodes.length - 1)
                {
                    // separate elements that end with '}' with an additional empty line
                    nodeGroupSourceCode.addNewLine();
                }
            }
        }

        if (nodeGroup.isRegion && nodeGroup.regionConfiguration?.addRegions)
        {
            // wrap with region
            nodeGroupSourceCode.addRegion(nodeGroup.caption ?? "Region", nodeGroupNodeCount, nodeGroup.regionConfiguration);
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

    private static printType(node: TypeAliasNode, configuration: Configuration)
    {
        const beforeMembers = node.sourceCode.substring(0, node.membersStart).trim();
        const members = this.printNodeGroups(node.organizeMembers(configuration.types), configuration);
        const afterMembers = node.sourceCode.substring(node.membersEnd).trim();
        const nodeSourceCode = new SourceCode();

        nodeSourceCode.add(beforeMembers);
        nodeSourceCode.addNewLine();
        nodeSourceCode.add(members);
        nodeSourceCode.add(afterMembers);

        return nodeSourceCode;
    }

    // #endregion Private Static Methods (6)
}
