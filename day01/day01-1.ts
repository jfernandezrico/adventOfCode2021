import * as fs from "fs";
const depths = fs
  .readFileSync("./day01/input.txt", "utf8")
  .toString()
  .split("\n")
  .map(Number);

const result = depths.filter(
  (value, index, array) => array[index - 1] < value
).length;

console.log(result);
