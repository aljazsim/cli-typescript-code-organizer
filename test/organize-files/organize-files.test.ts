import { expect, test } from '@jest/globals';
import { getOrganizeTestParameters } from '../helpers/organize-test-helper';
import { deleteFile, fileExists, readFile, writeFile } from '../../src/helpers/file-system-helper';
import { SourceCodeOrganizer } from '../../src/source-code/source-code-organizer';
import { getConfiguration } from '../helpers/configuration-helper';


for (const otp of getOrganizeTestParameters())
{
    test(otp.description, async () =>
    {
        // arrange
        const configuration = await getConfiguration(otp.configurationFilePath, otp.useRegions, otp.addRegionIndentation, otp.addMemberCountInRegionName, otp.addRegionCaptionToRegionEnd);
        const sourceCodeFilePath = otp.input;
        const sourceCode = await readFile(sourceCodeFilePath);
        const validOrganizedSourceCodeFilePath = otp.output;
        const validOrganizedSourceCode = await readFile(validOrganizedSourceCodeFilePath);

        // act
        const organizedSourceCodeSave = true;
        const organizedSourceCodeFilePath = validOrganizedSourceCodeFilePath + ".invalid";
        const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);

        if (organizedSourceCode == validOrganizedSourceCode)
        {
            if (await fileExists(organizedSourceCodeFilePath))
            {
                await deleteFile(organizedSourceCodeFilePath);
            }
        }
        else if (organizedSourceCodeSave)
        {
            await writeFile(organizedSourceCodeFilePath, organizedSourceCode, true);
        }

        // assert
        expect(organizedSourceCode).toBe(validOrganizedSourceCode);
    });
}
