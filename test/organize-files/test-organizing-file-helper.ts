import { test } from "vitest";
import { testOrganizingFile } from "./test-organizing-file.js";


test("test123", async () =>
{
    const name = "empty-lines-in-code";
    const type = "special-cases";
    // const name = "test-type";
    // const type = "ts-files";
    const input = `./test/organize-files/${type}/${name}/${name}.ts`;
    const config = "./test/configurations/default-configuration.json";
    const output = `./test/organize-files/${type}/${name}/${name}.temp.ts`;

    await testOrganizingFile(input, config, output);
})
