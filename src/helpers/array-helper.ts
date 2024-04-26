// #region Functions (2)

export function distinct(a: string[])
{
    return a.filter((value, index, array) => array.indexOf(value) === index);
}

// #endregion Functions (2)
