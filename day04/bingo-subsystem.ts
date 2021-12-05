export type BoardLine = Map<number, boolean>;
export type BoardColumn = BoardLine;
export type BoardRow = BoardLine;

export type NumberPosition = {
  rowIndex: number;
  columnIndex: number;
};

export type Board = Array<Array<number>>;

export type NumberAppearance = {
  matched: boolean;
  numberInBoards: Record<number, NumberPosition>;
};

export type NumberAppearanceRecord = Record<number, NumberAppearance>;

export type BingoSubsystem = {
  randomNumbers: Array<number>;
  numberAppearances: NumberAppearanceRecord;
  boards: Array<Board>;
  boardWinners: Set<number>;
};

export type GetBoardNumber = (
  board: Board,
  position: number,
  index: number
) => number;

export const getRowBoardNumber: GetBoardNumber = (board, position, index) =>
  board[index][position];

export const getColumnBoardNumber: GetBoardNumber = (board, position, index) =>
  board[position][index];

export const lineMarked =
  (board: Board, numberAppearances: NumberAppearanceRecord) =>
  (getBoardNumber: GetBoardNumber, index: number): boolean => {
    for (var i of Array(5).keys()) {
      if (!numberAppearances[getBoardNumber(board, i, index)].matched)
        return false;
    }
    return true;
  };

export const sumUnMarkedNumbers = (
  board: Board,
  numberAppearances: NumberAppearanceRecord
): number => {
  const sum = (previous: number, current: number): number => previous + current;
  const unMatchedNumbers = (number: number) =>
    !numberAppearances[number].matched;

  return board
    .map((row) => row.filter(unMatchedNumbers).reduce(sum, 0))
    .reduce(sum, 0);
};

const initializeNumberAppearanceRecord = (
  boards: Array<Board>
): NumberAppearanceRecord => {
  const numberAppearances: NumberAppearanceRecord = {};

  for (var boardIndex = 0; boardIndex < boards.length; boardIndex++) {
    for (var rowIndex = 0; rowIndex < 5; rowIndex++) {
      for (var columnIndex = 0; columnIndex < 5; columnIndex++) {
        const number = boards[boardIndex][rowIndex][columnIndex];
        if (!numberAppearances[number]) {
          numberAppearances[number] = {
            matched: false,
            numberInBoards: {},
          };
        }
        numberAppearances[number].numberInBoards[boardIndex] = {
          rowIndex,
          columnIndex,
        };
      }
    }
  }
  return numberAppearances;
};

export const createBingoSubSystem = (
  boards: Array<Board>,
  randomNumbers: Array<number>
): BingoSubsystem => {
  return {
    randomNumbers,
    boards,
    numberAppearances: initializeNumberAppearanceRecord(boards),
    boardWinners: new Set(),
  };
};
