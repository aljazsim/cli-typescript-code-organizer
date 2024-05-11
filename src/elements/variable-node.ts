import * as ts from "typescript";

import { ElementNode } from "./element-node";
import { WriteModifier } from "../enums/write-modifier";

export class VariableNode extends ElementNode
{
    // #region Properties (3)

    public readonly isArrowFunction: boolean;
    public readonly isConst: boolean;
    public readonly isExport: boolean;

    // #endregion Properties (3)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, variableStatement: ts.VariableStatement)
    {
        super(sourceFile, variableStatement);

        this._name = variableStatement.declarationList.declarations.map(d => (<ts.Identifier>d.name).escapedText.toString()).join(",");

        this._fullStart = variableStatement.getFullStart();
        this._end = variableStatement.getEnd();
        this._start = variableStatement.getStart(sourceFile, false);

        this.isExport = this.getIsExport(variableStatement);
        this.isArrowFunction = this.getIsArrowFunction(variableStatement);

        // HACK: can't find a way to do this with AST
        const sourceCode = variableStatement.getText(sourceFile).trim();

        this.isConst = sourceCode.startsWith("const ") || sourceCode.startsWith("export const ");
    }

    // #endregion Constructors (1)

    // #region Private Methods (1)

    private getIsArrowFunction(variableStatement: ts.VariableStatement)
    {
        return variableStatement.declarationList &&
            variableStatement.declarationList.declarations &&
            variableStatement.declarationList.declarations.length === 1 &&
            typeof variableStatement.declarationList.declarations[0].initializer !== "undefined" &&
            variableStatement.declarationList.declarations[0].initializer.kind === ts.SyntaxKind.ArrowFunction;
    }

    // #endregion Private Methods (1)
}
