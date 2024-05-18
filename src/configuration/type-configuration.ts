import { TypeMemberGroupConfiguration } from "./type-member-group-configuration";

export class TypeConfiguration
{
    constructor(
        public readonly treatArrowFunctionPropertiesAsMethods: boolean,
        public readonly groups: TypeMemberGroupConfiguration[])
    {
    }
}
