import { DateTime, type Duration } from "luxon";
import { v4 as uuidv4 } from "uuid";

// #region Exported Functions (2)

export function gen(): string
{
    return uuidv4();
}

export function test(date: DateTime): Duration
{
    return date.diffNow('day');
}

// #endregion Exported Functions

test(DateTime.fromISO('2016-05-25T09:08:34.123+06:00'));
