import { ClassMemberGroupConfiguration } from "./class-member-group-configuration";

export class ClassConfiguration
{
    constructor(
        public readonly addPublicModifierIfMissing: boolean,
        public readonly addPrivateModifierIfStartingWithHash: boolean,
        public readonly groupMembersWithDecorators: boolean,
        public readonly treatArrowFunctionPropertiesAsMethods: boolean,
        public readonly groups: ClassMemberGroupConfiguration[])
    {
    }
}
