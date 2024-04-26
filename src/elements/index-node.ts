import * as ts from "typescript";

import { ElementNode } from "./element-node";
import { WriteModifier } from "./write-modifier";

export class IndexNode extends ElementNode
{
  // #region Properties (3)

  public readonly isAbstract: boolean;
  public readonly isStatic: boolean;
  public readonly writeMode: WriteModifier;

  // #endregion Properties (3)

  // #region Constructors (1)

  constructor(sourceFile: ts.SourceFile, indexDeclaration: ts.IndexedAccessTypeNode)
  {
    super(indexDeclaration);

    this._name = "index";

    this._fullStart = indexDeclaration.getFullStart();
    this._end = indexDeclaration.getEnd();
    this._start = indexDeclaration.getStart(sourceFile, false);

    this._accessModifier = null;
    this._decorators = this.getDecorators(indexDeclaration, sourceFile);

    this.isAbstract = this.getIsAbstract(indexDeclaration);
    this.isStatic = this.getIsStatic(indexDeclaration);
    this.writeMode = this.getWriteMode(indexDeclaration);
  }

  // #endregion Constructors (1)
}
