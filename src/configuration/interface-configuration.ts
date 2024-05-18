import { InterfaceMemberGroupConfiguration } from "./interface-member-group-configuration";

export class InterfaceConfiguration
{
    constructor(
        public readonly treatArrowFunctionPropertiesAsMethods: boolean,
        public readonly groups: InterfaceMemberGroupConfiguration[])
    {
    }
}
