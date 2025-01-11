import { ClassMemberConfiguration } from "src/configuration/class-member-configuration.js";
import { ClassMemberGroupConfiguration } from "src/configuration/class-member-group-configuration.js";
import { RegionConfiguration } from "src/configuration/region-configuration.js";




export class ClassConfiguration
{
    constructor(
        public readonly regions: RegionConfiguration,
        public readonly members: ClassMemberConfiguration,
        public readonly memberGroups: ClassMemberGroupConfiguration[])
    {
    }
}
