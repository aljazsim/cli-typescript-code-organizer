import * as ts from "typescript";

import { getLeadingComment, getTrailingComment } from "../helpers/node-helper.js";

export abstract class ElementNode
{
    // #region Properties (5)

    public readonly dependencies: string[] = [];
    public readonly leadingComment: string | null;
    public abstract readonly name: string;
    public readonly sourceCode: string;
    public readonly trailingComment: string | null;
    public readonly indentation: string = "";

    // #endregion Properties

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, public readonly node: ts.Node, leadingComment: string | null = null, trailingComment: string | null = null)
    {
        this.indentation = this.getIndentation(sourceFile, node);

        this.leadingComment = leadingComment ?? getLeadingComment(node, sourceFile);
        this.trailingComment = trailingComment ?? getTrailingComment(node, sourceFile);

        this.sourceCode = node.getText(sourceFile).trim();
        this.sourceCode = this.sourceCode.replace(leadingComment ?? "", "");
        this.sourceCode = this.sourceCode.replace(trailingComment ?? "", "");
        this.sourceCode = this.indentation + this.sourceCode.trim();
    }

    // #endregion Constructors

    // #region Private Static Methods (1)


    // #endregion Private Static Methods
    private getIndentation(sourceFile: ts.SourceFile, node: ts.Node)
    {
        const space = " ";
        const tab = "\t";
        const sourceCode = sourceFile.getText();
        let indentation = "";

        for (let i = node.getStart(sourceFile) - 1; i > 0; i--)
        {
            if (sourceCode[i] === space || sourceCode[i] === tab)
            {
                indentation = sourceCode[i] + indentation;
            }
            else
            {
                break;
            }

        }

        return indentation;
    }

    protected getOpeningBraceIndex(sourceFile: ts.SourceFile, node: ts.ClassDeclaration | ts.InterfaceDeclaration | ts.TypeLiteralNode)
    {
        const openingBrace = "{";
        const sourceCode = sourceFile.getText();
        let startIndex = node.getStart(sourceFile);

        if (ts.isClassDeclaration(node))
        {
            // class could start with a decorator containing curly braces
            startIndex = sourceCode.indexOf("class ", startIndex);
        }

        for (let i = startIndex; i < node.getEnd(); i++)
        {
            if (sourceCode[i] === openingBrace)
            {
                return i
            }
        }

        throw new Error("Opening brace not found");
    }

    protected getClosingBraceIndex(sourceFile: ts.SourceFile, node: ts.ClassDeclaration | ts.InterfaceDeclaration | ts.TypeLiteralNode)
    {
        const closingBrace = "}";
        const sourceCode = sourceFile.getText();

        for (let i = node.getEnd(); i > node.getStart(sourceFile); i--)
        {
            if (sourceCode[i] === closingBrace)
            {
                return i
            }
        }

        throw new Error("Closing brace not found");
    }
}

