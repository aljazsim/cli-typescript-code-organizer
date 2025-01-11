import { ModuleMemberConfiguration } from "src/configuration/module-member-configuration.js";
import { ModuleMemberGroupConfiguration } from "src/configuration/module-member-group-configuration.js";
import { RegionConfiguration } from "src/configuration/region-configuration.js";




export class ModuleConfiguration
{
    constructor(
        public readonly regions: RegionConfiguration,
        public readonly members: ModuleMemberConfiguration,
        public readonly memberGroups: ModuleMemberGroupConfiguration[])
    {
    }
}
