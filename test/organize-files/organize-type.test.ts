import { expect, test } from '@jest/globals';
import { membersByGroupedMemberTypeConfiguration, membersByGroupedMemberTypeWithPlaceAboveBelowConfiguration, membersByIndividualMemberTypeConfiguration } from '../configurations/configuration-helpers';
import { readFile, writeFile } from '../../src/helpers/file-system-helper';

import { Configuration } from '../../src/configuration/configuration';
import { SourceCodeOrganizer } from "../../src/source-code/source-code-organizer";

const testFileDirectoryPath = "test/organize-files/ts-files/type";
const testTypeFilePath = `${testFileDirectoryPath}/test-type.ts`;
const testTypeOrganizedByIndividualMemberTypeFilePath = `${testFileDirectoryPath}/test-type-organized-by-individual-member-type.ts`;
const testTypeOrganizedByIndividualMemberTypeFilePath2 = `${testFileDirectoryPath}/test-type-organized-by-individual-member-type.ts.xxx`;
const testTypeOrganizedByGroupedMemberTypeFilePath = `${testFileDirectoryPath}/test-type-organized-by-grouped-member-type.ts`;
const testTypeOrganizedByIndividualMemberTypeWithoutRegionsFilePath = `${testFileDirectoryPath}/test-type-organized-by-individual-member-type-without-regions.ts`;
const testTypeOrganizedByGroupedMemberTypeAndPlaceAboveBelowFilePath = `${testFileDirectoryPath}/test-type-organized-by-grouped-member-type-and-place-above-below.ts`;
const testTypeOrganizedByGroupedMemberTypeAndTreatArrowPropertiesAsMethodsFilePath = `${testFileDirectoryPath}/test-type-organized-by-grouped-member-type-and-treat-arrow-properties-as-methods.ts`;
const testTypeOrganizedByGroupedMemberTypeAndGroupMembersWithDecoratorsFilePath = `${testFileDirectoryPath}/test-type-organized-by-grouped-member-type-and-group-members-with-decorators.ts`;

test('organize type by individual member type', async () =>
{
    // arrange
    const configuration = await membersByIndividualMemberTypeConfiguration();
    const sourceCode = await readFile(testTypeFilePath);
    // const validOrganizedSourceCode = await readFile(testTypeOrganizedByIndividualMemberTypeFilePath);

    // act
    const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);
    await writeFile(testTypeOrganizedByIndividualMemberTypeFilePath2, organizedSourceCode);

    // assert
    // expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

// test('organize type by grouped member type', async () =>
// {
//     // arrange
//     const configuration = await membersByGroupedMemberTypeConfiguration();
//     const sourceCode = await readFile(testTypeFilePath);
//     const validOrganizedSourceCode = await readFile(testTypeOrganizedByGroupedMemberTypeFilePath);

//     // act
//     const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);
//     // await writeFile(testTypeOrganizedByGroupedMemberTypeFilePath, organizedSourceCode);

//     // assert
//     expect(organizedSourceCode).toBe(validOrganizedSourceCode);
// });

// test('organize type by individual member type (without regions)', async () =>
// {
//     // arrange
//     const configurations = [
//         await membersByIndividualMemberTypeConfiguration(),
//         await membersByIndividualMemberTypeConfiguration(),
//         await membersByIndividualMemberTypeConfiguration(),
//         await membersByIndividualMemberTypeConfiguration(),
//         await membersByIndividualMemberTypeConfiguration(),
//         await membersByIndividualMemberTypeConfiguration(),
//         await membersByIndividualMemberTypeConfiguration(),
//         await membersByIndividualMemberTypeConfiguration()
//     ];
//     const sourceCode = await readFile(testTypeFilePath);
//     const validOrganizedSourceCode = await readFile(testTypeOrganizedByIndividualMemberTypeWithoutRegionsFilePath);

//     for (const configuration of configurations)
//     {
//         // act
//         const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);
//         // await writeFile(testTypeOrganizedByIndividualMemberTypeWithoutRegionsFilePath, organizedSourceCode);

//         // assert
//         expect(organizedSourceCode).toBe(validOrganizedSourceCode);
//     }
// });

// test('organize type by grouped member type (place above below)', async () =>
// {
//     // arrange
//     const configuration = await membersByGroupedMemberTypeWithPlaceAboveBelowConfiguration();
//     const sourceCode = await readFile(testTypeFilePath);
//     const validOrganizedSourceCode = await readFile(testTypeOrganizedByGroupedMemberTypeAndPlaceAboveBelowFilePath);

//     // act
//     const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);
//     // await writeFile(testTypeOrganizedByGroupedMemberTypeAndPlaceAboveBelowFilePath, organizedSourceCode);

//     // assert
//     expect(organizedSourceCode).toBe(validOrganizedSourceCode);
// });

// test('organize type by grouped member type (treat arrow function properties as methods)', async () =>
// {
//     // arrange
//     const configuration = await membersByGroupedMemberTypeConfiguration();
//     const sourceCode = await readFile(testTypeFilePath);
//     const validOrganizedSourceCode = await readFile(testTypeOrganizedByGroupedMemberTypeAndTreatArrowPropertiesAsMethodsFilePath);

//     // act
//     const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);
//     // await writeFile(testTypeOrganizedByGroupedMemberTypeAndTreatArrowPropertiesAsMethodsFilePath, organizedSourceCode);

//     // assert
//     expect(organizedSourceCode).toBe(validOrganizedSourceCode);
// });

// test('organize type by grouped member type (group members with decorators)', async () =>
// {
//     // arrange
//     const configuration = await membersByGroupedMemberTypeConfiguration();
//     const sourceCode = await readFile(testTypeFilePath);
//     const validOrganizedSourceCode = await readFile(testTypeOrganizedByGroupedMemberTypeAndGroupMembersWithDecoratorsFilePath);

//     // act
//     const organizedSourceCode = SourceCodeOrganizer.organizeSourceCode(sourceCode, configuration);
//     // await writeFile(testTypeOrganizedByGroupedMemberTypeAndGroupMembersWithDecoratorsFilePath, organizedSourceCode);

//     // assert
//     expect(organizedSourceCode).toBe(validOrganizedSourceCode);
// });
