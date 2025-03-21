import * as ts from "typescript";

import { AccessModifier } from "../enums/access-modifier.js";
import { WriteModifier } from "../enums/write-modifier.js";
import { getAccessModifier, getDecorators, getDependencies, getIsAbstract, getIsArrowFunction, getIsStatic, getWriteMode } from "../helpers/node-helper.js";
import { ElementNode } from "./element-node.js";

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

    // #endregion Properties

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

        this.isArrowFunction = getIsArrowFunction(propertyDeclaration);

        if (propertyDeclaration.initializer)
        {
            for (const dependency of getDependencies(sourceFile, propertyDeclaration.initializer, []))
            {
                this.dependencies.push(dependency);
            }
        }
    }

    // #endregion Constructors
}
