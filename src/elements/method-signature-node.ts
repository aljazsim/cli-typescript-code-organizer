import { ElementNode } from "./element-node";
import * as ts from "typescript";

export class MethodSignatureNode extends ElementNode
{
    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, methodSignatureDeclaration: ts.MethodSignature)
    {
        super(sourceFile, methodSignatureDeclaration);

        this._name = (<ts.Identifier>methodSignatureDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(methodSignatureDeclaration.name.pos, methodSignatureDeclaration.name.end).trim();

        this._fullStart = methodSignatureDeclaration.getFullStart();
        this._end = methodSignatureDeclaration.getEnd();
        this._start = methodSignatureDeclaration.getStart(sourceFile, false);
        this._decorators = this.getDecorators(methodSignatureDeclaration, sourceFile);
    }

    // #endregion Constructors (1)
}
