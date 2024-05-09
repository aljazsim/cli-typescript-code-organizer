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
        catch (error)
        {
            console.error(error);
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
                    this.fixModuleMemberMemberGroup(defaultConfiguration.modules.groups, configuration.modules?.groups.map(g => this.parseModuleMemberGroupConfiguration(g) ?? []))
                ),
            new ClassConfiguration
                (
                    configuration.classes?.addPublicModifierIfMissing ?? defaultConfiguration.classes.addPublicModifierIfMissing,
                    configuration.classes?.addPrivateModifierIfStartingWithHash ?? defaultConfiguration.classes.addPrivateModifierIfStartingWithHash,
                    configuration.classes?.groupMembersWithDecorators ?? defaultConfiguration.classes.groupMembersWithDecorators,
                    configuration.classes?.treatArrowFunctionPropertiesAsMethods ?? defaultConfiguration.classes.treatArrowFunctionPropertiesAsMethods,
                    this.fixClassMemberMemberGroup(defaultConfiguration.classes.groups, configuration.classes?.groups.map(g => this.parseClassMemberGroupConfiguration(g) ?? []))
                ),
            new InterfaceConfiguration
                (
                    this.fixInterfaceMemberMemberGroup(defaultConfiguration.interfaces.groups, configuration.interfaces?.groups.map(g => this.parseInterfaceMemberGroupConfiguration(g) ?? []))
                ),
            new TypeConfiguration
                (
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
                    defaultConfiguration.modules.groups.map(g => this.parseModuleMemberGroupConfiguration(g))
                ),
            new ClassConfiguration
                (
                    defaultConfiguration.classes.addPublicModifierIfMissing,
                    defaultConfiguration.classes.addPrivateModifierIfStartingWithHash,
                    defaultConfiguration.classes.groupMembersWithDecorators,
                    defaultConfiguration.classes.treatArrowFunctionPropertiesAsMethods,
                    defaultConfiguration.classes.groups.map(g => this.parseClassMemberGroupConfiguration(g))

                ),
            new InterfaceConfiguration
                (
                    defaultConfiguration.interfaces.groups.map(g => this.parseInterfaceMemberGroupConfiguration(g))
                ),
            new TypeConfiguration
                (
                    defaultConfiguration.types.groups.map(g => this.parseTypeMemberGroupConfiguration(g))
                )
        );
    }

    // #endregion Public Static Methods (2)

    // #region Private Static Methods (8)

    private static fixClassMemberMemberGroup(defaultMemberTypeOrder: ClassMemberGroupConfiguration[], memberTypeOrder: ClassMemberGroupConfiguration[]): ClassMemberGroupConfiguration[]
    {
        const memberTypes = memberTypeOrder.flatMap(mto => mto.memberTypes);
        const allMemberTypes = defaultMemberTypeOrder.flatMap(mt => mt.memberTypes);
        const missingMemberTypes = allMemberTypes.filter(mt => !memberTypes.includes(mt));
        const fixedMemberTypeOrder: ClassMemberGroupConfiguration[] = [];

        // add existing member types
        for (const memberGroupConfiguration of memberTypeOrder) 
        {
            fixedMemberTypeOrder.push(memberGroupConfiguration);
        }

        // add missing member types (one per group)
        for (const missingMemberType of missingMemberTypes) 
        {
            fixedMemberTypeOrder.push(new ClassMemberGroupConfiguration(true, convertPascalCaseToTitleCase(ClassMemberType[missingMemberType]), [missingMemberType], [], []));
        }

        return fixedMemberTypeOrder;
    }

    private static fixInterfaceMemberMemberGroup(defaultMemberTypeOrder: InterfaceMemberGroupConfiguration[], memberTypeOrder: InterfaceMemberGroupConfiguration[]): InterfaceMemberGroupConfiguration[]
    {
        const memberTypes = memberTypeOrder.flatMap(mto => mto.memberTypes);
        const allMemberTypes = defaultMemberTypeOrder.flatMap(mt => mt.memberTypes);
        const missingMemberTypes = allMemberTypes.filter(mt => !memberTypes.includes(mt));
        const fixedMemberTypeOrder: InterfaceMemberGroupConfiguration[] = [];

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
        const memberTypes = memberTypeOrder.flatMap(mto => mto.memberTypes);
        const allMemberTypes = defaultMemberTypeOrder.flatMap(mt => mt.memberTypes);
        const missingMemberTypes = allMemberTypes.filter(mt => !memberTypes.includes(mt));
        const fixedMemberTypeOrder: ModuleMemberGroupConfiguration[] = [];

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
        const memberTypes = memberTypeOrder.flatMap(mto => mto.memberTypes);
        const allMemberTypes = defaultMemberTypeOrder.flatMap(mt => mt.memberTypes);
        const missingMemberTypes = allMemberTypes.filter(mt => !memberTypes.includes(mt));
        const fixedMemberTypeOrder: TypeMemberGroupConfiguration[] = [];

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

    private static parseClassMemberGroupConfiguration(classMemberGroupConfiguration: any)
    {
        const order = classMemberGroupConfiguration.order ?? true;
        const caption = classMemberGroupConfiguration.caption ?? "Region";
        const memberTypes = distinct(classMemberGroupConfiguration.memberTypes as string[] ?? []).map(t => ClassMemberType[t as keyof typeof ClassMemberType]).filter(t => t != undefined);
        const placeAbove = distinct(classMemberGroupConfiguration.placeAbove as string[] ?? []);
        const placeBelow = distinct(classMemberGroupConfiguration.placeBelow as string[] ?? []);

        for (const pa of placeAbove)
        {
            if (placeBelow.indexOf(pa) > -1)
            {
                // remove and items that are present in above and below from below
                placeBelow.splice(placeBelow.indexOf(pa), 1);
            }
        }

        return new ClassMemberGroupConfiguration(order, caption, memberTypes, placeAbove, placeBelow);
    }

    private static parseInterfaceMemberGroupConfiguration(interfaceMemberGroupConfiguration: any)
    {
        const order = interfaceMemberGroupConfiguration.order ?? true;
        const caption = interfaceMemberGroupConfiguration.caption ?? "Region";
        const memberTypes = distinct(interfaceMemberGroupConfiguration.memberTypes as string[] ?? []).map(t => InterfaceMemberType[t as keyof typeof InterfaceMemberType]).filter(t => t != undefined);
        const placeAbove = distinct(interfaceMemberGroupConfiguration.placeAbove as string[] ?? []);
        const placeBelow = distinct(interfaceMemberGroupConfiguration.placeBelow as string[] ?? []);

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

    private static parseModuleMemberGroupConfiguration(typeMemberGroupConfiguration: any)
    {
        const order = typeMemberGroupConfiguration.order ?? true;
        const caption = typeMemberGroupConfiguration.caption ?? "Region";
        const memberTypes = distinct(typeMemberGroupConfiguration.memberTypes as string[] ?? []).map(t => ModuleMemberType[t as keyof typeof ModuleMemberType]).filter(t => t != undefined);
        const placeAbove = distinct(typeMemberGroupConfiguration.placeAbove as string[] ?? []);
        const placeBelow = distinct(typeMemberGroupConfiguration.placeBelow as string[] ?? []);

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
