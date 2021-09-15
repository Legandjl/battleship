const Ship = (length) => {
  const shipStatus = {};
  const shipInterface = {};

  shipInterface.getLength = () => length;

  for (let x = 0; x < length; x += 1) {
    shipStatus[x] = false;
  }

  shipInterface.hit = (num) => {
    if (num <= length && shipStatus[num] !== true) {
      shipStatus[num] = true;
      return shipStatus[num];
    }
    return false; // returns false if position already marked as hit, or if missed
  };

  shipInterface.checkIfPosHit = (num) => shipStatus[num];

  shipInterface.isSunk = () => {
    let sunkStatus = true;
    // eslint-disable-next-line no-restricted-syntax
    Object.values(shipStatus).forEach((val) => {
      if (val === false) {
        sunkStatus = false;
      }
    });
    return sunkStatus;
  };

  return shipInterface;
};

export default Ship;
