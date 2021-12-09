export type SevenSegmentDisplay = {
  input: Array<string>;
  output: Array<string>;
};

export type SevenSegmentPosition = "a" | "b" | "c" | "d" | "e" | "f" | "g";

export type SevenSegmentRightPositions = Map<
  SevenSegmentPosition,
  SevenSegmentPosition
>;

export type KnownSevenSegmentDigits = 1 | 7 | 4 | 8;

export type KnownSevenSegmentCombination = Map<KnownSevenSegmentDigits, string>;

export const isOne = (str: string) => str.length === 2;

export const isSeven = (str: string) => str.length === 3;

export const isFour = (str: string) => str.length === 4;

export const isEight = (str: string) => str.length === 7;

export const sumReducer = (previous: number, current: number): number =>
  previous + current;
