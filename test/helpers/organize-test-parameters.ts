import { Configuration } from "../configuration/configuration";

export class OrganizeTestParameters
{
    constructor(
        public readonly description: string,
        public readonly configurationFilePath: string,
        public readonly input: string,
        public readonly output: string,
        public readonly useRegions: boolean,
        public readonly addRegionIndentation: boolean,
        public readonly addMemberCountInRegionName: boolean,
        public readonly addRegionCaptionToRegionEnd: boolean)
    {
    }
};
