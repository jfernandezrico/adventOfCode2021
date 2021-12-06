import path from "path";
import { readInitialState } from "./read-file";

const initialState = readInitialState(path.join(__dirname, "input.txt"));

const calculateFish = (previousDayFish: number, resetNumber: number) => {
  const currentDayFish =
    previousDayFish === 0
      ? resetNumber
      : (previousDayFish * 2 - 1) % previousDayFish;

  return currentDayFish;
};

const calculateLanternFish = (
  initialState: Array<number>,
  days: number
): number => {
  const lanternFishByDay = Array<Array<number>>(days + 1);
  lanternFishByDay[0] = initialState;

  for (var i = 1; i <= days; i++) {
    let numZeros = 0;
    lanternFishByDay[i] = [];
    lanternFishByDay[i - 1].forEach((number) => {
      if (number === 0) numZeros++;
      lanternFishByDay[i].push(calculateFish(number, 6));
    });

    lanternFishByDay[i] = lanternFishByDay[i].concat(Array(numZeros).fill(8));
  }
  return lanternFishByDay[days].length;
};

console.log(calculateLanternFish(initialState, 80));
