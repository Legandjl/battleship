const Ship = (length) => {
  const shipSize = {};
  const shipInterface = {};

  for (let x = 0; x < length; x += 1) {
    shipSize[x] = false;
  }
  
  shipInterface.hit = (num) => {
    shipSize[num] = true;
    return `ship hit at position ${num}`;
  };

  shipInterface.isSunk = () => {
    let sunkStatus = true;
    // eslint-disable-next-line no-restricted-syntax
    Object.values(shipSize).forEach((val) => {
      if (val === false) {
        sunkStatus = false;        
      }
    });
    return sunkStatus;
  };

  return shipInterface;
};

export { Ship };
