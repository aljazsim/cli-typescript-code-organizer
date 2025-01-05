import { AccessModifier } from "../enums/access-modifier";
import { getAccessModifier, getDecorators, getIsAbstract, getIsStatic } from "../helpers/node-helper";
import { ElementNode } from "./element-node";
import * as ts from "typescript";

export class AccessorNode extends ElementNode
{
    // #region Properties (6)

    public readonly accessModifier: AccessModifier | null;
    public readonly decorators: string[];
    public readonly hasLeadingComment: boolean;
    public readonly isAbstract: boolean;
    public readonly isStatic: boolean;
    public readonly name: string;

    // #endregion Properties (6)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, accessorDeclaration: ts.AccessorDeclaration | ts.AutoAccessorPropertyDeclaration)
    {
        super(sourceFile, accessorDeclaration);

        this.name = (<ts.Identifier>accessorDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(accessorDeclaration.name.pos, accessorDeclaration.name.end).trim();

        this.accessModifier = getAccessModifier(accessorDeclaration);
        this.decorators = getDecorators(accessorDeclaration, sourceFile);

        this.isAbstract = getIsAbstract(accessorDeclaration);
        this.isStatic = getIsStatic(accessorDeclaration);

        this.hasLeadingComment = this.getHasLeadingComment(accessorDeclaration, sourceFile);
    }

    // #endregion Constructors (1)

    // #region Private Methods (1)

    private getHasLeadingComment(accessorDeclaration: ts.AccessorDeclaration | ts.AutoAccessorPropertyDeclaration, sourceFile: ts.SourceFile): any
    {
        return ts.getLeadingCommentRanges(accessorDeclaration.getFullText(sourceFile), 0) !== undefined;
    }

    // #endregion Private Methods (1)
}
