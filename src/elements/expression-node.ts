import * as ts from "typescript";

import { ElementNode } from "./element-node";

export class ExpressionNode extends ElementNode
{
    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, expression: ts.Expression)
    {
        super(sourceFile, expression);

        this._name = "";
    }

    // #endregion Constructors (1)
}
