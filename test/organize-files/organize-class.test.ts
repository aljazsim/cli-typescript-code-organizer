import { expect, test } from '@jest/globals';
import { membersByGroupedMemberTypeConfiguration, membersByIndividualMemberTypeConfiguration } from '../configurations/configuration-helpers';
import { readFile, writeFile } from '../../src/helpers/file-system-helper';

import { Configuration } from '../../src/configuration/configuration';
import { organizeSourceCode } from '../../src/organizer';

const testFileDirectoryPath = "test/organize-files/ts-files/class";
const testClassFilePath = `${testFileDirectoryPath}/test-class.ts`;
const testClassOrganizedByIndividualMemberTypeFilePath = `${testFileDirectoryPath}/test-class-organized-by-individual-member-type.ts`;
const testClassOrganizedByGroupedMemberTypeFilePath = `${testFileDirectoryPath}/test-class-organized-by-grouped-member-type.ts`;

test('organize class by individual member type', async () =>
{
    // arrange
    const configuration = new Configuration(true, true, true, true, false, true, false, membersByIndividualMemberTypeConfiguration);
    const sourceCode = await readFile(testClassFilePath);
    // const validOrganizedSourceCode = await readFile(testClassOrganizedByIndividualMemberTypeFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);
    await writeFile(testClassOrganizedByIndividualMemberTypeFilePath, organizedSourceCode, true);

    // assert
    // expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize class by grouped member type', async () =>
{
    // arrange
    const configuration = new Configuration(true, true, true, true, false, true, false, membersByGroupedMemberTypeConfiguration);
    const sourceCode = await readFile(testClassFilePath);
    // const validOrganizedSourceCode = await readFile(testClassOrganizedByGroupedMemberTypeFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);
    await writeFile(testClassOrganizedByGroupedMemberTypeFilePath, organizedSourceCode, true);

    // assert
    // expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});
