import * as vscode from "vscode";

// #region Exported Enums (1)

export enum FileDiagnosticSeverity {
    Error = 0,
    Warning = 1,
    Information = 2,
    Hint = 3
}

// #endregion Exported Enums

// #region Exported Classes (2)

export class FileDiagnostic {
    // #region Properties (6)

    public readonly identifier?: string;
    public readonly info?: string;
    public readonly message: string;
    public readonly range: vscode.Range;
    public readonly severity: FileDiagnosticSeverity;
    public readonly source?: string;

    // #endregion Properties

    // #region Constructors (1)

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

    // #endregion Constructors

    // #region Getters And Setters (1)

    public get severityText(): string { return vscode.DiagnosticSeverity[this.severity]; }

    // #endregion Getters And Setters

    // #region Methods (1)

    public toString(): string {
        let additionalInfo = "";
        if (this.identifier) additionalInfo += `, ${this.identifier}`;
        if (this.info) additionalInfo += `, ${this.info}`;
        if (additionalInfo) additionalInfo = ` (${additionalInfo.substring(2)})`;

        return `${this.range.start.line + 1}:${this.range.start.character + 1}: ${this.severityText}: ${this.message}${additionalInfo}`;
    }

    // #endregion Methods
}

export class FileDiagnosticIdentifier {
    // #region Properties (2)

    public static readonly useGeneratedRegexAttributeToGenerateRegExpAtCompileTime = "SYSLIB1045";
    public static readonly usingDirectiveUnnecessary = "IDE0005";

    // #endregion Properties
}

// #endregion Exported Classes
