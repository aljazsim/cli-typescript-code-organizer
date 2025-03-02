import { expect, test } from "vitest";
import { getOrganizeSpecialCaseTestParameters } from "../helpers/organize-test-helper.js";
import { testOrganizingFile } from "./test-organizing-file.js";

for (const otp of getOrganizeSpecialCaseTestParameters())
{
    test(otp.description, async () =>
    {
        // act 
        const result = await testOrganizingFile(otp.input, otp.configurationFilePath, otp.output);

        // assert
        expect(result.organizedSourceCode).toBe(result.expectedOrganizedSourceCode)

    });
}
