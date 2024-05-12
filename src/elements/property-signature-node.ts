import { ElementNode } from "./element-node";
import { WriteModifier } from "../enums/write-modifier";
import * as ts from "typescript";
import { getWriteMode } from "../helpers/node-helper";

export class PropertySignatureNode extends ElementNode
{
    // #region Properties (1)

    public readonly writeMode: WriteModifier;

    // #endregion Properties (1)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, propertySignatureDeclaration: ts.PropertySignature)
    {
        super(sourceFile, propertySignatureDeclaration);

        this._name = (<ts.Identifier>propertySignatureDeclaration.name).escapedText.toString();

        this.writeMode = getWriteMode(propertySignatureDeclaration);
    }

    // #endregion Constructors (1)
}
