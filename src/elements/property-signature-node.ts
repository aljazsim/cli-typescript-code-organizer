import { ElementNode } from "./element-node";
import { WriteModifier } from "../enums/write-modifier";
import * as ts from "typescript";

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

        this._fullStart = propertySignatureDeclaration.getFullStart();
        this._end = propertySignatureDeclaration.getEnd();
        this._start = propertySignatureDeclaration.getStart(sourceFile, false);

        this._accessModifier = this.getAccessModifier(propertySignatureDeclaration);
        this._decorators = this.getDecorators(propertySignatureDeclaration, sourceFile);

        this.writeMode = this.getWriteMode(propertySignatureDeclaration);
    }

    // #endregion Constructors (1)
}
