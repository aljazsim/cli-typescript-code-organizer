import { TypeMemberType } from "../enums/type-member-type";

export class TypeMemberGroupConfiguration
{
    // #region Constructors (1)

    constructor(
        public readonly order: boolean,
        public readonly caption: string,
        public readonly memberTypes: TypeMemberType[],
        public readonly placeAbove: string[],
        public readonly placeBelow: string[],
    ) { }

    // #endregion Constructors (1)
} 