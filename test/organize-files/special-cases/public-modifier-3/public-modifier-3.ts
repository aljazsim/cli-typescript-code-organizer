import * as vscode from "vscode";

export class FileDiagnostic {
    readonly identifier?: string;
    readonly info?: string;
    readonly message: string;
    readonly range: vscode.Range;
    readonly severity: FileDiagnosticSeverity;
    readonly source?: string;

    constructor(readonly path: string, diagnostic: vscode.Diagnostic) {
        this.message = diagnostic.message;
        this.range = diagnostic.range;
        this.severity = <number>diagnostic.severity;
        this.source = diagnostic.source;

        if (diagnostic.code) {
            if (typeof diagnostic.code === "string") {
                this.identifier = diagnostic.code;
            }
            else if (typeof diagnostic.code === "number") {
                this.identifier = diagnostic.code.toString();
            }
            else if (typeof diagnostic.code === "object") {
                this.identifier = diagnostic.code.value.toString();
                this.info = diagnostic.code.target.toString();
            }
        }
    }

    get severityText(): string { return vscode.DiagnosticSeverity[this.severity]; }

    toString(): string {
        let additionalInfo = "";
        if (this.identifier) additionalInfo += `, ${this.identifier}`;
        if (this.info) additionalInfo += `, ${this.info}`;
        if (additionalInfo) additionalInfo = ` (${additionalInfo.substring(2)})`;

        return `${this.range.start.line + 1}:${this.range.start.character + 1}: ${this.severityText}: ${this.message}${additionalInfo}`;
    }
}

export class FileDiagnosticIdentifier {
    static readonly useGeneratedRegexAttributeToGenerateRegExpAtCompileTime = "SYSLIB1045";
    static readonly usingDirectiveUnnecessary = "IDE0005";
}

export enum FileDiagnosticSeverity {
    Error = 0,
    Warning = 1,
    Information = 2,
    Hint = 3
}