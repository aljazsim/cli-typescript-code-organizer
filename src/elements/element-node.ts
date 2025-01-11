import * as ts from "typescript";

export abstract class ElementNode
{
    // #region Properties (3)

    public readonly hasLeadingComment: boolean;
    public abstract readonly name: string;
    public readonly sourceCode: string;

    // #endregion Properties

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, public readonly node: ts.Node)
    {
        this.sourceCode = ElementNode.getSourceCode(sourceFile, node.getFullStart(), node.getEnd());
        this.hasLeadingComment = this.getHasLeadingComment(node, sourceFile);
    }

    // #endregion Constructors

    // #region Private Static Methods (1)

    private static getSourceCode(sourceFile: ts.SourceFile, start: number, end: number)
    {
        return sourceFile.getFullText().substring(start, end);
    }

    // #endregion Private Static Methods

    // #region Private Methods (1)

    private getHasLeadingComment(node: ts.Node, sourceFile: ts.SourceFile): any
    {
        return ts.getLeadingCommentRanges(node.getFullText(sourceFile), 0) !== undefined;
    }

    // #endregion Private Methods
}
