import { ClassConfiguration } from "../../src/configuration/class-configuration";
import { Configuration } from "../../src/configuration/configuration";
import { InterfaceConfiguration } from "../../src/configuration/interface-configuration";
import { ModuleConfiguration } from "../../src/configuration/module-configuration";
import { RegionConfiguration } from "../../src/configuration/region-configuration";
import { TypeConfiguration } from "../../src/configuration/type-configuration";

// #region Functions (1)

export async function getConfiguration(configurationFilePath: string, useRegions: boolean,
    addRegionIndentation: boolean,
    addMemberCountInRegionName: boolean,
    addRegionCaptionToRegionEnd: boolean)
{
    const configuration = await Configuration.getConfiguration(configurationFilePath);
    const regionConfiguration = new RegionConfiguration(useRegions, addRegionIndentation, addMemberCountInRegionName, addRegionCaptionToRegionEnd);
    const moduleConfiguration = new ModuleConfiguration(regionConfiguration, configuration.modules.members, configuration.modules.memberGroups);
    const classConfiguration = new ClassConfiguration(regionConfiguration, configuration.classes.members, configuration.classes.memberGroups);
    const interfaceConfiguration = new InterfaceConfiguration(regionConfiguration, configuration.interfaces.members, configuration.interfaces.memberGroups);
    const typeConfiguration = new TypeConfiguration(regionConfiguration, configuration.types.members, configuration.types.memberGroups);

    return new Configuration(moduleConfiguration, classConfiguration, interfaceConfiguration, typeConfiguration);
}

// #endregion Functions (1)

// #region Variables (9)

export const testConfigurationDirectoryPath = './test/configurations';
export const defaultConfigurationFilePath = `./src/configuration/default-configuration.json`;
export const membersGroupedByIndividualMemberTypeWithoutMemberTypesGroupedConfigurationFilePath = `${testConfigurationDirectoryPath}/members-grouped-by-individual-member-type-without-member-types-grouped.json`;
export const membersGroupedByIndividualMemberTypeConfigurationFilePath = `${testConfigurationDirectoryPath}/members-grouped-by-individual-member-type.json`;
export const membersGroupedByIndividualMemberTypeWithArrowPropertiesAsMethodsConfigurationFilePath = `${testConfigurationDirectoryPath}/members-grouped-by-individual-member-type-with-arrow-properties-as-methods.json`;
export const membersGroupedByIndividualMemberTypeWithDescSortingConfigurationFilePath = `${testConfigurationDirectoryPath}/members-grouped-by-individual-member-type-with-desc-sorting.json`;
export const membersGroupedByIndividualMemberTypeWithPlaceAboveBelowConfigurationFilePath = `${testConfigurationDirectoryPath}/members-grouped-by-individual-member-type-with-place-above-below.json`;
export const membersGroupedByIndividualMemberTypeWithoutSortingConfigurationFilePath = `${testConfigurationDirectoryPath}/members-grouped-by-individual-member-type-without-sorting.json`;
export const membersGroupedByMultipleMemberTypeConfigurationFilePath = `${testConfigurationDirectoryPath}/members-grouped-by-multiple-member-type.json`;

// #endregion Variables (9)
