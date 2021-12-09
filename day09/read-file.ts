import * as fs from "fs";

export const readLavaTubes = (path: string): Array<Array<number>> =>
  fs
    .readFileSync(path, "utf8")
    .toString()
    .split("\n")
    .filter((n) => n)
    .map((line) => line.split("").map((digit) => +digit));
