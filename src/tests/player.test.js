import { Player, ComputerPlayer } from '../app/gamePieces/player';
import Board from '../app/gamePieces/gameBoard';

let player;
let computerPlayer;
let board;

beforeEach(() => {
  player = Player(board);
  computerPlayer = ComputerPlayer();
  board = Board();
  board.place('A1', 'B1');
});

test('player can sink a ship', () => {
  player.attack(board, 'A1');
  player.attack(board, 'B1');
  const shipHitStatus = board.getShip('A1');
  expect(shipHitStatus.isSunk()).toBe(true);
});

test('player can miss a ship', () => {
  expect(player.attack(board, 'A5')).toBe(false);
  expect(board.getShip('A5')).toEqual('cell A5 unoccupied');
  expect(board.checkHitStatus('A5')).toBe(true);
});

test('player can hit a ship', () => {
  expect(player.attack(board, 'A1')).toBe(true);
});

test('computerPlayer can hit a ship', () => {
  expect(computerPlayer.attack(board, 'A1')).toBe(true);
});

test('Computer player can miss a ship', () => {
  expect(computerPlayer.attack(board, 'A5')).toBe(false);
  expect(board.getShip('A5')).toEqual('cell A5 unoccupied');
  expect(board.checkHitStatus('A5')).toBe(true);
});

test('computer player can sink a ship', () => {
  computerPlayer.attack(board, 'A1');
  computerPlayer.attack(board, 'B1');
  const shipHitStatus = board.getShip('A1');
  expect(shipHitStatus.isSunk()).toBe(true);
});

test('computer player can make a random move', () => {
  computerPlayer.randomAttack(board);
  computerPlayer.randomAttack(board);
  const status = ['.', 'x', true, false];
  const isIncluded = status.includes(computerPlayer.randomAttack(board));
  expect(isIncluded).toBe(true);
});
