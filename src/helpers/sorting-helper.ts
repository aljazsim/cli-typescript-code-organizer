import { ElementNode } from "../elements/element-node";
import { matchRegEx, matchWildcard } from "./string-helper";

// #region Functions (1)

export function sortBy<T extends ElementNode>(nodes: T[], patterns: string[])
{
    if (nodes && nodes.length > 0 && patterns && patterns.length > 0)
    {
        return patterns.map(p => nodes.find(node => node.name === p || matchWildcard(p, node.name) || matchRegEx(p, node.name))).filter(node => node).map(node => node!);
    }
    else
    {
        return [];
    }
}

// #endregion Functions (1)
