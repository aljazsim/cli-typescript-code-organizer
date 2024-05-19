import { fileExists, readFile, writeFile } from "../../src/helpers/file-system-helper";

import { Configuration } from "../../src/configuration/configuration";
import { SourceCodeOrganizer } from "../../src/source-code/source-code-organizer";
import { expect } from "@jest/globals";

// #region Functions (1)

export async function compareFiles(configuration: Configuration, inputTsFilePath: string, expectedTsFilePath: string)
{
    // arrange
    const sourceCode = await readFile(inputTsFilePath);

    // act
    const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);
    await writeFile(expectedTsFilePath + ".xxx", organizedSourceCode, true);

    // if (!(await fileExists(expectedTsFilePath)))
    // {
    //     await writeFile(expectedTsFilePath, organizedSourceCode, false);
    // }

    // assert
    expect(organizedSourceCode).toBe(await readFile(expectedTsFilePath));
}

// #endregion Functions (1)
