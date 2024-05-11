import * as ts from "typescript";

import { ElementNode } from "./element-node";

export class ExpressionNode extends ElementNode
{
    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, expression: ts.Expression)
    {
        super(sourceFile, expression);

        this._name = "";

        this._fullStart = expression.getFullStart();
        this._end = expression.getEnd();
        this._start = expression.getStart(sourceFile, false);
    }

    // #endregion Constructors (1)
}
