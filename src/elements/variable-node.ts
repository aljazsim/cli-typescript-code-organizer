import * as ts from "typescript";

import { getDependencies, getIsArrowFunction } from "../helpers/node-helper.js";
import { ElementNode } from "./element-node.js";

export class VariableNode extends ElementNode
{
    // #region Properties (2)

    public readonly isArrowFunction: boolean = false;
    public readonly name: string;

    // #endregion Properties

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, variableDeclaration: ts.VariableDeclaration, public readonly isExport: boolean, public readonly isConst: boolean, public readonly isDeclaration: boolean, leadingComment: string | null, trailingComment: string | null)
    {
        super(sourceFile, variableDeclaration, leadingComment, trailingComment);

        this.name = (<ts.Identifier>variableDeclaration.name).escapedText?.toString() ?? sourceFile.getFullText().substring(variableDeclaration.name.pos, variableDeclaration.name.end).trim();

        this.isArrowFunction = getIsArrowFunction(variableDeclaration);

        if (variableDeclaration.initializer)
        {
            for (const dependency of getDependencies(sourceFile, variableDeclaration.initializer, []))
            {
                this.dependencies.push(dependency);
            }
        }
    }

    // #endregion Constructors
}
