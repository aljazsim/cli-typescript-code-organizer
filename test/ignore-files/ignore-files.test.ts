import { expect, test } from '@jest/globals';

import { Configuration } from '../../src/configuration/configuration';
import { organizeSourceCode } from '../../src/organizer';
import { readFile } from "../../src/helpers/file-system-helper";

test('ignore files', async () =>
{
    // arrange
    const sourceCodes = [
        await readFile("./test/ignore-files/ts-files/test-ignore-auto-generated.ts"),
        await readFile("./test/ignore-files/ts-files/test-ignore.ts"),
        await readFile("./test/ignore-files/ts-files/test-ignore-enum.ts"),
        await readFile("./test/ignore-files/ts-files/test-ignore-type.ts"),
    ];

    // act & assert
    for (const sourceCode of sourceCodes)
    {
        const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, Configuration.getDefaultConfiguration());

        expect(sourceCode).toBe(organizedSourceCode);
    }
});


