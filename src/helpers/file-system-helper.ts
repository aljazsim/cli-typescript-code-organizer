// #region Functions (12)

export async function deleteFile(filePath: string)
{
    if (await fileExists(filePath)) 
    {
        await fs.unlink(filePath);
    }
}

export async function fileExists(filePath: string)
{
    try
    {
        await fs.access(filePath, fs.constants.F_OK);

        return true;
    }
    catch
    {
        return false;
    }
}

export function getDirectoryPath(filePath: string)
{
    return (path.dirname(filePath) as string).replaceAll("\\", "/");
}

export function getFileName(filePath: string)
{
    return path.basename(filePath) as string;
}

export function getFileNameWithoutExtension(filePath: string)
{
    return (path.basename(filePath) as string).replace(/\.[^/.]+$/, "");
}

export function getFullPath(fileOrDirectoryPath: string)
{
    return toUnixPath(path.resolve(fileOrDirectoryPath) as string);
}

export function getProjectRootDirectoryPath(filePath: string)
{
    return toUnixPath(path.parse(filePath).root as string);
}

export function getRelativePath(sourcePath: string, targetPath: string)
{
    return toUnixPath(path.relative(getFullPath(sourcePath), targetPath) as string);
}

export function joinPath(path1: string, path2: string)
{
    return toUnixPath(path.join(path1, path2) as string);
}

export async function readFile(filePath: string)
{
    return await fs.readFile(filePath, "utf8") as string;
}

function toUnixPath(filePath: string)
{
    return filePath.replaceAll("\\", "/");
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

// #endregion Functions (12)

// #region Variables (2)

const fs = require('fs').promises;
const path = require('path');

// #endregion Variables (2)
