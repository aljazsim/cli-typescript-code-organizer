import { InterfaceMemberConfiguration } from "src/configuration/interface-member-configuration.js";
import { InterfaceMemberGroupConfiguration } from "src/configuration/interface-member-group-configuration.js";
import { RegionConfiguration } from "src/configuration/region-configuration.js";




export class InterfaceConfiguration
{
    constructor(
        public readonly regions: RegionConfiguration,
        public readonly members: InterfaceMemberConfiguration,
        public readonly memberGroups: InterfaceMemberGroupConfiguration[])
    {
    }
}
