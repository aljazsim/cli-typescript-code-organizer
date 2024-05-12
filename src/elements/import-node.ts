import * as ts from "typescript";

import { ElementNode } from "./element-node";

export class ImportNode extends ElementNode
{
    // #region Properties (1)

    public readonly name: string;

    // #endregion Properties (1)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, importDeclaration: ts.ImportDeclaration)
    {
        super(sourceFile, importDeclaration);

        this.name = "import";
    }

    // #endregion Constructors (1)
} 
