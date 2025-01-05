import * as ts from "typescript";

import { ElementNode } from "./element-node";
import { WriteModifier } from "../enums/write-modifier";
import { getWriteMode } from "../helpers/node-helper";

export class IndexSignatureNode extends ElementNode
{
    // #region Properties (3)

    public readonly hasLeadingComment: boolean;
    public readonly name: string;
    public readonly writeMode: WriteModifier;

    // #endregion Properties (3)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, indexSignatureDeclaration: ts.IndexSignatureDeclaration)
    {
        super(sourceFile, indexSignatureDeclaration);

        this.name = "index";

        this.writeMode = getWriteMode(indexSignatureDeclaration);
        this.hasLeadingComment = this.getHasLeadingComment(indexSignatureDeclaration, sourceFile);
    }

    // #endregion Constructors (1)

    // #region Private Methods (1)

    private getHasLeadingComment(indexSignatureDeclaration: ts.IndexSignatureDeclaration, sourceFile: ts.SourceFile): any
    {
        return ts.getLeadingCommentRanges(indexSignatureDeclaration.getFullText(sourceFile), 0) !== undefined;
    }

    // #endregion Private Methods (1)
}
