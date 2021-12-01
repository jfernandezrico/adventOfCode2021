import * as fs from "fs";

export const readNumbersFromFile = (path: string) =>
  fs.readFileSync(path, "utf8").toString().split("\n").map(Number);
