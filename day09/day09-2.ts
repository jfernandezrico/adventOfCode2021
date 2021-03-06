import path from "path";
import { calculateLowestAdjacent, Position } from "./lava-tube";
import { readLavaTubes } from "./read-file";

const lavaTubes = readLavaTubes(path.join(__dirname, "input.txt"));

const calculateBasinPositions = (
  lavaTubes: Array<Array<number>>,
  row: number,
  column: number,
  previous: number
): number => {
  if (
    row < 0 ||
    row >= lavaTubes.length ||
    column < 0 ||
    column >= lavaTubes[0].length
  )
    return 0;
  const point = lavaTubes[row][column];
  if (point === 9) {
    return 0;
  }

  lavaTubes[row][column] = 9;
  return (
    1 +
    // up
    calculateBasinPositions(lavaTubes, row - 1, column, point) +
    // left
    calculateBasinPositions(lavaTubes, row, column - 1, point) +
    // down
    calculateBasinPositions(lavaTubes, row + 1, column, point) +
    // right
    calculateBasinPositions(lavaTubes, row, column + 1, point)
  );
};

const removeDuplicates = (positions: Array<Position>): Array<Position> =>
  positions.filter(
    (position, index, self) =>
      index ===
      self.findIndex(
        (t) => t.row === position.row && t.column === position.column
      )
  );

const calculateBasinsLengths = (
  lavaTubes: Array<Array<number>>
): Array<number> => {
  const lowestAdjacent = calculateLowestAdjacent(lavaTubes);
  return lowestAdjacent.map((position) => {
    return calculateBasinPositions(
      lavaTubes,
      position.row,
      position.column,
      lavaTubes[position.row][position.column] - 1
    );
  });
};

const calculateLowestBasins = (basins: Array<number>): number => {
  const [first, second, third] = basins.sort((a, b) => b - a);
  return first * second * third;
};

console.log(calculateLowestBasins(calculateBasinsLengths(lavaTubes)));
