import * as ts from "typescript";

import { ElementNode } from "./element-node";
import { WriteModifier } from "../enums/write-modifier";
import { getWriteMode } from "../helpers/node-helper";

export class IndexSignatureNode extends ElementNode
{
    // #region Properties (1)

    public readonly writeMode: WriteModifier;

    // #endregion Properties (1)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, indexSignatureDeclaration: ts.IndexSignatureDeclaration)
    {
        super(sourceFile, indexSignatureDeclaration);

        this._name = "index";

        this.writeMode = getWriteMode(indexSignatureDeclaration);
    }

    // #endregion Constructors (1)
}
