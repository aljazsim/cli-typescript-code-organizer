import { getFileNameWithoutExtension, joinPath } from "../../src/helpers/file-system-helper";
import { defaultConfigurationWithNoRegions, defaultConfigurationWithRegionMemberCount, defaultConfigurationWithRegionMemberCountAndCaptionInRegionEnd, defaultConfigurationWithRegions, membersGroupedByIndividualMemberTypeConfigurationFilePath, membersGroupedByIndividualMemberTypeWithArrowPropertiesAsMethodsConfigurationFilePath, membersGroupedByIndividualMemberTypeWithDescSortingConfigurationFilePath, membersGroupedByIndividualMemberTypeWithoutMemberTypesGroupedConfigurationFilePath, membersGroupedByIndividualMemberTypeWithoutSortingConfigurationFilePath, membersGroupedByIndividualMemberTypeWithPlaceAboveBelowConfigurationFilePath, membersGroupedByMultipleMemberTypeConfigurationFilePath } from "./configuration-helper";
import { OrganizeTestParameters } from "./organize-test-parameters";

// #region Functions (1)

export function getOrganizeTestParameters()
{
    const configurationFilePaths = [
        defaultConfigurationWithNoRegions,
        defaultConfigurationWithRegions,
        defaultConfigurationWithRegionMemberCount,
        defaultConfigurationWithRegionMemberCountAndCaptionInRegionEnd,
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
    const memberOrganizeParameters: OrganizeTestParameters[] = [];

    for (const test of tests)
    {
        for (const configurationFilePath of configurationFilePaths)
        {
            const description = `organize ${test.name}: ${getFileNameWithoutExtension(configurationFilePath).replaceAll("-", " ")}`;
            const inputFilePath = test.inputFilePath;
            const outputDirectoryPath = test.outputDirectoryPath;
            const outputFilePath = joinPath(outputDirectoryPath, getFileNameWithoutExtension(configurationFilePath) + ".ts");

            memberOrganizeParameters.push(new OrganizeTestParameters(description, configurationFilePath, inputFilePath, outputFilePath));
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
