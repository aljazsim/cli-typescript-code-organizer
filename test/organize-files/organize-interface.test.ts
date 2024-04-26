import { expect, test } from '@jest/globals';
import { membersByGroupedMemberTypeConfiguration, membersByGroupedMemberTypeWithPlaceAboveBelowConfiguration, membersByIndividualMemberTypeConfiguration } from '../configurations/configuration-helpers';
import { readFile, writeFile } from '../../src/helpers/file-system-helper';

import { Configuration } from '../../src/configuration/configuration';
import { organizeSourceCode } from '../../src/organizer';
import { write } from "fs";

const testFileDirectoryPath = "test/organize-files/ts-files/interface";
const testInterfaceFilePath = `${testFileDirectoryPath}/test-interface.ts`;
const testInterfaceOrganizedByIndividualMemberTypeFilePath = `${testFileDirectoryPath}/test-interface-organized-by-individual-member-type.ts`;
const testInterfaceOrganizedByGroupedMemberTypeFilePath = `${testFileDirectoryPath}/test-interface-organized-by-grouped-member-type.ts`;
const testInterfaceOrganizedByIndividualMemberTypeWithoutRegionsFilePath = `${testFileDirectoryPath}/test-interface-organized-by-individual-member-type-without-regions.ts`;
const testInterfaceOrganizedByGroupedMemberTypeAndPlaceAboveBelowFilePath = `${testFileDirectoryPath}/test-interface-organized-by-grouped-member-type-and-place-above-below.ts`;
const testInterfaceOrganizedByGroupedMemberTypeAndTreatArrowPropertiesAsMethodsFilePath = `${testFileDirectoryPath}/test-interface-organized-by-grouped-member-type-and-treat-arrow-properties-as-methods.ts`;
const testInterfaceOrganizedByGroupedMemberTypeAndGroupMembersWithDecoratorsFilePath = `${testFileDirectoryPath}/test-interface-organized-by-grouped-member-type-and-group-members-with-decorators.ts`;

test('organize interface by individual member type', async () =>
{
    // arrange
    const configuration = new Configuration(true, true, true, true, true, false, false, membersByIndividualMemberTypeConfiguration);
    const sourceCode = await readFile(testInterfaceFilePath);
    const validOrganizedSourceCode = await readFile(testInterfaceOrganizedByIndividualMemberTypeFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize interface by grouped member type', async () =>
{
    // arrange
    const configuration = new Configuration(true, true, true, true, true, false, false, membersByGroupedMemberTypeConfiguration);
    const sourceCode = await readFile(testInterfaceFilePath);
    const validOrganizedSourceCode = await readFile(testInterfaceOrganizedByGroupedMemberTypeFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);
    await writeFile(testInterfaceOrganizedByGroupedMemberTypeFilePath, organizedSourceCode);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize interface by individual member type (without regions)', async () =>
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
    const sourceCode = await readFile(testInterfaceFilePath);
    const validOrganizedSourceCode = await readFile(testInterfaceOrganizedByIndividualMemberTypeWithoutRegionsFilePath);

    for (const configuration of configurations)
    {
        // act
        const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);

        // assert
        expect(organizedSourceCode).toBe(validOrganizedSourceCode);
    }
});

test('organize interface by grouped member type (place above below)', async () =>
{
    // arrange
    const configuration = new Configuration(true, true, true, true, true, false, false, membersByGroupedMemberTypeWithPlaceAboveBelowConfiguration);
    const sourceCode = await readFile(testInterfaceFilePath);
    const validOrganizedSourceCode = await readFile(testInterfaceOrganizedByGroupedMemberTypeAndPlaceAboveBelowFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize interface by grouped member type (treat arrow function properties as methods)', async () =>
{
    // arrange
    const configuration = new Configuration(true, true, true, true, true, false, true, membersByGroupedMemberTypeConfiguration);
    const sourceCode = await readFile(testInterfaceFilePath);
    const validOrganizedSourceCode = await readFile(testInterfaceOrganizedByGroupedMemberTypeAndTreatArrowPropertiesAsMethodsFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize interface by grouped member type (group members with decorators)', async () =>
{
    // arrange
    const configuration = new Configuration(true, true, true, true, true, true, false, membersByGroupedMemberTypeConfiguration);
    const sourceCode = await readFile(testInterfaceFilePath);
    const validOrganizedSourceCode = await readFile(testInterfaceOrganizedByGroupedMemberTypeAndGroupMembersWithDecoratorsFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});
