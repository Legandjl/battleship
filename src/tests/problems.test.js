import {
  reverseString,
  capitalise,
  Calculator,
  ceaser,
  analyse,
} from "./problems";

test("expects hello to equal olleh", () => {
  expect(reverseString("hello")).toBe("olleh");
});

test("expects hello to equal Hello", () => {
  expect(capitalise("hello")).toBe("Hello");
});

test("expects 1 + 1 to equal 2", () => {
  const calc = Calculator();
  expect(calc.add(1, 3)).toBe(4);
});

test("expects 4 - 1 to equal 3", () => {
  const calc = Calculator();
  expect(calc.subtract(4, 1)).toBe(3);
});

test("expects 2 * 2 to equal 4", () => {
  const calc = Calculator();
  expect(calc.multiplay(2, 2)).toBe(4);
});

test("expects 4 / 2 to equal 2", () => {
  const calc = Calculator();
  expect(calc.divide(4, 2)).toBe(2);
});

test("expects hello, 25 to equal gdkkn", () => {
  expect(ceaser("hello", 25)).toBe("gdkkn");
});

test("expects [1,8,3,4,2,6] to return {average: 4, min: 1, max: 8, length: 6", () => {
  expect(analyse([1, 8, 3, 4, 2, 6])).toStrictEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6,
  });
});
