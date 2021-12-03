import path from "path";
import { readBitsFromFile } from "../shared/read-file";
const bitMatrix = readBitsFromFile(path.join(__dirname, "input.txt"));

const calculateGamma = (bitMatrix: Array<Array<boolean>>): Array<boolean> => {
  const positiveBitCountArray = Array<number>();
  bitMatrix.forEach((bitArray) =>
    bitArray.forEach((bit, index) => {
      const positiveBitCount = positiveBitCountArray[index] ?? 0;
      positiveBitCountArray[index] = positiveBitCount + (bit ? 1 : 0);
    })
  );
  return positiveBitCountArray.map(
    (positiveBitCount) => positiveBitCount > bitMatrix.length / 2
  );
};

const bitsArray2Decimal = (bitArray: Array<boolean>): number =>
  parseInt(bitArray.map((bit) => (bit ? "1" : "0")).join(""), 2);

const reverseBits = (bitArray: Array<boolean>): Array<boolean> =>
  bitArray.map((bit) => !bit);

const gamma = calculateGamma(bitMatrix);
const gammaNumber = bitsArray2Decimal(gamma);
const epsilonNumber = bitsArray2Decimal(reverseBits(gamma));

console.log(gammaNumber * epsilonNumber);
