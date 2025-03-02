import * as mode from "mode";
import * as modulator from "modulator";

import type { A, B } from "@c/api";
import { type C, D } from "@c/api/v2";
import type { E } from "@c/api/v3";

import { DateTime, type Duration } from "luxon";
import { v4 as uuidv4 } from "uuid";

import { Hash } from "./crypto/hash";

// #region Functions (3)

export function gen(): Hash
{
    return new Hash(modulator.encode(mode.convert(uuidv4())));
}

export function sum(a: A, b: B, c: C, d: D, e: E) { }

export function test(date: DateTime): Duration
{
    return date.diffNow('day');
}

// #endregion Functions

test(DateTime.fromISO('2016-05-25T09:08:34.123+06:00'));
