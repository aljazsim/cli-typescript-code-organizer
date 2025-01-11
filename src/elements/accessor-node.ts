


import { ElementNode } from "src/elements/element-node.js";
import { AccessModifier } from "src/enums/access-modifier.js";
import { getAccessModifier, getDecorators, getIsAbstract, getIsStatic } from "src/helpers/node-helper.js";
import ts from "typescript";

export class AccessorNode extends ElementNode
{
    // #region Properties (5)

    public readonly accessModifier: AccessModifier | null;
    public readonly decorators: string[];
    public readonly isAbstract: boolean;
    public readonly isStatic: boolean;
    public readonly name: string;

    // #endregion Properties (5)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, accessorDeclaration: ts.AccessorDeclaration | ts.AutoAccessorPropertyDeclaration)
    {
        super(sourceFile, accessorDeclaration);

        this.name = (<ts.Identifier>accessorDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(accessorDeclaration.name.pos, accessorDeclaration.name.end).trim();

        this.accessModifier = getAccessModifier(accessorDeclaration);
        this.decorators = getDecorators(accessorDeclaration, sourceFile);

        this.isAbstract = getIsAbstract(accessorDeclaration);
        this.isStatic = getIsStatic(accessorDeclaration);
    }

    // #endregion Constructors (1)
}
