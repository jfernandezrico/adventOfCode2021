import * as fs from "fs";

export const readChunks = (path: string): Array<Array<string>> =>
  fs
    .readFileSync(path, "utf8")
    .toString()
    .split("\n")
    .filter((n) => n)
    .map((line) => line.split(""));
