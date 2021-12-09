import * as fs from "fs";
import { SevenSegmentDisplay } from "./seven-segment-display";

export const readSevenSegmentDisplays = (
  path: string
): Array<SevenSegmentDisplay> =>
  fs
    .readFileSync(path, "utf8")
    .toString()
    .split("\n")
    .filter((n) => n)
    .map((line) => {
      const [inputStr, outputStr] = line.split(" | ");
      return {
        input: inputStr.split(" "),
        output: outputStr.split(" "),
      };
    });
