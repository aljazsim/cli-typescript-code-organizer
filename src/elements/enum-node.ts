
import { ElementNode } from "src/elements/element-node.js";
import * as ts from "typescript";

export class EnumNode extends ElementNode
{
    // #region Properties (1)

    public readonly name: string;

    // #endregion Properties (1)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, enumDeclaration: ts.EnumDeclaration)
    {
        super(sourceFile, enumDeclaration);

        this.name = (<ts.Identifier>enumDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(enumDeclaration.name.pos, enumDeclaration.name.end).trim();
    }

    // #endregion Constructors (1)
}
