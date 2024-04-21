import { ElementNodeGroupConfiguration } from "./element-node-group-configuration";

export class MemberConfigurationConfiguration
{
    constructor(public readonly treatArrowFunctionPropertiesAsMethods: boolean, public readonly memberOrder: ElementNodeGroupConfiguration[]) 
    {
    }
}