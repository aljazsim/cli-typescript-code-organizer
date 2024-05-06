import { expect, test } from '@jest/globals';
import { membersByGroupedMemberTypeConfiguration, membersByGroupedMemberTypeWithPlaceAboveBelowConfiguration, membersByIndividualMemberTypeConfiguration } from '../configurations/configuration-helpers';
import { readFile, writeFile } from '../../src/helpers/file-system-helper';

import { Configuration } from "../../src/configuration/configuration";
import { SourceCodeOrganizer } from "../source-code/source-code-organizer";

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
    const configuration = await membersByIndividualMemberTypeConfiguration();
    const sourceCode = await readFile(testFunctionsFilePath);
    const validOrganizedSourceCode = await readFile(testFunctionsOrganizedByIndividualMemberTypeFilePath);

    // act
    const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);
    // await writeFile(testFunctionsOrganizedByIndividualMemberTypeFilePath, organizedSourceCode);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize functions by grouped member type', async () =>
{
    // arrange
    const configuration = await membersByGroupedMemberTypeConfiguration();
    const sourceCode = await readFile(testFunctionsFilePath);
    const validOrganizedSourceCode = await readFile(testFunctionsOrganizedByGroupedMemberTypeFilePath);

    // act
    const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);
    // await writeFile(testFunctionsOrganizedByGroupedMemberTypeFilePath, organizedSourceCode);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize functions by individual member type (without regions)', async () =>
{
    // arrange
    const configurations = [
        await membersByIndividualMemberTypeConfiguration(),
        await membersByIndividualMemberTypeConfiguration(),
        await membersByIndividualMemberTypeConfiguration(),
        await membersByIndividualMemberTypeConfiguration(),
        await membersByIndividualMemberTypeConfiguration(),
        await membersByIndividualMemberTypeConfiguration(),
        await membersByIndividualMemberTypeConfiguration(),
        await membersByIndividualMemberTypeConfiguration()

    ];
    const sourceCode = await readFile(testFunctionsFilePath);
    const validOrganizedSourceCode = await readFile(testFunctionsOrganizedByIndividualMemberTypeWithoutRegionsFilePath);

    for (const configuration of configurations)
    {
        // act
        const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);
        // await writeFile(testFunctionsOrganizedByIndividualMemberTypeWithoutRegionsFilePath, organizedSourceCode);

        // assert
        expect(organizedSourceCode).toBe(validOrganizedSourceCode);
    }
});

test('organize functions by grouped member type (place above below)', async () =>
{
    // arrange
    const configuration = await membersByGroupedMemberTypeWithPlaceAboveBelowConfiguration();
    const sourceCode = await readFile(testFunctionsFilePath);
    const validOrganizedSourceCode = await readFile(testFunctionsOrganizedByGroupedMemberTypeAndPlaceAboveBelowFilePath);

    // act
    const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);
    // await writeFile(testFunctionsOrganizedByGroupedMemberTypeAndPlaceAboveBelowFilePath, organizedSourceCode);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize functions by grouped member type (treat arrow function properties as methods)', async () =>
{
    // arrange
    const configuration = await membersByGroupedMemberTypeConfiguration();
    const sourceCode = await readFile(testFunctionsFilePath);
    const validOrganizedSourceCode = await readFile(testFunctionsOrganizedByGroupedMemberTypeAndTreatArrowPropertiesAsMethodsFilePath);

    // act
    const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);
    // await writeFile(testFunctionsOrganizedByGroupedMemberTypeAndTreatArrowPropertiesAsMethodsFilePath, organizedSourceCode);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize functions by grouped member type (group members with decorators)', async () =>
{
    // arrange
    const configuration = await membersByGroupedMemberTypeConfiguration();
    const sourceCode = await readFile(testFunctionsFilePath);
    const validOrganizedSourceCode = await readFile(testFunctionsOrganizedByGroupedMemberTypeAndGroupMembersWithDecoratorsFilePath);

    // act
    const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);
    // await writeFile(testFunctionsOrganizedByGroupedMemberTypeAndGroupMembersWithDecoratorsFilePath, organizedSourceCode);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});
