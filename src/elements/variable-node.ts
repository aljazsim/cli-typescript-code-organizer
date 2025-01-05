import * as ts from "typescript";

import { ElementNode } from "./element-node";
import { getIsExport } from "../helpers/node-helper";

export class VariableNode extends ElementNode
{
    // #region Properties (5)

    public readonly hasLeadingComment: boolean;
    public readonly isArrowFunction: boolean;
    public readonly isConst: boolean;
    public readonly isExport: boolean;
    public readonly name: string;

    // #endregion Properties (5)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, variableStatement: ts.VariableStatement)
    {
        super(sourceFile, variableStatement);

        this.name = variableStatement.declarationList.declarations.map(d => (<ts.Identifier>d.name).escapedText.toString()).join(",");

        this.isExport = getIsExport(variableStatement);
        this.isArrowFunction = this.getIsArrowFunction(variableStatement);

        // HACK: can't find a way to do this with AST
        const sourceCode = variableStatement.getText(sourceFile).trim();

        this.isConst = sourceCode.startsWith("const ") || sourceCode.startsWith("export const ");
        this.hasLeadingComment = this.getHasLeadingComment(variableStatement, sourceFile);
    }

    // #endregion Constructors (1)

    // #region Private Methods (2)

    private getHasLeadingComment(variableStatement: ts.VariableStatement, sourceFile: ts.SourceFile): any
    {
        return ts.getLeadingCommentRanges(variableStatement.getFullText(sourceFile), 0) !== undefined;
    }

    private getIsArrowFunction(variableStatement: ts.VariableStatement)
    {
        return variableStatement.declarationList &&
            variableStatement.declarationList.declarations &&
            variableStatement.declarationList.declarations.length === 1 &&
            typeof variableStatement.declarationList.declarations[0].initializer !== "undefined" &&
            variableStatement.declarationList.declarations[0].initializer.kind === ts.SyntaxKind.ArrowFunction;
    }

    // #endregion Private Methods (2)
}
