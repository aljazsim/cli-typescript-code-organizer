import { getFileNameWithoutExtension, joinPath } from "../../src/helpers/file-system-helper.js";
import { getTestConfigurationFilePaths } from "./configuration-helper.js";
import { OrganizeTestParameters } from "./organize-test-parameters.js";

// #region Exported Functions (2)

export function getOrganizeSpecialCaseTestParameters()
{
    const specialTestCaseOutputDirectoryPath = "./test/organize-files/special-cases";
    const specialTestCase1tOutput = `${specialTestCaseOutputDirectoryPath}/special-test-case-1`;

    const specialTestCaseInputDirectoryPath = './test/organize-files/special-cases';
    const specialTestCase1Input = `${specialTestCaseInputDirectoryPath}/special-test-case-1/special-test-case-1.ts`;

    const tests = [
        { name: "Special Test Case 1", inputFilePath: specialTestCase1Input, outputDirectoryPath: specialTestCase1tOutput },
    ];
    const memberOrganizeParameters: OrganizeTestParameters[] = [];

    for (const test of tests)
    {
        for (const configurationFilePath of getTestConfigurationFilePaths())
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

export function getOrganizeTestParameters()
{
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
        for (const configurationFilePath of getTestConfigurationFilePaths())
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

// #endregion Exported Functions
