import { Ship } from "../gamePieces/ship";

test("test ship hit in position 3", () => {
  const ship = Ship(3);
  expect(ship.hit(2)).toEqual("ship hit at position 2");
});

test("test ship hit in position 6 and position 3", () => {
  const ship = Ship(6);
  expect(ship.hit(6)).toEqual("ship hit at position 6");
  expect(ship.hit(3)).toEqual("ship hit at position 3");
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
