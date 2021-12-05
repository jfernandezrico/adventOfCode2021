import * as fs from "fs";
import { BingoSubsystem, createBingoSubSystem } from "./bingo-subsystem";

const stringCommaNumbers2ArrayNumbers = (str: string): Array<number> =>
  str.split(",").map(Number);

const getLinesFromFile = (path: string, lineSeparator: string): Array<string> =>
  fs
    .readFileSync(path, "utf8")
    .toString()
    .split(lineSeparator)
    .filter((n) => n);

const boardsString2boardsNumbers = (
  boardsString: Array<string>
): Array<Array<Array<number>>> =>
  boardsString.map((board) =>
    board
      .split("\n")
      .filter((n) => n)
      .map((row) =>
        row
          .split(" ")
          .filter((n) => n)
          .map(Number)
      )
  );

export const readBingoSubsystemFromFile = (path: string): BingoSubsystem => {
  const [randomNumbersInFile, ...boardsInFile] = getLinesFromFile(path, "\n\n");

  const randomNumbers = stringCommaNumbers2ArrayNumbers(randomNumbersInFile);
  const boards = boardsString2boardsNumbers(boardsInFile);

  return createBingoSubSystem(boards, randomNumbers);
};
