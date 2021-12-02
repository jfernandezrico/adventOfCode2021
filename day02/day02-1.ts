import path from "path";
import { readMovementsFromFile } from "../shared/read-file";
import { Direction } from "../shared/submarine";
const movements = readMovementsFromFile(path.join(__dirname, "input.txt"));

const movementCounts: Record<Direction, number> = {
  forward: 0,
  up: 0,
  down: 0,
};

movements.forEach((movement) => {
  movementCounts[movement.direction] += movement.position;
});

const result =
  movementCounts.forward * Math.abs(movementCounts.up - movementCounts.down);

console.log(result);
