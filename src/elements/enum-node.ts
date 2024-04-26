import { ElementNode } from "./element-node";
import * as ts from "typescript";

export class EnumNode extends ElementNode
{
  // #region Constructors (1)

  constructor(sourceFile: ts.SourceFile, enumDeclaration: ts.EnumDeclaration)
  {
    super(enumDeclaration);

    this._name = (<ts.Identifier>enumDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(enumDeclaration.name.pos, enumDeclaration.name.end).trim();

    this._fullStart = enumDeclaration.getFullStart();
    this._end = enumDeclaration.getEnd();
    this._start = enumDeclaration.getStart(sourceFile, false);

    this._decorators = this.getDecorators(enumDeclaration, sourceFile);
  }

  // #endregion Constructors (1)
}
