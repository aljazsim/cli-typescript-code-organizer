import { getConfigurationByGroupedMemberType, getConfigurationByGroupedMemberTypeWithPlaceAboveBelow, getConfigurationByIndividualMemberType, getConfigurationByIndividualMemberTypeWithArrowPropertiesAsMethods, getConfigurationByIndividualMemberTypeWithDescSorting, getConfigurationByIndividualMemberTypeWithoutMemberTypesGrouped, getConfigurationByIndividualMemberTypeWithoutSorting } from "../configurations/configuration-helpers";

import { compareFiles } from "../helpers/test-helper";
import { test } from '@jest/globals';

const testFileDirectoryPath = "test/organize-files/ts-files/type";
const testTypeFilePath = `${testFileDirectoryPath}/test-type.ts`;

const byIndividualMemberTypeFilePath = `${testFileDirectoryPath}/test-type-organized-by-individual-member-type.ts`;
const byIndividualMemberTypeWithoutRegionsFilePath = `${testFileDirectoryPath}/test-type-organized-by-individual-member-type-without-regions.ts`;
const byIndividualMemberTypeWithArrowPropertiesAsMethodsFilePath = `${testFileDirectoryPath}/members-by-individual-member-type-with-arrow-properties-as-methods.ts`;
const byIndividualMemberTypeWithoutMemberTypesGroupedFilePath = `${testFileDirectoryPath}/members-by-individual-member-type-without-member-types-grouped.ts`;
const byIndividualMemberTypeWithoutSortingFilePath = `${testFileDirectoryPath}/members-by-individual-member-type-without-sorting.ts`;
const byIndividualMemberTypeWithDescSortingFilePath = `${testFileDirectoryPath}/members-by-individual-member-type-with-desc-sorting.ts`;

const byGroupedMemberTypeFilePath = `${testFileDirectoryPath}/test-type-organized-by-grouped-member-type.ts`;
const byGroupedMemberTypeWithoutRegionsFilePath = `${testFileDirectoryPath}/test-type-organized-by-grouped-member-type-withoutRegions.ts`;
const byGroupedMemberTypeAndPlaceAboveBelowFilePath = `${testFileDirectoryPath}/test-type-organized-by-grouped-member-type-and-place-above-below.ts`;

test('organize type by individual member type', async () => await compareFiles(await getConfigurationByIndividualMemberType(), testTypeFilePath, byIndividualMemberTypeFilePath));
test('organize type by individual member type (without regions)', async () => await compareFiles(await getConfigurationByIndividualMemberType(false), testTypeFilePath, byIndividualMemberTypeWithoutRegionsFilePath));
test('organize type by individual member type (with arrow properties as methods)', async () => await compareFiles(await getConfigurationByIndividualMemberTypeWithArrowPropertiesAsMethods(), testTypeFilePath, byIndividualMemberTypeWithArrowPropertiesAsMethodsFilePath));
test('organize type by individual member type (without member types grouped)', async () => await compareFiles(await getConfigurationByIndividualMemberTypeWithoutMemberTypesGrouped(), testTypeFilePath, byIndividualMemberTypeWithoutMemberTypesGroupedFilePath));
test('organize type by individual member type (without sorting)', async () => await compareFiles(await getConfigurationByIndividualMemberTypeWithoutSorting(), testTypeFilePath, byIndividualMemberTypeWithoutSortingFilePath));
test('organize type by individual member type (with desc sorting)', async () => await compareFiles(await getConfigurationByIndividualMemberTypeWithDescSorting(), testTypeFilePath, byIndividualMemberTypeWithDescSortingFilePath));

test('organize type by grouped member type', async () => await compareFiles(await getConfigurationByGroupedMemberType(), testTypeFilePath, byGroupedMemberTypeFilePath));
test('organize type by grouped member type (without regions)', async () => await compareFiles(await getConfigurationByGroupedMemberType(false), testTypeFilePath, byGroupedMemberTypeWithoutRegionsFilePath));
test('organize type by grouped member type (with above, below)', async () => await compareFiles(await getConfigurationByGroupedMemberTypeWithPlaceAboveBelow(), testTypeFilePath, byGroupedMemberTypeAndPlaceAboveBelowFilePath));
