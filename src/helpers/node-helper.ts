import { ClassNode } from "../elements/class-node";
import { ElementNode } from "../elements/element-node";
import { EnumNode } from "../elements/enum-node";
import { ExpressionNode } from "../elements/expression-node";
import { FunctionNode } from "../elements/function-node";
import { ImportNode } from "../elements/import-node";
import { InterfaceNode } from "../elements/interface-node";
import { TypeAliasNode } from "../elements/type-alias-node";
import { VariableNode } from "../elements/variable-node";
import { compareStrings } from "./comparing-helper";
import { sortBy } from "./sorting-helper";

// #region Functions (11)

export function getClasses(nodes: ElementNode[], groupWithDecorators: boolean)
{
    return nodes.filter(n => n instanceof ClassNode).sort((a, b) => compareStrings(getName(a, groupWithDecorators), getName(b, groupWithDecorators)));
}

export function getEnums(nodes: ElementNode[])
{
    return nodes.filter(n => n instanceof EnumNode).sort((a, b) => compareStrings(getName(a, false), getName(b, false)));
}

export function getExpressions(nodes: ElementNode[])
{
    // expressions are just executable code and can be interdependent
    return nodes.filter(n => n instanceof ExpressionNode);
}

export function getFunctions(nodes: ElementNode[], treatArrowFunctionPropertiesAsMethods: boolean, exported: boolean)
{
    const functions = nodes.filter(n => n instanceof FunctionNode)
        .map(f => f as FunctionNode)
        .filter(f => f.isExport === exported)
        .map(f => f as ElementNode);
    const arrowFunctionVariables = treatArrowFunctionPropertiesAsMethods ? getVariables(nodes, true, exported, true) : [];

    return functions.concat(arrowFunctionVariables).sort((a, b) => compareStrings(getName(a, false), getName(b, false)));
}

export function getImports(nodes: ElementNode[])
{
    return nodes.filter(n => n instanceof ImportNode).sort((a, b) => compareStrings(getName(a, false), getName(b, false)));
}

export function getInterfaces(nodes: ElementNode[], groupWithDecorators: boolean)
{
    return nodes.filter(n => n instanceof InterfaceNode).sort((a, b) => compareStrings(getName(a, groupWithDecorators), getName(b, groupWithDecorators)));
}

export function getName(node: ElementNode, groupWithDecorators: boolean): string
{
    const nodeName = (node.name.startsWith("#") ? (node.name.substring(1) + "#") : node.name); // private properties can start with #
    const nodeDecorators = groupWithDecorators && node.decoratorsWithoutParameters.length > 0 ? node.decoratorsWithoutParameters.join(", ") : "";

    return `${nodeDecorators} ${nodeName}`.trim();
}

export function getTypeAliases(nodes: ElementNode[])
{
    return nodes.filter(n => n instanceof TypeAliasNode).sort((a, b) => compareStrings(getName(a, false), getName(b, false)));
}

export function getVariables(nodes: ElementNode[], constant: boolean, exported: boolean, arrowFunctionVariables: boolean | null)
{
    let variables = nodes.filter(n => n instanceof VariableNode).map(v => v as VariableNode);

    if (arrowFunctionVariables != null)
    {
        variables = variables.filter(v => v.isArrowFunction === arrowFunctionVariables);
    }

    return variables.filter(v => v.isExport === exported && v.isConst === constant)
        .map(v => v as ElementNode)
        .sort((a, b) => compareStrings(getName(a, false), getName(b, false)));
}

export function groupByPlaceAboveBelow(nodes: ElementNode[], placeAbove: string[], placeBelow: string[], groupWithDecorators: boolean)
{
    const nodesAboveMiddleBelow = splitByPlaceAboveBelow(nodes, placeAbove, placeBelow);
    const nodesAbove = sortBy(nodesAboveMiddleBelow.nodesAbove, placeAbove);
    const nodesMiddle = nodesAboveMiddleBelow.nodesMiddle.sort((a, b) => compareStrings(getName(a, groupWithDecorators), getName(b, groupWithDecorators)));
    const nodesBelow = sortBy(nodesAboveMiddleBelow.nodesBelow, placeBelow);

    return nodesAbove.concat(nodesMiddle).concat(nodesBelow);
}

export function splitByPlaceAboveBelow<T extends ElementNode>(nodes: T[], placeAbove: string[] | null, placeBelow: string[] | null)
{
    const nodesAbove = placeAbove ? nodes.filter(n => placeAbove.indexOf(n.name) > -1) : [];
    const nodesBelow = placeBelow ? nodes.filter(n => placeBelow.indexOf(n.name) > -1) : [];
    const nodesMiddle = nodes.filter(n => nodesAbove.indexOf(n) === -1 && nodesBelow.indexOf(n) === -1);

    return {
        nodesAbove,
        nodesMiddle,
        nodesBelow
    };
}

// #endregion Functions (11)
