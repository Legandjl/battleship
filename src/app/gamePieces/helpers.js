const generateBoard = () => {
  const board = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [],
    i: [],
    j: [],
  };
  // eslint-disable-next-line no-restricted-syntax
  for (const [, value] of Object.entries(board)) {
    for (let x = 0; x < 10; x += 1) {
      value.push({
        status: "unoccupied",
        ship: {},
        pos: null,
        hitStatus: false,
      });
    }
  }
  return board;
};

const parseCoord = (coord) => {
  const row = coord.split("")[0].toLowerCase();
  const cell = parseInt(coord.split("")[1], 10);
  return { row, cell };
};

const setupUnoccupied = () => {
  const positions = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const unoccupiedPositions = [];
  positions.forEach((key) => {
    const coords = [];
    const currentCoords = [];
    coords.push([key]);
    for (let val = 0; val < 10; val += 1) {
      currentCoords.push(val);
    }
    coords.push(currentCoords);
    unoccupiedPositions.push(coords);
  });

  return unoccupiedPositions;
};

export { generateBoard, parseCoord, setupUnoccupied };
