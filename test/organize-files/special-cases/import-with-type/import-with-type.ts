import { v4 as uuidv4 } from "uuid";
import { type A } from "@c/api";
import type { B } from "@c/api";
import { D } from "@c/api/v2";
import type { C } from "@c/api/v2";
import { DateTime } from "luxon";
import { type Duration } from "luxon";
import { type E } from "@c/api/v3";

export function test(date: DateTime): Duration
{
    return date.diffNow('day');
}
export function sum(a: A, b: B, c: C, d: D, e: E) { }
export function gen(): string
{
    return uuidv4();
}



test(DateTime.fromISO('2016-05-25T09:08:34.123+06:00'));
