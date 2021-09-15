// eslint-disable-next-line import/no-cycle
import { GameController } from '../gameLoop';
import Board from '../gamePieces/gameBoard';

const content = document.querySelector('#content');

const playerGrid = document.createElement('div');
playerGrid.dataset.type = 'player';
playerGrid.id = 'board';

const computerGrid = document.createElement('div');
computerGrid.id = 'board';
computerGrid.dataset.type = 'computer';

let playerBoard = Board();
let computerBoard = Board();

const gameController = GameController(playerBoard, computerBoard);

const setShipCell = (id) => {
  document.querySelector(`#player${id}`).classList.add('ship');
};

const shipHit = (player, id) => {
  document.querySelector(`#${player}${id}`).classList.add('hit');
};

const markMiss = (player, id) => {
  document.querySelector(`#${player}${id}`).innerText = 'X';
};

const setupBoards = () => {
  playerBoard.place('A1', 'A1');
  playerBoard.place('C3', 'C7');
  playerBoard.place('E4', 'H4');
  playerBoard.place('J2', 'J7');

  const board = playerBoard.getBoard(); // we want the player to be able to see their ships
  // eslint-disable-next-line no-restricted-syntax
  for (const [key] of Object.entries(board)) {
    const currentRow = board[key];
    for (let x = 0; x < currentRow.length; x += 1) {
      if (currentRow[x].status === 'occupied') {
        setShipCell(key.toUpperCase() + x);
      }
    }
  }
  computerBoard.place('A0', 'A1');
  computerBoard.place('C3', 'C7');
  computerBoard.place('E4', 'H4');
  computerBoard.place('J2', 'J7');
};

const setupGrid = (grid, type) => {
  content.appendChild(grid);
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  rows.forEach((key) => {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let x = 0; x < 10; x += 1) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.id = key + x;
      cell.id = type + key + x;
      if (grid.dataset.type === 'computer') {
        cell.addEventListener('click', (e) => {
          gameController.playerTurn(e);
        });
      }
      row.appendChild(cell);
    }
    grid.appendChild(row);
  });
};

const setup = () => {
  content.appendChild(playerGrid);
  content.appendChild(computerGrid);
  setupGrid(playerGrid, 'player');
  setupGrid(computerGrid, 'computer');
  setupBoards();
};

const reset = () => {
  playerBoard = Board();
  computerBoard = Board();
  // reset the board displays
};

export { setupBoards, setup, shipHit, markMiss };
