import { expect, test } from "vitest";

import { getOrganizeTestParameters } from "../helpers/organize-test-helper.js";
import { testOrganizingFile } from "./test-organizing-file.js";

for (const otp of getOrganizeTestParameters())
{
    test(otp.description, async () =>
    {
        // act 
        const result = await testOrganizingFile(otp.input, otp.configurationFilePath, otp.output);

        // assert
        expect(result.organizedSourceCode).toBe(result.expectedOrganizedSourceCode)

    });
}
