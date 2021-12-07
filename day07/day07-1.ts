import path from "path";
import { readHorizontalPositions } from "./read-file";

const horizontalPositions = readHorizontalPositions(
  path.join(__dirname, "input.txt")
);

export const lowerNumber = (a: number, b: number) => (a > b ? b : a);

let leastFuel = Number.MAX_SAFE_INTEGER;
horizontalPositions.forEach((position) => {
  const fuelReducer = (previous: number, current: number): number =>
    previous + Math.abs(current - position);
  const currentFuel = horizontalPositions.reduce(fuelReducer, 0);
  leastFuel = lowerNumber(leastFuel, currentFuel);
});

console.log(leastFuel);
