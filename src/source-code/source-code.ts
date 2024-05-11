import { AccessorNode } from "../elements/accessor-node";
import { ElementNode } from "../elements/element-node";
import { GetterNode } from "../elements/getter-node";
import { MethodNode } from "../elements/method-node";
import { PropertyNode } from "../elements/property-node";
import { RegionConfiguration } from "../configuration/region-configuration";
import { SetterNode } from "../elements/setter-node";
import { WriteModifier } from "../enums/write-modifier";

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

    // #region Public Methods (11)

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

    public addPrivateModifierIfStartingWithHash(node: ElementNode)
    {
        // TODO: implement
    }

    public addPublicModifierIfMissing(node: ElementNode)
    {
        const spacesRegex = "\\s*";
        const staticRegex = `(static${spacesRegex})?`;
        const readonlyRegex = `(readonly${spacesRegex})?`;
        const constRegex = `(const${spacesRegex})?`;
        const abstractRegex = `(abstract${spacesRegex})?`;
        const asyncRegex = `(async${spacesRegex})?`;
        const getterRegex = `get${spacesRegex}`;
        const setterRegex = `set${spacesRegex}`;
        const accessorRegex = `accessor${spacesRegex}`;
        const getAsync = (isAsync: boolean) => isAsync ? "async " : "";
        const getStatic = (isStatic: boolean) => isStatic ? "static " : "";
        const getAbstract = (isAbstract: boolean) => isAbstract ? "abstract " : "";
        const getReadOnly = (writeMode: WriteModifier) => writeMode === WriteModifier.readOnly ? "readonly " : "";
        const getConst = (writeMode: WriteModifier) => writeMode === WriteModifier.const ? "const " : "";
        const addPublic = (strings: string[]) => "public " + strings.filter(s => s !== "").map(s => s.trim()).join(" ");

        if (node.accessModifier === null)
        {
            let regex: RegExp | null = null;
            let replaceWith: string | null = null;

            if (node instanceof MethodNode)
            {
                regex = new RegExp(`${staticRegex}${abstractRegex}${asyncRegex}${node.name}`);
                replaceWith = addPublic([getStatic(node.isStatic), getAbstract(node.isAbstract), getAsync(node.isAsync), node.name]);
            }
            else if (node instanceof PropertyNode)
            {
                regex = new RegExp(`${staticRegex}${abstractRegex}${constRegex}${readonlyRegex}${node.name}`);
                replaceWith = addPublic([getStatic(node.isStatic), getAbstract(node.isAbstract), getConst(node.writeMode), getReadOnly(node.writeMode), node.name]);
            }
            else if (node instanceof AccessorNode)
            {
                regex = RegExp(`${staticRegex}${abstractRegex}${accessorRegex}${node.name}`);
                replaceWith = addPublic([getStatic(node.isStatic), getAbstract(node.isAbstract), "accessor", node.name]);
            }
            else if (node instanceof GetterNode)
            {
                regex = RegExp(`${staticRegex}${abstractRegex}${getterRegex}${node.name}`);
                replaceWith = addPublic([getStatic(node.isStatic), getAbstract(node.isAbstract), "get", node.name]);
            }
            else if (node instanceof SetterNode)
            {
                regex = new RegExp(`${staticRegex}${abstractRegex}${setterRegex}${node.name}`);
                replaceWith = addPublic([getStatic(node.isStatic), getAbstract(node.isAbstract), "set", node.name]);
            }

            if (regex && replaceWith)
            {
                this.sourceCode = SourceCode.replaceAfterDecorators(this.sourceCode, node.decorators, regex, replaceWith);
            }
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
        this.sourceCode = this.sourceCode.trim();
    }

    // #endregion Public Methods (11)

    // #region Private Static Methods (2)

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

    private static replaceAfterDecorators(sourceCode: string, decorators: string[], replaceWhat: RegExp, replaceWith: string)
    {
        const afterDecoratorsStart = decorators.length === 0 ? 0 : (sourceCode.lastIndexOf(decorators[decorators.length - 1]) + decorators[decorators.length - 1].length);
        const codeDecorators = sourceCode.substring(0, afterDecoratorsStart);
        const codeAfterDecorators = sourceCode.substring(afterDecoratorsStart);

        return codeDecorators + codeAfterDecorators.replace(replaceWhat, replaceWith);
    }

    // #endregion Private Static Methods (2)
}