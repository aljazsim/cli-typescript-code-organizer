import { ImportSourceFilePathQuoteType } from "./Import-source-file-path-quote-type";

export class ImportConfiguration
{
    constructor(
        public readonly removeUnusedImports: boolean,
        public readonly sortImportsBySource: boolean,
        public readonly sortImportsByName: boolean,
        public readonly groupImportsBySource: boolean,
        public readonly separateImportGroups: boolean,
        public readonly quote: ImportSourceFilePathQuoteType)
    {
    }
}
