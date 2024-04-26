import { expect, test } from '@jest/globals';
import { membersByGroupedMemberTypeConfiguration, membersByGroupedMemberTypeWithPlaceAboveBelowConfiguration, membersByIndividualMemberTypeConfiguration } from '../configurations/configuration-helpers';
import { readFile, writeFile } from '../../src/helpers/file-system-helper';

import { Configuration } from "../../src/configuration/configuration";
import { organizeSourceCode } from "../../src/organizer";

const testFileDirectoryPath = "test/organize-files/ts-files/functions";
const testFunctionsFilePath = `${testFileDirectoryPath}/test-functions.ts`;
const testFunctionsOrganizedByIndividualMemberTypeFilePath = `${testFileDirectoryPath}/test-functions-organized-by-individual-member-type.ts`;
const testFunctionsOrganizedByGroupedMemberTypeFilePath = `${testFileDirectoryPath}/test-functions-organized-by-grouped-member-type.ts`;
const testFunctionsOrganizedByIndividualMemberTypeWithoutRegionsFilePath = `${testFileDirectoryPath}/test-functions-organized-by-individual-member-type-without-regions.ts`;
const testFunctionsOrganizedByGroupedMemberTypeAndPlaceAboveBelowFilePath = `${testFileDirectoryPath}/test-functions-organized-by-grouped-member-type-and-place-above-below.ts`;
const testFunctionsOrganizedByGroupedMemberTypeAndTreatArrowPropertiesAsMethodsFilePath = `${testFileDirectoryPath}/test-functions-organized-by-grouped-member-type-and-treat-arrow-properties-as-methods.ts`;
const testFunctionsOrganizedByGroupedMemberTypeAndGroupMembersWithDecoratorsFilePath = `${testFileDirectoryPath}/test-functions-organized-by-grouped-member-type-and-group-members-with-decorators.ts`;

test('organize functions by individual member type', async () =>
{
    // arrange
    const configuration = new Configuration(true, true, true, true, true, false, false, membersByIndividualMemberTypeConfiguration);
    const sourceCode = await readFile(testFunctionsFilePath);
    const validOrganizedSourceCode = await readFile(testFunctionsOrganizedByIndividualMemberTypeFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize functions by grouped member type', async () =>
{
    // arrange
    const configuration = new Configuration(true, true, true, true, true, false, false, membersByGroupedMemberTypeConfiguration);
    const sourceCode = await readFile(testFunctionsFilePath);
    const validOrganizedSourceCode = await readFile(testFunctionsOrganizedByGroupedMemberTypeFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize functions by individual member type (without regions)', async () =>
{
    // arrange
    const configurations = [
        new Configuration(false, false, false, false, true, false, false, membersByIndividualMemberTypeConfiguration),
        new Configuration(false, true, false, false, true, false, false, membersByIndividualMemberTypeConfiguration),
        new Configuration(false, false, true, false, true, false, false, membersByIndividualMemberTypeConfiguration),
        new Configuration(false, false, false, true, true, false, false, membersByIndividualMemberTypeConfiguration),
        new Configuration(false, true, true, true, true, false, false, membersByIndividualMemberTypeConfiguration),
        new Configuration(false, true, false, true, true, false, false, membersByIndividualMemberTypeConfiguration),
        new Configuration(false, true, true, false, true, false, false, membersByIndividualMemberTypeConfiguration),
        new Configuration(false, false, true, true, true, false, false, membersByIndividualMemberTypeConfiguration)

    ];
    const sourceCode = await readFile(testFunctionsFilePath);
    const validOrganizedSourceCode = await readFile(testFunctionsOrganizedByIndividualMemberTypeWithoutRegionsFilePath);

    for (const configuration of configurations)
    {
        // act
        const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);

        // assert
        expect(organizedSourceCode).toBe(validOrganizedSourceCode);
    }
});

test('organize functions by grouped member type (place above below)', async () =>
{
    // arrange
    const configuration = new Configuration(true, true, true, true, true, false, false, membersByGroupedMemberTypeWithPlaceAboveBelowConfiguration);
    const sourceCode = await readFile(testFunctionsFilePath);
    const validOrganizedSourceCode = await readFile(testFunctionsOrganizedByGroupedMemberTypeAndPlaceAboveBelowFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize functions by grouped member type (treat arrow function properties as methods)', async () =>
{
    // arrange
    const configuration = new Configuration(true, true, true, true, true, false, true, membersByGroupedMemberTypeConfiguration);
    const sourceCode = await readFile(testFunctionsFilePath);
    const validOrganizedSourceCode = await readFile(testFunctionsOrganizedByGroupedMemberTypeAndTreatArrowPropertiesAsMethodsFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);
    await writeFile(testFunctionsOrganizedByGroupedMemberTypeAndTreatArrowPropertiesAsMethodsFilePath, organizedSourceCode);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize functions by grouped member type (group members with decorators)', async () =>
{
    // arrange
    const configuration = new Configuration(true, true, true, true, true, true, false, membersByGroupedMemberTypeConfiguration);
    const sourceCode = await readFile(testFunctionsFilePath);
    const validOrganizedSourceCode = await readFile(testFunctionsOrganizedByGroupedMemberTypeAndGroupMembersWithDecoratorsFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});
