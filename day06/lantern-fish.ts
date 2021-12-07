const calculateFish = (previousDayFish: number, resetNumber: number) => {
  const currentDayFish =
    previousDayFish === 0
      ? resetNumber
      : (previousDayFish * 2 - 1) % previousDayFish;

  return currentDayFish;
};

const sum = (previous: number, current: number): number => previous + current;

const reducerInitialState = (map: Map<number, number>, number: number) => {
  map.set(number, (map.get(number) || 0) + 1);
  return map;
};

export const calculateLanternFish = (
  initialState: Array<number>,
  days: number
): number => {
  let currentLanternFishByDay = new Map<number, number>();
  let previousLanternFishByDay = initialState.reduce(
    reducerInitialState,
    new Map<number, number>()
  );

  for (var i = 1; i <= days; i++) {
    currentLanternFishByDay = new Map<number, number>();
    const numZeros = previousLanternFishByDay.get(0) || 0;
    previousLanternFishByDay.forEach((count, number, map) => {
      const index = calculateFish(number, 6);
      currentLanternFishByDay.set(
        index,
        (currentLanternFishByDay.get(index) || 0) + count
      );
    });
    if (numZeros > 0) {
      currentLanternFishByDay.set(
        8,
        (currentLanternFishByDay.get(8) || 0) + numZeros
      );
    }
    previousLanternFishByDay = currentLanternFishByDay;
  }

  return [...currentLanternFishByDay.values()].reduce(sum);
};
