import path from "path";
import { readLavaTubes } from "./read-file";

const lavaTubes = readLavaTubes(path.join(__dirname, "input.txt"));

const sumReducer = (previous: number, current: number): number =>
  previous + current;

const calculateRisk = (lowerNumbers: Array<number>): number =>
  lowerNumbers.map((number) => number + 1).reduce(sumReducer, 0);

const calculateLowestAdjacent = (lavaTubes: Array<Array<number>>): number =>
  lavaTubes
    .map((lavaTube, tubeIndex, tubes) => {
      const mins = lavaTube.filter((number, indexInTube) => {
        const up =
          tubeIndex > 0
            ? tubes[tubeIndex - 1][indexInTube]
            : Number.MAX_SAFE_INTEGER;

        const left =
          indexInTube > 0 ? lavaTube[indexInTube - 1] : Number.MAX_SAFE_INTEGER;

        const down =
          tubeIndex + 1 < tubes.length
            ? tubes[tubeIndex + 1][indexInTube]
            : Number.MAX_SAFE_INTEGER;

        const right =
          indexInTube + 1 < lavaTube.length
            ? lavaTube[indexInTube + 1]
            : Number.MAX_SAFE_INTEGER;

        return number < up && number < left && number < down && number < right;
      });
      return calculateRisk(mins);
    })
    .reduce(sumReducer);

console.log(calculateLowestAdjacent(lavaTubes));
