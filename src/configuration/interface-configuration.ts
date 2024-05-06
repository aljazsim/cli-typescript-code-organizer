import { InterfaceMemberGroupConfiguration } from "./interface-member-group-configuration";

export class InterfaceConfiguration
{
    constructor(
        public readonly groups: InterfaceMemberGroupConfiguration[]
    )
    {
    }
}
