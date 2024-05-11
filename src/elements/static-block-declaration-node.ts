import * as ts from "typescript";

import { ElementNode } from "./element-node";

export class StaticBlockDeclarationNode extends ElementNode
{
    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, staticBlockDeclaration: ts.ClassStaticBlockDeclaration)
    {
        super(sourceFile, staticBlockDeclaration);

        this._name = "";

        this._fullStart = staticBlockDeclaration.getFullStart();
        this._end = staticBlockDeclaration.getEnd();
        this._start = staticBlockDeclaration.getStart(sourceFile, false);
    }

    // #endregion Constructors (1)
}
