import { ElementNode } from "./element-node";
import * as ts from "typescript";

export class GetterNode extends ElementNode
{
    // #region Properties (2)

    public readonly isAbstract: boolean;
    public readonly isStatic: boolean;

    // #endregion Properties (2)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, getterDeclaration: ts.GetAccessorDeclaration)
    {
        super(sourceFile, getterDeclaration);

        this._name = (<ts.Identifier>getterDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(getterDeclaration.name.pos, getterDeclaration.name.end).trim();
        this._fullStart = getterDeclaration.getFullStart();
        this._end = getterDeclaration.getEnd();
        this._start = getterDeclaration.getStart(sourceFile, false);

        this._accessModifier = this.getAccessModifier(getterDeclaration);
        this._decorators = this.getDecorators(getterDeclaration, sourceFile);

        this.isAbstract = this.getIsAbstract(getterDeclaration);
        this.isStatic = this.getIsStatic(getterDeclaration);
    }

    // #endregion Constructors (1)
}
