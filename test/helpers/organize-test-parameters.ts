export class OrganizeTestParameters
{
    // #region Constructors (1)

    constructor(
        public readonly description: string,
        public readonly configurationFilePath: string,
        public readonly input: string,
        public readonly output: string)
    {
    }

    // #endregion Constructors
}
