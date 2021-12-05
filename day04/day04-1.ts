import path from "path";
import {
  BingoSubsystem,
  getColumnBoardNumber,
  getRowBoardNumber,
  lineMarked,
  sumUnMarkedNumbers,
} from "./bingo-subsystem";
import { readBingoSubsystemFromFile } from "./read-file";
const bingoSubSystem = readBingoSubsystemFromFile(
  path.join(__dirname, "input.txt")
);

const calculateScore = (bingoSubSystem: BingoSubsystem): number => {
  for (var randomNumber of bingoSubSystem.randomNumbers) {
    bingoSubSystem.numberAppearances[randomNumber].matched = true;
    const numberAppearance = bingoSubSystem.numberAppearances[randomNumber];

    const boardIndexes = Object.keys(numberAppearance.numberInBoards).map(
      Number
    );
    for (var boardIndex of boardIndexes) {
      const board = bingoSubSystem.boards[boardIndex];
      const getLineMarked = lineMarked(board, bingoSubSystem.numberAppearances);
      if (
        getLineMarked(
          getRowBoardNumber,
          numberAppearance.numberInBoards[boardIndex].rowIndex
        ) ||
        getLineMarked(
          getColumnBoardNumber,
          numberAppearance.numberInBoards[boardIndex].columnIndex
        )
      ) {
        return (
          sumUnMarkedNumbers(board, bingoSubSystem.numberAppearances) *
          randomNumber
        );
      }
    }
  }
  return 0;
};

console.log(calculateScore(bingoSubSystem));
