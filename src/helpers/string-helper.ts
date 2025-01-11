import wcmatch from "wildcard-match";

// #region Exported Functions (3)

export function convertPascalCaseToTitleCase(value: string)
{
    if (value &&
        value.length > 1)
    {
        value = value.replace(/(?:^|\.?)([A-Z])/g, (x, y) => " " + y);
        value = value[0].toUpperCase() + value.substring(1);
    }

    return value;
}

export function matchRegEx(regex: string, text: string)
{
    if (regex && regex.length > 0)
    {
        if (!regex.startsWith("^"))
        {
            regex = "^" + regex;
        }

        if (!regex.endsWith("$"))
        {
            regex = regex + "$";
        }

        try
        {
            return new RegExp(regex).test(text);
        }
        catch 
        {
        }
    }

    return false
}

export function matchWildcard(pattern: string, text: string)
{
    if (pattern && pattern.length > 0)
    {
        try
        {
            return wcmatch(pattern)(text);
        }
        catch 
        {
        }
    }

    return false;
}

// #endregion Exported Functions
