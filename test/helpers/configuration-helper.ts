// #region Exported Functions (1)

export function getTestConfigurationFilePaths()
{
    const testConfigurationDirectoryPath = './test/configurations';

    // region configuration variations
    const defaultConfiguration = `${testConfigurationDirectoryPath}/default-configuration.json`;
    const defaultConfigurationWithRegions = `${testConfigurationDirectoryPath}/default-configuration-with-regions.json`;
    const defaultConfigurationWithRegionMemberCount = `${testConfigurationDirectoryPath}/default-configuration-with-region-member-count.json`;
    const defaultConfigurationWithRegionMemberCountAndCaptionInRegionEnd = `${testConfigurationDirectoryPath}/default-configuration-with-region-member-count-and-caption-in-region-end.json`;
    const defaultConfigurationWithGroupingMembersWithDecorators = `${testConfigurationDirectoryPath}/default-configuration-with-grouping-members-with-decorators.json`;

    // import configuration variations
    const defaultConfigurationWithoutRemovingUnusedImports = `${testConfigurationDirectoryPath}/default-configuration-without-removing-unused-imports.json`;
    const defaultConfigurationWithoutSortingImportsBySource = `${testConfigurationDirectoryPath}/default-configuration-without-sorting-imports-by-source.json`;
    const defaultConfigurationWithoutSortingImportsByName = `${testConfigurationDirectoryPath}/default-configuration-without-sorting-imports-by-name.json`;
    const defaultConfigurationWithoutGroupingImportsBySource = `${testConfigurationDirectoryPath}/default-configuration-without-grouping-imports-by-source.json`;
    const defaultConfigurationWithoutSeparatingImportGroups = `${testConfigurationDirectoryPath}/default-configuration-without-separating-import-groups.json`;
    const defaultConfigurationWithSingleQuotesForImports = `${testConfigurationDirectoryPath}/default-configuration-with-single-quotes-for-imports.json`;

    // members configuration variations
    const membersGroupedByIndividualMemberTypeConfigurationFilePath = `${testConfigurationDirectoryPath}/members-grouped-by-individual-member-type.json`;
    const membersGroupedByIndividualMemberTypeWithArrowPropertiesAsMethodsConfigurationFilePath = `${testConfigurationDirectoryPath}/members-grouped-by-individual-member-type-with-arrow-properties-as-methods.json`;
    const membersGroupedByIndividualMemberTypeWithDescSortingConfigurationFilePath = `${testConfigurationDirectoryPath}/members-grouped-by-individual-member-type-with-desc-sorting.json`;
    const membersGroupedByIndividualMemberTypeWithoutSortingConfigurationFilePath = `${testConfigurationDirectoryPath}/members-grouped-by-individual-member-type-without-sorting.json`;
    const membersGroupedByIndividualMemberTypeWithPlaceAboveBelowConfigurationFilePath = `${testConfigurationDirectoryPath}/members-grouped-by-individual-member-type-with-place-above-below.json`;

    const membersGroupedByMultipleMemberTypeWithoutGroupingConfigurationFilePath = `${testConfigurationDirectoryPath}/members-grouped-by-multiple-member-type-without-grouping.json`;
    const membersGroupedByMultipleMemberTypeConfigurationFilePath = `${testConfigurationDirectoryPath}/members-grouped-by-multiple-member-type.json`;

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

        membersGroupedByIndividualMemberTypeConfigurationFilePath,
        membersGroupedByIndividualMemberTypeWithArrowPropertiesAsMethodsConfigurationFilePath,
        membersGroupedByIndividualMemberTypeWithDescSortingConfigurationFilePath,
        membersGroupedByIndividualMemberTypeWithoutSortingConfigurationFilePath,
        membersGroupedByIndividualMemberTypeWithPlaceAboveBelowConfigurationFilePath,

        membersGroupedByMultipleMemberTypeConfigurationFilePath,
        membersGroupedByMultipleMemberTypeWithoutGroupingConfigurationFilePath
    ];
}

// #endregion Exported Functions
