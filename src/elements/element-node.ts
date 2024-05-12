import * as ts from "typescript";

export abstract class ElementNode
{
    // #region Properties (2)

    public abstract readonly name: string;
    public readonly sourceCode: string;

    // #endregion Properties (2)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, public readonly node: ts.Node)
    {
        this.sourceCode = ElementNode.getSourceCode(sourceFile, node.getFullStart(), node.getEnd());
    }

    // #endregion Constructors (1)

    // #region Private Static Methods (1)

    private static getSourceCode(sourceFile: ts.SourceFile, start: number, end: number)
    {
        let text = sourceFile.getFullText().substring(start, end);

        while (text.startsWith("\r") || text.startsWith("\n"))
        {
            text = text.substring(1);
        }

        return text.trimEnd();
    }

    // #endregion Private Static Methods (1)
}
