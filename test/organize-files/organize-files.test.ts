import { expect, test } from '@jest/globals';
import { getOrganizeTestParameters } from '../helpers/organize-test-helper';
import { deleteFile, fileExists, readFile, writeFile } from '../../src/helpers/file-system-helper';
import { SourceCodeOrganizer } from '../../src/source-code/source-code-organizer';


test("organize files", async () =>
{
    // arrange
    for (const otp of await getOrganizeTestParameters())
    {
        const configuration = otp.configuration;
        const sourceCodeFilePath = otp.input;
        const sourceCode = await readFile(sourceCodeFilePath);
        const validOrganizedSourceCodeFilePath = otp.output;
        // const validOrganizedSourceCode = await readFile(validOrganizedSourceCodeFilePath);

        // act
        const organizedSourceCodeSave = true;
        const organizedSourceCodeFilePath = validOrganizedSourceCodeFilePath + ".result";
        const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);

        //----------------------------------------
        if (!(await fileExists(validOrganizedSourceCodeFilePath)))
        {
            await writeFile(validOrganizedSourceCodeFilePath, organizedSourceCode, false);
        }
        const validOrganizedSourceCode = await readFile(validOrganizedSourceCodeFilePath);
        //----------------------------------------

        if (organizedSourceCodeSave && organizedSourceCode != validOrganizedSourceCode)
        {
            await writeFile(organizedSourceCodeFilePath, organizedSourceCode, true);
        }
        else if (await fileExists(organizedSourceCodeFilePath))
        {
            await deleteFile(organizedSourceCodeFilePath);
        }

        // assert
        expect(organizedSourceCode).toBe(validOrganizedSourceCode);
    }
});
