import { RegionConfiguration } from "./region-configuration.js";
import { TypeMemberConfiguration } from "./type-member-configuration.js";
import { TypeMemberGroupConfiguration } from "./type-member-group-configuration.js";




export class TypeConfiguration
{
    constructor(
        public readonly regions: RegionConfiguration,
        public readonly members: TypeMemberConfiguration,
        public readonly memberGroups: TypeMemberGroupConfiguration[])
    {
    }
}
