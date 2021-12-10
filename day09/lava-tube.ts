export type Position = {
  row: number;
  column: number;
};

export const sumReducer = (previous: number, current: number): number =>
  previous + current;

export const calculateLowestAdjacent = (
  lavaTubes: Array<Array<number>>
): Array<Position> => {
  const result: Array<Position> = [];
  lavaTubes.forEach((lavaTube, tubeIndex, tubes) => {
    lavaTube.forEach((number, indexInTube) => {
      const up =
        tubeIndex > 0
          ? tubes[tubeIndex - 1][indexInTube]
          : Number.MAX_SAFE_INTEGER;

      const left =
        indexInTube > 0 ? lavaTube[indexInTube - 1] : Number.MAX_SAFE_INTEGER;

      const down =
        tubeIndex + 1 < tubes.length
          ? tubes[tubeIndex + 1][indexInTube]
          : Number.MAX_SAFE_INTEGER;

      const right =
        indexInTube + 1 < lavaTube.length
          ? lavaTube[indexInTube + 1]
          : Number.MAX_SAFE_INTEGER;

      if (number < up && number < left && number < down && number < right) {
        result.push({
          row: tubeIndex,
          column: indexInTube,
        });
      }
    });
  });
  return result;
};
