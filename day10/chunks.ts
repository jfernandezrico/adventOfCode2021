export class Stack<T> {
  _store: T[] = [];
  push(val: T) {
    this._store.push(val);
  }
  pop(): T | undefined {
    return this._store.pop();
  }
}

export const sumReducer = (previous: number, current: number): number =>
  previous + current;

export const multiplyBy5 = (previous: number, current: number): number =>
  5 * previous + current;

export const openCharacters = ["{", "[", "<", "("];
export const openCharactersClose = new Map([
  ["{", "}"],
  ["[", "]"],
  ["<", ">"],
  ["(", ")"],
]);
export const errorCosts = new Map([
  ["}", 1197],
  ["]", 57],
  [">", 25137],
  [")", 3],
]);

export const notClosedCosts = new Map([
  ["}", 3],
  ["]", 2],
  [">", 4],
  [")", 1],
]);
