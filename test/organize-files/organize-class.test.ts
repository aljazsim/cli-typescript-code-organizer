import { expect, test } from '@jest/globals';

import { Configuration } from '../../src/configuration/configuration';
import { organizeSourceCode } from '../../src/organizer';
import { readFile } from '../../src/helpers/file-system-helper';

const testFileDirectoryPath = "./test/organize-files/ts-files/class/properties";
const testClassFilePath = `${testFileDirectoryPath}/test-class.ts`;
const testClassOrganizedFilePath = `${testFileDirectoryPath}/test-class-organized.ts`;
const testClassOrganizedWithRegionsFilePath = `${testFileDirectoryPath}/test-class-organized-with-regions.ts`;
const testClassOrganizedWithRegionsAndIndentationFilePath = `${testFileDirectoryPath}/test-class-organized-with-regions-and-indentation.ts`;
const testClassOrganizedWithRegionsAndIndentationAndMemberCountFilePath = `${testFileDirectoryPath}/test-class-organized-with-regions-and-indentation-and-member-count.ts`;
const testClassOrganizedWithRegionsAndIndentationAndMemberCountAndEndCaptionFilePath = `${testFileDirectoryPath}/test-class-organized-with-regions-and-indentation-and-member-count-and-end-caption.ts`;
const testClassOrganizedWithGroupingPropertiesWithDecoratorsFilePath = `${testFileDirectoryPath}/test-class-organized-with-grouping-properties-with-decorators.ts`;

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

test('organize class with regions', async () =>
{
    // arrange
    const configuration = new Configuration(
        true, // useRegions
        false, // addRegionIndentation
        false, // addMemberCountInRegionName
        false, // addRegionCaptionToRegionEnd
        false, // groupPropertiesWithDecorator
        false, // addPublicModifierIfMissing
        false, // treatArrowFunctionPropertiesAsMethods
        Configuration.getDefaultConfiguration().members.memberOrder); // memberOrder
    const sourceCode = await readFile(testClassFilePath);
    const validOrganizedSourceCode = await readFile(testClassOrganizedWithRegionsFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize class with regions and indentation', async () =>
{
    // arrange
    const configuration = new Configuration(
        true, // useRegions
        true, // addRegionIndentation
        false, // addMemberCountInRegionName
        false, // addRegionCaptionToRegionEnd
        false, // groupPropertiesWithDecorators
        false, // addPublicModifierIfMissing
        false, // treatArrowFunctionPropertiesAsMethods
        Configuration.getDefaultConfiguration().members.memberOrder); // memberOrder
    const sourceCode = await readFile(testClassFilePath);
    const validOrganizedSourceCode = await readFile(testClassOrganizedWithRegionsAndIndentationFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize class with regions and indentation and member count', async () =>
{
    // arrange
    const configuration = new Configuration(
        true, // useRegions
        true, // addRegionIndentation
        true, // addMemberCountInRegionName
        false, // addRegionCaptionToRegionEnd
        false, // groupPropertiesWithDecorators
        false, // addPublicModifierIfMissing
        false, // treatArrowFunctionPropertiesAsMethods
        Configuration.getDefaultConfiguration().members.memberOrder); // memberOrder
    const sourceCode = await readFile(testClassFilePath);
    const validOrganizedSourceCode = await readFile(testClassOrganizedWithRegionsAndIndentationAndMemberCountFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize class with regions and indentation and member count and end caption', async () =>
{
    // arrange
    const configuration = new Configuration(
        true, // useRegions
        true, // addRegionIndentation
        true, // addMemberCountInRegionName
        true, // addRegionCaptionToRegionEnd
        false, // groupPropertiesWithDecorators
        false, // addPublicModifierIfMissing
        false, // treatArrowFunctionPropertiesAsMethods
        Configuration.getDefaultConfiguration().members.memberOrder); // memberOrder
    const sourceCode = await readFile(testClassFilePath);
    const validOrganizedSourceCode = await readFile(testClassOrganizedWithRegionsAndIndentationAndMemberCountAndEndCaptionFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});

test('organize class with grouping properties with decorators', async () =>
{
    // arrange
    const configuration = new Configuration(
        true, // useRegions
        true, // addRegionIndentation
        true, // addMemberCountInRegionName
        true, // addRegionCaptionToRegionEnd
        false, // groupPropertiesWithDecorators
        false, // addPublicModifierIfMissing
        false, // treatArrowFunctionPropertiesAsMethods
        Configuration.getDefaultConfiguration().members.memberOrder); // memberOrder
    const sourceCode = await readFile(testClassFilePath);
    const validOrganizedSourceCode = await readFile(testClassOrganizedWithGroupingPropertiesWithDecoratorsFilePath);

    // act
    const organizedSourceCode = organizeSourceCode("test.ts", sourceCode, configuration);

    // assert
    expect(organizedSourceCode).toBe(validOrganizedSourceCode);
});