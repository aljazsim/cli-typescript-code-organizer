import { expect, test } from '@jest/globals';
import { membersByGroupedMemberTypeConfiguration, membersByGroupedMemberTypeWithPlaceAboveBelowConfiguration, membersByIndividualMemberTypeConfiguration } from '../configurations/configuration-helpers';
import { readFile, writeFile } from '../../src/helpers/file-system-helper';

import { Configuration } from '../../src/configuration/configuration';
import { organizeSourceCode } from '../../src/organizer';

const testFileDirectoryPath = "test/organize-files/ts-files/class";
const testClassFilePath = `${testFileDirectoryPath}/test-class.ts`;
const testClassOrganizedByIndividualMemberTypeFilePath = `${testFileDirectoryPath}/test-class-organized-by-individual-member-type.ts`;
const testClassOrganizedByGroupedMemberTypeFilePath = `${testFileDirectoryPath}/test-class-organized-by-grouped-member-type.ts`;
const testClassOrganizedByGroupedMemberTypeAndPlaceAboveBelowFilePath = `${testFileDirectoryPath}/test-class-organized-by-grouped-member-type-and-place-above-below.ts`;
const testClassOrganizedByGroupedMemberTypeAndTreatArrowPropertiesAsMethodsFilePath = `${testFileDirectoryPath}/test-class-organized-by-grouped-member-type-and-treat-arrow-properties-as-methods.ts`;
const testClassOrganizedByGroupedMemberTypeAndGroupMembersWithDecoratorsFilePath = `${testFileDirectoryPath}/test-class-organized-by-grouped-member-type-and-group-members-with-decorators.ts`;

test('organize class by individual member type', async () =>
{
    // arrange
    const configuration = new Configuration(true, true, true, true, true, false, false, membersByIndividualMemberTypeConfiguration);
    const sourceCode = await readFile(testClassFilePath);
    const validOrganizedSourceCode = await readFile(testClassOrganizedByIndividualMemberTypeFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);


    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize class by grouped member type', async () =>
{
    // arrange
    const configuration = new Configuration(true, true, true, true, true, false, false, membersByGroupedMemberTypeConfiguration);
    const sourceCode = await readFile(testClassFilePath);
    const validOrganizedSourceCode = await readFile(testClassOrganizedByGroupedMemberTypeFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize class by grouped member type (place above below)', async () =>
{
    // arrange
    const configuration = new Configuration(true, true, true, true, true, false, false, membersByGroupedMemberTypeWithPlaceAboveBelowConfiguration);
    const sourceCode = await readFile(testClassFilePath);
    const validOrganizedSourceCode = await readFile(testClassOrganizedByGroupedMemberTypeAndPlaceAboveBelowFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize class by grouped member type (treat arrow function properties as methods)', async () =>
{
    // arrange
    const configuration = new Configuration(true, true, true, true, true, false, true, membersByGroupedMemberTypeConfiguration);
    const sourceCode = await readFile(testClassFilePath);
    const validOrganizedSourceCode = await readFile(testClassOrganizedByGroupedMemberTypeAndTreatArrowPropertiesAsMethodsFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize class by grouped member type (group members with decorators)', async () =>
{
    // arrange
    const configuration = new Configuration(true, true, true, true, true, true, false, membersByGroupedMemberTypeConfiguration);
    const sourceCode = await readFile(testClassFilePath);
    const validOrganizedSourceCode = await readFile(testClassOrganizedByGroupedMemberTypeAndGroupMembersWithDecoratorsFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);
    // await writeFile(testClassOrganizedByGroupedMemberTypeAndGroupMembersWithDecoratorsFilePath, organizedSourceCode, true);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});
