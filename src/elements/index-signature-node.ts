import * as ts from "typescript";

import { ElementNode } from "./element-node.js";
import { WriteModifier } from "../enums/write-modifier.js";
import { getWriteMode } from "../helpers/node-helper.js";

export class IndexSignatureNode extends ElementNode
{
    // #region Properties (2)

    public readonly name: string;
    public readonly writeMode: WriteModifier;

    // #endregion Properties (2)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, indexSignatureDeclaration: ts.IndexSignatureDeclaration)
    {
        super(sourceFile, indexSignatureDeclaration);

        this.name = "index";

        this.writeMode = getWriteMode(indexSignatureDeclaration);
    }

    // #endregion Constructors (1)
}
