import Ship from "./ship";

const generateBoard = () => {
  const board = {
    a: [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    b: [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    c: [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    d: [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    e: [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    f: [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    g: [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    h: [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    i: [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    j: [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  };
  return board;
};
// helper functions to place ships in grid

const placeHorizontal = (board, startCell, endCell, startRow) => {
  const boardEdit = board;
  const length = endCell - startCell + 1;
  const ship = Ship(length);
  for (let currentCell = startCell; currentCell <= endCell; currentCell += 1) {
    boardEdit[startRow][currentCell] = ship;
  }
  return boardEdit;
};

const placeVertical = (board, startRow, endRow, startCell) => {
  const boardEdit = board;
  let length = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const [key] of Object.entries(boardEdit)) {
    if (key >= startRow && key <= endRow) {
      length += 1;
    }
  }
  const ship = Ship(length);
  // eslint-disable-next-line no-restricted-syntax
  for (const [key] of Object.entries(boardEdit)) {
    if (key >= startRow && key <= endRow) {
      boardEdit[key][startCell] = ship;
    }
  }
  return boardEdit;
};

// main gameboard function

const Board = () => {
  let currentBoard = generateBoard();

  const place = (x, y) => {
    const startRow = x.split("")[0].toLowerCase();
    const startCell = parseInt(x.split("")[1], 10);
    const endRow = y.split("")[0].toLowerCase();
    const endCell = parseInt(y.split("")[1], 10);

    if (startRow === endRow) {
      const updatedBoard = placeHorizontal(
        currentBoard,
        startCell,
        endCell,
        startRow
      );
      currentBoard = updatedBoard;
    } else if (startRow !== endRow) {
      // eslint-disable-next-line no-restricted-syntax
      const updatedBoard = placeVertical(
        currentBoard,
        startRow,
        endRow,
        startCell
      );
      currentBoard = updatedBoard;
    }
    return currentBoard;
  };

  return { place };
};

export default Board;
