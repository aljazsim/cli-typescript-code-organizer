import { Configuration } from "../../src/configuration/configuration.js";
import { deleteFile, fileExists, readFile, writeFile } from "../../src/helpers/file-system-helper.js";
import { SourceCodeOrganizer } from "../../src/source-code/source-code-organizer.js";

// #region Exported Functions (1)

export async function testOrganizingFile(sourceCodeFilePath: string, configurationFilePath: string, expectedFilePath: string)
{
    // arrange
    const configuration = await Configuration.getConfiguration(configurationFilePath);
    const sourceCode = await readFile(sourceCodeFilePath);

    // act
    const organizedFilePath = expectedFilePath + ".invalid";
    const organized = await SourceCodeOrganizer.organizeSourceCode(sourceCodeFilePath, sourceCode, configuration);

    if (!(await fileExists(expectedFilePath)))
    {
        await writeFile(expectedFilePath, organized, false);
    }

    const expected = await readFile(expectedFilePath);

    if (organized == expected)
    {
        if (await fileExists(organizedFilePath))
        {
            await deleteFile(organizedFilePath);
        }
    }

    else
    {
        await writeFile(organizedFilePath, organized, true);
    }

    return { organizedSourceCode: organized, expectedOrganizedSourceCode: expected }
}

// #endregion Exported Functions
