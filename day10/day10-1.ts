import path from "path";
import { sumReducer } from "../day08/seven-segment-display";
import {
  errorCosts,
  openCharacters,
  openCharactersClose,
  Stack,
} from "./chunks";
import { readChunks } from "./read-file";

const chunks = readChunks(path.join(__dirname, "input.txt"));

const calculateWrongChunks = (chunks: Array<Array<string>>): number =>
  chunks
    .map((chunk) => {
      let wrongChunk = 0;
      const stack = new Stack<string>();
      for (var character of chunk) {
        if (openCharacters.includes(character)) {
          stack.push(character);
        } else {
          const openCharacter = stack.pop();
          if (
            !openCharacter ||
            openCharactersClose.get(openCharacter)! !== character
          ) {
            wrongChunk = errorCosts.get(character)!;
            break;
          }
        }
      }
      return wrongChunk;
    })
    .reduce(sumReducer, 0);

console.log(calculateWrongChunks(chunks));
