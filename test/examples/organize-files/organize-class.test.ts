import { expect, test } from '@jest/globals';

import { Configuration } from '../../../src/configuration/configuration';
import { organizeSourceCode } from '../../../src/organizer';
import { readFile } from '../../../src/helpers/file-system-helper';

const testFileDirectoryPath = "./test/examples/organize-files/ts-files";
const testClassFilePath = `${testFileDirectoryPath}/test-class.ts`;
const testClassOrganizedFilePath = `${testFileDirectoryPath}/test-class-organized.ts`;

test('organize class without regions', async () =>
{
    // arrange
    const configuration = new Configuration(
        false, // useRegions
        false, // addRegionIndentation
        false, // addMemberCountInRegionName
        false, // addRegionCaptionToRegionEnd
        false, // groupPropertiesWithDecorators
        false, // addPublicModifierIfMissing
        false, // treatArrowFunctionPropertiesAsMethods
        Configuration.getDefaultConfiguration().members.memberOrder); // memberOrder
    const sourceCode = await readFile(testClassFilePath);
    const validOrganizedSourceCode = await readFile(testClassOrganizedFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});


