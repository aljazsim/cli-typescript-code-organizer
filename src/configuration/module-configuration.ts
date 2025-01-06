import { ModuleMemberConfiguration } from "./module-member-configuration.js";
import { ModuleMemberGroupConfiguration } from "./module-member-group-configuration.js";
import { RegionConfiguration } from "./region-configuration.js";

export class ModuleConfiguration
{
    constructor(
        public readonly regions: RegionConfiguration,
        public readonly members: ModuleMemberConfiguration,
        public readonly memberGroups: ModuleMemberGroupConfiguration[])
    {
    }
}
