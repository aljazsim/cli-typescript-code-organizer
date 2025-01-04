// #region Functions (1)

export function distinct<T>(items: T[])
{
    return items.filter((value, index, array) => array.indexOf(value) === index);
}

export function remove<T>(items: T[] | null | undefined, item: T | null | undefined)
{
    if (items && items.length > 0 && item)
    {
        const index = items.indexOf(item);

        if (index > -1)
        {
            items.splice(index, 1);
        }
    }
}

// #endregion Functions (1)
