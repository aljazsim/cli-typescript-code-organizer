import { ClassConfiguration } from "./class-configuration";
import { ClassMemberGroupConfiguration } from "./class-member-group-configuration";
import { ClassMemberType } from "../enums/class-member-type";
import { InterfaceConfiguration } from "./interface-configuration";
import { InterfaceMemberGroupConfiguration } from "./interface-member-group-configuration";
import { InterfaceMemberType } from "../enums/interface-member-type";
import { ModuleConfiguration } from "./module-configuration";
import { ModuleMemberGroupConfiguration } from "./module-member-group-configuration";
import { ModuleMemberType } from "../enums/module-member-type";
import { RegionConfiguration } from "./region-configuration";
import { TypeConfiguration } from "./type-configuration";
import { TypeMemberGroupConfiguration } from "./type-member-group-configuration";
import { TypeMemberType } from "../enums/type-member-type";
import { convertPascalCaseToTitleCase } from "../helpers/string-helper";
import defaultConfiguration from './default-configuration.json';
import { distinct } from "../helpers/array-helper";
import { readFile } from "../helpers/file-system-helper";

export class Configuration
{
    // #region Constructors (1)

    constructor
        (
            public readonly regions: RegionConfiguration,
            public readonly modules: ModuleConfiguration,
            public readonly classes: ClassConfiguration,
            public readonly interfaces: InterfaceConfiguration,
            public readonly types: TypeConfiguration
        )
    {
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
            new RegionConfiguration
                (
                    configuration.regions?.useRegions ?? defaultConfiguration.regions.useRegions,
                    configuration.regions?.addRegionIndentation ?? defaultConfiguration.regions.addRegionIndentation,
                    configuration.regions?.addMemberCountInRegionName ?? defaultConfiguration.regions.addMemberCountInRegionName,
                    configuration.regions?.addRegionCaptionToRegionEnd ?? defaultConfiguration.regions.addRegionCaptionToRegionEnd
                ),
            new ModuleConfiguration
                (
                    configuration.modules?.order ?? defaultConfiguration.modules.order,
                    configuration.modules?.useRegions ?? defaultConfiguration.modules.useRegions,
                    this.fixModuleMemberMemberGroup(defaultConfiguration.modules.groups, configuration.modules?.groups.map(g => this.parseModuleMemberGroupConfiguration(g) ?? []))
                ),
            new ClassConfiguration
                (
                    configuration.classes?.order ?? defaultConfiguration.classes.order,
                    configuration.classes?.useRegions ?? defaultConfiguration.classes.useRegions,
                    configuration.classes?.addPublicModifierIfMissing ?? defaultConfiguration.classes.addPublicModifierIfMissing,
                    configuration.classes?.addPrivateModifierIfStartingWithHash ?? defaultConfiguration.classes.addPrivateModifierIfStartingWithHash,
                    configuration.classes?.groupMembersWithDecorators ?? defaultConfiguration.classes.groupMembersWithDecorators,
                    configuration.classes?.treatArrowFunctionPropertiesAsMethods ?? defaultConfiguration.classes.treatArrowFunctionPropertiesAsMethods,
                    this.fixClassMemberMemberGroup(defaultConfiguration.classes.groups, configuration.classes?.groups.map(g => this.parseClassMemberGroupConfiguration(g) ?? []))
                ),
            new InterfaceConfiguration
                (
                    configuration.interfaces?.order ?? defaultConfiguration.interfaces.order,
                    configuration.interfaces?.useRegions ?? defaultConfiguration.interfaces.useRegions,
                    this.fixInterfaceMemberMemberGroup(defaultConfiguration.interfaces.groups, configuration.interfaces?.groups.map(g => this.parseInterfaceMemberGroupConfiguration(g) ?? []))
                ),
            new TypeConfiguration
                (
                    configuration.types?.order ?? defaultConfiguration.types.order,
                    configuration.types?.useRegions ?? defaultConfiguration.types.useRegions,
                    this.fixTypeMemberMemberGroup(defaultConfiguration.types.groups, configuration.types?.groups.map(g => this.parseTypeMemberGroupConfiguration(g) ?? []))
                )
        );
    }

    public static getDefaultConfiguration()
    {
        return new Configuration(
            new RegionConfiguration
                (
                    defaultConfiguration.regions.useRegions,
                    defaultConfiguration.regions.addRegionIndentation,
                    defaultConfiguration.regions.addMemberCountInRegionName,
                    defaultConfiguration.regions.addRegionCaptionToRegionEnd
                ),
            new ModuleConfiguration
                (
                    defaultConfiguration.modules.order,
                    defaultConfiguration.modules.useRegions,
                    defaultConfiguration.modules.groups.map(g => this.parseModuleMemberGroupConfiguration(g))
                ),
            new ClassConfiguration
                (
                    defaultConfiguration.classes.order,
                    defaultConfiguration.classes.useRegions,
                    defaultConfiguration.classes.groups.map(g => this.parseClassMemberGroupConfiguration(g))

                ),
            new InterfaceConfiguration
                (
                    defaultConfiguration.interfaces.order,
                    defaultConfiguration.interfaces.useRegions,
                    defaultConfiguration.interfaces.groups.map(g => this.parseInterfaceMemberGroupConfiguration(g))
                ),
            new TypeConfiguration
                (
                    defaultConfiguration.types.order,
                    defaultConfiguration.types.useRegions,
                    defaultConfiguration.types.groups.map(g => this.parseTypeMemberGroupConfiguration(g))
                )
        );
    }

    // #endregion Public Static Methods (2)

    // #region Private Static Methods (8)

    private static fixClassMemberMemberGroup(defaultMemberTypeOrder: ClassMemberGroupConfiguration[], memberTypeOrder: ClassMemberGroupConfiguration[]): ClassMemberGroupConfiguration[]
    {
        const fixedMemberTypeOrder: ClassMemberGroupConfiguration[] = [];
        const defaultMemberTypes = defaultMemberTypeOrder.flatMap(mt => mt.memberTypes);
        const missingMemberTypes = defaultMemberTypes.filter(def => !memberTypeOrder.some(mt => mt.memberTypes && mt.memberTypes.length > 0 && mt.memberTypes.some(z => z === def)));

        // add existing member types
        for (const memberGroupConfiguration of memberTypeOrder) 
        {
            fixedMemberTypeOrder.push(memberGroupConfiguration);
        }

        // add missing member types (one per group)
        for (const missingMemberType of missingMemberTypes) 
        {
            fixedMemberTypeOrder.push(new ClassMemberGroupConfiguration(true, convertPascalCaseToTitleCase(ClassMemberType[missingMemberType]), [missingMemberType], [], [], true, false, false, false));
        }

        return fixedMemberTypeOrder;
    }

    private static fixInterfaceMemberMemberGroup(defaultMemberTypeOrder: InterfaceMemberGroupConfiguration[], memberTypeOrder: InterfaceMemberGroupConfiguration[]): InterfaceMemberGroupConfiguration[]
    {
        const fixedMemberTypeOrder: InterfaceMemberGroupConfiguration[] = [];
        const defaultMemberTypes = defaultMemberTypeOrder.flatMap(mt => mt.memberTypes);
        const missingMemberTypes = defaultMemberTypes.filter(def => !memberTypeOrder.some(mt => mt.memberTypes && mt.memberTypes.length > 0 && mt.memberTypes.some(z => z === def)));

        // add existing member types
        for (const memberGroupConfiguration of memberTypeOrder) 
        {
            fixedMemberTypeOrder.push(memberGroupConfiguration);
        }

        // add missing member types (one per group)
        for (const missingMemberType of missingMemberTypes) 
        {
            fixedMemberTypeOrder.push(new InterfaceMemberGroupConfiguration(true, convertPascalCaseToTitleCase(InterfaceMemberType[missingMemberType]), [missingMemberType], [], []));
        }

        return fixedMemberTypeOrder;
    }

    private static fixModuleMemberMemberGroup(defaultMemberTypeOrder: ModuleMemberGroupConfiguration[], memberTypeOrder: ModuleMemberGroupConfiguration[]): ModuleMemberGroupConfiguration[]
    {
        const fixedMemberTypeOrder: ModuleMemberGroupConfiguration[] = [];
        const defaultMemberTypes = defaultMemberTypeOrder.flatMap(mt => mt.memberTypes);
        const missingMemberTypes = defaultMemberTypes.filter(def => !memberTypeOrder.some(mt => mt.memberTypes && mt.memberTypes.length > 0 && mt.memberTypes.some(z => z === def)));

        // add existing member types
        for (const memberGroupConfiguration of memberTypeOrder) 
        {
            fixedMemberTypeOrder.push(memberGroupConfiguration);
        }

        // add missing member types (one per group)
        for (const missingMemberType of missingMemberTypes) 
        {
            fixedMemberTypeOrder.push(new ModuleMemberGroupConfiguration(true, convertPascalCaseToTitleCase(ModuleMemberType[missingMemberType]), [missingMemberType], [], []));
        }

        return fixedMemberTypeOrder;
    }

    private static fixTypeMemberMemberGroup(defaultMemberTypeOrder: TypeMemberGroupConfiguration[], memberTypeOrder: TypeMemberGroupConfiguration[]): TypeMemberGroupConfiguration[]
    {
        const fixedMemberTypeOrder: TypeMemberGroupConfiguration[] = [];
        const defaultMemberTypes = defaultMemberTypeOrder.flatMap(mt => mt.memberTypes);
        const missingMemberTypes = defaultMemberTypes.filter(def => !memberTypeOrder.some(mt => mt.memberTypes && mt.memberTypes.length > 0 && mt.memberTypes.some(z => z === def)));

        // add existing member types
        for (const memberGroupConfiguration of memberTypeOrder) 
        {
            fixedMemberTypeOrder.push(memberGroupConfiguration);
        }

        // add missing member types (one per group)
        for (const missingMemberType of missingMemberTypes) 
        {
            fixedMemberTypeOrder.push(new TypeMemberGroupConfiguration(true, convertPascalCaseToTitleCase(TypeMemberType[missingMemberType]), [missingMemberType], [], []));
        }

        return fixedMemberTypeOrder;
    }

    private static parseClassMemberGroupConfiguration(mmgc: any)
    {
        const order = mmgc.order ?? true;
        const caption = mmgc.caption ?? "Region";
        const memberTypes = distinct(mmgc.memberTypes as string[] ?? []).map(t => ClassMemberType[t as keyof typeof ClassMemberType]).filter(t => t != undefined);
        const placeAbove = distinct(mmgc.placeAbove as string[] ?? []);
        const placeBelow = distinct(mmgc.placeBelow as string[] ?? []);
        const addPublicModifierIfMissing = mmgc.addPublicModifierIfMissing ?? true;
        const addPrivateModifierIfStartingWithHash = mmgc.addPrivateModifierIfStartingWithHash ?? false;
        const groupMembersWithDecorators = mmgc.groupMembersWithDecorators ?? false;
        const treatArrowFunctionPropertiesAsMethods = mmgc.treatArrowFunctionPropertiesAsMethods ?? false;

        for (const pa of placeAbove)
        {
            if (placeBelow.indexOf(pa) > -1)
            {
                // remove and items that are present in above and below from below
                placeBelow.splice(placeBelow.indexOf(pa), 1);
            }
        }

        return new ClassMemberGroupConfiguration(order, caption, memberTypes, placeAbove, placeBelow, addPublicModifierIfMissing, addPrivateModifierIfStartingWithHash, groupMembersWithDecorators, treatArrowFunctionPropertiesAsMethods);
    }

    private static parseInterfaceMemberGroupConfiguration(mmgc: any)
    {
        const order = mmgc.order ?? true;
        const caption = mmgc.caption ?? "Region";
        const memberTypes = distinct(mmgc.memberTypes as string[] ?? []).map(t => InterfaceMemberType[t as keyof typeof InterfaceMemberType]).filter(t => t != undefined);
        const placeAbove = distinct(mmgc.placeAbove as string[] ?? []);
        const placeBelow = distinct(mmgc.placeBelow as string[] ?? []);

        for (const pa of placeAbove)
        {
            if (placeBelow.indexOf(pa) > -1)
            {
                // remove and items that are present in above and below from below
                placeBelow.splice(placeBelow.indexOf(pa), 1);
            }
        }

        return new InterfaceMemberGroupConfiguration(order, caption, memberTypes, placeAbove, placeBelow);
    }

    private static parseModuleMemberGroupConfiguration(mmgc: any)
    {
        const order = mmgc.order ?? true;
        const caption = mmgc.caption ?? "Region";
        const memberTypes = distinct(mmgc.memberTypes as string[] ?? []).map(t => ModuleMemberType[t as keyof typeof ModuleMemberType]).filter(t => t != undefined);
        const placeAbove = distinct(mmgc.placeAbove as string[] ?? []);
        const placeBelow = distinct(mmgc.placeBelow as string[] ?? []);

        for (const pa of placeAbove)
        {
            if (placeBelow.indexOf(pa) > -1)
            {
                // remove and items that are present in above and below from below
                placeBelow.splice(placeBelow.indexOf(pa), 1);
            }
        }

        return new ModuleMemberGroupConfiguration(order, caption, memberTypes, placeAbove, placeBelow);
    }

    private static parseTypeMemberGroupConfiguration(mmgc: any)
    {
        const order = mmgc.order ?? true;
        const caption = mmgc.caption ?? "Region";
        const memberTypes = distinct(mmgc.memberTypes as string[] ?? []).map(t => TypeMemberType[t as keyof typeof TypeMemberType]).filter(t => t != undefined);
        const placeAbove = distinct(mmgc.placeAbove as string[] ?? []);
        const placeBelow = distinct(mmgc.placeBelow as string[] ?? []);

        for (const pa of placeAbove)
        {
            if (placeBelow.indexOf(pa) > -1)
            {
                // remove and items that are present in above and below from below
                placeBelow.splice(placeBelow.indexOf(pa), 1);
            }
        }

        return new TypeMemberGroupConfiguration(order, caption, memberTypes, placeAbove, placeBelow);
    }

    // #endregion Private Static Methods (8)
} 