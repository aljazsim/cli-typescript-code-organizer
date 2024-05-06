import { Configuration } from "../../src/configuration/configuration";
import { RegionConfiguration } from "../../src/configuration/region-configuration";

// #region Functions (4)

async function getConfiguration(configurationFilePath: string, useRegions = true, addRegionIndentation = true, addMemberCountInRegionName = true, addRegionCaptionToRegionEnd = true)
{
    const configuration = await Configuration.getConfiguration(configurationFilePath);

    return new Configuration(
        new RegionConfiguration(
            useRegions,
            addRegionIndentation,
            addMemberCountInRegionName,
            addRegionCaptionToRegionEnd
        ),
        configuration.modules,
        configuration.classes,
        configuration.interfaces,
        configuration.types);
}

export async function membersByGroupedMemberTypeConfiguration(useRegions = true, addRegionIndentation = true, addMemberCountInRegionName = true, addRegionCaptionToRegionEnd = true)
{
    return getConfiguration('./members-by-grouped-member-type.json', useRegions, addRegionIndentation, addMemberCountInRegionName, addRegionCaptionToRegionEnd);
}

export async function membersByGroupedMemberTypeWithPlaceAboveBelowConfiguration(useRegions = true, addRegionIndentation = true, addMemberCountInRegionName = true, addRegionCaptionToRegionEnd = true)
{
    return getConfiguration('./members-by-grouped-member-type-with-place-above-below.json', useRegions, addRegionIndentation, addMemberCountInRegionName, addRegionCaptionToRegionEnd);
}

export async function membersByIndividualMemberTypeConfiguration(useRegions = true, addRegionIndentation = true, addMemberCountInRegionName = true, addRegionCaptionToRegionEnd = true)
{
    return getConfiguration('./members-by-individual-member-type.json', useRegions, addRegionIndentation, addMemberCountInRegionName, addRegionCaptionToRegionEnd);
}

// #endregion Functions (4)
