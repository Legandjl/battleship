import Ship from "../app/gamePieces/ship";

test("test ship hit in position 3", () => {
  const ship = Ship(3);
  expect(ship.hit(2)).toBe(true);
  expect(ship.hit(3)).toBe(true);
});

test("test ship hit in position 6 and position 3", () => {
  const ship = Ship(6);
  ship.hit(6);
  ship.hit(3);
  expect(ship.checkIfPosHit(6)).toBe(true);
  expect(ship.checkIfPosHit(3)).toBe(true);
});

test("ship hit in all positions is sunk", () => {
  const ship = Ship(2);
  ship.hit(1);
  ship.hit(0);
  ship.hit(2);
  expect(ship.isSunk()).toBe(true);
});

test("ship hit in one position is not sunk", () => {
  const ship = Ship(2);
  ship.hit(1);
  expect(ship.isSunk()).toBe(false);
});

test("ship with no hits is not sunk", () => {
  const ship = Ship(2);
  expect(ship.isSunk()).toBe(false);
});

test("ship cant be hit in an already hit position", () => {
  const ship = Ship(2);
  expect(ship.hit(1)).toBe(true);
  expect(ship.hit(1)).toBe(false);
});

test("ship cannot be hit at a pos > ship length", () => {
  const ship = Ship(2);
  expect(ship.hit(3)).toBe(false);
});
