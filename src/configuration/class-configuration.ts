import { ClassMemberGroupConfiguration } from "./class-member-group-configuration";

export class ClassConfiguration
{
    constructor(
        public readonly order: boolean,
        public readonly useRegions: boolean,
        public readonly addPublicModifierIfMissing: boolean,
        public readonly addPrivateModifierIfStartingWithHash: boolean,
        public readonly groupMembersWithDecorators: boolean,
        public readonly treatArrowFunctionPropertiesAsMethods: boolean,
        public readonly groups: ClassMemberGroupConfiguration[]
    )
    {
    }
}