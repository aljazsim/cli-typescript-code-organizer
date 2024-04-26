import * as ts from "typescript";

import { ElementNode } from "./element-node";

export class ImportNode extends ElementNode
{
    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, importDeclaration: ts.ImportDeclaration)
    {
        super(importDeclaration);

        this._name = "import";

        this._fullStart = importDeclaration.getFullStart();
        this._end = importDeclaration.getEnd();
        this._start = importDeclaration.getStart(sourceFile, false);
    }

    // #endregion Constructors (1)
} 