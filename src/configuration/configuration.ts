import { ElementNodeGroupConfiguration } from "./element-node-group-configuration";
import { MemberConfigurationConfiguration } from "./member-configuration";
import { MemberType } from "../member-type";
import { RegionConfiguration } from "./region-configuration";
import { convertPascalCaseToTitleCase } from "../helpers/string-helper";
import defaultConfiguration from './default-configuration.json';
import { distinct } from "../helpers/array-helper";
import { readFile } from "../helpers/file-system-helper";

export class Configuration
{
    // #region Properties (4)

    public readonly members: MemberConfigurationConfiguration;
    public readonly regions: RegionConfiguration;

    // #endregion Properties (4)

    // #region Constructors (1)

    constructor
        (
            useRegions: boolean,
            addRegionIndentation: boolean,
            addMemberCountInRegionName: boolean,
            addRegionCaptionToRegionEnd: boolean,
            addPublicModifierIfMissing: boolean,
            groupMembersWithDecorators: boolean,
            treatArrowFunctionPropertiesAsMethods: boolean,
            memberOrder: ElementNodeGroupConfiguration[]
        )
    {
        this.regions = new RegionConfiguration(useRegions, addRegionIndentation, addMemberCountInRegionName, addRegionCaptionToRegionEnd);
        this.members = new MemberConfigurationConfiguration(addPublicModifierIfMissing, groupMembersWithDecorators, treatArrowFunctionPropertiesAsMethods, memberOrder);
    }

    // #endregion Constructors (1)

    // #region Public Static Methods (2)

    public static async getConfiguration(configurationFilePath: string | null)
    {
        let defaultConfiguration = await this.getDefaultConfiguration();
        let configuration = defaultConfiguration;

        try
        {
            if (configurationFilePath)
            {
                configuration = JSON.parse(await readFile(configurationFilePath));
            }
        }
        catch
        {
        }

        return new Configuration(
            configuration.regions.useRegions,
            configuration.regions.addRegionIndentation,
            configuration.regions.addMemberCountInRegionName,
            configuration.regions.addRegionCaptionToRegionEnd,
            configuration.members.addPublicModifierIfMissing,
            configuration.members.groupMembersWithDecorators,
            configuration.members.treatArrowFunctionPropertiesAsMethods,
            this.fixMemberOrderConfig(defaultConfiguration.members.memberOrder, configuration.members.memberOrder)
        );
    }

    public static getDefaultConfiguration()
    {
        return new Configuration(
            defaultConfiguration.regions.useRegions,
            defaultConfiguration.regions.addRegionIndentation,
            defaultConfiguration.regions.addMemberCountInRegionName,
            defaultConfiguration.regions.addRegionCaptionToRegionEnd,
            defaultConfiguration.accessModifiers.addPublicModifierIfMissing,
            defaultConfiguration.members.groupMembersWithDecorators,
            defaultConfiguration.members.treatArrowFunctionPropertiesAsMethods,
            defaultConfiguration.members.memberOrder.map(mo => this.parseElementNodeGroupConfiguration(mo))
        );
    }

    // #endregion Public Static Methods (2)

    // #region Private Static Methods (2)

    private static fixMemberOrderConfig(defaultMemberTypeOrder: ElementNodeGroupConfiguration[], memberTypeOrder: ElementNodeGroupConfiguration[]): ElementNodeGroupConfiguration[]
    {
        const fixedMemberTypeOrder: ElementNodeGroupConfiguration[] = [];
        const defaultMemberTypes = defaultMemberTypeOrder.flatMap(dmto => dmto.memberTypes); // same order as in the enum

        // map member type order from configuration
        (memberTypeOrder ?? []).forEach((mTo: any) => fixedMemberTypeOrder.push(this.parseElementNodeGroupConfiguration(mTo)));

        // add missing member types (one per group, prevent duplicated values)
        defaultMemberTypes
            .filter(dmt => !fixedMemberTypeOrder.some(fmto => fmto.memberTypes && fmto.memberTypes.length > 0 && fmto.memberTypes.some(z => z === dmt)))
            .forEach(dmt =>
            {
                const defaultElementNodeGroupConfiguration = new ElementNodeGroupConfiguration();

                defaultElementNodeGroupConfiguration.caption = convertPascalCaseToTitleCase(MemberType[dmt]);
                defaultElementNodeGroupConfiguration.memberTypes = [dmt];
                defaultElementNodeGroupConfiguration.placeAbove = [];
                defaultElementNodeGroupConfiguration.placeBelow = [];

                fixedMemberTypeOrder.push(defaultElementNodeGroupConfiguration);
            });

        return fixedMemberTypeOrder;
    }

    private static parseElementNodeGroupConfiguration(x: any)
    {
        let elementNodeGroupConfiguration = new ElementNodeGroupConfiguration();

        elementNodeGroupConfiguration.caption = x.caption;
        elementNodeGroupConfiguration.memberTypes = distinct(x.memberTypes as string[] ?? []).map(y => MemberType[y as keyof typeof MemberType]);
        elementNodeGroupConfiguration.placeAbove = distinct(x.placeAbove as string[] ?? []);
        elementNodeGroupConfiguration.placeBelow = distinct(x.placeBelow as string[] ?? []);

        return elementNodeGroupConfiguration;
    }

    // #endregion Private Static Methods (2)
} 