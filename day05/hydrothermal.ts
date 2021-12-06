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

export type Distance = {
  begin: number;
  end: number;
};

export const greaterNumber = (a: number, b: number) => (a > b ? a : b);

export const lowerNumber = (a: number, b: number) => (a > b ? b : a);

export const initializeHydrothermalVentsSystem = (
  segments: Array<LineSegment>,
  removeDiagonals = true
): HydrothermalVentsSystem => {
  const validSegments = removeDiagonals
    ? segments.filter(
        (segment) =>
          segment.firstEnd.x === segment.lastEnd.x ||
          segment.firstEnd.y === segment.lastEnd.y
      )
    : segments;

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

const sum = (previous: number, current: number): number => previous + current;

export const calculateTotalOverlaps = (diagram: Diagram): number =>
  diagram.map((row) => row.filter((item) => item > 1).length).reduce(sum, 0);

export const greatestDistance = (segment: LineSegment): Distance => {
  const beginX = lowerNumber(segment.firstEnd.x, segment.lastEnd.x);
  const endX = greaterNumber(segment.firstEnd.x, segment.lastEnd.x);
  const beginY = lowerNumber(segment.firstEnd.y, segment.lastEnd.y);
  const endY = greaterNumber(segment.firstEnd.y, segment.lastEnd.y);

  return endX - beginX > endY - beginY
    ? { begin: beginX, end: endX }
    : { begin: beginY, end: endY };
};
