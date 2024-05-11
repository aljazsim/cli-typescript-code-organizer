import * as ts from "typescript";

import { AccessModifier } from "../enums/access-modifier";
import { PropertyNode } from "./property-node";
import { PropertySignatureNode } from "./property-signature-node";
import { SourceCode } from "../source-code/source-code";
import { WriteModifier } from "../enums/write-modifier";

export abstract class ElementNode
{
    // #region Properties (7)

    protected _accessModifier: AccessModifier | null = null;
    protected _decorators: string[] = [];
    protected _end: number = 0;
    protected _fullStart: number = 0;
    protected _name: string = "";
    protected _start: number = 0;

    public readonly sourceCode: string;

    // #endregion Properties (7)

    // #region Constructors (1)

    constructor(private readonly sourceFile: ts.SourceFile, public readonly node: ts.Node)
    {
        this.sourceCode = ElementNode.getSourceCode(sourceFile, node.getFullStart(), node.getEnd());
    }

    // #endregion Constructors (1)

    // #region Public Getters And Setters (7)

    public get accessModifier()
    {
        return this._accessModifier;
    }

    public get decorators()
    {
        return this._decorators;
    }

    public get decoratorsWithoutParameters()
    {
        return this.decorators.map(d => d.replace(/\(.*\)/, ""));
    }

    public get end()
    {
        return this._end;
    }

    public get fullStart()
    {
        return this._fullStart;
    }

    public get name()
    {
        return this._name;
    }

    public get start()
    {
        return this._start;
    }

    // #endregion Public Getters And Setters (7)

    // #region Public Methods (1)

    public getSubString(start: number, end: number)
    {
        return this.sourceFile.getFullText().substring(start, end);
    }

    // #endregion Public Methods (1)

    // #region Protected Methods (15)

    protected getAccessModifier(node: ts.PropertyDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration | ts.MethodDeclaration | ts.PropertySignature | ts.IndexSignatureDeclaration)
    {
        let accessModifier: AccessModifier | null = null;
        let accessModifiers: ts.SyntaxKind[] = [ts.SyntaxKind.PrivateKeyword, ts.SyntaxKind.ProtectedKeyword, ts.SyntaxKind.PublicKeyword];
        let nodeAccessModifier: ts.Modifier | ts.ModifierLike | undefined;

        if (node.modifiers &&
            node.modifiers.length > 0)
        {
            nodeAccessModifier = node.modifiers.find((x) => accessModifiers.indexOf(x.kind) > -1);

            if (nodeAccessModifier)
            {
                if (nodeAccessModifier.kind === ts.SyntaxKind.PublicKeyword)
                {
                    accessModifier = AccessModifier.public;
                }
                else if (nodeAccessModifier.kind === ts.SyntaxKind.ProtectedKeyword)
                {
                    accessModifier = AccessModifier.protected;
                }
                else if (nodeAccessModifier.kind === ts.SyntaxKind.PrivateKeyword)
                {
                    accessModifier = AccessModifier.private;
                }
            }
        }

        return accessModifier;
    }

    protected getDecorators(node: ts.ClassDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration | ts.PropertyDeclaration | ts.MethodDeclaration | ts.IndexedAccessTypeNode | ts.ConstructorDeclaration | ts.EnumDeclaration | ts.FunctionDeclaration | ts.IndexSignatureDeclaration | ts.MethodSignature | ts.PropertySignature | ts.TypeAliasDeclaration, sourceFile: ts.SourceFile)
    {
        return this.getModifiers(node).filter(m => ts.isDecorator(m)).map(x => (x as ts.Decorator).getText(sourceFile).trim()) ?? [];
    }

    protected getIsAbstract(node: ts.ClassDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration | ts.PropertyDeclaration | ts.MethodDeclaration | ts.IndexedAccessTypeNode)
    {
        return this.getModifiers(node).find((x) => x.kind === ts.SyntaxKind.AbstractKeyword) !== undefined;
    }

    protected getIsAsync(node: ts.MethodDeclaration | ts.PropertyDeclaration)
    {
        return this.getModifiers(node).find((x) => x.kind === ts.SyntaxKind.AsyncKeyword) !== undefined;
    }

    protected getIsExport(node: ts.ClassDeclaration | ts.FunctionDeclaration | ts.VariableStatement)
    {
        let isExport = false;

        if (node.modifiers &&
            node.modifiers.length > 0)
        {
            let tmp = node.modifiers.find((modifier, index, array) => modifier.kind === ts.SyntaxKind.ExportKeyword);

            if (tmp &&
                tmp.kind === ts.SyntaxKind.ExportKeyword)
            {
                isExport = true;
            }
        }

        return isExport;
    }

    protected getIsStatic(node: ts.ClassDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration | ts.PropertyDeclaration | ts.MethodDeclaration | ts.IndexedAccessTypeNode)
    {
        return this.getModifiers(node).find((x) => x.kind === ts.SyntaxKind.StaticKeyword) !== undefined;
    }

