import { AccessModifier } from "../enums/access-modifier";
import { ElementNode } from "./element-node";
import { WriteModifier } from "../enums/write-modifier";
import * as ts from "typescript";
import { getAccessModifier, getDecorators, getIsAbstract, getIsStatic, getWriteMode } from "../helpers/node-helper";

export class PropertyNode extends ElementNode
{
    // #region Properties (7)

    public readonly accessModifier: AccessModifier | null;
    public readonly decorators: string[];
    public readonly isAbstract: boolean;
    public readonly isArrowFunction: boolean;
    public readonly isStatic: boolean;
    public readonly name: string;
    public readonly writeMode: WriteModifier;

    // #endregion Properties (7)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, propertyDeclaration: ts.PropertyDeclaration)
    {
        super(sourceFile, propertyDeclaration);

        this.name = (<ts.Identifier>propertyDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(propertyDeclaration.name.pos, propertyDeclaration.name.end);

        this.accessModifier = getAccessModifier(propertyDeclaration);
        this.decorators = getDecorators(propertyDeclaration, sourceFile);

        if (this.name.startsWith("#"))
        {
            // properties starting with # are private by default!
            this.accessModifier = AccessModifier.private;
        }

        this.isAbstract = getIsAbstract(propertyDeclaration);
        this.isStatic = getIsStatic(propertyDeclaration);
        this.writeMode = getWriteMode(propertyDeclaration);

        this.isArrowFunction = this.getIsArrowFunction(propertyDeclaration);
    }

    // #endregion Constructors (1)

    // #region Private Methods (1)

    private getIsArrowFunction(propertyDeclaration: ts.PropertyDeclaration)
    {
        return typeof propertyDeclaration.initializer !== "undefined" && propertyDeclaration.initializer.kind === ts.SyntaxKind.ArrowFunction;
    }

    // #endregion Private Methods (1)
}
