import { ElementNode } from "./element-node";

export class ElementNodeGroup
{
    // #region Constructors (1)

    constructor(public readonly caption: string | null, public readonly nodeSubGroups: ElementNodeGroup[], public readonly nodes: ElementNode[], public readonly isRegion: boolean)
    {
    }

    // #endregion Constructors (1)
} 