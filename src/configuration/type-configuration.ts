import { RegionConfiguration } from "src/configuration/region-configuration.js";
import { TypeMemberConfiguration } from "src/configuration/type-member-configuration.js";
import { TypeMemberGroupConfiguration } from "src/configuration/type-member-group-configuration.js";




export class TypeConfiguration
{
    constructor(
        public readonly regions: RegionConfiguration,
        public readonly members: TypeMemberConfiguration,
        public readonly memberGroups: TypeMemberGroupConfiguration[])
    {
    }
}