    protected getModifiers(node: ts.ClassDeclaration | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration | ts.PropertyDeclaration | ts.MethodDeclaration | ts.IndexedAccessTypeNode | ts.ConstructorDeclaration | ts.EnumDeclaration | ts.FunctionDeclaration | ts.IndexSignatureDeclaration | ts.MethodSignature | ts.PropertySignature | ts.TypeAliasDeclaration | ts.VariableStatement)
    {
        let modifiers: ts.NodeArray<ts.ModifierLike> | undefined;

        if (ts.isClassDeclaration(node))
        {
            modifiers = (node as ts.ClassDeclaration).modifiers;
        }
        else if (ts.isGetAccessorDeclaration(node))
        {
            modifiers = (node as ts.GetAccessorDeclaration).modifiers;
        }
        else if (ts.isSetAccessorDeclaration(node))
        {
            modifiers = (node as ts.SetAccessorDeclaration).modifiers;
        }
        else if (ts.isPropertyDeclaration(node))
        {
            modifiers = (node as ts.PropertyDeclaration).modifiers;
        }
        else if (ts.isMethodDeclaration(node))
        {
            modifiers = (node as ts.MethodDeclaration).modifiers;
        }
        else if (ts.isIndexedAccessTypeNode(node))
        {
            // no modifiers
        }
        else if (ts.isConstructorDeclaration(node))
        {
            modifiers = (node as ts.ConstructorDeclaration).modifiers;
        }
        else if (ts.isEnumDeclaration(node))
        {
            modifiers = (node as ts.EnumDeclaration).modifiers;
        }
        else if (ts.isFunctionDeclaration(node))
        {
            modifiers = (node as ts.FunctionDeclaration).modifiers;
        }
        else if (ts.isIndexSignatureDeclaration(node))
        {
            modifiers = (node as ts.IndexSignatureDeclaration).modifiers;
        }
        else if (ts.isMethodSignature(node))
        {
            modifiers = (node as ts.MethodSignature).modifiers;
        }
        else if (ts.isPropertySignature(node))
        {
            modifiers = (node as ts.PropertySignature).modifiers;
        }
        else if (ts.isTypeAliasDeclaration(node))
        {
            modifiers = (node as ts.TypeAliasDeclaration).modifiers;
        }
        else if (ts.isVariableStatement(node))
        {
            modifiers = (node as ts.VariableStatement).modifiers;
        }

        return modifiers ?? [];
    }

    protected getName(node: ElementNode, groupWithDecorators: boolean): string
    {
        if (groupWithDecorators)
        {
            if (node.decorators.length > 0)
            {
                return node.decorators.join(", ") + " " + node.name;
            }
        }

        return node.name;
    }

    protected getWriteMode(node: ts.PropertyDeclaration | ts.VariableStatement | ts.IndexedAccessTypeNode | ts.PropertySignature | ts.IndexSignatureDeclaration)
    {
        let writeMode: WriteModifier = WriteModifier.writable;
        let writeModifiers: ts.SyntaxKind[] = [ts.SyntaxKind.ConstKeyword, ts.SyntaxKind.ReadonlyKeyword];
        let nodeWriteModifier = this.getModifiers(node).find((x) => writeModifiers.indexOf(x.kind) > -1);

        if (nodeWriteModifier)
        {
            if (nodeWriteModifier.kind === ts.SyntaxKind.ConstKeyword)
            {
                writeMode = WriteModifier.const;
            }
            else if (nodeWriteModifier.kind === ts.SyntaxKind.ReadonlyKeyword)
            {
                writeMode = WriteModifier.readOnly;
            }
        }

        return writeMode;
    }

    protected isConstant(x: PropertyNode | PropertySignatureNode)
    {
        return x.writeMode === WriteModifier.const;
    }

    protected isPrivate(x: ElementNode)
    {
        return x.accessModifier === AccessModifier.private;
    }

    protected isProtected(x: ElementNode)
    {
        return x.accessModifier === AccessModifier.protected;
    }

    protected isPublic(x: ElementNode)
    {
        return x.accessModifier === AccessModifier.public || x.accessModifier === null;
    }

    protected isReadOnly(x: PropertyNode | PropertySignatureNode)
    {
        return x.writeMode === WriteModifier.readOnly;
    }

    protected isWritable(x: PropertyNode | PropertySignatureNode)
    {
        return x.writeMode === WriteModifier.writable;
    }

    // #endregion Protected Methods (15)

    // #region Private Static Methods (1)

    private static getSourceCode(sourceFile: ts.SourceFile, start: number, end: number)
    {
        let text = sourceFile.getFullText().substring(start, end);

        while (text.startsWith("\r") || text.startsWith("\n"))
        {
            text = text.substring(1);
        }

        return text.trimEnd();
    }

    // #endregion Private Static Methods (1)
}
