import { RegionConfiguration } from "../configuration/region-configuration";

export class SourceCode
{
    // #region Properties (1)

    private readonly newLine = "\r\n";

    // #endregion Properties (1)

    // #region Constructors (1)

    constructor(private sourceCode = "")
    {
    }

    // #endregion Constructors (1)

    // #region Public Methods (12)

    public add(newSourceCode: string | SourceCode)
    {
        if (newSourceCode instanceof SourceCode)
        {
            this.sourceCode += newSourceCode.toString();
        }
        else
        {
            this.sourceCode += newSourceCode;
        }
    }

    public addComment(comment: string)
    {
        if (comment && comment.length > 0)
        {
            const temp = this.sourceCode;

            this.sourceCode = comment.trimEnd();
            this.addNewLine();
            this.add(temp);
        }
    }

    public addNewLine()
    {
        this.add(this.newLine);
    }

    public addNewLineIf(condition: boolean)
    {
        if (condition)
        {
            this.addNewLine();
        }
    }

    public addRegion(regionCaption: string, regionMemberCount: number, regionConfiguration: RegionConfiguration)
    {
        const indentation = SourceCode.getIndentation(this.sourceCode);
        let code = this.sourceCode;
        let region = "";
        let endregion = "";

        region += regionConfiguration.addRegionIndentation ? indentation : "";
        region += "// #region ";
        region += regionCaption + " ";
        region += regionConfiguration.addMemberCountInRegionName ? `(${regionMemberCount})` : "";
        region = region.trimEnd();

        endregion += regionConfiguration.addRegionIndentation ? indentation : "";
        endregion += "// #endregion ";
        endregion += regionConfiguration.addRegionCaptionToRegionEnd ? regionCaption : "";
        endregion = endregion.trimEnd() + " ";
        endregion += regionConfiguration.addMemberCountInRegionName ? `(${regionMemberCount})` : "";
        endregion = endregion.trimEnd();

        this.sourceCode = region;
        this.addNewLine();
        this.addNewLine();
        this.add(code);
        this.addNewLine();
        this.add(endregion);
        this.addNewLine();
    }

    private static getIndentation(sourceCode: string)
    {
        let tab = "\t";
        let space = " ";

        for (const sourceCodeLine of sourceCode.split("\n"))
        {
            if (sourceCodeLine.startsWith(tab) || sourceCodeLine.startsWith(space))
            {
                return sourceCodeLine.replace(sourceCodeLine.trimStart(), "");
            }
        }

        return "";
    }

    public removeConsecutiveEmptyLines()
    {
        const newLine = "\r\n";
        let emptyLineRegex = new RegExp(`^\\s * $`);
        let newLineRegex = new RegExp(`\r\n|\r`);
        let openingBraceRegex = new RegExp(`^.*\{ \\s*$`);
        let closingBraceRegex = new RegExp(`^\\s *\} \\s*$`);

        let lines: string[] = this.sourceCode.split(newLineRegex);

        for (let i = 0; i < lines.length - 1; i++)
        {
            if (openingBraceRegex.test(lines[i]) &&
                emptyLineRegex.test(lines[i + 1]))
            {
                // remove empty line after {
                lines.splice(i + 1, 1);

                i--;
            }
            else if (emptyLineRegex.test(lines[i]) &&
                closingBraceRegex.test(lines[i + 1]))
            {
                // remove empty line before }
                lines.splice(i, 1);

                i--;
            }
            else if (emptyLineRegex.test(lines[i]) &&
                emptyLineRegex.test(lines[i + 1]))
            {
                lines.splice(i, 1);

                i--;
            }
        }

        this.sourceCode = lines.join(newLine);
    }

    public removeRegions()
    {
        const newLine = "\n";
        const emptyLine = "";
        let anythingRegex = ".";
        let startRegionRegex = "#region";
        let endRegionRegex = "#endregion";
        let spaceRegex = "\\s";

        let startRegionsRegex = new RegExp(`^//${spaceRegex}*${startRegionRegex}${spaceRegex}+${anythingRegex}+$`, "i");
        let endRegionsRegex = new RegExp(`^//${spaceRegex}*${endRegionRegex}(${spaceRegex}+${anythingRegex}+)?$`, "i");
        let lines: string[] = this.sourceCode.split(newLine);
        let lines2: string[] = [];

        for (let i = 0; i < lines.length; i++)
        {
            if (!startRegionsRegex.test(lines[i].trim()) &&
                !endRegionsRegex.test(lines[i].trim()))
            {
                lines2.push(lines[i]);
            }
            else
            {
                while (lines.length > i &&
                    lines[i] === emptyLine)
                {
                    i++;
                }

                while (lines2.length > 0 &&
                    lines2[lines2.length - 1] === emptyLine)
                {
                    lines2.pop();
                }
            }
        }

        this.sourceCode = lines2.join(newLine);
    }

    public toString()
    {
        return this.sourceCode;
    }

    public trim()
    {
        return this.sourceCode.trim();
    }

    // #endregion Public Methods (12)
}
