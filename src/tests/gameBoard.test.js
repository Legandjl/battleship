import Board from "../app/gamePieces/gameBoard";
import Ship from "../app/gamePieces/ship";

let board;
let ship;

beforeEach(() => {
  board = Board();
  ship = Ship();
});

test("unoccupied cell returns correct message", () => {
  expect(JSON.stringify(board.getShip("A1"))).toBe(
    JSON.stringify("cell A1 unoccupied")
  );
});

test("ship placed at coordinates A1, B1", () => {
  board.place("A1", "B1");
  expect(JSON.stringify(board.getShip("A1"))).toBe(JSON.stringify(ship));
});

test("ship of size one placed correctly", () => {
  board.place("A1", "A1");
  expect(JSON.stringify(board.getShip("A1"))).toBe(JSON.stringify(ship));
});

test("ship placed at coordinates A5, E5", () => {
  board.place("A5", "E5");
  expect(JSON.stringify(board.getShip("A5"))).toBe(JSON.stringify(ship));
  expect(JSON.stringify(board.getShip("C5"))).toBe(JSON.stringify(ship));
  expect(JSON.stringify(board.getShip("E5"))).toBe(JSON.stringify(ship));
});

test("ship  horizontal length is correct", () => {
  board.place("B5", "B7");
  expect(board.getShip("B5").getLength()).toBe(3);
});

test("ship  vertical length is correct", () => {
  board.place("A5", "C5");

  expect(board.getShip("A5").getLength()).toBe(3);
});

test("should throw an error if adding a ship to an occupied horizontal space", () => {
  board.place("A5", "A6");
  expect(() => {
    board.place("A5", "A6");
  }).toThrow("space occupied");
});

test("should throw an error if adding a ship to an occupied vertical space", () => {
  board.place("A5", "B5");
  expect(() => {
    board.place("A5", "B5");
  }).toThrow("space occupied");
});

test("attack recorded as missed", () => {
  expect(board.receiveAttack("A4")).toBe(false); // returns false as no ship present
  expect(board.checkHitStatus("A4")).toBe(true); // returns true as cell is still marked as hit
  expect(board.checkHitStatus("A6")).toBe(false);
});

test("attack hits if cell is occupied", () => {
  board.place("A1", "A1");
  expect(board.receiveAttack("A1")).toBe(true);
  const currentShip = board.getBoard().a[1].ship;
  expect(currentShip.isSunk()).toBe(true);
});

test("ship gets sunk if hit in all positions", () => {
  board.place("A1", "A3");
  board.receiveAttack("A1");
  board.receiveAttack("A2");
  board.receiveAttack("A3");
  expect(board.getShip("A3").isSunk()).toBe(true);
  expect(board.getShip("A1").isSunk()).toBe(true);
});

test("ship is not sunk if all positions are not hit", () => {
  board.place("A1", "A4");
  board.receiveAttack("A2");
  expect(board.getShip("A1").isSunk()).toBe(false);
});

test("occupied cell updates hitStatus when hit", () => {
  board.place("A1", "A4");
  board.receiveAttack("A2");
  expect(board.checkHitStatus("A2")).toBe(true);
});

test("returns true if all ships are sunk", () => {
  board.place("A1", "A4");
  board.place("B2", "B5");

  board.receiveAttack("A1");
  board.receiveAttack("A2");
  board.receiveAttack("A3");
  board.receiveAttack("A4");

  board.receiveAttack("B2");
  board.receiveAttack("B3");
  board.receiveAttack("B4");
  board.receiveAttack("B5");

  expect(board.checkForGameOver()).toBe(true);
});

test("returns false if not all ships are sunk", () => {
  board.place("A1", "A4");
  board.place("B2", "B5");

  board.receiveAttack("B2");
  board.receiveAttack("B3");
  board.receiveAttack("B4");
  board.receiveAttack("B5");

  expect(board.checkForGameOver()).toBe(false);
});

test("board ships get setup and positioned in the correct places", () => {
  board.place("A0", "A1");
  board.place("B2", "B6");
  board.place("C7", "F7");
  board.place("J2", "J7");
  board.place("F1", "H1");

  expect(board.checkForShip("A0")).toEqual(true);
  expect(board.checkForShip("B2")).toEqual(true);
  expect(board.checkForShip("C7")).toEqual(true);
  expect(board.checkForShip("D7")).toEqual(true);
  expect(board.checkForShip("J5")).toEqual(true);
  expect(board.checkForShip("F1")).toEqual(true);
});

test("should not throw an error if adding a ship randomly", () => {
  expect(() => {
    for (let x = 0; x < 5; x += 1) {
      if (x % 2 === 0) {
        board.placeRandomHorizontal(x);
      } else {
        board.placeRandomVertical(x);
      }
    }
  }).not.toThrow("space occupied");
});

test("should return false if trying to place in an occupied spot", () => {
  board.place("A1", "B1");
  expect(board.tryToPlace("A1", "B1")).toBe(false);
});

test("should return true if placing in a non occupied spot", () => {
  expect(board.tryToPlace("A1", "B1")).toBe(true);
});
