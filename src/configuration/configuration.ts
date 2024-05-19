import { ClassConfiguration } from "./class-configuration";
import { ClassMemberConfiguration } from "./class-member-configuration";
import { ClassMemberGroupConfiguration } from "./class-member-group-configuration";
import { ClassMemberType } from "../enums/class-member-type";
import { InterfaceConfiguration } from "./interface-configuration";
import { InterfaceMemberConfiguration } from "./interface-member-configuration";
import { InterfaceMemberGroupConfiguration } from "./interface-member-group-configuration";
import { InterfaceMemberType } from "../enums/interface-member-type";
import { ModuleConfiguration } from "./module-configuration";
import { ModuleMemberConfiguration } from "./module-member-configuration";
import { ModuleMemberGroupConfiguration } from "./module-member-group-configuration";
import { ModuleMemberType } from "../enums/module-member-type";
import { RegionConfiguration } from "./region-configuration";
import { TypeConfiguration } from "./type-configuration";
import { TypeMemberConfiguration } from "./type-member-configuration";
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
            new ModuleConfiguration
                (
                    new RegionConfiguration
                        (
                            configuration.modules.regions?.useRegions ?? defaultConfiguration.modules.regions.useRegions,
                            configuration.modules.regions?.addRegionIndentation ?? defaultConfiguration.modules.regions.addRegionIndentation,
                            configuration.modules.regions?.addMemberCountInRegionName ?? defaultConfiguration.modules.regions.addMemberCountInRegionName,
                            configuration.modules.regions?.addRegionCaptionToRegionEnd ?? defaultConfiguration.modules.regions.addRegionCaptionToRegionEnd
                        ),
                    new ModuleMemberConfiguration
                        (
                            configuration.modules?.members.treatArrowFunctionPropertiesAsMethods ?? defaultConfiguration.modules.members.treatArrowFunctionPropertiesAsMethods,
                            configuration.modules?.members.treatArrowFunctionConstPropertiesAsMethods ?? defaultConfiguration.modules.members.treatArrowFunctionConstPropertiesAsMethods,
                        ),
                    this.fixModuleMemberMemberGroup(defaultConfiguration.modules.memberGroups, configuration.modules?.memberGroups.map(g => this.parseModuleMemberGroupConfiguration(g) ?? []))
                ),
            new ClassConfiguration
                (
                    new RegionConfiguration
                        (
                            configuration.classes.regions?.useRegions ?? defaultConfiguration.classes.regions.useRegions,
                            configuration.classes.regions?.addRegionIndentation ?? defaultConfiguration.classes.regions.addRegionIndentation,
                            configuration.classes.regions?.addMemberCountInRegionName ?? defaultConfiguration.classes.regions.addMemberCountInRegionName,
                            configuration.classes.regions?.addRegionCaptionToRegionEnd ?? defaultConfiguration.classes.regions.addRegionCaptionToRegionEnd
                        ),
                    new ClassMemberConfiguration
                        (
                            configuration.classes?.members.addPublicModifierIfMissing ?? defaultConfiguration.classes.members.addPublicModifierIfMissing,
                            configuration.classes?.members.addPrivateModifierIfStartingWithHash ?? defaultConfiguration.classes.members.addPrivateModifierIfStartingWithHash,
                            configuration.classes?.members.groupMembersWithDecorators ?? defaultConfiguration.classes.members.groupMembersWithDecorators,
                            configuration.classes?.members.treatArrowFunctionPropertiesAsMethods ?? defaultConfiguration.classes.members.treatArrowFunctionPropertiesAsMethods,
                            configuration.classes?.members.treatArrowFunctionReadOnlyPropertiesAsMethods ?? defaultConfiguration.classes.members.treatArrowFunctionReadOnlyPropertiesAsMethods,
                        ),
                    this.fixClassMemberMemberGroup(defaultConfiguration.classes.memberGroups, configuration.classes?.memberGroups.map(g => this.parseClassMemberGroupConfiguration(g) ?? []))
                ),
            new InterfaceConfiguration
                (
                    new RegionConfiguration
                        (
                            configuration.interfaces.regions?.useRegions ?? defaultConfiguration.interfaces.regions.useRegions,
                            configuration.interfaces.regions?.addRegionIndentation ?? defaultConfiguration.interfaces.regions.addRegionIndentation,
                            configuration.interfaces.regions?.addMemberCountInRegionName ?? defaultConfiguration.interfaces.regions.addMemberCountInRegionName,
                            configuration.interfaces.regions?.addRegionCaptionToRegionEnd ?? defaultConfiguration.interfaces.regions.addRegionCaptionToRegionEnd
                        ),
                    new InterfaceMemberConfiguration
                        (
                            configuration.interfaces?.members.treatArrowFunctionPropertiesAsMethods ?? defaultConfiguration.interfaces.members.treatArrowFunctionPropertiesAsMethods,
                            configuration.interfaces?.members.treatArrowFunctionReadOnlyPropertiesAsMethods ?? defaultConfiguration.interfaces.members.treatArrowFunctionReadOnlyPropertiesAsMethods,
                        ),
                    this.fixInterfaceMemberMemberGroup(defaultConfiguration.interfaces.memberGroups, configuration.interfaces?.memberGroups.map(g => this.parseInterfaceMemberGroupConfiguration(g) ?? []))
                ),
            new TypeConfiguration
                (
                    new RegionConfiguration
                        (
                            configuration.types.regions?.useRegions ?? defaultConfiguration.types.regions.useRegions,
                            configuration.types.regions?.addRegionIndentation ?? defaultConfiguration.types.regions.addRegionIndentation,
                            configuration.types.regions?.addMemberCountInRegionName ?? defaultConfiguration.types.regions.addMemberCountInRegionName,
                            configuration.types.regions?.addRegionCaptionToRegionEnd ?? defaultConfiguration.types.regions.addRegionCaptionToRegionEnd
                        ),
                    new TypeMemberConfiguration
                        (
                            configuration.types?.members.treatArrowFunctionPropertiesAsMethods ?? defaultConfiguration.types.members.treatArrowFunctionPropertiesAsMethods,
                        ),
                    this.fixTypeMemberMemberGroup(defaultConfiguration.types.memberGroups, configuration.types?.memberGroups.map(g => this.parseTypeMemberGroupConfiguration(g) ?? []))
                )
        );
    }

    public static getDefaultConfiguration()
    {
        return new Configuration(
            new ModuleConfiguration
                (
                    new RegionConfiguration
                        (
                            defaultConfiguration.modules.regions.useRegions,
                            defaultConfiguration.modules.regions.addRegionIndentation,
                            defaultConfiguration.modules.regions.addMemberCountInRegionName,
                            defaultConfiguration.modules.regions.addRegionCaptionToRegionEnd
                        ),
                    new ModuleMemberConfiguration
                        (
                            defaultConfiguration.modules.members.treatArrowFunctionPropertiesAsMethods,
                            defaultConfiguration.modules.members.treatArrowFunctionConstPropertiesAsMethods,
                        ),
                    defaultConfiguration.modules.memberGroups.map(g => this.parseModuleMemberGroupConfiguration(g) ?? [])
                ),
            new ClassConfiguration
                (
                    new RegionConfiguration
                        (
                            defaultConfiguration.classes.regions.useRegions,
                            defaultConfiguration.classes.regions.addRegionIndentation,
                            defaultConfiguration.classes.regions.addMemberCountInRegionName,
                            defaultConfiguration.classes.regions.addRegionCaptionToRegionEnd
                        ),
                    new ClassMemberConfiguration
                        (
                            defaultConfiguration.classes.members.addPublicModifierIfMissing,
                            defaultConfiguration.classes.members.addPrivateModifierIfStartingWithHash,
                            defaultConfiguration.classes.members.groupMembersWithDecorators,
                            defaultConfiguration.classes.members.treatArrowFunctionPropertiesAsMethods,
                            defaultConfiguration.classes.members.treatArrowFunctionReadOnlyPropertiesAsMethods,
                        ),
                    defaultConfiguration.classes.memberGroups.map(g => this.parseClassMemberGroupConfiguration(g) ?? [])
                ),
            new InterfaceConfiguration
                (
                    new RegionConfiguration
                        (
                            defaultConfiguration.interfaces.regions.useRegions,
                            defaultConfiguration.interfaces.regions.addRegionIndentation,
                            defaultConfiguration.interfaces.regions.addMemberCountInRegionName,
                            defaultConfiguration.interfaces.regions.addRegionCaptionToRegionEnd
                        ),
                    new InterfaceMemberConfiguration
                        (
                            defaultConfiguration.interfaces.members.treatArrowFunctionPropertiesAsMethods,
                            defaultConfiguration.interfaces.members.treatArrowFunctionReadOnlyPropertiesAsMethods,
                        ),
                    defaultConfiguration.interfaces.memberGroups.map(g => this.parseInterfaceMemberGroupConfiguration(g) ?? [])
                ),
            new TypeConfiguration
                (
                    new RegionConfiguration
                        (
                            defaultConfiguration.types.regions.useRegions,
                            defaultConfiguration.types.regions.addRegionIndentation,
                            defaultConfiguration.types.regions.addMemberCountInRegionName,
                            defaultConfiguration.types.regions.addRegionCaptionToRegionEnd
                        ),
                    new TypeMemberConfiguration
                        (
                            defaultConfiguration.types.members.treatArrowFunctionPropertiesAsMethods,
                        ),
                    defaultConfiguration.types.memberGroups.map(g => this.parseTypeMemberGroupConfiguration(g) ?? [])
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
            fixedMemberTypeOrder.push(new ClassMemberGroupConfiguration(true, "asc", convertPascalCaseToTitleCase(ClassMemberType[missingMemberType]), [missingMemberType], true, [], []));
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
            fixedMemberTypeOrder.push(new InterfaceMemberGroupConfiguration(true, "asc", convertPascalCaseToTitleCase(InterfaceMemberType[missingMemberType]), [missingMemberType], true, [], []));
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
            fixedMemberTypeOrder.push(new ModuleMemberGroupConfiguration(true, "asc", convertPascalCaseToTitleCase(ModuleMemberType[missingMemberType]), [missingMemberType], true, [], []));
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
            fixedMemberTypeOrder.push(new TypeMemberGroupConfiguration(true, "asc", convertPascalCaseToTitleCase(TypeMemberType[missingMemberType]), [missingMemberType], true, [], []));
        }

        return fixedMemberTypeOrder;
    }

    private static parseClassMemberGroupConfiguration(classMemberGroupConfiguration: any)
    {
        const sort = classMemberGroupConfiguration.sort ?? true;
        const sortDirection = classMemberGroupConfiguration.sortDirection === "asc" ? "asc" : "desc";
        const caption = classMemberGroupConfiguration.caption ?? "Region";
        const memberTypes = distinct(classMemberGroupConfiguration.memberTypes as string[] ?? []).map(t => ClassMemberType[t as keyof typeof ClassMemberType]).filter(t => t != undefined);
        const memberTypesGrouped = classMemberGroupConfiguration.memberTypesGrouped ?? true;
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

        return new ClassMemberGroupConfiguration(sort, sortDirection, caption, memberTypes, memberTypesGrouped, placeAbove, placeBelow);
    }

    private static parseInterfaceMemberGroupConfiguration(interfaceMemberGroupConfiguration: any)
    {
        const sort = interfaceMemberGroupConfiguration.sort ?? true;
        const sortDirection = interfaceMemberGroupConfiguration.sortDirection === "asc" ? "asc" : "desc";
        const caption = interfaceMemberGroupConfiguration.caption ?? "Region";
        const memberTypes = distinct(interfaceMemberGroupConfiguration.memberTypes as string[] ?? []).map(t => InterfaceMemberType[t as keyof typeof InterfaceMemberType]).filter(t => t != undefined);
        const memberTypesGrouped = interfaceMemberGroupConfiguration.memberTypesGrouped ?? true;
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

        return new InterfaceMemberGroupConfiguration(sort, sortDirection, caption, memberTypes, memberTypesGrouped, placeAbove, placeBelow);
    }

    private static parseModuleMemberGroupConfiguration(moduleMemberGroupConfiguration: any)
    {
        const sort = moduleMemberGroupConfiguration.sort ?? true;
        const sortDirection = moduleMemberGroupConfiguration.sortDirection === "asc" ? "asc" : "desc";
        const caption = moduleMemberGroupConfiguration.caption ?? "Region";
        const memberTypes = distinct(moduleMemberGroupConfiguration.memberTypes as string[] ?? []).map(t => ModuleMemberType[t as keyof typeof ModuleMemberType]).filter(t => t != undefined);
        const memberTypesGrouped = moduleMemberGroupConfiguration.memberTypesGrouped ?? true;
        const placeAbove = distinct(moduleMemberGroupConfiguration.placeAbove as string[] ?? []);
        const placeBelow = distinct(moduleMemberGroupConfiguration.placeBelow as string[] ?? []);

        for (const pa of placeAbove)
        {
            if (placeBelow.indexOf(pa) > -1)
            {
                // remove and items that are present in above and below from below
                placeBelow.splice(placeBelow.indexOf(pa), 1);
            }
        }

        return new ModuleMemberGroupConfiguration(sort, sortDirection, caption, memberTypes, memberTypesGrouped, placeAbove, placeBelow);
    }

    private static parseTypeMemberGroupConfiguration(typeMemberGroupConfiguration: any)
    {
        const sort = typeMemberGroupConfiguration.sort ?? true;
        const sortDirection = typeMemberGroupConfiguration.sortDirection === "asc" ? "asc" : "desc";
        const caption = typeMemberGroupConfiguration.caption ?? "Region";
        const memberTypes = distinct(typeMemberGroupConfiguration.memberTypes as string[] ?? []).map(t => TypeMemberType[t as keyof typeof TypeMemberType]).filter(t => t != undefined);
        const memberTypesGrouped = typeMemberGroupConfiguration.memberTypesGrouped ?? true;
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

        return new TypeMemberGroupConfiguration(sort, sortDirection, caption, memberTypes, memberTypesGrouped, placeAbove, placeBelow);
    }

    // #endregion Private Static Methods (8)
} 
