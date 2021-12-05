import * as fs from "fs";
import { Coordinate, LineSegment } from "./hydrothermal";

const getCoordinate = (coordinateStr: string): Coordinate => {
  const positions = coordinateStr.split(",");
  return {
    x: +positions[0],
    y: +positions[1],
  };
};

export const readHydrothermalVents = (path: string): Array<LineSegment> =>
  fs
    .readFileSync(path, "utf8")
    .toString()
    .split("\n")
    .filter((n) => n)
    .map((row) => {
      const coordinates = row.split(" -> ");
      return {
        firstEnd: getCoordinate(coordinates[0]),
        lastEnd: getCoordinate(coordinates[1]),
      };
    });
