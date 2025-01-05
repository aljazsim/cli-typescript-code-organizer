import { ElementNode } from "./element-node";
import * as ts from "typescript";

export class MethodSignatureNode extends ElementNode
{
    // #region Properties (2)

    public readonly hasLeadingComment: boolean;
    public readonly name: string;

    // #endregion Properties (2)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, methodSignatureDeclaration: ts.MethodSignature)
    {
        super(sourceFile, methodSignatureDeclaration);

        this.name = (<ts.Identifier>methodSignatureDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(methodSignatureDeclaration.name.pos, methodSignatureDeclaration.name.end).trim();
        this.hasLeadingComment = this.getHasLeadingComment(methodSignatureDeclaration, sourceFile);
    }

    // #endregion Constructors (1)

    // #region Private Methods (1)

    private getHasLeadingComment(methodSignatureDeclaration: ts.MethodSignature, sourceFile: ts.SourceFile): any
    {
        return ts.getLeadingCommentRanges(methodSignatureDeclaration.getFullText(sourceFile), 0) !== undefined;
    }

    // #endregion Private Methods (1)
}
