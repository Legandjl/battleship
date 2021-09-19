import { Player, ComputerPlayer } from "../gamePieces/player";
// eslint-disable-next-line import/no-cycle
import {
  markMiss,
  shipHit,
  setGameOver,
  infoDisplay,
} from "../ui/userInterface";

const GameController = (playerBoard, computerBoard) => {
  let gameoverStatus = false;
  const player = Player();
  const computer = ComputerPlayer();
  let currentPlayer = player;

  const computerTurn = () => {
    if (gameoverStatus) {
      return;
    }
    infoDisplay("Current player: Computer");
    setTimeout(() => {
      if (computer.randomAttack(playerBoard)) {
        shipHit("player", computer.getLastAttack());
      } else {
        markMiss("player", computer.getLastAttack());
      }
      currentPlayer = player;
      gameoverStatus = playerBoard.checkForGameOver();
      if (gameoverStatus) {
        setGameOver("computer");
      }
      infoDisplay("Your turn");
    }, 1000);
  };

  const playerTurn = (e) => {
    if (
      e.target.dataset.status === "hit" ||
      gameoverStatus ||
      currentPlayer === ComputerPlayer
    ) {
      return;
    }

    if (player.attack(computerBoard, e.target.dataset.id)) {
      e.target.classList.add("hit");
    } else {
      e.target.innerText = "X";
    }
    e.target.dataset.status = "hit";
    currentPlayer = ComputerPlayer;
    gameoverStatus = computerBoard.checkForGameOver();
    if (gameoverStatus) {
      setGameOver("player");
      return;
    }
    computerTurn();
  };

  return { computerTurn, playerTurn };
};

export default GameController;
