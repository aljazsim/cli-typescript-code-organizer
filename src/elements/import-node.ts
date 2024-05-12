import * as ts from "typescript";

import { ElementNode } from "./element-node";

export class ImportNode extends ElementNode
{
    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, importDeclaration: ts.ImportDeclaration)
    {
        super(sourceFile, importDeclaration);

        this._name = "import";
    }

    // #endregion Constructors (1)
} 
