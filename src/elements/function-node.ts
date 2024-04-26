import { ElementNode } from "./element-node";
import * as ts from "typescript";

export class FunctionNode extends ElementNode
{
  // #region Properties (1)

  public readonly isExport: boolean;

  // #endregion Properties (1)

  // #region Constructors (1)

  constructor(sourceFile: ts.SourceFile, functionDeclaration: ts.FunctionDeclaration)
  {
    super(functionDeclaration);

    this._name = (<ts.Identifier>functionDeclaration.name).escapedText.toString();

    this._fullStart = functionDeclaration.getFullStart();
    this._end = functionDeclaration.getEnd();
    this._start = functionDeclaration.getStart(sourceFile, false);

    this.isExport = this.getIsExport(functionDeclaration);
    this._decorators = this.getDecorators(functionDeclaration, sourceFile);
  }

  // #endregion Constructors (1)
}
