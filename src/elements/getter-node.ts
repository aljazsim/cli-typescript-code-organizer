import { AccessModifier } from "../enums/access-modifier";
import { getAccessModifier, getDecorators, getIsAbstract, getIsStatic } from "../helpers/node-helper";
import { ElementNode } from "./element-node";
import * as ts from "typescript";

export class GetterNode extends ElementNode
{
    // #region Properties (4)

    public readonly accessModifier: AccessModifier | null;
    public readonly decorators: string[];
    public readonly isAbstract: boolean;
    public readonly isStatic: boolean;

    // #endregion Properties (4)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, getterDeclaration: ts.GetAccessorDeclaration)
    {
        super(sourceFile, getterDeclaration);

        this._name = (<ts.Identifier>getterDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(getterDeclaration.name.pos, getterDeclaration.name.end).trim();

        this.accessModifier = getAccessModifier(getterDeclaration);
        this.decorators = getDecorators(getterDeclaration, sourceFile);

        this.isAbstract = getIsAbstract(getterDeclaration);
        this.isStatic = getIsStatic(getterDeclaration);
    }

    // #endregion Constructors (1)
}
