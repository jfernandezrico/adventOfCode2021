import path from "path";
import {
  multiplyBy5,
  notClosedCosts,
  openCharacters,
  openCharactersClose,
} from "./chunks";
import { readChunks } from "./read-file";

const chunks = readChunks(path.join(__dirname, "input.txt"));

const calculateMissingCloseCharacters = (
  missingCloseChars: Array<Array<string>>
): Array<number> =>
  missingCloseChars.map((row) =>
    row
      .reverse()
      .map(
        (missingChar) =>
          notClosedCosts.get(openCharactersClose.get(missingChar)!)!
      )
      .reduce(multiplyBy5, 0)
  );

const getItemInTheMiddle = (array: Array<number>): number =>
  array.sort((a, b) => a - b)[Math.trunc(array.length / 2)];

const getMissingCloseCharacters = (
  chunks: Array<Array<string>>
): Array<Array<string>> =>
  chunks
    .map((chunk) => {
      const stack = new Array<string>();
      for (var character of chunk) {
        if (openCharacters.includes(character)) {
          stack.push(character);
        } else {
          const openCharacter = stack.pop();
          if (
            !openCharacter ||
            openCharactersClose.get(openCharacter)! !== character
          ) {
            return [];
          }
        }
      }
      return stack;
    })
    .filter((n) => n.length > 0);

console.log(
  getItemInTheMiddle(
    calculateMissingCloseCharacters(getMissingCloseCharacters(chunks))
  )
);
