import * as ts from "typescript";
import { ElementNode } from "./element-node.js";
import { getDecorators } from "../helpers/node-helper.js";




export class ConstructorNode extends ElementNode
{
    // #region Properties (2)

    public readonly decorators: string[];
    public readonly name: string;

    // #endregion Properties (2)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, constructorDeclaration: ts.ConstructorDeclaration)
    {
        super(sourceFile, constructorDeclaration);

        this.name = "constructor";
        this.decorators = getDecorators(constructorDeclaration, sourceFile);
    }

    // #endregion Constructors (1)
}
