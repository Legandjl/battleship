
const Player = () => {
  const attack = (board, coord) => board.receiveAttack(coord);
  return { attack };
};

const ComputerPlayer = () => {
  const keys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const attack = (board, coord) => board.receiveAttack(coord);
  const randomAttack = (board) => {
    let key = keys[Math.floor(Math.random() * keys.length)];
    let val = Math.floor(Math.random() * 9);

    while (board.checkHitStatus(key + val) === true) {
      key = keys[Math.floor(Math.random() * keys.length)];
      val = Math.floor(Math.random() * 9);
    }

    return attack(board, key + val);
  };
  return { attack, randomAttack };
};

export { Player, ComputerPlayer };
