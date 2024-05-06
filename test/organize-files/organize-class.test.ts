import { expect, test } from '@jest/globals';
import { membersByGroupedMemberTypeConfiguration, membersByGroupedMemberTypeWithPlaceAboveBelowConfiguration, membersByIndividualMemberTypeConfiguration } from '../configurations/configuration-helpers';
import { readFile, writeFile } from '../../src/helpers/file-system-helper';

import { SourceCodeOrganizer } from '../../src/source-code/source-code-organizer';

const testFileDirectoryPath = "test/organize-files/ts-files/class";
const testClassFilePath = `${testFileDirectoryPath}/test-class.ts`;
const testClassOrganizedByIndividualMemberTypeFilePath = `${testFileDirectoryPath}/test-class-organized-by-individual-member-type.ts`;
const testClassOrganizedByIndividualMemberTypeFilePath2 = `${testFileDirectoryPath}/test-class-organized-by-individual-member-type=xxx.ts`;
const testClassOrganizedByGroupedMemberTypeFilePath = `${testFileDirectoryPath}/test-class-organized-by-grouped-member-type.ts`;
const testClassOrganizedByIndividualMemberTypeWithoutRegionsFilePath = `${testFileDirectoryPath}/test-class-organized-by-individual-member-type-without-regions.ts`;
const testClassOrganizedByGroupedMemberTypeAndPlaceAboveBelowFilePath = `${testFileDirectoryPath}/test-class-organized-by-grouped-member-type-and-place-above-below.ts`;
const testClassOrganizedByGroupedMemberTypeAndTreatArrowPropertiesAsMethodsFilePath = `${testFileDirectoryPath}/test-class-organized-by-grouped-member-type-and-treat-arrow-properties-as-methods.ts`;
const testClassOrganizedByGroupedMemberTypeAndGroupMembersWithDecoratorsFilePath = `${testFileDirectoryPath}/test-class-organized-by-grouped-member-type-and-group-members-with-decorators.ts`;

test('organize class by individual member type', async () =>
{
    // arrange
    const configuration = await membersByIndividualMemberTypeConfiguration();
    const sourceCode = await readFile(testClassFilePath);
    const validOrganizedSourceCode = await readFile(testClassOrganizedByIndividualMemberTypeFilePath);

    // act
    const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);
    await writeFile(testClassOrganizedByIndividualMemberTypeFilePath2, organizedSourceCode);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize class by grouped member type', async () =>
{
    // arrange
    const configuration = membersByGroupedMemberTypeConfiguration;
    const sourceCode = await readFile(testClassFilePath);
    const validOrganizedSourceCode = await readFile(testClassOrganizedByGroupedMemberTypeFilePath);

    // act
    const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);
    // await writeFile(testClassOrganizedByGroupedMemberTypeFilePath, organizedSourceCode);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize class by individual member type (without regions)', async () =>
{
    // arrange
    const configurations = [
        membersByIndividualMemberTypeConfiguration,
        membersByIndividualMemberTypeConfiguration,
        membersByIndividualMemberTypeConfiguration,
        membersByIndividualMemberTypeConfiguration,
        membersByIndividualMemberTypeConfiguration,
        membersByIndividualMemberTypeConfiguration,
        membersByIndividualMemberTypeConfiguration,
        membersByIndividualMemberTypeConfiguration
    ];
    const sourceCode = await readFile(testClassFilePath);
    const validOrganizedSourceCode = await readFile(testClassOrganizedByIndividualMemberTypeWithoutRegionsFilePath);

    for (const configuration of configurations)
    {
        // act
        const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);
        // await writeFile(testClassOrganizedByIndividualMemberTypeWithoutRegionsFilePath, organizedSourceCode);

        // assert
        expect(organizedSourceCode).toBe(validOrganizedSourceCode);
    }
});

test('organize class by grouped member type (place above below)', async () =>
{
    // arrange
    const configuration = membersByGroupedMemberTypeWithPlaceAboveBelowConfiguration;
    const sourceCode = await readFile(testClassFilePath);
    const validOrganizedSourceCode = await readFile(testClassOrganizedByGroupedMemberTypeAndPlaceAboveBelowFilePath);

    // act
    const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);
    // await writeFile(testClassOrganizedByGroupedMemberTypeAndPlaceAboveBelowFilePath, organizedSourceCode);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize class by grouped member type (treat arrow function properties as methods)', async () =>
{
    // arrange
    const configuration = membersByGroupedMemberTypeConfiguration;
    const sourceCode = await readFile(testClassFilePath);
    const validOrganizedSourceCode = await readFile(testClassOrganizedByGroupedMemberTypeAndTreatArrowPropertiesAsMethodsFilePath);

    // act
    const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);
    // await writeFile(testClassOrganizedByGroupedMemberTypeAndTreatArrowPropertiesAsMethodsFilePath, organizedSourceCode);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize class by grouped member type (group members with decorators)', async () =>
{
    // arrange
    const configuration = membersByGroupedMemberTypeConfiguration;
    const sourceCode = await readFile(testClassFilePath);
    const validOrganizedSourceCode = await readFile(testClassOrganizedByGroupedMemberTypeAndGroupMembersWithDecoratorsFilePath);

    // act
    const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);
    // await writeFile(testClassOrganizedByGroupedMemberTypeAndGroupMembersWithDecoratorsFilePath, organizedSourceCode);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});
