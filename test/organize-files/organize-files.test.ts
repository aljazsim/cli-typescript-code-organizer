import { expect, test } from '@jest/globals';
import { getOrganizeTestParameters } from '../helpers/organize-test-helper';
import { deleteFile, fileExists, readFile, writeFile } from '../../src/helpers/file-system-helper';
import { SourceCodeOrganizer } from '../../src/source-code/source-code-organizer';
import { Configuration } from '../../src/configuration/configuration';


for (const otp of getOrganizeTestParameters())
{
    test(otp.description, async () =>
    {
        // arrange
        const configuration = await Configuration.getConfiguration(otp.configurationFilePath);
        const sourceCodeFilePath = otp.input;
        const sourceCode = await readFile(sourceCodeFilePath);
        const expectedOrganizedSourceCodeFilePath = otp.output;

        // act
        const organizedSourceCodeFilePath = expectedOrganizedSourceCodeFilePath + ".invalid";
        const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);

        if (!(await fileExists(expectedOrganizedSourceCodeFilePath)))
        {
            await writeFile(expectedOrganizedSourceCodeFilePath, organizedSourceCode, false);
        }

        const expectedOrganizedSourceCode = await readFile(expectedOrganizedSourceCodeFilePath);

        if (organizedSourceCode === expectedOrganizedSourceCode)
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
    });
}
