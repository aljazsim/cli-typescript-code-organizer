import { InterfaceMemberType } from "../enums/interface-member-type";

export class InterfaceMemberGroupConfiguration
{
    // #region Constructors (1)

    constructor(
        public readonly order: boolean,
        public readonly caption: string,
        public readonly memberTypes: InterfaceMemberType[],
        public readonly placeAbove: string[],
        public readonly placeBelow: string[],
    ) { }

    // #endregion Constructors (1)
} 