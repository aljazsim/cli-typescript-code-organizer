import * as ts from "typescript";

import { ElementNode } from "./element-node";

export class VariableNode extends ElementNode
{
    // #region Properties (1)

    public readonly isArrowFunction: boolean;

    // #endregion Properties (1)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, variableStatement: ts.VariableStatement)
    {
        super(variableStatement);

        this._name = "";

        this._fullStart = variableStatement.getFullStart();
        this._end = variableStatement.getEnd();
        this._start = variableStatement.getStart(sourceFile, false);

        this.isArrowFunction = this.getIsArrowFunction(variableStatement);
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
