import { Player, ComputerPlayer } from "../gamePieces/player";
// eslint-disable-next-line import/no-cycle
import {
  markMiss,
  shipHit,
  setGameOver,
  infoDisplay,
} from "../ui/userInterface";

const GameController = (playerBoard, computerBoard) => {
  const player = Player();
  const computer = ComputerPlayer();
  let currentPlayer = player;

  const computerTurn = () => {
    infoDisplay("Current player: Computer");
    setTimeout(() => {
      if (computer.randomAttack(playerBoard)) {
        shipHit("player", computer.getLastAttack());
      } else {
        markMiss("player", computer.getLastAttack());
      }
      currentPlayer = player;

      if (playerBoard.checkForGameOver()) {
        setGameOver("computer");
        return;
      }

      infoDisplay("Your turn");
    }, 1000);
  };

  const playerTurn = (e) => {
    if (e.target.dataset.status === "hit" || currentPlayer === ComputerPlayer) {
      return;
    }

    if (playerBoard.checkForGameOver()) {
      setGameOver("Computer");
      return;
    }

    if (player.attack(computerBoard, e.target.dataset.id)) {
      e.target.classList.add("hit");
    } else {
      e.target.innerText = "X";
    }
    e.target.dataset.status = "hit";
    currentPlayer = ComputerPlayer;

    if (computerBoard.checkForGameOver()) {
      setGameOver("player");
      return;
    }

    computerTurn();

    if (playerBoard.checkForGameOver()) {
      setGameOver("Computer");
    }
  };

  return { computerTurn, playerTurn };
};

export default GameController;
