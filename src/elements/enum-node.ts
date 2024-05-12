import { ElementNode } from "./element-node";
import * as ts from "typescript";

export class EnumNode extends ElementNode
{
    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, enumDeclaration: ts.EnumDeclaration)
    {
        super(sourceFile, enumDeclaration);

        this._name = (<ts.Identifier>enumDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(enumDeclaration.name.pos, enumDeclaration.name.end).trim();
    }

    // #endregion Constructors (1)
}
