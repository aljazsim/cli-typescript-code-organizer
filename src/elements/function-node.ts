import { getIsExport } from "../helpers/node-helper";
import { ElementNode } from "./element-node";
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
