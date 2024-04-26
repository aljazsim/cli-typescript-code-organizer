import { ElementNode } from "./element-node";
import * as ts from "typescript";

export class TypeAliasNode extends ElementNode
{
  // #region Constructors (1)

  constructor(sourceFile: ts.SourceFile, typeAliasDeclaration: ts.TypeAliasDeclaration)
  {
    super(typeAliasDeclaration);

    this._name = (<ts.Identifier>typeAliasDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(typeAliasDeclaration.name.pos, typeAliasDeclaration.name.end).trim();

    this._fullStart = typeAliasDeclaration.getFullStart();
    this._end = typeAliasDeclaration.getEnd();
    this._start = typeAliasDeclaration.getStart(sourceFile, false);
    this._decorators = this.getDecorators(typeAliasDeclaration, sourceFile);
  }

  // #endregion Constructors (1)
}
