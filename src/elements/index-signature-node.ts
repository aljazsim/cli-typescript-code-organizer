import * as ts from "typescript";

import { ElementNode } from "./element-node";
import { WriteModifier } from "../enums/write-modifier";

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

        this._fullStart = indexSignatureDeclaration.getFullStart();
        this._end = indexSignatureDeclaration.getEnd();
        this._start = indexSignatureDeclaration.getStart(sourceFile, false);

        this._accessModifier = this.getAccessModifier(indexSignatureDeclaration);
        this._decorators = this.getDecorators(indexSignatureDeclaration, sourceFile);

        this.writeMode = this.getWriteMode(indexSignatureDeclaration);
    }

    // #endregion Constructors (1)
}
