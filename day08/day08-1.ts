import path from "path";
import { readSevenSegmentDisplays } from "./read-file";
import {
  isEight,
  isFour,
  isOne,
  isSeven,
  SevenSegmentDisplay,
  sumReducer,
} from "./seven-segment-display";

const sevenSegmentDisplays = readSevenSegmentDisplays(
  path.join(__dirname, "input.txt")
);

const isKnownDigit = (str: string) =>
  isOne(str) || isSeven(str) || isFour(str) || isEight(str);

const countKnownDigits = (
  sevenSegmentDisplays: Array<SevenSegmentDisplay>
): number =>
  sevenSegmentDisplays
    .map(
      (sevenSegmentDisplay) =>
        sevenSegmentDisplay.output.filter((digit) => isKnownDigit(digit)).length
    )
    .reduce(sumReducer, 0);

console.log(countKnownDigits(sevenSegmentDisplays));
