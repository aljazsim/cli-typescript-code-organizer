

import { ElementNode } from "src/elements/element-node.js";
import { getIsExport } from "src/helpers/node-helper.js";
import * as ts from "typescript";

export class FunctionNode extends ElementNode
{
    // #region Properties (2)

    public readonly isExport: boolean;
    public readonly name: string;

    // #endregion Properties (2)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, functionDeclaration: ts.FunctionDeclaration)
    {
        super(sourceFile, functionDeclaration);

        this.name = (<ts.Identifier>functionDeclaration.name).escapedText.toString();

        this.isExport = getIsExport(functionDeclaration);
    }

    // #endregion Constructors (1)
}
