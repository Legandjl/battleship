// eslint-disable-next-line import/no-cycle
import GameController from "../logic/gameLoop";
import Board from "../gamePieces/gameBoard";
import reset from "../../images/reset.png";

const content = document.querySelector("#content");
const playerGrid = document.createElement("div");
playerGrid.dataset.type = "player";
playerGrid.id = "board";

const computerGrid = document.createElement("div");
computerGrid.id = "board";
computerGrid.dataset.type = "computer";

const resetButton = new Image();
resetButton.src = reset;

const setShipCell = (id) => {
  document.querySelector(`#player${id}`).classList.add("ship");
};

const shipHit = (player, id) => {
  document.querySelector(`#${player}${id}`).classList.add("hit");
};

const markMiss = (player, id) => {
  document.querySelector(`#${player}${id}`).innerText = "X";
};

const setupBoards = (playerBoard, computerBoard) => {
  const board = playerBoard.getBoard(); // we want the player to be able to see their ships

  for (let x = 0; x < 5; x += 1) {
    if (x % 2 === 0) {
      playerBoard.placeRandomHorizontal(x);
      computerBoard.placeRandomHorizontal(x);
    } else {
      computerBoard.placeRandomVertical(x);
      playerBoard.placeRandomVertical(x);
    }
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const [key] of Object.entries(board)) {
    const currentRow = board[key];
    for (let x = 0; x < currentRow.length; x += 1) {
      if (currentRow[x].status === "occupied") {
        setShipCell(key.toUpperCase() + x);
      }
    }
  }
};

const infoDisplay = (text) => {
  document.querySelector("#currentTurn").innerText = text;
};

const setupGrid = (grid, type, controller) => {
  content.appendChild(grid);
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  rows.forEach((key) => {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let x = 0; x < 10; x += 1) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.id = key + x;
      cell.id = type + key + x;
      if (grid.dataset.type === "computer") {
        cell.addEventListener("click", (e) => {
          controller.playerTurn(e);
        });
      }
      row.appendChild(cell);
    }
    grid.appendChild(row);
  });
};

const setup = () => {
  const playerBoard = Board();
  const computerBoard = Board();
  const gameController = GameController(playerBoard, computerBoard);
  const currentTurn = document.createElement("div");
  currentTurn.id = "currentTurn";
  const info = document.createElement("div");
  info.id = "info";
  info.append(resetButton);
  info.append(currentTurn);

  currentTurn.innerText = "Click a cell to begin";
  resetButton.addEventListener("click", () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.classList.remove("ship");
      cell.classList.remove("hit");
      const currentCell = cell;
      currentCell.innerText = "";
    });
    playerBoard.resetBoard();
    computerBoard.resetBoard();
    setupBoards(playerBoard, computerBoard);
  });
  setupGrid(playerGrid, "player", gameController);
  setupGrid(computerGrid, "computer", gameController);
  content.appendChild(playerGrid);
  content.append(info);
  content.appendChild(computerGrid);
  setupBoards(playerBoard, computerBoard);
};

const setGameOver = (winner) => {
  const resetStatus = "Click to play again";
  if (winner === "player") {
    infoDisplay(`You win\n ${resetStatus}`);
  } else {
    infoDisplay("Computer wins \n Click to play again");
  }
};

export { setupBoards, setup, shipHit, markMiss, setGameOver, infoDisplay };
