const analyse = (arr) => {
  const obj = {};
 
  obj.average =
    arr.reduce((acc, item) => {
      let currentVal = acc;
      currentVal += item;
      return currentVal;
    }) / arr.length;

  obj.min = arr.reduce((acc, item) => {
    let currentVal = acc;
    if (item < currentVal) {
      currentVal = item;
    }
    return currentVal;
  });

  obj.max = arr.reduce((acc, item) => {
    let currentVal = acc;
    if (item > currentVal) {
      currentVal = item;
    }
    return currentVal;
  });

  obj.length = arr.length;

  console.log(obj)

  return obj;
};

const reverseString = (string) => string.split("").reverse().join("");

const capitalise = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const Calculator = () => {
  const publicMethods = {};
  publicMethods.add = (num1, num2) => num1 + num2;
  publicMethods.subtract = (num1, num2) => num1 - num2;
  publicMethods.multiplay = (num1, num2) => num1 * num2;
  publicMethods.divide = (num1, num2) => num1 / num2;
  return publicMethods;
};

const getCharacters = () => {
  const getChars = () => {
    const characters = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
      g: 7,
      h: 8,
      i: 9,
      j: 10,
      k: 11,
      l: 12,
      m: 13,
      n: 14,
      o: 15,
      p: 16,
      q: 17,
      r: 18,
      s: 19,
      t: 20,
      u: 21,
      v: 22,
      w: 23,
      x: 24,
      y: 25,
      z: 26,
    };

    return characters;
  };

  const getCeaser = () => {
    const characters = {
      1: "a",
      2: "b",
      3: "c",
      4: "d",
      5: "e",
      6: "f",
      7: "g",
      8: "h",
      9: "i",
      10: "j",
      11: "k",
      12: "l",
      13: "m",
      14: "n",
      15: "o",
      16: "p",
      17: "q",
      18: "r",
      19: "s",
      20: "t",
      21: "u",
      22: "v",
      23: "w",
      24: "x",
      25: "y",
      26: "z",
    };

    return characters;
  };

  return { getChars, getCeaser };
};

const ceaser = (string, shift) => {
  const chars = getCharacters().getChars();
  const translator = getCharacters().getCeaser();

  const stringArr = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const char of string) {
    const currentKey = chars[char.toLowerCase()] + shift;
    if (currentKey < 26) {
      const currentChar = translator[currentKey];
      stringArr.push(currentChar);
      console.log(currentChar);
      break;
    }
    const currentChar = translator[currentKey - 26];
    stringArr.push(currentChar);
  }
  return stringArr.join("");
};

export { reverseString, capitalise, Calculator, ceaser, analyse };
