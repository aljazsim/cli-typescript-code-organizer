import { ElementNode } from "./element-node";
import * as ts from "typescript";

export class MethodSignatureNode extends ElementNode
{
    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, methodSignatureDeclaration: ts.MethodSignature)
    {
        super(sourceFile, methodSignatureDeclaration);

        this._name = (<ts.Identifier>methodSignatureDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(methodSignatureDeclaration.name.pos, methodSignatureDeclaration.name.end).trim();
    }

    // #endregion Constructors (1)
}
