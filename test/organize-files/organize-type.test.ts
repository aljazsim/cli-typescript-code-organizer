import { getByGrouped, getByGroupedWithPlaceAboveBelow, getByIndividual, getByIndividualWithArrowPropertiesAsMethods, getByIndividualWithDescSorting, getByIndividualWithoutMemberTypesGrouped, getByIndividualWithoutSorting } from "../helpers/configuration-helper";

import { compare } from "../helpers/test-helper";
import { test } from '@jest/globals';

const testFileDirectoryPath = "test/organize-files/ts-files/type";
const testInput = `${testFileDirectoryPath}/test-type.ts`;

const byIndividual = `${testFileDirectoryPath}/by-individual-member-type.ts`;
const byIndividualWithoutRegions = `${testFileDirectoryPath}/by-individual-member-type-without-regions.ts`;
const byIndividualWithArrowPropertiesAsMethods = `${testFileDirectoryPath}/by-individual-member-type-with-arrow-properties-as-methods.ts`;
const byIndividualWithoutMemberTypesGrouped = `${testFileDirectoryPath}/by-individual-member-type-without-member-types-grouped.ts`;
const byIndividualWithoutSorting = `${testFileDirectoryPath}/by-individual-member-type-without-sorting.ts`;
const byIndividualWithDescSorting = `${testFileDirectoryPath}/by-individual-member-type-with-desc-sorting.ts`;

const byGrouped = `${testFileDirectoryPath}/by-grouped-member-type.ts`;
const byGroupedWithoutRegions = `${testFileDirectoryPath}/by-grouped-member-type-without-regions.ts`;
const byGroupedAndPlaceAboveBelow = `${testFileDirectoryPath}/by-grouped-member-type-and-place-above-below.ts`;

test('organize type by individual member type', async () => await compare(await getByIndividual(), testInput, byIndividual));
test('organize type by individual member type (without regions)', async () => await compare(await getByIndividual(false), testInput, byIndividualWithoutRegions));
test('organize type by individual member type (with arrow properties as methods)', async () => await compare(await getByIndividualWithArrowPropertiesAsMethods(), testInput, byIndividualWithArrowPropertiesAsMethods));
test('organize type by individual member type (without member types grouped)', async () => await compare(await getByIndividualWithoutMemberTypesGrouped(), testInput, byIndividualWithoutMemberTypesGrouped));
test('organize type by individual member type (without sorting)', async () => await compare(await getByIndividualWithoutSorting(), testInput, byIndividualWithoutSorting));
test('organize type by individual member type (with desc sorting)', async () => await compare(await getByIndividualWithDescSorting(), testInput, byIndividualWithDescSorting));

test('organize type by grouped member type', async () => await compare(await getByGrouped(), testInput, byGrouped));
test('organize type by grouped member type (without regions)', async () => await compare(await getByGrouped(false), testInput, byGroupedWithoutRegions));
test('organize type by grouped member type (with above, below)', async () => await compare(await getByGroupedWithPlaceAboveBelow(), testInput, byGroupedAndPlaceAboveBelow));
