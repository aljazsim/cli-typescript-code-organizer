import { expect, test } from '@jest/globals';

import { Configuration } from '../../src/configuration/configuration';
import { SourceCodeOrganizer } from "../../src/source-code/source-code-organizer";
import { readFile } from "../../src/helpers/file-system-helper";

test('ignore files', async () =>
{
    // arrange
    const sourceCodes = [
        await readFile("./test/ignore-files/ts-files/test-ignore-auto-generated.ts"),
        await readFile("./test/ignore-files/ts-files/test-ignore.ts"),
    ];

    // act & assert
    for (const sourceCode of sourceCodes)
    {
        const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, Configuration.getDefaultConfiguration());

        expect(sourceCode).toBe(organizedSourceCode);
    }
});


