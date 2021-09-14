import { getGridLock, toggleLock } from "../app/gameLoop";

test("expect toggleLock to be true if locked", () => {
  expect(getGridLock()).toBe(false);
  toggleLock();
  expect(getGridLock()).toBe(true);
  toggleLock();
  expect(getGridLock()).toBe(false);
});

