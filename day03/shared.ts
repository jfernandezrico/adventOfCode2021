import * as fs from "fs";
import { Direction, Movement } from "./submarine";

export const readNumbersFromFile = (path: string): Array<number> =>
  fs.readFileSync(path, "utf8").toString().split("\n").map(Number);

export const readMovementsFromFile = (path: string): Array<Movement> =>
  fs
    .readFileSync(path, "utf8")
    .toString()
    .split("\n")
    .map((row) => {
      const movementRow = row.split(" ");
      const movement: Movement = {
        direction: movementRow[0] as Direction,
        position: Number(movementRow[1]),
      };
      return movement;
    });