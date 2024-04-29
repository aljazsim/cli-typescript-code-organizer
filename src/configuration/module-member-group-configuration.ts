import { ModuleMemberType } from "../enums/module-member-type";

export class ModuleMemberGroupConfiguration
{
    // #region Constructors (1)

    constructor(
        public readonly order: boolean,
        public readonly caption: string,
        public readonly memberTypes: ModuleMemberType[],
        public readonly placeAbove: string[],
        public readonly placeBelow: string[],
    ) { }

    // #endregion Constructors (1)
} 