import { Player, ComputerPlayer } from "./gamePieces/player";

const player = Player();
const computer = ComputerPlayer();

const currentPlayer = player;

let gridLock = false;

const getGridLock = () => gridLock;

const toggleLock = () => {
  if (gridLock === false) {
    gridLock = true;
    return;
  }
  gridLock = false;
};

const gameController = () => {
  let currentPlayer = player;
  const playerTurn = () => {};
  const computerTurn = () => {};
};

const clickCell = (e) => {
  console.log(e.target.dataset.id);
};

export { gameController, toggleLock, getGridLock, clickCell };
