// tsco: ignore
const lf = "\n";
const cr = "\r";
const crlf = `${cr}${lf}`;

export const emptyString = "";
export const newLine = crlf;
export const space = " ";
export const indentation = `${space}${space}${space}${space}`;

export const singleQuote = "'";
export const doubleQuote = "\"";

export const startRegion = "#region";
export const endRegion = "#endregion";

export const anythingRegex = ".+";
export const spacesRegex = "\\s*";
export const newLineRegex = `${newLine}|${cr}|${lf}`;
