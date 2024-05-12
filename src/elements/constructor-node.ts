import * as ts from "typescript";

import { ElementNode } from "./element-node";
import { getDecorators } from "../helpers/node-helper";

export class ConstructorNode extends ElementNode
{
    // #region Properties (1)

    public readonly decorators: string[];

    // #endregion Properties (1)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, constructorDeclaration: ts.ConstructorDeclaration)
    {
        super(sourceFile, constructorDeclaration);

        this._name = "constructor";
        this.decorators = getDecorators(constructorDeclaration, sourceFile);
    }

    // #endregion Constructors (1)
}
