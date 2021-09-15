import { Player, ComputerPlayer } from "./gamePieces/player";
import { shipHit } from "./ui/userInterface";

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
    if (computer.randomAttack(playerBoard)) {
      shipHit("player", computer.getLastAttack());
    }
    currentPlayer = player;
  };

  const playerTurn = (e) => {
    if (currentPlayer === ComputerPlayer) {
      return;
    }
    if (player.attack(computerBoard, e.target.dataset.id)) {
      e.target.classList.add("hit");
      console.log(`${computerBoard.checkForGameOver()} Game over status`);
    } else {
      e.target.innerText = "X";
    }
    currentPlayer = ComputerPlayer;
    computerTurn();
  };

  return { computerTurn, playerTurn };
};

export { GameController, toggleLock, getGridLock };
