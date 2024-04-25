import { expect, test } from '@jest/globals';
import { readFile, writeFile } from '../../src/helpers/file-system-helper';

import { Configuration } from '../../src/configuration/configuration';
import { organizeSourceCode } from '../../src/organizer';

const testFileDirectoryPath = "test/organize-files/ts-files/class";
const testClassFilePath = `${testFileDirectoryPath}/test-class.ts`;
const testClassOrganizedFilePath = `${testFileDirectoryPath}/test-class-organized.ts`;

test('organize class', async () =>
{
    // arrange
    const configuration = new Configuration(false, false, false, false, false, false, false, Configuration.getDefaultConfigurationByIndividualMemberType().members.memberOrder);
    const sourceCode = await readFile(testClassFilePath);
    // const validOrganizedSourceCode = await readFile(testClassOrganizedFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);
    await writeFile(testClassOrganizedFilePath, organizedSourceCode, true);

    // assert
    // expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});
