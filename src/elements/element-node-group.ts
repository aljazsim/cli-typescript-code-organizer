import { ElementNode } from "./element-node";

export class ElementNodeGroup
{
    // #region Constructors (1)

    constructor(public readonly caption: string | null, public readonly nodeSubGroups: ElementNodeGroup[], public readonly nodes: ElementNode[], public readonly isRegion: boolean)
    {
    }

    // #endregion Constructors (1)

    // #region Public Methods (1)

    public getNodeCount(): number
    {
        return this.nodes.length + this.nodeSubGroups.reduce((sum: number, ng: ElementNodeGroup) => sum + ng.getNodeCount(), 0);
    }

    // #endregion Public Methods (1)
} 
