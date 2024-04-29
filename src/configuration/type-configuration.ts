import { TypeMemberGroupConfiguration } from "./type-member-group-configuration";

export class TypeConfiguration
{
    constructor(
        public readonly order: boolean,
        public readonly useRegions: boolean,
        public readonly groups: TypeMemberGroupConfiguration[]
    )
    {
    }
}