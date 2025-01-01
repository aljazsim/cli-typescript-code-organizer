import * as ts from "typescript";

import { ElementNode } from "./element-node";
import { ImportType } from "../enums/import-type";

export class ImportNode extends ElementNode
{
    // #region Properties (4)

    public readonly imports: string[];
    public readonly name: string;
    public readonly source: string;
    public readonly type: ImportType;

    // #endregion Properties (4)

    // #region Constructors (1)

    constructor(sourceFile: ts.SourceFile, importDeclaration: ts.ImportDeclaration)
    {
        super(sourceFile, importDeclaration);

        this.name = "import";
        this.type = this.getImportType(importDeclaration);
        this.imports = this.getImports(importDeclaration);
        this.source = this.getSource(importDeclaration);
    }

    // #endregion Constructors (1)

    // #region Private Methods (3)

    private getImportType(node: ts.ImportDeclaration): ImportType
    {
        if (node.importClause?.namedBindings)
        {
            if ((ts.isNamespaceImport(node.importClause?.namedBindings)))
            {
                return ImportType.Namespace;
            }
            else if (ts.isNamedImports(node.importClause?.namedBindings))
            {
                return ImportType.Named;
            }
        }

        return ImportType.Unknown;
    }

    private getImports(node: ts.ImportDeclaration)
    {
        if (node.importClause?.namedBindings)
        {
            if ((ts.isNamespaceImport(node.importClause?.namedBindings)))
            {
                return [node.importClause?.namedBindings.name.text];
            }
            else if (ts.isNamedImports(node.importClause?.namedBindings))
            {
                return node.importClause?.namedBindings.elements.map(e => e.name.text);
            }
        }

        return [];
    }

    private getSource(node: ts.ImportDeclaration): string
    {
        return ts.isStringLiteral(node.moduleSpecifier) ? node.moduleSpecifier.text : "";
    }

    // #endregion Private Methods (3)
} 
