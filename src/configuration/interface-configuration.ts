import { InterfaceMemberConfiguration } from "./interface-member-configuration.js";
import { InterfaceMemberGroupConfiguration } from "./interface-member-group-configuration.js";
import { RegionConfiguration } from "./region-configuration.js";

export class InterfaceConfiguration
{
    constructor(
        public readonly regions: RegionConfiguration,
        public readonly members: InterfaceMemberConfiguration,
        public readonly memberGroups: InterfaceMemberGroupConfiguration[])
    {
    }
}
