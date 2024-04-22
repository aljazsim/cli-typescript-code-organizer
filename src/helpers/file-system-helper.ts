const fs = require('fs').promises;
const path = require('path');


export async function readFile(filePath: string)
{
    return await fs.readFile(filePath, "utf8");
}

export async function writeFile(filePath: string, fileContents: string, overwriteFile = true)
{
    if (await fileExists(filePath))
    {
        if (overwriteFile)
        {
            await deleteFile(filePath);
            await fs.writeFile(filePath, fileContents, "utf8");
        }
        else
        {
            throw new Error(`There is an existing file at "${filePath}.`);
        }
    }
    else
    {
        await fs.writeFile(filePath, fileContents, "utf8");
    }
}

export async function fileExists(filePath: string)
{
    return await fs.fileExists(filePath);
}

export async function deleteFile(filePath: string)
{
    if (await fileExists(filePath)) 
    {
        await fs.unlink(filePath);
    }
}

export function getFileName(filePath: string)
{
    return path.basename(filePath);
}