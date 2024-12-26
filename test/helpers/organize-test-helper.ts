import { getFileNameWithoutExtension, joinPath } from "../../src/helpers/file-system-helper";
import { defaultConfigurationFilePath, getConfiguration, membersGroupedByIndividualMemberTypeConfigurationFilePath, membersGroupedByIndividualMemberTypeWithArrowPropertiesAsMethodsConfigurationFilePath, membersGroupedByIndividualMemberTypeWithDescSortingConfigurationFilePath, membersGroupedByIndividualMemberTypeWithoutMemberTypesGroupedConfigurationFilePath, membersGroupedByIndividualMemberTypeWithoutSortingConfigurationFilePath, membersGroupedByIndividualMemberTypeWithPlaceAboveBelowConfigurationFilePath, membersGroupedByMultipleMemberTypeConfigurationFilePath } from "./configuration-helper";
import { OrganizeTestParameters } from "./organize-test-parameters";

// #region Functions (1)

export function getOrganizeTestParameters()
{
    const configurationFilePaths = [
        defaultConfigurationFilePath,
        membersGroupedByIndividualMemberTypeConfigurationFilePath,
        membersGroupedByIndividualMemberTypeWithoutMemberTypesGroupedConfigurationFilePath,
        membersGroupedByIndividualMemberTypeWithArrowPropertiesAsMethodsConfigurationFilePath,
        membersGroupedByIndividualMemberTypeWithDescSortingConfigurationFilePath,
        membersGroupedByIndividualMemberTypeWithPlaceAboveBelowConfigurationFilePath,
        membersGroupedByIndividualMemberTypeWithoutSortingConfigurationFilePath,
        membersGroupedByMultipleMemberTypeConfigurationFilePath
    ];
    const tests = [
        { name: "class", inputFilePath: testInputClassFilePath, outputDirectoryPath: testOutputClassDirectoryPath },
        { name: "expression", inputFilePath: testInputExpressionFilePath, outputDirectoryPath: testOutputExpressionDirectoryPath },
        { name: "function", inputFilePath: testInputFunctionFilePath, outputDirectoryPath: testOutputFunctionDirectoryPath },
        { name: "interface", inputFilePath: testInputInterfaceFilePath, outputDirectoryPath: testOutputInterfaceDirectoryPath },
        { name: "module", inputFilePath: testInputModuleFilePath, outputDirectoryPath: testOutputModuleDirectoryPath },
        { name: "type", inputFilePath: testInputTypeFilePath, outputDirectoryPath: testOutputTypeDirectoryPath },
        { name: "variable", inputFilePath: testInputVariableFilePath, outputDirectoryPath: testOutputVariableDirectoryPath }
    ];
    const regionConfiguration = [
        { useRegions: false, addRegionIndentation: false, addMemberCountInRegionName: false, addRegionCaptionToRegionEnd: false },
        { useRegions: true, addRegionIndentation: false, addMemberCountInRegionName: false, addRegionCaptionToRegionEnd: false },
        { useRegions: true, addRegionIndentation: true, addMemberCountInRegionName: false, addRegionCaptionToRegionEnd: false },
        { useRegions: true, addRegionIndentation: true, addMemberCountInRegionName: true, addRegionCaptionToRegionEnd: false },
        { useRegions: true, addRegionIndentation: true, addMemberCountInRegionName: false, addRegionCaptionToRegionEnd: true },
        { useRegions: true, addRegionIndentation: true, addMemberCountInRegionName: true, addRegionCaptionToRegionEnd: true }
    ];
    const memberOrganizeParameters: OrganizeTestParameters[] = [];

    for (const test of tests)
    {
        for (const configurationFilePath of configurationFilePaths)
        {
            for (const { useRegions, addRegionIndentation, addMemberCountInRegionName, addRegionCaptionToRegionEnd } of regionConfiguration)
            {
                const description = `organize ${test.name}: ${getFileNameWithoutExtension(configurationFilePath).replaceAll("-", " ")} (${useRegions ? "regions" : "no regions"}, ${addRegionIndentation ? "region indentation" : "no region indentation"}, ${addMemberCountInRegionName ? "member count in region name" : "no member count in region name"}, ${addRegionCaptionToRegionEnd ? "region caption in region end" : "region caption in region end"})`;
                const inputFilePath = test.inputFilePath;
                const outputDirectoryPath = test.outputDirectoryPath;
                const outputFilePathParameters = `-${useRegions}-${addRegionIndentation}-${addMemberCountInRegionName}-${addRegionCaptionToRegionEnd}`
                const outputFilePath = joinPath(outputDirectoryPath, getFileNameWithoutExtension(configurationFilePath) + outputFilePathParameters + ".ts");

                memberOrganizeParameters.push(new OrganizeTestParameters(description, configurationFilePath, inputFilePath, outputFilePath, useRegions, addRegionIndentation, addMemberCountInRegionName, addRegionCaptionToRegionEnd));
            }
        }
    }

    return memberOrganizeParameters;
}

// #endregion Functions (1)

// #region Variables (16)

const testOutputDirectoryPath = "./test/organize-files/ts-files";
const testOutputClassDirectoryPath = `${testOutputDirectoryPath}/class`;
const testOutputExpressionDirectoryPath = `${testOutputDirectoryPath}/expression`;
const testOutputFunctionDirectoryPath = `${testOutputDirectoryPath}/function`;
const testOutputInterfaceDirectoryPath = `${testOutputDirectoryPath}/interface`;
const testOutputModuleDirectoryPath = `${testOutputDirectoryPath}/module`;
const testOutputTypeDirectoryPath = `${testOutputDirectoryPath}/type`;
const testOutputVariableDirectoryPath = `${testOutputDirectoryPath}/variable`;
const testInputDirectoryPath = './test/organize-files/ts-files';
const testInputClassFilePath = `${testInputDirectoryPath}/class/test-class.ts`;
const testInputExpressionFilePath = `${testInputDirectoryPath}/expression/test-expression.ts`;
const testInputFunctionFilePath = `${testInputDirectoryPath}/function/test-function.ts`;
const testInputInterfaceFilePath = `${testInputDirectoryPath}/interface/test-interface.ts`;
const testInputModuleFilePath = `${testInputDirectoryPath}/module/test-module.ts`;
const testInputTypeFilePath = `${testInputDirectoryPath}/type/test-type.ts`;
const testInputVariableFilePath = `${testInputDirectoryPath}/variable/test-variable.ts`;

// #endregion Variables (16)
