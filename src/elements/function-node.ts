import { getIsExport } from "../helpers/node-helper";
import { ElementNode } from "./element-node";
import * as ts from "typescript";

export class FunctionNode extends ElementNode
{
    // #region Properties (1)

    public readonly isExport: boolean;

    // #endregion Properties (1)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, functionDeclaration: ts.FunctionDeclaration)
    {
        super(sourceFile, functionDeclaration);

        this._name = (<ts.Identifier>functionDeclaration.name).escapedText.toString();

        this.isExport = getIsExport(functionDeclaration);
    }

    // #endregion Constructors (1)
}
