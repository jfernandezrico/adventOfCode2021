import * as fs from "fs";

export const readInitialState = (path: string): Array<number> =>
  fs
    .readFileSync(path, "utf8")
    .toString()
    .split("\n")[0]
    .split(",")
    .map(Number);
