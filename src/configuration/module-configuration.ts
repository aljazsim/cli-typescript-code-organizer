import { ModuleMemberGroupConfiguration } from "./module-member-group-configuration";

export class ModuleConfiguration
{
    constructor(
        public readonly treatArrowFunctionPropertiesAsMethods: boolean,
        public readonly groups: ModuleMemberGroupConfiguration[])
    {
    }
}
