import path from "path";
import { calculateLowestAdjacent, sumReducer } from "./lava-tube";
import { readLavaTubes } from "./read-file";

const lavaTubes = readLavaTubes(path.join(__dirname, "input.txt"));



const calculateSumRisk = (lavaTubes: Array<Array<number>>): number => {
  const lowestAdjacent = calculateLowestAdjacent(lavaTubes);
  return lowestAdjacent
    .map((position) => lavaTubes[position.row][position.column] + 1)
    .reduce(sumReducer, 0);
};

console.log(calculateSumRisk(lavaTubes));
