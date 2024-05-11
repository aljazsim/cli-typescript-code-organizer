import { AccessModifier } from "../enums/access-modifier";
import { ElementNode } from "./element-node";
import * as ts from "typescript";

export class MethodNode extends ElementNode
{
    // #region Properties (3)

    public readonly isAbstract: boolean;
    public readonly isAsync: boolean;
    public readonly isStatic: boolean;

    // #endregion Properties (3)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, methodDeclaration: ts.MethodDeclaration | ts.PropertyDeclaration)
    {
        super(sourceFile, methodDeclaration);

        this._name = (<ts.Identifier>methodDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(methodDeclaration.name.pos, methodDeclaration.name.end).trim();

        this._fullStart = methodDeclaration.getFullStart();
        this._end = methodDeclaration.getEnd();
        this._start = methodDeclaration.getStart(sourceFile, false);

        // methods starting with # are private by default!
        this._accessModifier = this.name.startsWith("#") ? AccessModifier.private : this.getAccessModifier(methodDeclaration);
        this._decorators = this.getDecorators(methodDeclaration, sourceFile);

        this.isAbstract = this.getIsAbstract(methodDeclaration);
        this.isStatic = this.getIsStatic(methodDeclaration);
        this.isAsync = this.getIsAsync(methodDeclaration);
    }

    // #endregion Constructors (1)
}
