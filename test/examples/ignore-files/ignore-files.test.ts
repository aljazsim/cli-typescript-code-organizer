import { expect, test } from '@jest/globals';

import { Configuration } from '../../../src/configuration/configuration';
import { organizeSourceCode } from '../../../src/organizer';

const fs = require('fs').promises;

test('ignore auto-generated files', async () =>
{
    // arrange
    const sourceCode = await fs.readFile("./test/examples/ignore-files/ts-files/test-auto-generated.ts");

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, Configuration.getDefaultConfiguration());

    // assert
    expect(sourceCode).toBe(organizedSourceCode);
});