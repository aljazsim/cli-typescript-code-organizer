import { ClassMemberType } from "../enums/class-member-type";

export class ClassMemberGroupConfiguration
{
    // #region Constructors (1)

    constructor(
        public readonly order: boolean,
        public readonly caption: string,
        public readonly memberTypes: ClassMemberType[],
        public readonly placeAbove: string[],
        public readonly placeBelow: string[],
    ) { }

    // #endregion Constructors (1)
} 