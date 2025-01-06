// #region Functions (4)

export function add<T>(items: T[] | null | undefined, ...itemsToAdd: any[])
{
    if (items && itemsToAdd && itemsToAdd.length > 0)
    {
        itemsToAdd.forEach(ita => items.push(ita));
    }
}

export function distinct<T>(items: T[])
{
    return items.filter((value, index, array) => array.indexOf(value) === index);
}

export function except<T>(items1: T[] | null | undefined, items2: T[] | null | undefined)
{
    if (items1 && items1.length && items2 && items2.length)
    {
        return items1.filter(item => !items2.includes(item));
    }
    else
    {
        return items1 ?? [];
    }
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

// #endregion Functions (4)
