import * as ts from "typescript";

import { ElementNode } from "./element-node";

export class ConstructorNode extends ElementNode
{
    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, constructorDeclaration: ts.ConstructorDeclaration)
    {
        super(sourceFile, constructorDeclaration);

        this._name = "constructor";

        this._fullStart = constructorDeclaration.getFullStart();
        this._end = constructorDeclaration.getEnd();
        this._start = constructorDeclaration.getStart(sourceFile, false);

        this._decorators = this.getDecorators(constructorDeclaration, sourceFile);
    }

    // #endregion Constructors (1)
}
