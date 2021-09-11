import Board from "../gamePieces/gameBoard";
import Ship from "../gamePieces/ship";

let board;
let ship;

beforeEach(() => {
  board = Board();
  ship = Ship();
});

test("ship placed at coordinates A1, B1", () => {
  expect(JSON.stringify(board.place("A1", "B1").a[1])).toBe(
    JSON.stringify(ship)
  );
  expect(JSON.stringify(board.place("A1", "B1").b[1])).toBe(
    JSON.stringify(ship)
  );
});

test("ship placed at coordinates A5, E5", () => {
  expect(JSON.stringify(board.place("A5", "E5").a[5])).toBe(
    JSON.stringify(ship)
  );
  expect(JSON.stringify(board.place("A5", "E5").c[5])).toBe(
    JSON.stringify(ship)
  );
  expect(JSON.stringify(board.place("A5", "E5").e[5])).toBe(
    JSON.stringify(ship)
  );
});

test("ship  horizontal length is correct", () => {
  expect(board.place("A5", "A6").a[5].getLength()).toBe(2);
  expect(board.place("A5", "A8").a[5].getLength()).toBe(4);
});

test("ship  vertical length is correct", () => {
  expect(board.place("A5", "C5").a[5].getLength()).toBe(3);
});

