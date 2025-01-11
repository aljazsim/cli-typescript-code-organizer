


import { ElementNode } from "src/elements/element-node.js";
import { AccessModifier } from "src/enums/access-modifier.js";
import { getAccessModifier, getDecorators, getIsAbstract, getIsStatic } from "src/helpers/node-helper.js";
import * as ts from "typescript";

export class SetterNode extends ElementNode
{
    // #region Properties (5)

    public readonly accessModifier: AccessModifier | null;
    public readonly decorators: string[];
    public readonly isAbstract: boolean;
    public readonly isStatic: boolean;
    public readonly name: string;

    // #endregion Properties (5)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, setterDeclaration: ts.SetAccessorDeclaration)
    {
        super(sourceFile, setterDeclaration);

        this.name = (<ts.Identifier>setterDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(setterDeclaration.name.pos, setterDeclaration.name.end);

        this.accessModifier = getAccessModifier(setterDeclaration);
        this.decorators = getDecorators(setterDeclaration, sourceFile);

        this.isAbstract = getIsAbstract(setterDeclaration);
        this.isStatic = getIsStatic(setterDeclaration);
    }

    // #endregion Constructors (1)
}
