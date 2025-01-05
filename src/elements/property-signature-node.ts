import { ElementNode } from "./element-node";
import { WriteModifier } from "../enums/write-modifier";
import * as ts from "typescript";
import { getWriteMode } from "../helpers/node-helper";

export class PropertySignatureNode extends ElementNode
{
    // #region Properties (3)

    public readonly hasLeadingComment: boolean;
    public readonly name: string;
    public readonly writeMode: WriteModifier;

    // #endregion Properties (3)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, propertySignatureDeclaration: ts.PropertySignature)
    {
        super(sourceFile, propertySignatureDeclaration);

        this.name = (<ts.Identifier>propertySignatureDeclaration.name).escapedText.toString();

        this.writeMode = getWriteMode(propertySignatureDeclaration);
        this.hasLeadingComment = this.getHasLeadingComment(propertySignatureDeclaration, sourceFile);
    }

    // #endregion Constructors (1)

    // #region Private Methods (1)

    private getHasLeadingComment(propertySignatureDeclaration: ts.PropertySignature, sourceFile: ts.SourceFile): any
    {
        return ts.getLeadingCommentRanges(propertySignatureDeclaration.getFullText(sourceFile), 0) !== undefined;
    }

    // #endregion Private Methods (1)
}
