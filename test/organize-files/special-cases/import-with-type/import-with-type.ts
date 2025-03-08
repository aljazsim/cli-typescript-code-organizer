import { v4 as uuidv4 } from "uuid";
import { type A } from "@c/api";
import type { B } from "@c/api";
import { file2 } from "./file/file2";
import { D } from "@c/api/v2";
import { default as data } from "../data.json";
import * as E from "@e/api/v2";
import * as defaultConfigurationWithRegionMemberCount from "./Default-Configuration-With-Region-Member-count"
import type { C } from "@c/api/v2";
import * as modulator from "modulator";
import * as file1 from "./file/file1";
import { DateTime } from "luxon";
import * as defaultConfigurationWithRegions from "../file-header/default-configuration-WITH-regions.ts"
import { type Duration } from "luxon";
import { Hash } from "./crypto/hash";
import { type E } from "@c/api/v3";
import * as defaultConfiguration from "./default-configuration.JS"
import * as mode from "mode";

test(DateTime.fromISO('2016-05-25T09:08:34.123+06:00'));
export function test(date: DateTime, e: E): Duration | undefined
{
    if (data)
    {
        return date.diffNow('day');
    }
}
export function sum(a: A, b: B, c: C, d: D, e: E) { }
export function gen(file1: file1, file2: file2): Hash
{
    return new Hash(modulator.encode(mode.convert(uuidv4())));
}

function getConfigurations()
{
    return [
        defaultConfiguration,
        defaultConfigurationWithRegions,
        defaultConfigurationWithRegionMemberCount
    ];
}



