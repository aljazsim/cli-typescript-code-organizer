import { InterfaceMemberConfiguration } from "./interface-member-configuration";
import { InterfaceMemberGroupConfiguration } from "./interface-member-group-configuration";
import { RegionConfiguration } from "./region-configuration";

export class InterfaceConfiguration
{
    constructor(
        public readonly regions: RegionConfiguration,
        public readonly members: InterfaceMemberConfiguration,
        public readonly memberGroups: InterfaceMemberGroupConfiguration[])
    {
    }
}
