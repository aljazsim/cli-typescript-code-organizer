import { expect, test } from '@jest/globals';

import { Configuration } from '../../../src/configuration/configuration';
import { organizeSourceCode } from '../../../src/organizer';

const fs = require('fs').promises;

test('ignore files', async () =>
{
    // arrange
    const sourceCodes = [
        await fs.readFile("./test/examples/ignore-files/ts-files/test-ignore-auto-generated.ts"),
        await fs.readFile("./test/examples/ignore-files/ts-files/test-ignore.ts"),
        await fs.readFile("./test/examples/ignore-files/ts-files/test-ignore-enum.ts"),
        await fs.readFile("./test/examples/ignore-files/ts-files/test-ignore-type.ts"),
    ];

    // act & assert
    for (const sourceCode of sourceCodes)
    {
        const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, Configuration.getDefaultConfiguration());

        expect(sourceCode).toBe(organizedSourceCode);
    }
});


