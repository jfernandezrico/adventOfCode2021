import path from "path";
import { readMovementsFromFile } from "../shared/read-file";
import { Movement } from "../shared/submarine";
const movements = readMovementsFromFile(path.join(__dirname, "input.txt"));

export type DirectionAim = "forward" | "aim" | "depth";

const calculateMovements = (movements: Movement[]) => {
  const movementCounts: Record<DirectionAim, number> = {
    forward: 0,
    aim: 0,
    depth: 0,
  };

  movements.forEach((movement) => {
    switch (movement.direction) {
      case "forward": {
        movementCounts.forward += movement.position;
        movementCounts.depth += movementCounts.aim * movement.position;
        break;
      }
      case "down": {
        movementCounts.aim += movement.position;
        break;
      }
      case "up": {
        movementCounts.aim -= movement.position;
        break;
      }
    }
  });
  return movementCounts;
};

const multiplyMovements = (movementCounts: Record<DirectionAim, number>) =>
  movementCounts.forward * movementCounts.depth;

console.log(multiplyMovements(calculateMovements(movements)));
