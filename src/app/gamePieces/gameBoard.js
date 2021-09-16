import Ship from "./ship";
import { generateBoard, parseCoord } from "./helpers";

const statusMessages = { occupied: "occupied", unoccupied: "unoccupied" };
// helper functions to place ships in grid
const placeHorizontal = (board, startCell, endCell, startRow) => {
  const boardEdit = board();
  for (let currentCell = startCell; currentCell <= endCell; currentCell += 1) {
    if (boardEdit[startRow][currentCell].status !== statusMessages.unoccupied) {
      throw new Error("space occupied");
    }
  }
  const length = endCell - startCell + 1;
  const ship = Ship(length);
  let pos = 0;
  for (let currentCell = startCell; currentCell <= endCell; currentCell += 1) {
    boardEdit[startRow][currentCell].ship = ship;
    boardEdit[startRow][currentCell].pos = pos;
    boardEdit[startRow][currentCell].status = statusMessages.occupied;
    pos += 1;
  }
  return boardEdit;
};
const placeVertical = (board, startRow, endRow, cell) => {
  const boardEdit = board();
  let length = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const [key] of Object.entries(boardEdit)) {
    if (key >= startRow && key <= endRow) {
      if (boardEdit[key][cell].status !== statusMessages.unoccupied) {
        throw new Error("space occupied");
      }
      length += 1;
    }
  }
  const ship = Ship(length);
  let pos = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const [key] of Object.entries(boardEdit)) {
    if (key >= startRow && key <= endRow) {
      boardEdit[key][cell].status = statusMessages.occupied;
      boardEdit[key][cell].ship = ship;
      boardEdit[key][cell].pos = pos;
      pos += 1;
    }
  }
  return boardEdit;
};
// helper function to check if all ships on a gameboard are sunk
const checkShips = (board) => {
  let allSunk = true;
  // eslint-disable-next-line no-restricted-syntax
  for (const [key] of Object.entries(board)) {
    // eslint-disable-next-line no-loop-func
    board[key].forEach((item) => {
      if (item.status === "occupied" && item.ship.isSunk() === false) {
        allSunk = false;
      }
    });
  }
  return allSunk;
};
// main gameboard function
const Board = () => {
  const boardInterface = {};
  let currentBoard = generateBoard();
  boardInterface.getBoard = () => currentBoard;
  // places a ship in the specified location
  boardInterface.place = (x, y) => {
    const coordA = parseCoord(x);
    const coordB = parseCoord(y);
    if (coordA.row === coordB.row) {
      currentBoard = placeHorizontal(
        boardInterface.getBoard,
        coordA.cell,
        coordB.cell,
        coordA.row
      );
    } else if (coordA.row !== coordB.row) {
      // eslint-disable-next-line no-restricted-syntax
      currentBoard = placeVertical(
        boardInterface.getBoard,
        coordA.row,
        coordB.row,
        coordA.cell
      );
    }
    return currentBoard;
  };

  boardInterface.receiveAttack = (pos) => {
    let hitSuccesful = false; // will be true if a ship gets hit
    const coords = parseCoord(pos);
    const currentCell = boardInterface.getBoard()[coords.row][coords.cell];
    if (currentCell.hitStatus === true) {
      return hitSuccesful;
      // position has already been hit, return false
    }
    if (currentCell.status === statusMessages.unoccupied) {
      currentCell.hitStatus = true;
      console.log("EMPTY CELL HIT");
    } else {
      currentCell.ship.hit(currentCell.pos);
      currentCell.hitStatus = true;
      hitSuccesful = true;
      console.log("SHIP HIT");
    }
    return hitSuccesful;
  };
  // checks if a cell is hit
  boardInterface.checkHitStatus = (pos) => {
    const coord = parseCoord(pos);
    const cellContent = boardInterface.getBoard()[coord.row][coord.cell];
    return cellContent.hitStatus;
  };
  // returns a ship, if one is present at pos
  boardInterface.getShip = (pos) => {
    const coord = parseCoord(pos);
    const cellContent = boardInterface.getBoard()[coord.row][coord.cell];
    if (cellContent.status === statusMessages.occupied) {
      return cellContent.ship;
    }
    return `cell ${pos} ${statusMessages.unoccupied}`;
  };

  boardInterface.checkForShip = (pos) => {
    const coord = parseCoord(pos);
    const cell = boardInterface.getBoard()[coord.row][coord.cell];
    if (cell.status === "occupied") {
      return true;
    }
    return false;
  };

  boardInterface.checkForGameOver = () => checkShips(boardInterface.getBoard());

  return boardInterface;
};

export default Board;
