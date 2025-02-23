import { getFullPath } from "../../src/helpers/file-system-helper.js";

// #region Exported Functions (1)

export function getTestConfigurationFilePaths()
{
    const testConfigurationDirectoryPath = getFullPath('./test/configurations');

    // region configuration variations
    const defaultConfiguration = "default-configuration.json";
    const defaultConfigurationWithRegions = "default-configuration-with-regions.json";
    const defaultConfigurationWithRegionMemberCount = "default-configuration-with-region-member-count.json";
    const defaultConfigurationWithRegionMemberCountAndCaptionInRegionEnd = "default-configuration-with-region-member-count-and-caption-in-region-end.json";
    const defaultConfigurationWithGroupingMembersWithDecorators = "default-configuration-with-grouping-members-with-decorators.json";

    // import configuration variations
    const defaultConfigurationWithoutRemovingUnusedImports = "default-configuration-without-removing-unused-imports.json";
    const defaultConfigurationWithoutSortingImportsBySource = "default-configuration-without-sorting-imports-by-source.json";
    const defaultConfigurationWithoutSortingImportsByName = "default-configuration-without-sorting-imports-by-name.json";
    const defaultConfigurationWithoutGroupingImportsBySource = "default-configuration-without-grouping-imports-by-source.json";
    const defaultConfigurationWithoutSeparatingImportGroups = "default-configuration-without-separating-import-groups.json";
    const defaultConfigurationWithSingleQuotesForImports = "default-configuration-with-single-quotes-for-imports.json";
    const defaultConfigurationWithAlwaysExpandingImports = "default-configuration-with-always-expanding-imports.json";
    const defaultConfigurationWithExpandingImportsIfMoreThanOne = "default-configuration-with-expanding-imports-if-more-than-one.json";

    //  individual members configuration variations
    const membersGroupedByIndividualMemberTypeConfigurationFilePath = "members-grouped-by-individual-member-type.json";
    const membersGroupedByIndividualMemberTypeWithArrowPropertiesAsMethodsConfigurationFilePath = "members-grouped-by-individual-member-type-with-arrow-properties-as-methods.json";
    const membersGroupedByIndividualMemberTypeWithDescSortingConfigurationFilePath = "members-grouped-by-individual-member-type-with-desc-sorting.json";
    const membersGroupedByIndividualMemberTypeWithoutSortingConfigurationFilePath = "members-grouped-by-individual-member-type-without-sorting.json";
    const membersGroupedByIndividualMemberTypeWithPlaceAboveBelowConfigurationFilePath = "members-grouped-by-individual-member-type-with-place-above-below.json";

    // multiple member configuration variations
    const membersGroupedByMultipleMemberTypeWithoutGroupingConfigurationFilePath = "members-grouped-by-multiple-member-type-without-grouping.json";
    const membersGroupedByMultipleMemberTypeConfigurationFilePath = "members-grouped-by-multiple-member-type.json";

    return [
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
        defaultConfigurationWithAlwaysExpandingImports,
        defaultConfigurationWithExpandingImportsIfMoreThanOne,

        membersGroupedByIndividualMemberTypeConfigurationFilePath,
        membersGroupedByIndividualMemberTypeWithArrowPropertiesAsMethodsConfigurationFilePath,
        membersGroupedByIndividualMemberTypeWithDescSortingConfigurationFilePath,
        membersGroupedByIndividualMemberTypeWithoutSortingConfigurationFilePath,
        membersGroupedByIndividualMemberTypeWithPlaceAboveBelowConfigurationFilePath,

        membersGroupedByMultipleMemberTypeConfigurationFilePath,
        membersGroupedByMultipleMemberTypeWithoutGroupingConfigurationFilePath
    ].map(path => `${testConfigurationDirectoryPath}/${path}`);
}

// #endregion Exported Functions
