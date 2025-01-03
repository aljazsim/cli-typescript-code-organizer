import { expect, test } from '@jest/globals';

import { Configuration } from '../../src/configuration/configuration';
import { SourceCodeOrganizer } from "../../src/source-code/source-code-organizer";
import { readFile } from "../../src/helpers/file-system-helper";

test('ignore files', async () =>
{
    // arrange
    const sourceFilePaths = [
        "./test/ignore-files/ts-files/test-enum.ts",
        "./test/ignore-files/ts-files/test-ignore.ts",
        "./test/ignore-files/ts-files/test-ignore.ts"
    ];

    // act & assert
    for (const sourceFilePath of sourceFilePaths)
    {
        const sourceCode = await readFile(sourceFilePath);
        const organizedSourceCode = await SourceCodeOrganizer.organizeSourceCode(sourceFilePath, sourceCode, Configuration.getDefaultConfiguration());

        expect(sourceCode).toBe(organizedSourceCode);
    }
});


