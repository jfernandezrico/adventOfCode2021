import path from "path";
import { calculateLanternFish } from "./lantern-fish";
import { readInitialState } from "./read-file";

const initialState = readInitialState(path.join(__dirname, "input.txt"));

console.log(calculateLanternFish(initialState, 80));
