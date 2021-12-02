import path from "path";
import { readNumbersFromFile } from "../shared/read-file";
const depths = readNumbersFromFile(path.join(__dirname, "input.txt"));

const result = depths.filter(
  (value, index, array) => array[index - 1] < value
).length;

console.log(result);
