import { ElementNode } from "src/elements/element-node.js";
import { WriteModifier } from "src/enums/write-modifier.js";
import { getWriteMode } from "src/helpers/node-helper.js";
import * as ts from "typescript";





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
