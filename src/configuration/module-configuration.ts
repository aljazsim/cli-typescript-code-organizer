import { ModuleMemberGroupConfiguration } from "./module-member-group-configuration";

export class ModuleConfiguration
{
    constructor(
        public readonly order: boolean,
        public readonly useRegions: boolean,
        public readonly groups: ModuleMemberGroupConfiguration[]
    )
    {
    }
}