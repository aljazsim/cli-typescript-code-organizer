import * as E from "@e/api/v2";

import * as modulator from "modulator";
import * as mode from "mode";

import type { A, B } from "@c/api";
import { type C, D } from "@c/api/v2";
import type { E } from "@c/api/v3";

import { v4 as uuidv4 } from "uuid";
import { DateTime, type Duration } from "luxon";

import * as defaultConfigurationWithRegionMemberCount from "./default-configuration-with-region-member-count";
import * as file1 from "./file/file1";
import * as defaultConfigurationWithRegions from "../file-header/default-configuration-with-regions.ts";
import * as defaultConfiguration from "./default-configuration.js";

import { file2 } from "./file/file2";
import { default as data } from "../data.json";
import { Hash } from "./crypto/hash";

function getConfigurations()
{
    return [
        defaultConfiguration,
        defaultConfigurationWithRegions,
        defaultConfigurationWithRegionMemberCount
    ];
}

export function gen(file1: file1, file2: file2): Hash
{
    return new Hash(modulator.encode(mode.convert(uuidv4())));
}

export function sum(a: A, b: B, c: C, d: D, e: E) { }

export function test(date: DateTime, e: E): Duration | undefined
{
    if (data)
    {
        return date.diffNow('day');
    }
}

test(DateTime.fromISO('2016-05-25T09:08:34.123+06:00'));
