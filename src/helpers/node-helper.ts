import * as ts from "typescript";

import { AccessModifier } from "../enums/access-modifier";
import { AccessorNode } from "../elements/accessor-node";
import { ClassNode } from "../elements/class-node";
import { ElementNode } from "../elements/element-node";
import { EnumNode } from "../elements/enum-node";
import { ExpressionNode } from "../elements/expression-node";
import { FunctionNode } from "../elements/function-node";
import { GetterNode } from "../elements/getter-node";
import { ImportNode } from "../elements/import-node";
import { InterfaceNode } from "../elements/interface-node";
import { MethodNode } from "../elements/method-node";
import { PropertyNode } from "../elements/property-node";
import { PropertySignatureNode } from "../elements/property-signature-node";
import { SetterNode } from "../elements/setter-node";
import { TypeAliasNode } from "../elements/type-alias-node";
import { VariableNode } from "../elements/variable-node";
import { WriteModifier } from "../enums/write-modifier";
import { compareStrings } from "./comparing-helper";
import { sortBy } from "./sorting-helper";

// #region Functions (25)

export function getAccessModifier(node: ts.PropertyDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration | ts.MethodDeclaration | ts.PropertySignature | ts.IndexSignatureDeclaration)
{
    let accessModifier: AccessModifier | null = null;
    let accessModifiers: ts.SyntaxKind[] = [ts.SyntaxKind.PrivateKeyword, ts.SyntaxKind.ProtectedKeyword, ts.SyntaxKind.PublicKeyword];
    let nodeAccessModifier: ts.Modifier | ts.ModifierLike | undefined;

    if (node.modifiers &&
        node.modifiers.length > 0)
    {
        nodeAccessModifier = node.modifiers.find((x) => accessModifiers.indexOf(x.kind) > -1);

        if (nodeAccessModifier)
        {
            if (nodeAccessModifier.kind === ts.SyntaxKind.PublicKeyword)
            {
                accessModifier = AccessModifier.public;
            }
            else if (nodeAccessModifier.kind === ts.SyntaxKind.ProtectedKeyword)
            {
                accessModifier = AccessModifier.protected;
            }
            else if (nodeAccessModifier.kind === ts.SyntaxKind.PrivateKeyword)
            {
                accessModifier = AccessModifier.private;
            }
        }
    }

    return accessModifier;
}

export function getClasses(nodes: ElementNode[], groupWithDecorators: boolean)
{
    return nodes.filter(n => n instanceof ClassNode).sort((a, b) => compareStrings(getName(a, groupWithDecorators), getName(b, groupWithDecorators)));
}

export function getDecorators(node: ts.ClassDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration | ts.PropertyDeclaration | ts.MethodDeclaration | ts.IndexedAccessTypeNode | ts.ConstructorDeclaration | ts.EnumDeclaration | ts.FunctionDeclaration | ts.IndexSignatureDeclaration | ts.MethodSignature | ts.PropertySignature | ts.TypeAliasDeclaration, sourceFile: ts.SourceFile)
{
    return getModifiers(node).filter(m => ts.isDecorator(m)).map(x => (x as ts.Decorator).getText(sourceFile).trim()) ?? [];
}

