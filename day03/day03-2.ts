import path from "path";
import { readBitsFromFile } from "../shared/read-file";
import { BitMatrix, bitsArray2Decimal } from "./shared";

type BitMatrixByBit = Record<number, Array<Array<boolean>>>;

type GetBitMatrixByBit = (
  bitMatrix: Array<Array<boolean>>,
  index: number
) => BitMatrixByBit;

type GetBitForRating = (bitMatrixByBit: BitMatrixByBit) => number;

const bitMatrix: BitMatrix = readBitsFromFile(
  path.join(__dirname, "input.txt")
);

const getBitMatrixByBit: GetBitMatrixByBit = (bitMatrix, index) => {
  const result: BitMatrixByBit = {
    1: [],
    0: [],
  };

  bitMatrix.forEach((bitArray) => {
    result[+bitArray[index]].push(bitArray);
  });
  return result;
};

const getMostUsedBitForRating: GetBitForRating = (bitMatrixByBit) =>
  bitMatrixByBit[1].length >= bitMatrixByBit[0].length ? 1 : 0;

const getLeastUsedBitRating: GetBitForRating = (bitMatrixByBit) =>
  bitMatrixByBit[0].length <= bitMatrixByBit[1].length ? 0 : 1;

const getRating =
  (getBitMatrixByBit: GetBitMatrixByBit) =>
  (getBitForRating: GetBitForRating) =>
  (bitMatrix: BitMatrix, index: number): Array<boolean> => {
    const bitMatrixByBit = getBitMatrixByBit(bitMatrix, index);
    const bit = getBitForRating(bitMatrixByBit);

    if (bitMatrixByBit[bit].length === 1) return bitMatrixByBit[bit][0];

    return getRating(getBitMatrixByBit)(getBitForRating)(
      bitMatrixByBit[bit],
      index + 1
    );
  };

const getBitMatrixByBitRating = getRating(getBitMatrixByBit);
const getOxygenGeneratorRating = getBitMatrixByBitRating(
  getMostUsedBitForRating
);
const getCO2ScrubberRating = getBitMatrixByBitRating(getLeastUsedBitRating);

const oxygenGeneratorRating = bitsArray2Decimal(
  getOxygenGeneratorRating(bitMatrix, 0)
);

const co2ScrubberRating = bitsArray2Decimal(getCO2ScrubberRating(bitMatrix, 0));

console.log(oxygenGeneratorRating * co2ScrubberRating);
