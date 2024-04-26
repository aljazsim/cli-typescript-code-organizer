import { ElementNode } from "./element-node";
import * as ts from "typescript";

export class SetterNode extends ElementNode
{
  // #region Properties (2)

  public readonly isAbstract: boolean;
  public readonly isStatic: boolean;

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(sourceFile: ts.SourceFile, setterDeclaration: ts.SetAccessorDeclaration)
  {
    super(setterDeclaration);

    this._name = (<ts.Identifier>setterDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(setterDeclaration.name.pos, setterDeclaration.name.end);

    this._fullStart = setterDeclaration.getFullStart();
    this._end = setterDeclaration.getEnd();
    this._start = setterDeclaration.getStart(sourceFile, false);

    this._accessModifier = this.getAccessModifier(setterDeclaration);
    this._decorators = this.getDecorators(setterDeclaration, sourceFile);

    this.isAbstract = this.getIsAbstract(setterDeclaration);
    this.isStatic = this.getIsStatic(setterDeclaration);
  }

  // #endregion Constructors (1)
}
