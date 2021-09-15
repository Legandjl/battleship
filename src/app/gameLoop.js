import { Player, ComputerPlayer } from './gamePieces/player';
// eslint-disable-next-line import/no-cycle
import { markMiss, shipHit } from './ui/userInterface';

let gridLock = false;

const getGridLock = () => gridLock;

const toggleLock = () => {
  if (gridLock === false) {
    gridLock = true;
    return;
  }
  gridLock = false;
};

const GameController = (playerBoard, computerBoard) => {
  const player = Player();
  const computer = ComputerPlayer();
  let currentPlayer = player;
  const computerTurn = () => {
    if (playerBoard.checkForGameOver() === true) {
      console.log('gameover');
    }
    if (computer.randomAttack(playerBoard)) {
      shipHit('player', computer.getLastAttack());
    } else {
      markMiss('player', computer.getLastAttack());
    }

    currentPlayer = player;
  };

  const playerTurn = (e) => {
    if (
      e.target.dataset.status === 'hit' ||
      computerBoard.checkForGameOver() ||
      currentPlayer === ComputerPlayer
    ) {
      return;
    }

    if (player.attack(computerBoard, e.target.dataset.id)) {
      e.target.classList.add('hit');
    } else {
      e.target.innerText = 'X';
    }
    if (computerBoard.checkForGameOver()) {
      console.log('gave over');
    }
    e.target.dataset.status = 'hit';
    currentPlayer = ComputerPlayer;
    computerTurn();
  };

  return { computerTurn, playerTurn };
};

export { GameController, toggleLock, getGridLock };
