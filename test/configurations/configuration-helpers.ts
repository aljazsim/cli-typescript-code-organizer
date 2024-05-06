import { Configuration } from "../../src/configuration/configuration";
import { RegionConfiguration } from "../../src/configuration/region-configuration";

// #region Functions (1)

export async function membersByIndividualMemberTypeConfiguration(useRegions = true, addRegionIndentation = true, addMemberCountInRegionName = true, addRegionCaptionToRegionEnd = true)
{
    const configuration = await Configuration.getConfiguration('./members-by-individual-member-type.json');

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

// #endregion Functions (1)

// #region Variables (2)

export const membersByGroupedMemberTypeConfiguration = async () => await Configuration.getConfiguration('./members-by-grouped-member-type.json');
export const membersByGroupedMemberTypeWithPlaceAboveBelowConfiguration = async () => await Configuration.getConfiguration('./members-by-grouped-member-type-with-place-above-below.json');

// #endregion Variables (2)
