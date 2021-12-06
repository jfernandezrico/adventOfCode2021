import path from "path";
import {
    calculateTotalOverlaps,
  Diagram,
  greaterNumber,
  HydrothermalVentsSystem,
  initializeHydrothermalVentsSystem,
  lowerNumber,
} from "./hydrothermal";
import { readHydrothermalVents } from "./read-file";
const segments = readHydrothermalVents(path.join(__dirname, "input.txt"));

const hydrothermalVentsSystem = initializeHydrothermalVentsSystem(segments);

const calculateDiagram = (
  hydrothermalVentsSystem: HydrothermalVentsSystem
): Diagram => {
  hydrothermalVentsSystem.segments.forEach((segment) => {
    if (segment.firstEnd.x === segment.lastEnd.x) {
      const firstIndex = lowerNumber(segment.firstEnd.y, segment.lastEnd.y);
      const lastIndex = greaterNumber(segment.firstEnd.y, segment.lastEnd.y);
      for (var i = firstIndex; i <= lastIndex; i++) {
        hydrothermalVentsSystem.diagram[i][segment.firstEnd.x]++;
      }
    } else {
      const firstIndex = lowerNumber(segment.firstEnd.x, segment.lastEnd.x);
      const lastIndex = greaterNumber(segment.firstEnd.x, segment.lastEnd.x);
      for (var i = firstIndex; i <= lastIndex; i++) {
        hydrothermalVentsSystem.diagram[segment.firstEnd.y][i]++;
      }
    }
  });
  return hydrothermalVentsSystem.diagram;
};

console.log(calculateTotalOverlaps(calculateDiagram(hydrothermalVentsSystem)));
