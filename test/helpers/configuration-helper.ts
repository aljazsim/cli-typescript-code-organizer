import { ClassConfiguration } from "../../src/configuration/class-configuration";
import { Configuration } from "../../src/configuration/configuration";
import { InterfaceConfiguration } from "../../src/configuration/interface-configuration";
import { ModuleConfiguration } from "../../src/configuration/module-configuration";
import { RegionConfiguration } from "../../src/configuration/region-configuration";
import { TypeConfiguration } from "../../src/configuration/type-configuration";

// #region Functions (8)

export async function getByGrouped(useRegions = true, addRegionIndentation = true, addMemberCountInRegionName = true, addRegionCaptionToRegionEnd = true)
{
    return getConfiguration('./test/configurations/members-by-grouped-member-type.json', useRegions, addRegionIndentation, addMemberCountInRegionName, addRegionCaptionToRegionEnd);
}

export async function getByGroupedWithPlaceAboveBelow(useRegions = true, addRegionIndentation = true, addMemberCountInRegionName = true, addRegionCaptionToRegionEnd = true)
{
    return getConfiguration('./test/configurations/members-by-grouped-member-type-with-place-above-below.json', useRegions, addRegionIndentation, addMemberCountInRegionName, addRegionCaptionToRegionEnd);
}

export async function getByIndividual(useRegions = true, addRegionIndentation = true, addMemberCountInRegionName = true, addRegionCaptionToRegionEnd = true)
{
    return getConfiguration('./test/configurations/members-by-individual-member-type.json', useRegions, addRegionIndentation, addMemberCountInRegionName, addRegionCaptionToRegionEnd);
}

export async function getByIndividualWithArrowPropertiesAsMethods(useRegions = true, addRegionIndentation = true, addMemberCountInRegionName = true, addRegionCaptionToRegionEnd = true)
{
    return getConfiguration('./test/configurations/members-by-individual-member-type-with-arrow-properties-as-methods.json', useRegions, addRegionIndentation, addMemberCountInRegionName, addRegionCaptionToRegionEnd);
}

export async function getByIndividualWithDescSorting(useRegions = true, addRegionIndentation = true, addMemberCountInRegionName = true, addRegionCaptionToRegionEnd = true)
{
    return getConfiguration('./test/configurations/members-by-individual-member-type-with-desc-sorting.json', useRegions, addRegionIndentation, addMemberCountInRegionName, addRegionCaptionToRegionEnd);
}

export async function getByIndividualWithoutMemberTypesGrouped(useRegions = true, addRegionIndentation = true, addMemberCountInRegionName = true, addRegionCaptionToRegionEnd = true)
{
    return getConfiguration('./test/configurations/members-by-individual-member-type-without-member-types-grouped.json', useRegions, addRegionIndentation, addMemberCountInRegionName, addRegionCaptionToRegionEnd);
}

export async function getByIndividualWithoutSorting(useRegions = true, addRegionIndentation = true, addMemberCountInRegionName = true, addRegionCaptionToRegionEnd = true)
{
    return getConfiguration('./test/configurations/members-by-individual-member-type-without-sorting.json', useRegions, addRegionIndentation, addMemberCountInRegionName, addRegionCaptionToRegionEnd);
}

async function getConfiguration(configurationFilePath: string, useRegions = true, addRegionIndentation = true, addMemberCountInRegionName = true, addRegionCaptionToRegionEnd = true)
{
    const configuration = await Configuration.getConfiguration(configurationFilePath);

    return new Configuration(
        new ModuleConfiguration(
            new RegionConfiguration(
                useRegions,
                addRegionIndentation,
                addMemberCountInRegionName,
                addRegionCaptionToRegionEnd),
            configuration.modules.members,
            configuration.modules.memberGroups),
        new ClassConfiguration(
            new RegionConfiguration(
                useRegions,
                addRegionIndentation,
                addMemberCountInRegionName,
                addRegionCaptionToRegionEnd),
            configuration.classes.members,
            configuration.classes.memberGroups),
        new InterfaceConfiguration(
            new RegionConfiguration(
                useRegions,
                addRegionIndentation,
                addMemberCountInRegionName,
                addRegionCaptionToRegionEnd),
            configuration.interfaces.members,
            configuration.interfaces.memberGroups),
        new TypeConfiguration(
            new RegionConfiguration(
                useRegions,
                addRegionIndentation,
                addMemberCountInRegionName,
                addRegionCaptionToRegionEnd),
            configuration.types.members,
            configuration.types.memberGroups));
}

// #endregion Functions (8)
