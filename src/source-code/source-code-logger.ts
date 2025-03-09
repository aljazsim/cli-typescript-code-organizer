// eslint-disable-next-line prefer-const
export let log: (message: string) => void = message => { console.log(message) };
// eslint-disable-next-line prefer-const
export let logError: (error: string | Error | unknown) => void = error =>
{
    if (error instanceof Error)
    {
        logError(error.message);
    }
    else
    {
        console.error(error)
    }
};
