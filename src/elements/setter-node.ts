import { AccessModifier } from "../enums/access-modifier";
import { getAccessModifier, getDecorators, getIsAbstract, getIsStatic } from "../helpers/node-helper";
import { ElementNode } from "./element-node";
import * as ts from "typescript";

export class SetterNode extends ElementNode
{
    // #region Properties (4)

    public readonly accessModifier: AccessModifier | null;
    public readonly decorators: string[];
    public readonly isAbstract: boolean;
    public readonly isStatic: boolean;

    // #endregion Properties (4)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, setterDeclaration: ts.SetAccessorDeclaration)
    {
        super(sourceFile, setterDeclaration);

        this._name = (<ts.Identifier>setterDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(setterDeclaration.name.pos, setterDeclaration.name.end);

        this.accessModifier = getAccessModifier(setterDeclaration);
        this.decorators = getDecorators(setterDeclaration, sourceFile);

        this.isAbstract = getIsAbstract(setterDeclaration);
        this.isStatic = getIsStatic(setterDeclaration);
    }

    // #endregion Constructors (1)
}
