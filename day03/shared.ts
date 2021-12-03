export const bitsArray2Decimal = (bitArray: Array<boolean>): number =>
  parseInt(bitArray.map((bit) => (bit ? "1" : "0")).join(""), 2);

export type BitMatrix = Array<Array<boolean>>;
