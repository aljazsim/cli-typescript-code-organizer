import { fail } from "assert";
import { expect, test } from "vitest";

import { Configuration } from "../../src/configuration/configuration.js";
import { deleteFile, fileExists, readFile, writeFile } from "../../src/helpers/file-system-helper.js";
import { SourceCodeOrganizer } from "../../src/source-code/source-code-organizer.js";
import { getOrganizeTestParameters } from "../helpers/organize-test-helper.js";

for (const otp of getOrganizeTestParameters())
{
    test(otp.description, async () =>
    {
        // arrange
        const configuration = await Configuration.getConfiguration(otp.configurationFilePath);
        const sourceCodeFilePath = otp.input;
        const sourceCode = await readFile(sourceCodeFilePath);
        const expectedOrganizedSourceCodeFilePath = otp.output;

        try
        {
            // act
            const organizedSourceCodeFilePath = expectedOrganizedSourceCodeFilePath + ".invalid";
            const organizedSourceCode = await SourceCodeOrganizer.organizeSourceCode(sourceCodeFilePath, sourceCode, configuration);

            if (!(await fileExists(expectedOrganizedSourceCodeFilePath)))
            {
                await writeFile(expectedOrganizedSourceCodeFilePath, organizedSourceCode, false);
            }
            else
            {
                const expectedOrganizedSourceCode = await readFile(expectedOrganizedSourceCodeFilePath);

                if (organizedSourceCode == expectedOrganizedSourceCode)
                {
                    if (await fileExists(organizedSourceCodeFilePath))
                    {
                        await deleteFile(organizedSourceCodeFilePath);
                    }
                }
                else
                {
                    await writeFile(organizedSourceCodeFilePath, organizedSourceCode, true);
                }

                // assert
                expect(organizedSourceCode).toBe(expectedOrganizedSourceCode);
            }
        }
        catch (error)
        {
            fail(error as string | Error);
        }
    });
}
