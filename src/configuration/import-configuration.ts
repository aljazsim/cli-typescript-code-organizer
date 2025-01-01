import { ImportSourceFilePathQuoteType } from "./Import-source-file-path-quote-type";
import { ImportSourceFilePathType } from "./import-source-file-path-type";

export class ImportConfiguration
{
    constructor(
        public readonly removeUnusedImports: boolean,
        public readonly orderImportsBySource: boolean,
        public readonly orderImportsByName: boolean,
        public readonly groupImportsBySource: boolean,
        public readonly putModuleImportsFirst: boolean,
        public readonly separateImportGroups: boolean,
        public readonly quote: ImportSourceFilePathQuoteType,
        public readonly path: ImportSourceFilePathType)
    {
    }
}
