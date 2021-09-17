const Player = () => {
  const attack = (board, coord) => board.receiveAttack(coord);
  return { attack };
};

const ComputerPlayer = () => {
  const keys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const coords = [];
  keys.forEach((key) => {
    for (let val = 0; val < 10; val += 1) {
      coords.push(key + val);
    }
  });
  const attack = (board, coord) => board.receiveAttack(coord);
  let lastAttackCoord;
  const getLastAttack = () => lastAttackCoord;
  const randomAttack = (board) => {
    // index to return a random coord in the form A1, A2, J8, J9
    const index = Math.floor(Math.random(coords.length) * coords.length);
    const coord = coords.splice(index, 1)[0];
    lastAttackCoord = coord;
    return attack(board, coord);
  };
  return { attack, randomAttack, getLastAttack };
};

export { Player, ComputerPlayer };
