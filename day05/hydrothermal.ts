export type Coordinate = {
  x: number;
  y: number;
};

export type LineSegment = {
  firstEnd: Coordinate;
  lastEnd: Coordinate;
};

export type Diagram = Array<Array<number>>;

export type HydrothermalVentsSystem = {
  segments: Array<LineSegment>;
  diagram: Diagram;
};

export const greaterNumber = (a: number, b: number) => (a > b ? a : b);

export const lowerNumber = (a: number, b: number) => (a > b ? b : a);

export const initializeHydrothermalVentsSystem = (
  segments: Array<LineSegment>
): HydrothermalVentsSystem => {
  const validSegments = segments.filter(
    (segment) =>
      segment.firstEnd.x === segment.lastEnd.x ||
      segment.firstEnd.y === segment.lastEnd.y
  );

  const maxX =
    validSegments
      .map((segment) => greaterNumber(segment.firstEnd.x, segment.lastEnd.x))
      .reduce(greaterNumber, 0) + 1;
  const maxY =
    validSegments
      .map((segment) => greaterNumber(segment.firstEnd.y, segment.lastEnd.y))
      .reduce(greaterNumber, 0) + 1;

  return {
    segments: validSegments,
    diagram: new Array(maxY).fill(0).map(() => new Array(maxX).fill(0)),
  };
};
