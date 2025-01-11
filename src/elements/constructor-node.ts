import { ElementNode } from "src/elements/element-node.js";
import { getDecorators } from "src/helpers/node-helper.js";
import * as ts from "typescript";




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
