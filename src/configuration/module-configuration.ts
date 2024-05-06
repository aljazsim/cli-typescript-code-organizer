import { ModuleMemberGroupConfiguration } from "./module-member-group-configuration";

export class ModuleConfiguration
{
    constructor(
        public readonly groups: ModuleMemberGroupConfiguration[]
    )
    {
    }
}
