import * as ts from "typescript";

import { ElementNode } from "./element-node";

export class StaticBlockDeclarationNode extends ElementNode
{
    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, staticBlockDeclaration: ts.ClassStaticBlockDeclaration)
    {
        super(sourceFile, staticBlockDeclaration);

        this._name = "";
    }

    // #endregion Constructors (1)
}
