import Board from "./gamePieces/gameBoard";
import { Player, ComputerPlayer } from "./gamePieces/player";

/* const Player = () => {
    const attack = (board, coord) => board.receiveAttack(coord);
    return { attack };
  };
*/



// need to track current turn

const playerBoard = Board();
const computerBoard = Board();

const player = Player();
const computer = ComputerPlayer();

const setupBoards = () => {
  playerBoard.place("A0", "A1");
  playerBoard.place("C3", "C7");
  playerBoard.place("E4", "H4");
  playerBoard.place("J2", "J7");

  computerBoard.place("A0", "A1");
  computerBoard.place("C3", "C7");
  computerBoard.place("E4", "H4");
  computerBoard.place("J2", "J7");

  console.log("boards setup");
};

const gameController = () => {};

export { setupBoards, gameController };
