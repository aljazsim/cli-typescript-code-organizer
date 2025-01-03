import * as ts from "typescript";

import { ClassNode } from "../elements/class-node";
import { Configuration } from "../configuration/configuration";
import { ElementNode } from "../elements/element-node";
import { EnumNode } from "../elements/enum-node";
import { ExpressionNode } from "../elements/expression-node";
import { FunctionNode } from "../elements/function-node";
import { ImportNode } from "../elements/import-node";
import { InterfaceNode } from "../elements/interface-node";
import { TypeAliasNode } from "../elements/type-alias-node";
import { VariableNode } from "../elements/variable-node";

export class SourceCodeAnalyzer
{
    // #region Public Static Methods (2)

    public static getNodes(sourceFile: ts.SourceFile, configuration: Configuration)
    {
        let elements: ElementNode[] = [];

        // traverse top ast nodes
        for (let node of sourceFile.getChildren(sourceFile))
        {
            elements = elements.concat(this.traverseSyntaxTree(node, sourceFile, configuration));
        }

        return elements;
    }

    public static hasReference(sourceFile: ts.SourceFile, identifier: string)
    {
        return sourceFile.getChildren(sourceFile).some(node => this.findReference1(node, sourceFile, identifier));
    }

    // #endregion Public Static Methods (2)

    // #region Private Static Methods (2)

    private static findReference1(node: ts.Node, sourceFile: ts.SourceFile, identifier: string)
    {
        if (ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName) && node.typeName.getText(sourceFile) === identifier)
        {
            return true;
        }
        else if (ts.isNewExpression(node) && ts.isIdentifier(node.expression) && node.expression.getText(sourceFile) === identifier)
        {
            return true;
        }
        else if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.getText(sourceFile) === identifier)
        {
            return true;
        }
        else if (ts.isExpressionWithTypeArguments(node) && ts.isIdentifier(node.expression) && node.expression.getText(sourceFile) === identifier)
        {
            return true;
        }
        else if (ts.isPropertyAccessExpression(node) && ts.isIdentifier(node.expression) && node.expression.getText(sourceFile) === identifier)
        {
            return true;
        }
        else
        {
            for (const childNode of node.getChildren(sourceFile))
            {
                if (this.findReference1(childNode, sourceFile, identifier))
                {
                    return true;
                }
            }
        }

        return false;
    }

    private static traverseSyntaxTree(node: ts.Node, sourceFile: ts.SourceFile, configuration: Configuration)
    {
        let elements: ElementNode[] = [];

        if (ts.isImportDeclaration(node))
        {
            // import
            elements.push(new ImportNode(sourceFile, node));
        }
        else if (ts.isTypeAliasDeclaration(node))
        {
            // type
            elements.push(new TypeAliasNode(sourceFile, node, configuration.types.members.treatArrowFunctionPropertiesAsMethods));
        }
        else if (ts.isInterfaceDeclaration(node))
        {
            // interface
            elements.push(new InterfaceNode(sourceFile, node, configuration.interfaces.members.treatArrowFunctionPropertiesAsMethods));
        }
        else if (ts.isClassDeclaration(node))
        {
            // class
            elements.push(new ClassNode(sourceFile, node, configuration.classes.members.treatArrowFunctionPropertiesAsMethods));
        }
        else if (ts.isEnumDeclaration(node))
        {
            // enum
            elements.push(new EnumNode(sourceFile, node));
        }
        else if (ts.isFunctionDeclaration(node))
        {
            // function
            elements.push(new FunctionNode(sourceFile, node));
        }
        else if (ts.isVariableStatement(node))
        {
            // variable
            elements.push(new VariableNode(sourceFile, node));
        }
        else if (ts.isExpression(node))
        {
            // expression
            elements.push(new ExpressionNode(sourceFile, node));
        }
        else
        {
            // traverse children ast nodes
            for (let childNode of node.getChildren(sourceFile))
            {
                elements = elements.concat(this.traverseSyntaxTree(childNode, sourceFile, configuration));
            }
        }

        return elements;
    }

    // #endregion Private Static Methods (2)
}
