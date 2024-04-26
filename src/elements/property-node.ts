import { AccessModifier } from "./access-modifier";
import { ElementNode } from "./element-node";
import { WriteModifier } from "./write-modifier";
import * as ts from "typescript";

export class PropertyNode extends ElementNode
{
  // #region Properties (4)

  public readonly isAbstract: boolean;
  public readonly isArrowFunction: boolean;
  public readonly isStatic: boolean;
  public readonly writeMode: WriteModifier;

  // #endregion Properties (4)

  // #region Constructors (1)

  constructor(sourceFile: ts.SourceFile, propertyDeclaration: ts.PropertyDeclaration)
  {
    super(propertyDeclaration);

    this._name = (<ts.Identifier>propertyDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(propertyDeclaration.name.pos, propertyDeclaration.name.end);

    this._fullStart = propertyDeclaration.getFullStart();
    this._end = propertyDeclaration.getEnd();
    this._start = propertyDeclaration.getStart(sourceFile, false);

    this._accessModifier = this.getAccessModifier(propertyDeclaration);
    this._decorators = this.getDecorators(propertyDeclaration, sourceFile);

    if (this.name.startsWith("#"))
    {
      // properties starting with # are private by default!
      this._accessModifier = AccessModifier.private;
    }

    this.isAbstract = this.getIsAbstract(propertyDeclaration);
    this.isStatic = this.getIsStatic(propertyDeclaration);
    this.writeMode = this.getWriteMode(propertyDeclaration);

    this.isArrowFunction = this.getIsArrowFunction(propertyDeclaration);
  }

  // #endregion Constructors (1)

  // #region Private Methods (1)

  private getIsArrowFunction(propertyDeclaration: ts.PropertyDeclaration)
  {
    return typeof propertyDeclaration.initializer !== "undefined" && propertyDeclaration.initializer.kind === ts.SyntaxKind.ArrowFunction;
  }

  // #endregion Private Methods (1)
}
