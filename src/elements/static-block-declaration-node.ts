import { ElementNode } from "src/elements/element-node.js";
import * as ts from "typescript";



export class StaticBlockDeclarationNode extends ElementNode
{
    // #region Properties (1)

    public readonly name: string;

    // #endregion Properties (1)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, staticBlockDeclaration: ts.ClassStaticBlockDeclaration)
    {
        super(sourceFile, staticBlockDeclaration);

        this.name = "";
    }

    // #endregion Constructors (1)
}
