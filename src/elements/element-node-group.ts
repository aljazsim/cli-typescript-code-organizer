import { ElementNode } from "./element-node.js";
import { RegionConfiguration } from "../configuration/region-configuration.js";

export class ElementNodeGroup
{
    // #region Constructors (1)

    constructor(public readonly caption: string | null, public readonly nodeSubGroups: ElementNodeGroup[], public readonly nodes: ElementNode[], public readonly isRegion: boolean, public readonly regionConfiguration: RegionConfiguration | null)
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
