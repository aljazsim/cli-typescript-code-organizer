



// #region Functions (1)

import { getFileNameWithoutExtension, joinPath } from "src/helpers/file-system-helper.js";
import { defaultConfiguration, defaultConfigurationWithGroupingMembersWithDecorators, defaultConfigurationWithoutGroupingImportsBySource, defaultConfigurationWithoutRemovingUnusedImports, defaultConfigurationWithoutSeparatingImportGroups, defaultConfigurationWithoutSortingImportsByName, defaultConfigurationWithoutSortingImportsBySource, defaultConfigurationWithRegionMemberCount, defaultConfigurationWithRegionMemberCountAndCaptionInRegionEnd, defaultConfigurationWithRegions, defaultConfigurationWithSingleQuotesForImports, membersGroupedByIndividualMemberTypeConfigurationFilePath, membersGroupedByIndividualMemberTypeWithArrowPropertiesAsMethodsConfigurationFilePath, membersGroupedByIndividualMemberTypeWithDescSortingConfigurationFilePath, membersGroupedByIndividualMemberTypeWithoutSortingConfigurationFilePath, membersGroupedByIndividualMemberTypeWithPlaceAboveBelowConfigurationFilePath, membersGroupedByMultipleMemberTypeConfigurationFilePath, membersGroupedByMultipleMemberTypeWithoutGroupingConfigurationFilePath } from "test/helpers/configuration-helper.js";
import { OrganizeTestParameters } from "test/helpers/organize-test-parameters.js";

export function getOrganizeTestParameters()
{
    const configurationFilePaths = [
        defaultConfiguration,
        defaultConfigurationWithRegions,
        defaultConfigurationWithRegionMemberCount,
        defaultConfigurationWithRegionMemberCountAndCaptionInRegionEnd,
        defaultConfigurationWithGroupingMembersWithDecorators,

        defaultConfigurationWithoutRemovingUnusedImports,
        defaultConfigurationWithoutSortingImportsBySource,
        defaultConfigurationWithoutSortingImportsByName,
        defaultConfigurationWithoutGroupingImportsBySource,
        defaultConfigurationWithoutSeparatingImportGroups,
        defaultConfigurationWithSingleQuotesForImports,

        membersGroupedByIndividualMemberTypeConfigurationFilePath,
        membersGroupedByIndividualMemberTypeWithArrowPropertiesAsMethodsConfigurationFilePath,
        membersGroupedByIndividualMemberTypeWithDescSortingConfigurationFilePath,
        membersGroupedByIndividualMemberTypeWithoutSortingConfigurationFilePath,
        membersGroupedByIndividualMemberTypeWithPlaceAboveBelowConfigurationFilePath,

        membersGroupedByMultipleMemberTypeConfigurationFilePath,
        membersGroupedByMultipleMemberTypeWithoutGroupingConfigurationFilePath
    ];
    const tests = [
        { name: "class", inputFilePath: testInputClassFilePath, outputDirectoryPath: testOutputClassDirectoryPath },
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
const testOutputFunctionDirectoryPath = `${testOutputDirectoryPath}/function`;
const testOutputInterfaceDirectoryPath = `${testOutputDirectoryPath}/interface`;
const testOutputModuleDirectoryPath = `${testOutputDirectoryPath}/module`;
const testOutputTypeDirectoryPath = `${testOutputDirectoryPath}/type`;
const testOutputVariableDirectoryPath = `${testOutputDirectoryPath}/variable`;
const testInputDirectoryPath = './test/organize-files/ts-files';
const testInputClassFilePath = `${testInputDirectoryPath}/class/test-class.ts`;
const testInputFunctionFilePath = `${testInputDirectoryPath}/function/test-function.ts`;
const testInputInterfaceFilePath = `${testInputDirectoryPath}/interface/test-interface.ts`;
const testInputModuleFilePath = `${testInputDirectoryPath}/module/test-module.ts`;
const testInputTypeFilePath = `${testInputDirectoryPath}/type/test-type.ts`;
const testInputVariableFilePath = `${testInputDirectoryPath}/variable/test-variable.ts`;

// #endregion Variables (16)
