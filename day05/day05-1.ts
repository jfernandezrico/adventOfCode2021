import path from "path";
import {
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

const sum = (previous: number, current: number): number => previous + current;

const calculateTotalOverlaps = (diagram: Diagram): number =>
  diagram.map((row) => row.filter((item) => item > 1).length).reduce(sum, 0);

console.log(calculateTotalOverlaps(calculateDiagram(hydrothermalVentsSystem)));