export function getDecoratorsWithoutParameters(node: ClassNode | PropertyNode | MethodNode | SetterNode | GetterNode | AccessorNode)
{
    return node.decorators.map(d => d.replace(/\(.*\)/, ""));
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

export function getInterfaces(nodes: ElementNode[])
{
    return nodes.filter(n => n instanceof InterfaceNode).sort((a, b) => compareStrings(getName(a, false), getName(b, false)));
}

export function getIsAbstract(node: ts.ClassDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration | ts.PropertyDeclaration | ts.MethodDeclaration | ts.IndexedAccessTypeNode)
{
    return getModifiers(node).find((x) => x.kind === ts.SyntaxKind.AbstractKeyword) !== undefined;
}

export function getIsAsync(node: ts.MethodDeclaration | ts.PropertyDeclaration)
{
    return getModifiers(node).find((x) => x.kind === ts.SyntaxKind.AsyncKeyword) !== undefined;
}

export function getIsExport(node: ts.ClassDeclaration | ts.FunctionDeclaration | ts.VariableStatement)
{
    let isExport = false;

    if (node.modifiers &&
        node.modifiers.length > 0)
    {
        let tmp = node.modifiers.find((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword);

        if (tmp &&
            tmp.kind === ts.SyntaxKind.ExportKeyword)
        {
            isExport = true;
        }
    }

    return isExport;
}

export function getIsStatic(node: ts.ClassDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration | ts.PropertyDeclaration | ts.MethodDeclaration | ts.IndexedAccessTypeNode)
{
    return getModifiers(node).find((x) => x.kind === ts.SyntaxKind.StaticKeyword) !== undefined;
}

export function getModifiers(node: ts.ClassDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration | ts.PropertyDeclaration | ts.MethodDeclaration | ts.IndexedAccessTypeNode | ts.ConstructorDeclaration | ts.EnumDeclaration | ts.FunctionDeclaration | ts.IndexSignatureDeclaration | ts.MethodSignature | ts.PropertySignature | ts.TypeAliasDeclaration | ts.VariableStatement)
{
    let modifiers: ts.NodeArray<ts.ModifierLike> | undefined;

    if (ts.isClassDeclaration(node))
    {
        modifiers = (node as ts.ClassDeclaration).modifiers;
    }
    else if (ts.isGetAccessorDeclaration(node))
    {
        modifiers = (node as ts.GetAccessorDeclaration).modifiers;
    }
    else if (ts.isSetAccessorDeclaration(node))
    {
        modifiers = (node as ts.SetAccessorDeclaration).modifiers;
    }
    else if (ts.isPropertyDeclaration(node))
    {
        modifiers = (node as ts.PropertyDeclaration).modifiers;
    }
    else if (ts.isMethodDeclaration(node))
    {
        modifiers = (node as ts.MethodDeclaration).modifiers;
    }
    else if (ts.isIndexedAccessTypeNode(node))
    {
        // no modifiers
    }
    else if (ts.isConstructorDeclaration(node))
    {
        modifiers = (node as ts.ConstructorDeclaration).modifiers;
    }
    else if (ts.isEnumDeclaration(node))
    {
        modifiers = (node as ts.EnumDeclaration).modifiers;
    }
    else if (ts.isFunctionDeclaration(node))
    {
        modifiers = (node as ts.FunctionDeclaration).modifiers;
    }
    else if (ts.isIndexSignatureDeclaration(node))
    {
        modifiers = (node as ts.IndexSignatureDeclaration).modifiers;
    }
    else if (ts.isMethodSignature(node))
    {
        modifiers = (node as ts.MethodSignature).modifiers;
    }
    else if (ts.isPropertySignature(node))
    {
        modifiers = (node as ts.PropertySignature).modifiers;
    }
    else if (ts.isTypeAliasDeclaration(node))
    {
        modifiers = (node as ts.TypeAliasDeclaration).modifiers;
    }
    else if (ts.isVariableStatement(node))
    {
        modifiers = (node as ts.VariableStatement).modifiers;
    }

    return modifiers ?? [];
}

export function getName(node: ElementNode, groupWithDecorators: boolean): string
{
    const nodeName = (node.name.startsWith("#") ? (node.name.substring(1) + "#") : node.name); // private properties can start with #
    let nodeDecorators = Array<string>();

    if (node instanceof ClassNode ||
        node instanceof PropertyNode ||
        node instanceof MethodNode ||
        node instanceof GetterNode ||
        node instanceof SetterNode ||
        node instanceof AccessorNode)
    {
        nodeDecorators = groupWithDecorators && node.decorators.length > 0 ? getDecoratorsWithoutParameters(node) : [];
    }

    return `${nodeDecorators.join(", ")} ${nodeName}`.trim();
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

export function getWriteMode(node: ts.PropertyDeclaration | ts.VariableStatement | ts.IndexedAccessTypeNode | ts.PropertySignature | ts.IndexSignatureDeclaration)
{
    let writeMode: WriteModifier = WriteModifier.writable;
    let writeModifiers: ts.SyntaxKind[] = [ts.SyntaxKind.ConstKeyword, ts.SyntaxKind.ReadonlyKeyword];
    let nodeWriteModifier = getModifiers(node).find((x) => writeModifiers.indexOf(x.kind) > -1);

    if (nodeWriteModifier)
    {
        if (nodeWriteModifier.kind === ts.SyntaxKind.ConstKeyword)
        {
            writeMode = WriteModifier.const;
        }
        else if (nodeWriteModifier.kind === ts.SyntaxKind.ReadonlyKeyword)
        {
            writeMode = WriteModifier.readOnly;
        }
    }

    return writeMode;
}

export function isPrivate(x: PropertyNode | MethodNode | GetterNode | SetterNode | AccessorNode)
{
    return x.accessModifier === AccessModifier.private;
}

export function isProtected(x: PropertyNode | MethodNode | GetterNode | SetterNode | AccessorNode)
{
    return x.accessModifier === AccessModifier.protected;
}

export function isPublic(x: PropertyNode | MethodNode | GetterNode | SetterNode | AccessorNode)
{
    return x.accessModifier === AccessModifier.public || x.accessModifier === null;
}

export function isReadOnly(x: PropertyNode | PropertySignatureNode)
{
    return x.writeMode === WriteModifier.readOnly;
}

export function isWritable(x: PropertyNode | PropertySignatureNode)
{
    return x.writeMode === WriteModifier.writable;
}

export function order(sort: boolean, sortDirection: "asc" | "desc", nodes: ElementNode[], placeAbove: string[], placeBelow: string[], groupWithDecorators: boolean)
{
    const nodesAboveMiddleBelow = splitByPlaceAboveBelow(nodes, placeAbove, placeBelow);
    const nodesAbove = sortBy(nodesAboveMiddleBelow.nodesAbove, placeAbove);
    const nodesBelow = sortBy(nodesAboveMiddleBelow.nodesBelow, placeBelow);
    let nodesMiddle = nodesAboveMiddleBelow.nodesMiddle;

    if (sort)
    {
        nodesMiddle = nodesMiddle.sort((a, b) => compareStrings(getName(a, groupWithDecorators), getName(b, groupWithDecorators)));

        if (sortDirection === "desc")
        {
            nodesMiddle = nodesMiddle.reverse();
        }
    }

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

// #endregion Functions (25)
