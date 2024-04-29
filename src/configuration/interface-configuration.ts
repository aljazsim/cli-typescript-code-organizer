import { InterfaceMemberGroupConfiguration } from "./interface-member-group-configuration";

export class InterfaceConfiguration
{
    constructor(
        public readonly order: boolean,
        public readonly useRegions: boolean,
        public readonly groups: InterfaceMemberGroupConfiguration[]
    )
    {
    }
}