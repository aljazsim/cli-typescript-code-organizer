import { ElementNode } from "./element-node.js";
import * as ts from "typescript";

export class MethodSignatureNode extends ElementNode
{
    // #region Properties (1)

    public readonly name: string;

    // #endregion Properties (1)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, methodSignatureDeclaration: ts.MethodSignature)
    {
        super(sourceFile, methodSignatureDeclaration);

        this.name = (<ts.Identifier>methodSignatureDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(methodSignatureDeclaration.name.pos, methodSignatureDeclaration.name.end).trim();
    }

    // #endregion Constructors (1)
}
