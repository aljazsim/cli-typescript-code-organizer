export function setLogger(logging: { log: (message: string) => void, logError: (error: string | Error | unknown) => void })
{
    logger = logging;
}

let logger = {
    log: (message: string) => { console.log(message) },
    logError: (error: string | Error | unknown) => 
    {
        if (error instanceof Error)
        {
            logError(error.message);
        }
        else
        {
            console.error(error)
        }
    }
}

export function log(message: string)
{
    logger.log(message);
}

export function logError(error: string | Error | unknown) 
{
    logger.logError(error);
}
