import { Configuration } from "../configuration/configuration";

export class OrganizeTestParameters
{
    constructor(
        public readonly description: string,
        public readonly configurationFilePath: string,
        public readonly input: string,
        public readonly output: string)
    {
    }
};
