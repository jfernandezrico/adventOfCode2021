import path from "path";
import {
  calculateTotalOverlaps,
  Diagram,
  greatestDistance,
  HydrothermalVentsSystem,
  initializeHydrothermalVentsSystem,
} from "./hydrothermal";
import { readHydrothermalVents } from "./read-file";
const segments = readHydrothermalVents(path.join(__dirname, "input.txt"));

const hydrothermalVentsSystem = initializeHydrothermalVentsSystem(
  segments,
  false
);

const calculateDiagram = (
  hydrothermalVentsSystem: HydrothermalVentsSystem
): Diagram => {
  const loopIndexOperation = (
    firstPosition: number,
    lastPosition: number,
    index: number
  ): number => {
    const difference = firstPosition - lastPosition;
    return difference > 0 ? index - 1 : difference === 0 ? index : index + 1;
  };
  hydrothermalVentsSystem.segments.forEach((segment) => {
    var y = segment.firstEnd.y;
    var x = segment.firstEnd.x;
    const distance = greatestDistance(segment);
    for (var i = distance.begin; i <= distance.end; i++) {
      hydrothermalVentsSystem.diagram[y][x]++;
      y = loopIndexOperation(segment.firstEnd.y, segment.lastEnd.y, y);
      x = loopIndexOperation(segment.firstEnd.x, segment.lastEnd.x, x);
    }
  });
  return hydrothermalVentsSystem.diagram;
};

console.log(calculateTotalOverlaps(calculateDiagram(hydrothermalVentsSystem)));
