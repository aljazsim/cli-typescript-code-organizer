import * as vscode from "vscode";

import util from "node:util";

import "../Extensions/Array.extensions";

import { FileDiagnostic, FileDiagnosticIdentifier } from "../Models/FileDiagnostic";
import { FileSystem } from "../Utils/FileSystem";
import { CSharpSymbol } from "./CSharpSymbol";
import { CSharpSymbolType } from "./CSharpSymbolType";

export class CSharpFile {
    public readonly filePath: string;Only Properties (1)

    public static readonly zeroPosition = new vscode.Position(0, 0);

    // #endregion Public Static ReadOnly Properties

    // #region Public ReadOnly Properties (5)

    public readonly type = CSharpSymbolType.file;
    public readonly parent = undefined;
    public readonly namespace = undefined;
    public readonly name: string;
    readonly filePath: string;

    // #endregion Public ReadOnly Properties

    // #region Public Properties (1)

    public children: CSharpSymbol[] = [];

    // #endregion Public Properties

    // #region Constructors (1)

    private constructor(readonly textDocument: vscode.TextDocument) {
        this.filePath = vscode.workspace.asRelativePath(textDocument.uri);
        this.name = FileSystem.fileNameUsingTextDocument(textDocument);
        this.textDocument = textDocument;
    }

    // #endregion Constructors

    // #region Public Getters And Setters (2)

    public get text(): string {
        return this.hasChildren ? CSharpSymbol.join(this.children) : "";
    }

    public get hasChildren(): boolean { return this.children.length > 0; }

    // #endregion Public Getters And Setters

    // #region Public Static Methods (2)

    public static async removeUnusedUsings(textEditor: vscode.TextEditor, fileDiagnostics: FileDiagnostic[]): Promise<number> {
        const unusedUsings = fileDiagnostics.filter(d => d.identifier === FileDiagnosticIdentifier.usingDirectiveUnnecessary);
        if (unusedUsings.length === 0) return 0;

        const edits = unusedUsings.sort((a, b) => {
            return (a.range.start.line === b.range.start.line) ? b.range.start.character - a.range.start.character : b.range.start.line - a.range.start.line;
        }).map(d => {
            const whitespaceRange = new vscode.Range(d.range.end, new vscode.Position(d.range.end.line + 1, 0));
            const isWhitespace = textEditor.document.getText(whitespaceRange).match('^\\s+$');
            const textEdit = new vscode.TextEdit(isWhitespace ? new vscode.Range(d.range.start, whitespaceRange.end) : d.range, "");
            return textEdit;
        });

        await textEditor.edit(editBuilder => {
            edits.forEach(t =>
                editBuilder.replace(t.range, t.newText)
            );
        });

        return unusedUsings.length;
    }

    public static async create(textDocument: vscode.TextDocument): Promise<CSharpFile> {
        const csharpFile = new CSharpFile(textDocument);
        csharpFile.children = await CSharpFile.parseSymbols(textDocument);
        return csharpFile;
    }

    // #endregion Public Static Methods

    // #region Public Methods (2)

    public debug(): void {
        console.log(`${CSharpSymbolType[this.type]}: name=${this.name}, path=${this.filePath}`);
        if (this.hasChildren) this.children.forEach(c => c.debug());
    }

    public [util.inspect.custom](): string {
        return `${CSharpSymbolType[this.type]}${this.hasChildren ? `[${this.children.length}]` : ""}: ${FileSystem.fileNameUsingTextDocument(this.textDocument)}`;
    }

    // #endregion Public Methods

    // #region Private Static Methods (1)

    private static async parseSymbols(textDocument: vscode.TextDocument): Promise<CSharpSymbol[]> {
        const documentSymbols = await vscode.commands.executeCommand("vscode.executeDocumentSymbolProvider", textDocument.uri).then(symbols => symbols as vscode.DocumentSymbol[] || []);
        if (documentSymbols.length === 0) return [];

        const symbols = CSharpSymbol.createSymbols(textDocument, documentSymbols.sort((a, b) => a.range.start.compareTo(b.range.start)));
        const usingAndNamespaceSymbols = CSharpSymbol.createUsingAndNamespaceSymbols(textDocument, symbols);

        CSharpSymbol.addUsingAndNamespaceSymbols(usingAndNamespaceSymbols, symbols);
        CSharpSymbol.createNonCodeblockSymbols(textDocument, usingAndNamespaceSymbols, symbols);

        return symbols;
    }

    // #endregion Private Static Methods
}
