/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/gamePieces/gameBoard.js":
/*!*****************************************!*\
  !*** ./src/app/gamePieces/gameBoard.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/app/gamePieces/ship.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/app/gamePieces/helpers.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var statusMessages = {
  occupied: "occupied",
  unoccupied: "unoccupied"
}; // helper functions to place ships in grid

var placeHorizontal = function placeHorizontal(board, startCell, endCell, startRow) {
  var boardEdit = board();

  for (var currentCell = startCell; currentCell <= endCell; currentCell += 1) {
    if (boardEdit[startRow][currentCell].status !== statusMessages.unoccupied) {
      throw new Error("space occupied");
    }
  }

  var length = endCell - startCell + 1;
  var ship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.default)(length);
  var pos = 0;

  for (var _currentCell = startCell; _currentCell <= endCell; _currentCell += 1) {
    boardEdit[startRow][_currentCell].ship = ship;
    boardEdit[startRow][_currentCell].pos = pos;
    boardEdit[startRow][_currentCell].status = statusMessages.occupied;
    pos += 1;
  }

  return boardEdit;
};

var placeVertical = function placeVertical(board, startRow, endRow, cell) {
  var boardEdit = board();
  var length = 0; // eslint-disable-next-line no-restricted-syntax

  for (var _i = 0, _Object$entries = Object.entries(boardEdit); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 1),
        key = _Object$entries$_i[0];

    if (key >= startRow && key <= endRow) {
      if (boardEdit[key][cell].status !== statusMessages.unoccupied) {
        throw new Error("space occupied");
      }

      length += 1;
    }
  }

  var ship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.default)(length);
  var pos = 0; // eslint-disable-next-line no-restricted-syntax

  for (var _i2 = 0, _Object$entries2 = Object.entries(boardEdit); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 1),
        _key = _Object$entries2$_i[0];

    if (_key >= startRow && _key <= endRow) {
      boardEdit[_key][cell].status = statusMessages.occupied;
      boardEdit[_key][cell].ship = ship;
      boardEdit[_key][cell].pos = pos;
      pos += 1;
    }
  }

  return boardEdit;
}; // helper function to check if all ships on a gameboard are sunk


var checkShips = function checkShips(board) {
  var allSunk = true; // eslint-disable-next-line no-restricted-syntax

  for (var _i3 = 0, _Object$entries3 = Object.entries(board); _i3 < _Object$entries3.length; _i3++) {
    var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 1),
        key = _Object$entries3$_i[0];

    // eslint-disable-next-line no-loop-func
    board[key].forEach(function (item) {
      if (item.status === "occupied" && item.ship.isSunk() === false) {
        allSunk = false;
      }
    });
  }

  return allSunk;
}; // main gameboard function


var Board = function Board() {
  var boardInterface = {};
  var currentBoard = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.generateBoard)();

  boardInterface.getBoard = function () {
    return currentBoard;
  }; // places a ship in the specified location


  boardInterface.place = function (x, y) {
    var coordA = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.parseCoord)(x);
    var coordB = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.parseCoord)(y);

    if (coordA.row === coordB.row) {
      currentBoard = placeHorizontal(boardInterface.getBoard, coordA.cell, coordB.cell, coordA.row);
    } else if (coordA.row !== coordB.row) {
      // eslint-disable-next-line no-restricted-syntax
      currentBoard = placeVertical(boardInterface.getBoard, coordA.row, coordB.row, coordA.cell);
    }

    return currentBoard;
  };

  boardInterface.tryToPlace = function (coord1, coord2) {
    try {
      boardInterface.place(coord1, coord2);
      return true;
    } catch (error) {
      return false;
    }
  };

  boardInterface.placeRandomHorizontal = function (size) {
    var coords = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    var cells = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var cellIndex = Math.floor(Math.random() * cells.slice(0, cells.length - size).length);

    for (var x = 0; x < 9; x += 1) {
      var coordIndex = Math.floor(Math.random() * coords.length);

      if (boardInterface.tryToPlace(coords[coordIndex] + cells[cellIndex], coords[coordIndex] + cells[cellIndex + size])) {
        return;
      }

      coords = coords.splice(cellIndex, 1);
    }
  };

  boardInterface.placeRandomVertical = function (size) {
    var coords = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    var cells = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var coordIndex = Math.floor(Math.random() * coords.slice(0, coords.length - size).length);
    var coord1 = coords[coordIndex];
    var coord2 = coords[coordIndex + size];

    for (var x = 0; x < 9; x += 1) {
      var cellIndex = Math.floor(Math.random() * cells.length);

      if (boardInterface.tryToPlace(coord1 + cellIndex, coord2 + cellIndex)) {
        return;
      }

      cells = cells.splice(cellIndex, 1);
    }
  };

  boardInterface.receiveAttack = function (pos) {
    var hitSuccesful = false; // will be true if a ship gets hit

    var coords = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.parseCoord)(pos);
    var currentCell = boardInterface.getBoard()[coords.row][coords.cell];

    if (currentCell.hitStatus === true) {
      return hitSuccesful; // position has already been hit, return false
    }

    if (currentCell.status === statusMessages.unoccupied) {
      currentCell.hitStatus = true;
    } else {
      currentCell.ship.hit(currentCell.pos);
      currentCell.hitStatus = true;
      hitSuccesful = true;
    }

    return hitSuccesful;
  }; // checks if a cell is hit


  boardInterface.checkHitStatus = function (pos) {
    var coord = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.parseCoord)(pos);
    var cellContent = boardInterface.getBoard()[coord.row][coord.cell];
    return cellContent.hitStatus;
  }; // returns a ship, if one is present at pos


  boardInterface.getShip = function (pos) {
    var coord = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.parseCoord)(pos);
    var cellContent = boardInterface.getBoard()[coord.row][coord.cell];

    if (cellContent.status === statusMessages.occupied) {
      return cellContent.ship;
    }

    return "cell ".concat(pos, " ").concat(statusMessages.unoccupied);
  };

  boardInterface.checkForShip = function (pos) {
    var coord = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.parseCoord)(pos);
    var cell = boardInterface.getBoard()[coord.row][coord.cell];

    if (cell.status === "occupied") {
      return true;
    }

    return false;
  };

  boardInterface.checkForGameOver = function () {
    return checkShips(boardInterface.getBoard());
  };

  boardInterface.resetBoard = function () {
    currentBoard = (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.generateBoard)();
  };

  return boardInterface;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Board);

/***/ }),

/***/ "./src/app/gamePieces/helpers.js":
/*!***************************************!*\
  !*** ./src/app/gamePieces/helpers.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateBoard": () => (/* binding */ generateBoard),
/* harmony export */   "parseCoord": () => (/* binding */ parseCoord),
/* harmony export */   "setupUnoccupied": () => (/* binding */ setupUnoccupied)
/* harmony export */ });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var generateBoard = function generateBoard() {
  var board = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [],
    i: [],
    j: []
  }; // eslint-disable-next-line no-restricted-syntax

  for (var _i = 0, _Object$entries = Object.entries(board); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        value = _Object$entries$_i[1];

    for (var x = 0; x < 10; x += 1) {
      value.push({
        status: "unoccupied",
        ship: {},
        pos: null,
        hitStatus: false
      });
    }
  }

  return board;
};

var parseCoord = function parseCoord(coord) {
  var row = coord.split("")[0].toLowerCase();
  var cell = parseInt(coord.split("")[1], 10);
  return {
    row: row,
    cell: cell
  };
};

var setupUnoccupied = function setupUnoccupied() {
  var positions = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  var unoccupiedPositions = [];
  positions.forEach(function (key) {
    var coords = [];
    var currentCoords = [];
    coords.push([key]);

    for (var val = 0; val < 10; val += 1) {
      currentCoords.push(val);
    }

    coords.push(currentCoords);
    unoccupiedPositions.push(coords);
  });
  return unoccupiedPositions;
};



/***/ }),

/***/ "./src/app/gamePieces/player.js":
/*!**************************************!*\
  !*** ./src/app/gamePieces/player.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player),
/* harmony export */   "ComputerPlayer": () => (/* binding */ ComputerPlayer)
/* harmony export */ });
var Player = function Player() {
  var attack = function attack(board, coord) {
    return board.receiveAttack(coord);
  };

  return {
    attack: attack
  };
};

var ComputerPlayer = function ComputerPlayer() {
  var keys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  var coords = [];
  keys.forEach(function (key) {
    for (var val = 0; val < 10; val += 1) {
      coords.push(key + val);
    }
  });

  var attack = function attack(board, coord) {
    return board.receiveAttack(coord);
  };

  var lastAttackCoord;

  var getLastAttack = function getLastAttack() {
    return lastAttackCoord;
  };

  var randomAttack = function randomAttack(board) {
    // index to return a random coord in the form A1, A2, J8, J9
    var index = Math.floor(Math.random(coords.length) * coords.length);
    var coord = coords.splice(index, 1)[0];
    lastAttackCoord = coord;
    return attack(board, coord);
  };

  return {
    attack: attack,
    randomAttack: randomAttack,
    getLastAttack: getLastAttack
  };
};



/***/ }),

/***/ "./src/app/gamePieces/ship.js":
/*!************************************!*\
  !*** ./src/app/gamePieces/ship.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Ship = function Ship(length) {
  var shipStatus = {};
  var shipInterface = {};

  shipInterface.getLength = function () {
    return length;
  };

  for (var x = 0; x < length; x += 1) {
    shipStatus[x] = false;
  }

  shipInterface.hit = function (num) {
    if (num <= length && shipStatus[num] !== true) {
      shipStatus[num] = true;
      return shipStatus[num];
    }

    return false; // returns false if position already marked as hit, or if missed
  };

  shipInterface.checkIfPosHit = function (num) {
    return shipStatus[num];
  };

  shipInterface.isSunk = function () {
    var sunkStatus = true; // eslint-disable-next-line no-restricted-syntax

    Object.values(shipStatus).forEach(function (val) {
      if (val === false) {
        sunkStatus = false;
      }
    });
    return sunkStatus;
  };

  return shipInterface;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./src/app/logic/gameLoop.js":
/*!***********************************!*\
  !*** ./src/app/logic/gameLoop.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gamePieces_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../gamePieces/player */ "./src/app/gamePieces/player.js");
/* harmony import */ var _ui_userInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/userInterface */ "./src/app/ui/userInterface.js");
 // eslint-disable-next-line import/no-cycle



var GameController = function GameController(playerBoard, computerBoard) {
  var player = (0,_gamePieces_player__WEBPACK_IMPORTED_MODULE_0__.Player)();
  var computer = (0,_gamePieces_player__WEBPACK_IMPORTED_MODULE_0__.ComputerPlayer)();
  var currentPlayer = player;

  var computerTurn = function computerTurn() {
    (0,_ui_userInterface__WEBPACK_IMPORTED_MODULE_1__.infoDisplay)("Current player: Computer");
    setTimeout(function () {
      if (computer.randomAttack(playerBoard)) {
        (0,_ui_userInterface__WEBPACK_IMPORTED_MODULE_1__.shipHit)("player", computer.getLastAttack());
      } else {
        (0,_ui_userInterface__WEBPACK_IMPORTED_MODULE_1__.markMiss)("player", computer.getLastAttack());
      }

      currentPlayer = player;

      if (playerBoard.checkForGameOver()) {
        (0,_ui_userInterface__WEBPACK_IMPORTED_MODULE_1__.setGameOver)("computer");
        return;
      }

      (0,_ui_userInterface__WEBPACK_IMPORTED_MODULE_1__.infoDisplay)("Your turn");
    }, 1000);
  };

  var playerTurn = function playerTurn(e) {
    if (e.target.dataset.status === "hit" || currentPlayer === _gamePieces_player__WEBPACK_IMPORTED_MODULE_0__.ComputerPlayer) {
      return;
    }

    if (playerBoard.checkForGameOver()) {
      (0,_ui_userInterface__WEBPACK_IMPORTED_MODULE_1__.setGameOver)("Computer");
      return;
    }

    if (player.attack(computerBoard, e.target.dataset.id)) {
      e.target.classList.add("hit");
    } else {
      e.target.innerText = "X";
    }

    e.target.dataset.status = "hit";
    currentPlayer = _gamePieces_player__WEBPACK_IMPORTED_MODULE_0__.ComputerPlayer;

    if (computerBoard.checkForGameOver()) {
      (0,_ui_userInterface__WEBPACK_IMPORTED_MODULE_1__.setGameOver)("player");
      return;
    }

    computerTurn();

    if (playerBoard.checkForGameOver()) {
      (0,_ui_userInterface__WEBPACK_IMPORTED_MODULE_1__.setGameOver)("Computer");
    }
  };

  return {
    computerTurn: computerTurn,
    playerTurn: playerTurn
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameController);

/***/ }),

/***/ "./src/app/ui/userInterface.js":
/*!*************************************!*\
  !*** ./src/app/ui/userInterface.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setupBoards": () => (/* binding */ setupBoards),
/* harmony export */   "setup": () => (/* binding */ setup),
/* harmony export */   "shipHit": () => (/* binding */ shipHit),
/* harmony export */   "markMiss": () => (/* binding */ markMiss),
/* harmony export */   "setGameOver": () => (/* binding */ setGameOver),
/* harmony export */   "infoDisplay": () => (/* binding */ infoDisplay)
/* harmony export */ });
/* harmony import */ var _logic_gameLoop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logic/gameLoop */ "./src/app/logic/gameLoop.js");
/* harmony import */ var _gamePieces_gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../gamePieces/gameBoard */ "./src/app/gamePieces/gameBoard.js");
/* harmony import */ var _images_reset_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../images/reset.png */ "./src/images/reset.png");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// eslint-disable-next-line import/no-cycle



var content = document.querySelector("#content");
var playerGrid = document.createElement("div");
playerGrid.dataset.type = "player";
playerGrid.id = "board";
var computerGrid = document.createElement("div");
computerGrid.id = "board";
computerGrid.dataset.type = "computer";
var resetButton = new Image();
resetButton.src = _images_reset_png__WEBPACK_IMPORTED_MODULE_2__;

var setShipCell = function setShipCell(id) {
  document.querySelector("#player".concat(id)).classList.add("ship");
};

var shipHit = function shipHit(player, id) {
  document.querySelector("#".concat(player).concat(id)).classList.add("hit");
};

var markMiss = function markMiss(player, id) {
  document.querySelector("#".concat(player).concat(id)).innerText = "X";
};

var setupBoards = function setupBoards(playerBoard, computerBoard) {
  var board = playerBoard.getBoard(); // we want the player to be able to see their ships

  for (var x = 0; x < 5; x += 1) {
    if (x % 2 === 0) {
      playerBoard.placeRandomHorizontal(x);
      computerBoard.placeRandomHorizontal(x);
    } else {
      computerBoard.placeRandomVertical(x);
      playerBoard.placeRandomVertical(x);
    }
  } // eslint-disable-next-line no-restricted-syntax


  for (var _i = 0, _Object$entries = Object.entries(board); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 1),
        key = _Object$entries$_i[0];

    var currentRow = board[key];

    for (var _x = 0; _x < currentRow.length; _x += 1) {
      if (currentRow[_x].status === "occupied") {
        setShipCell(key.toUpperCase() + _x);
      }
    }
  }
};

var infoDisplay = function infoDisplay(text) {
  document.querySelector("#currentTurn").innerText = text;
};

var setupGrid = function setupGrid(grid, type, controller) {
  content.appendChild(grid);
  var rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  rows.forEach(function (key) {
    var row = document.createElement("div");
    row.classList.add("row");

    for (var x = 0; x < 10; x += 1) {
      var cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.id = key + x;
      cell.id = type + key + x;

      if (grid.dataset.type === "computer") {
        cell.addEventListener("click", function (e) {
          controller.playerTurn(e);
        });
      }

      row.appendChild(cell);
    }

    grid.appendChild(row);
  });
};

var setup = function setup() {
  var playerBoard = (0,_gamePieces_gameBoard__WEBPACK_IMPORTED_MODULE_1__.default)();
  var computerBoard = (0,_gamePieces_gameBoard__WEBPACK_IMPORTED_MODULE_1__.default)();
  var gameController = (0,_logic_gameLoop__WEBPACK_IMPORTED_MODULE_0__.default)(playerBoard, computerBoard);
  var currentTurn = document.createElement("div");
  currentTurn.id = "currentTurn";
  var info = document.createElement("div");
  info.id = "info";
  info.append(resetButton);
  info.append(currentTurn);
  currentTurn.innerText = "Click a cell to begin";
  resetButton.addEventListener("click", function () {
    var cells = document.querySelectorAll(".cell");
    cells.forEach(function (cell) {
      cell.classList.remove("ship");
      cell.classList.remove("hit");
      var currentCell = cell;
      currentCell.innerText = "";
    });
    playerBoard.resetBoard();
    computerBoard.resetBoard();
    setupBoards(playerBoard, computerBoard);
  });
  setupGrid(playerGrid, "player", gameController);
  setupGrid(computerGrid, "computer", gameController);
  content.appendChild(playerGrid);
  content.append(info);
  content.appendChild(computerGrid);
  setupBoards(playerBoard, computerBoard);
};

var setGameOver = function setGameOver(winner) {
  var resetStatus = "Click to play again";

  if (winner === "player") {
    infoDisplay("You win\n ".concat(resetStatus));
  } else {
    infoDisplay("Computer wins \n Click to play again");
  }
};



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Gluten:wght@300&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/\nv2.0 | 20110126\nLicense: none (public domain)\n*/\n\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol,\nul {\n  list-style: none;\n}\nblockquote,\nq {\n  quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: \"\";\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n#content {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  height: 100vh;\n  width: 100vw;\n  font-family: Gluten, cursive;\n  background-color: #4de2eb;\n}\n\n#board {\n  width: 400px;\n  height: 400px;\n\n  justify-self: center;\n  align-self: center;\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n  grid-template-columns: 1fr;\n  background-image: linear-gradient(\n    to right top,\n    #e15b17,\n    #e74f1b,\n    #ed4020,\n    #f22c26,\n    #f7002d\n  );\n\n  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,\n    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;\n}\n\n#board[data-type=\"computer\"]:hover {\n  cursor: pointer;\n}\n\n.row {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-column: 1/-1;\n}\n.cell {\n  height: 100%;\n  border: solid 1px;\n  display: grid;\n  align-items: center;\n  justify-items: center;\n  background-color: #ccffff;\n}\n\n.ship {\n  background-color: black;\n}\n\n.hit {\n  border: none;\n  opacity: 0;\n}\n\n#info {\n  display: grid;\n  grid-column: 2;\n  align-items: center;\n  grid-template-rows: auto auto;\n  grid-template-columns: 1fr;\n  width: 100%;\n  justify-items: center;\n  justify-content: center;\n  width: 170px;\n  min-width: 170px;\n  grid-gap: 20px;\n  text-align: center;\n\n  height: 50px;\n  align-self: center;\n}\n\n#currentTurn {\n  align-self: start;\n}\n#info img {\n  width: 32px;\n  height: 32px;\n  align-self: center;\n  grid-row: 1;\n}\n\n#info img:hover {\n  cursor: pointer;\n}\n\n#currentTurn {\n  grid-row: 2;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;;;CAGC;;AAGD;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;EAiFE,SAAS;EACT,UAAU;EACV,SAAS;EACT,eAAe;EACf,aAAa;EACb,wBAAwB;AAC1B;AACA,gDAAgD;AAChD;;;;;;;;;;;EAWE,cAAc;AAChB;AACA;EACE,cAAc;AAChB;AACA;;EAEE,gBAAgB;AAClB;AACA;;EAEE,YAAY;AACd;AACA;;;;EAIE,WAAW;EACX,aAAa;AACf;AACA;EACE,yBAAyB;EACzB,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,mCAAmC;EACnC,aAAa;EACb,YAAY;EACZ,4BAA4B;EAC5B,yBAAyB;AAC3B;;AAEA;EACE,YAAY;EACZ,aAAa;;EAEb,oBAAoB;EACpB,kBAAkB;EAClB,aAAa;EACb,mCAAmC;EACnC,0BAA0B;EAC1B;;;;;;;GAOC;;EAED;0CACwC;AAC1C;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,sCAAsC;EACtC,iBAAiB;AACnB;AACA;EACE,YAAY;EACZ,iBAAiB;EACjB,aAAa;EACb,mBAAmB;EACnB,qBAAqB;EACrB,yBAAyB;AAC3B;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,cAAc;EACd,mBAAmB;EACnB,6BAA6B;EAC7B,0BAA0B;EAC1B,WAAW;EACX,qBAAqB;EACrB,uBAAuB;EACvB,YAAY;EACZ,gBAAgB;EAChB,cAAc;EACd,kBAAkB;;EAElB,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;AACnB;AACA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,WAAW;AACb","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/\nv2.0 | 20110126\nLicense: none (public domain)\n*/\n@import url(\"https://fonts.googleapis.com/css2?family=Gluten:wght@300&display=swap\");\n\nhtml,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol,\nul {\n  list-style: none;\n}\nblockquote,\nq {\n  quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: \"\";\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n#content {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  height: 100vh;\n  width: 100vw;\n  font-family: Gluten, cursive;\n  background-color: #4de2eb;\n}\n\n#board {\n  width: 400px;\n  height: 400px;\n\n  justify-self: center;\n  align-self: center;\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n  grid-template-columns: 1fr;\n  background-image: linear-gradient(\n    to right top,\n    #e15b17,\n    #e74f1b,\n    #ed4020,\n    #f22c26,\n    #f7002d\n  );\n\n  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,\n    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;\n}\n\n#board[data-type=\"computer\"]:hover {\n  cursor: pointer;\n}\n\n.row {\n  display: grid;\n  grid-template-columns: repeat(10, 1fr);\n  grid-column: 1/-1;\n}\n.cell {\n  height: 100%;\n  border: solid 1px;\n  display: grid;\n  align-items: center;\n  justify-items: center;\n  background-color: #ccffff;\n}\n\n.ship {\n  background-color: black;\n}\n\n.hit {\n  border: none;\n  opacity: 0;\n}\n\n#info {\n  display: grid;\n  grid-column: 2;\n  align-items: center;\n  grid-template-rows: auto auto;\n  grid-template-columns: 1fr;\n  width: 100%;\n  justify-items: center;\n  justify-content: center;\n  width: 170px;\n  min-width: 170px;\n  grid-gap: 20px;\n  text-align: center;\n\n  height: 50px;\n  align-self: center;\n}\n\n#currentTurn {\n  align-self: start;\n}\n#info img {\n  width: 32px;\n  height: 32px;\n  align-self: center;\n  grid-row: 1;\n}\n\n#info img:hover {\n  cursor: pointer;\n}\n\n#currentTurn {\n  grid-row: 2;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__.default, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__.default && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__.default.locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__.default.locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var style = document.createElement("style");
  options.setAttributes(style, options.attributes);
  options.insert(style);
  return style;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(style) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    style.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute("media", media);
  } else {
    style.removeAttribute("media");
  }

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, style);
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


function domAPI(options) {
  var style = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(style, options, obj);
    },
    remove: function remove() {
      removeStyleElement(style);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, style) {
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/images/reset.png":
/*!******************************!*\
  !*** ./src/images/reset.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0265161256f28173d7a8.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _app_ui_userInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/ui/userInterface */ "./src/app/ui/userInterface.js");


(0,_app_ui_userInterface__WEBPACK_IMPORTED_MODULE_1__.setup)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUk7O0FBRWpGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDWGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDL0NhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BEOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFFQXNDLDREQUFLLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcC9nYW1lUGllY2VzL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FwcC9nYW1lUGllY2VzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHAvZ2FtZVBpZWNlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9hcHAvZ2FtZVBpZWNlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwL2xvZ2ljL2dhbWVMb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYXBwL3VpL3VzZXJJbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcbmltcG9ydCB7IGdlbmVyYXRlQm9hcmQsIHBhcnNlQ29vcmQgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5cbmNvbnN0IHN0YXR1c01lc3NhZ2VzID0geyBvY2N1cGllZDogXCJvY2N1cGllZFwiLCB1bm9jY3VwaWVkOiBcInVub2NjdXBpZWRcIiB9O1xuLy8gaGVscGVyIGZ1bmN0aW9ucyB0byBwbGFjZSBzaGlwcyBpbiBncmlkXG5jb25zdCBwbGFjZUhvcml6b250YWwgPSAoYm9hcmQsIHN0YXJ0Q2VsbCwgZW5kQ2VsbCwgc3RhcnRSb3cpID0+IHtcbiAgY29uc3QgYm9hcmRFZGl0ID0gYm9hcmQoKTtcbiAgZm9yIChsZXQgY3VycmVudENlbGwgPSBzdGFydENlbGw7IGN1cnJlbnRDZWxsIDw9IGVuZENlbGw7IGN1cnJlbnRDZWxsICs9IDEpIHtcbiAgICBpZiAoYm9hcmRFZGl0W3N0YXJ0Um93XVtjdXJyZW50Q2VsbF0uc3RhdHVzICE9PSBzdGF0dXNNZXNzYWdlcy51bm9jY3VwaWVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzcGFjZSBvY2N1cGllZFwiKTtcbiAgICB9XG4gIH1cbiAgY29uc3QgbGVuZ3RoID0gZW5kQ2VsbCAtIHN0YXJ0Q2VsbCArIDE7XG4gIGNvbnN0IHNoaXAgPSBTaGlwKGxlbmd0aCk7XG4gIGxldCBwb3MgPSAwO1xuICBmb3IgKGxldCBjdXJyZW50Q2VsbCA9IHN0YXJ0Q2VsbDsgY3VycmVudENlbGwgPD0gZW5kQ2VsbDsgY3VycmVudENlbGwgKz0gMSkge1xuICAgIGJvYXJkRWRpdFtzdGFydFJvd11bY3VycmVudENlbGxdLnNoaXAgPSBzaGlwO1xuICAgIGJvYXJkRWRpdFtzdGFydFJvd11bY3VycmVudENlbGxdLnBvcyA9IHBvcztcbiAgICBib2FyZEVkaXRbc3RhcnRSb3ddW2N1cnJlbnRDZWxsXS5zdGF0dXMgPSBzdGF0dXNNZXNzYWdlcy5vY2N1cGllZDtcbiAgICBwb3MgKz0gMTtcbiAgfVxuICByZXR1cm4gYm9hcmRFZGl0O1xufTtcbmNvbnN0IHBsYWNlVmVydGljYWwgPSAoYm9hcmQsIHN0YXJ0Um93LCBlbmRSb3csIGNlbGwpID0+IHtcbiAgY29uc3QgYm9hcmRFZGl0ID0gYm9hcmQoKTtcbiAgbGV0IGxlbmd0aCA9IDA7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICBmb3IgKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKGJvYXJkRWRpdCkpIHtcbiAgICBpZiAoa2V5ID49IHN0YXJ0Um93ICYmIGtleSA8PSBlbmRSb3cpIHtcbiAgICAgIGlmIChib2FyZEVkaXRba2V5XVtjZWxsXS5zdGF0dXMgIT09IHN0YXR1c01lc3NhZ2VzLnVub2NjdXBpZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwic3BhY2Ugb2NjdXBpZWRcIik7XG4gICAgICB9XG4gICAgICBsZW5ndGggKz0gMTtcbiAgICB9XG4gIH1cbiAgY29uc3Qgc2hpcCA9IFNoaXAobGVuZ3RoKTtcbiAgbGV0IHBvcyA9IDA7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICBmb3IgKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKGJvYXJkRWRpdCkpIHtcbiAgICBpZiAoa2V5ID49IHN0YXJ0Um93ICYmIGtleSA8PSBlbmRSb3cpIHtcbiAgICAgIGJvYXJkRWRpdFtrZXldW2NlbGxdLnN0YXR1cyA9IHN0YXR1c01lc3NhZ2VzLm9jY3VwaWVkO1xuICAgICAgYm9hcmRFZGl0W2tleV1bY2VsbF0uc2hpcCA9IHNoaXA7XG4gICAgICBib2FyZEVkaXRba2V5XVtjZWxsXS5wb3MgPSBwb3M7XG4gICAgICBwb3MgKz0gMTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJvYXJkRWRpdDtcbn07XG4vLyBoZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgaWYgYWxsIHNoaXBzIG9uIGEgZ2FtZWJvYXJkIGFyZSBzdW5rXG5jb25zdCBjaGVja1NoaXBzID0gKGJvYXJkKSA9PiB7XG4gIGxldCBhbGxTdW5rID0gdHJ1ZTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gIGZvciAoY29uc3QgW2tleV0gb2YgT2JqZWN0LmVudHJpZXMoYm9hcmQpKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvb3AtZnVuY1xuICAgIGJvYXJkW2tleV0uZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0uc3RhdHVzID09PSBcIm9jY3VwaWVkXCIgJiYgaXRlbS5zaGlwLmlzU3VuaygpID09PSBmYWxzZSkge1xuICAgICAgICBhbGxTdW5rID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGFsbFN1bms7XG59O1xuLy8gbWFpbiBnYW1lYm9hcmQgZnVuY3Rpb25cbmNvbnN0IEJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZEludGVyZmFjZSA9IHt9O1xuICBsZXQgY3VycmVudEJvYXJkID0gZ2VuZXJhdGVCb2FyZCgpO1xuICBib2FyZEludGVyZmFjZS5nZXRCb2FyZCA9ICgpID0+IGN1cnJlbnRCb2FyZDtcbiAgLy8gcGxhY2VzIGEgc2hpcCBpbiB0aGUgc3BlY2lmaWVkIGxvY2F0aW9uXG4gIGJvYXJkSW50ZXJmYWNlLnBsYWNlID0gKHgsIHkpID0+IHtcbiAgICBjb25zdCBjb29yZEEgPSBwYXJzZUNvb3JkKHgpO1xuICAgIGNvbnN0IGNvb3JkQiA9IHBhcnNlQ29vcmQoeSk7XG4gICAgaWYgKGNvb3JkQS5yb3cgPT09IGNvb3JkQi5yb3cpIHtcbiAgICAgIGN1cnJlbnRCb2FyZCA9IHBsYWNlSG9yaXpvbnRhbChcbiAgICAgICAgYm9hcmRJbnRlcmZhY2UuZ2V0Qm9hcmQsXG4gICAgICAgIGNvb3JkQS5jZWxsLFxuICAgICAgICBjb29yZEIuY2VsbCxcbiAgICAgICAgY29vcmRBLnJvd1xuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGNvb3JkQS5yb3cgIT09IGNvb3JkQi5yb3cpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgY3VycmVudEJvYXJkID0gcGxhY2VWZXJ0aWNhbChcbiAgICAgICAgYm9hcmRJbnRlcmZhY2UuZ2V0Qm9hcmQsXG4gICAgICAgIGNvb3JkQS5yb3csXG4gICAgICAgIGNvb3JkQi5yb3csXG4gICAgICAgIGNvb3JkQS5jZWxsXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gY3VycmVudEJvYXJkO1xuICB9O1xuXG4gIGJvYXJkSW50ZXJmYWNlLnRyeVRvUGxhY2UgPSAoY29vcmQxLCBjb29yZDIpID0+IHtcbiAgICB0cnkge1xuICAgICAgYm9hcmRJbnRlcmZhY2UucGxhY2UoY29vcmQxLCBjb29yZDIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgYm9hcmRJbnRlcmZhY2UucGxhY2VSYW5kb21Ib3Jpem9udGFsID0gKHNpemUpID0+IHtcbiAgICBsZXQgY29vcmRzID0gW1wiQVwiLCBcIkJcIiwgXCJDXCIsIFwiRFwiLCBcIkVcIiwgXCJGXCIsIFwiR1wiLCBcIkhcIiwgXCJJXCIsIFwiSlwiXTtcbiAgICBjb25zdCBjZWxscyA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XTtcbiAgICBjb25zdCBjZWxsSW5kZXggPSBNYXRoLmZsb29yKFxuICAgICAgTWF0aC5yYW5kb20oKSAqIGNlbGxzLnNsaWNlKDAsIGNlbGxzLmxlbmd0aCAtIHNpemUpLmxlbmd0aFxuICAgICk7XG5cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDk7IHggKz0gMSkge1xuICAgICAgY29uc3QgY29vcmRJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvb3Jkcy5sZW5ndGgpO1xuICAgICAgaWYgKFxuICAgICAgICBib2FyZEludGVyZmFjZS50cnlUb1BsYWNlKFxuICAgICAgICAgIGNvb3Jkc1tjb29yZEluZGV4XSArIGNlbGxzW2NlbGxJbmRleF0sXG4gICAgICAgICAgY29vcmRzW2Nvb3JkSW5kZXhdICsgY2VsbHNbY2VsbEluZGV4ICsgc2l6ZV1cbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvb3JkcyA9IGNvb3Jkcy5zcGxpY2UoY2VsbEluZGV4LCAxKTtcbiAgICB9XG4gIH07XG5cbiAgYm9hcmRJbnRlcmZhY2UucGxhY2VSYW5kb21WZXJ0aWNhbCA9IChzaXplKSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gW1wiQVwiLCBcIkJcIiwgXCJDXCIsIFwiRFwiLCBcIkVcIiwgXCJGXCIsIFwiR1wiLCBcIkhcIiwgXCJJXCIsIFwiSlwiXTtcbiAgICBsZXQgY2VsbHMgPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOV07XG4gICAgY29uc3QgY29vcmRJbmRleCA9IE1hdGguZmxvb3IoXG4gICAgICBNYXRoLnJhbmRvbSgpICogY29vcmRzLnNsaWNlKDAsIGNvb3Jkcy5sZW5ndGggLSBzaXplKS5sZW5ndGhcbiAgICApO1xuICAgIGNvbnN0IGNvb3JkMSA9IGNvb3Jkc1tjb29yZEluZGV4XTtcbiAgICBjb25zdCBjb29yZDIgPSBjb29yZHNbY29vcmRJbmRleCArIHNpemVdO1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgOTsgeCArPSAxKSB7XG4gICAgICBjb25zdCBjZWxsSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjZWxscy5sZW5ndGgpO1xuICAgICAgaWYgKGJvYXJkSW50ZXJmYWNlLnRyeVRvUGxhY2UoY29vcmQxICsgY2VsbEluZGV4LCBjb29yZDIgKyBjZWxsSW5kZXgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNlbGxzID0gY2VsbHMuc3BsaWNlKGNlbGxJbmRleCwgMSk7XG4gICAgfVxuICB9O1xuXG4gIGJvYXJkSW50ZXJmYWNlLnJlY2VpdmVBdHRhY2sgPSAocG9zKSA9PiB7XG4gICAgbGV0IGhpdFN1Y2Nlc2Z1bCA9IGZhbHNlOyAvLyB3aWxsIGJlIHRydWUgaWYgYSBzaGlwIGdldHMgaGl0XG4gICAgY29uc3QgY29vcmRzID0gcGFyc2VDb29yZChwb3MpO1xuICAgIGNvbnN0IGN1cnJlbnRDZWxsID0gYm9hcmRJbnRlcmZhY2UuZ2V0Qm9hcmQoKVtjb29yZHMucm93XVtjb29yZHMuY2VsbF07XG4gICAgaWYgKGN1cnJlbnRDZWxsLmhpdFN0YXR1cyA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuIGhpdFN1Y2Nlc2Z1bDtcbiAgICAgIC8vIHBvc2l0aW9uIGhhcyBhbHJlYWR5IGJlZW4gaGl0LCByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKGN1cnJlbnRDZWxsLnN0YXR1cyA9PT0gc3RhdHVzTWVzc2FnZXMudW5vY2N1cGllZCkge1xuICAgICAgY3VycmVudENlbGwuaGl0U3RhdHVzID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudENlbGwuc2hpcC5oaXQoY3VycmVudENlbGwucG9zKTtcbiAgICAgIGN1cnJlbnRDZWxsLmhpdFN0YXR1cyA9IHRydWU7XG4gICAgICBoaXRTdWNjZXNmdWwgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gaGl0U3VjY2VzZnVsO1xuICB9O1xuICAvLyBjaGVja3MgaWYgYSBjZWxsIGlzIGhpdFxuICBib2FyZEludGVyZmFjZS5jaGVja0hpdFN0YXR1cyA9IChwb3MpID0+IHtcbiAgICBjb25zdCBjb29yZCA9IHBhcnNlQ29vcmQocG9zKTtcbiAgICBjb25zdCBjZWxsQ29udGVudCA9IGJvYXJkSW50ZXJmYWNlLmdldEJvYXJkKClbY29vcmQucm93XVtjb29yZC5jZWxsXTtcbiAgICByZXR1cm4gY2VsbENvbnRlbnQuaGl0U3RhdHVzO1xuICB9O1xuICAvLyByZXR1cm5zIGEgc2hpcCwgaWYgb25lIGlzIHByZXNlbnQgYXQgcG9zXG4gIGJvYXJkSW50ZXJmYWNlLmdldFNoaXAgPSAocG9zKSA9PiB7XG4gICAgY29uc3QgY29vcmQgPSBwYXJzZUNvb3JkKHBvcyk7XG4gICAgY29uc3QgY2VsbENvbnRlbnQgPSBib2FyZEludGVyZmFjZS5nZXRCb2FyZCgpW2Nvb3JkLnJvd11bY29vcmQuY2VsbF07XG4gICAgaWYgKGNlbGxDb250ZW50LnN0YXR1cyA9PT0gc3RhdHVzTWVzc2FnZXMub2NjdXBpZWQpIHtcbiAgICAgIHJldHVybiBjZWxsQ29udGVudC5zaGlwO1xuICAgIH1cbiAgICByZXR1cm4gYGNlbGwgJHtwb3N9ICR7c3RhdHVzTWVzc2FnZXMudW5vY2N1cGllZH1gO1xuICB9O1xuICBib2FyZEludGVyZmFjZS5jaGVja0ZvclNoaXAgPSAocG9zKSA9PiB7XG4gICAgY29uc3QgY29vcmQgPSBwYXJzZUNvb3JkKHBvcyk7XG4gICAgY29uc3QgY2VsbCA9IGJvYXJkSW50ZXJmYWNlLmdldEJvYXJkKClbY29vcmQucm93XVtjb29yZC5jZWxsXTtcbiAgICBpZiAoY2VsbC5zdGF0dXMgPT09IFwib2NjdXBpZWRcIikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcbiAgYm9hcmRJbnRlcmZhY2UuY2hlY2tGb3JHYW1lT3ZlciA9ICgpID0+IGNoZWNrU2hpcHMoYm9hcmRJbnRlcmZhY2UuZ2V0Qm9hcmQoKSk7XG5cbiAgYm9hcmRJbnRlcmZhY2UucmVzZXRCb2FyZCA9ICgpID0+IHtcbiAgICBjdXJyZW50Qm9hcmQgPSBnZW5lcmF0ZUJvYXJkKCk7XG4gIH07XG5cbiAgcmV0dXJuIGJvYXJkSW50ZXJmYWNlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQm9hcmQ7XG4iLCJjb25zdCBnZW5lcmF0ZUJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IHtcbiAgICBhOiBbXSxcbiAgICBiOiBbXSxcbiAgICBjOiBbXSxcbiAgICBkOiBbXSxcbiAgICBlOiBbXSxcbiAgICBmOiBbXSxcbiAgICBnOiBbXSxcbiAgICBoOiBbXSxcbiAgICBpOiBbXSxcbiAgICBqOiBbXSxcbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gIGZvciAoY29uc3QgWywgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGJvYXJkKSkge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgMTA7IHggKz0gMSkge1xuICAgICAgdmFsdWUucHVzaCh7XG4gICAgICAgIHN0YXR1czogXCJ1bm9jY3VwaWVkXCIsXG4gICAgICAgIHNoaXA6IHt9LFxuICAgICAgICBwb3M6IG51bGwsXG4gICAgICAgIGhpdFN0YXR1czogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJvYXJkO1xufTtcblxuY29uc3QgcGFyc2VDb29yZCA9IChjb29yZCkgPT4ge1xuICBjb25zdCByb3cgPSBjb29yZC5zcGxpdChcIlwiKVswXS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBjZWxsID0gcGFyc2VJbnQoY29vcmQuc3BsaXQoXCJcIilbMV0sIDEwKTtcbiAgcmV0dXJuIHsgcm93LCBjZWxsIH07XG59O1xuXG5jb25zdCBzZXR1cFVub2NjdXBpZWQgPSAoKSA9PiB7XG4gIGNvbnN0IHBvc2l0aW9ucyA9IFtcIkFcIiwgXCJCXCIsIFwiQ1wiLCBcIkRcIiwgXCJFXCIsIFwiRlwiLCBcIkdcIiwgXCJIXCIsIFwiSVwiLCBcIkpcIl07XG4gIGNvbnN0IHVub2NjdXBpZWRQb3NpdGlvbnMgPSBbXTtcbiAgcG9zaXRpb25zLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGNvbnN0IGNvb3JkcyA9IFtdO1xuICAgIGNvbnN0IGN1cnJlbnRDb29yZHMgPSBbXTtcbiAgICBjb29yZHMucHVzaChba2V5XSk7XG4gICAgZm9yIChsZXQgdmFsID0gMDsgdmFsIDwgMTA7IHZhbCArPSAxKSB7XG4gICAgICBjdXJyZW50Q29vcmRzLnB1c2godmFsKTtcbiAgICB9XG4gICAgY29vcmRzLnB1c2goY3VycmVudENvb3Jkcyk7XG4gICAgdW5vY2N1cGllZFBvc2l0aW9ucy5wdXNoKGNvb3Jkcyk7XG4gIH0pO1xuXG4gIHJldHVybiB1bm9jY3VwaWVkUG9zaXRpb25zO1xufTtcblxuZXhwb3J0IHsgZ2VuZXJhdGVCb2FyZCwgcGFyc2VDb29yZCwgc2V0dXBVbm9jY3VwaWVkIH07XG4iLCJjb25zdCBQbGF5ZXIgPSAoKSA9PiB7XG4gIGNvbnN0IGF0dGFjayA9IChib2FyZCwgY29vcmQpID0+IGJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmQpO1xuICByZXR1cm4geyBhdHRhY2sgfTtcbn07XG5cbmNvbnN0IENvbXB1dGVyUGxheWVyID0gKCkgPT4ge1xuICBjb25zdCBrZXlzID0gW1wiQVwiLCBcIkJcIiwgXCJDXCIsIFwiRFwiLCBcIkVcIiwgXCJGXCIsIFwiR1wiLCBcIkhcIiwgXCJJXCIsIFwiSlwiXTtcbiAgY29uc3QgY29vcmRzID0gW107XG4gIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgZm9yIChsZXQgdmFsID0gMDsgdmFsIDwgMTA7IHZhbCArPSAxKSB7XG4gICAgICBjb29yZHMucHVzaChrZXkgKyB2YWwpO1xuICAgIH1cbiAgfSk7XG4gIGNvbnN0IGF0dGFjayA9IChib2FyZCwgY29vcmQpID0+IGJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmQpO1xuICBsZXQgbGFzdEF0dGFja0Nvb3JkO1xuICBjb25zdCBnZXRMYXN0QXR0YWNrID0gKCkgPT4gbGFzdEF0dGFja0Nvb3JkO1xuICBjb25zdCByYW5kb21BdHRhY2sgPSAoYm9hcmQpID0+IHtcbiAgICAvLyBpbmRleCB0byByZXR1cm4gYSByYW5kb20gY29vcmQgaW4gdGhlIGZvcm0gQTEsIEEyLCBKOCwgSjlcbiAgICBjb25zdCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oY29vcmRzLmxlbmd0aCkgKiBjb29yZHMubGVuZ3RoKTtcbiAgICBjb25zdCBjb29yZCA9IGNvb3Jkcy5zcGxpY2UoaW5kZXgsIDEpWzBdO1xuICAgIGxhc3RBdHRhY2tDb29yZCA9IGNvb3JkO1xuICAgIHJldHVybiBhdHRhY2soYm9hcmQsIGNvb3JkKTtcbiAgfTtcbiAgcmV0dXJuIHsgYXR0YWNrLCByYW5kb21BdHRhY2ssIGdldExhc3RBdHRhY2sgfTtcbn07XG5cbmV4cG9ydCB7IFBsYXllciwgQ29tcHV0ZXJQbGF5ZXIgfTtcbiIsImNvbnN0IFNoaXAgPSAobGVuZ3RoKSA9PiB7XG4gIGNvbnN0IHNoaXBTdGF0dXMgPSB7fTtcbiAgY29uc3Qgc2hpcEludGVyZmFjZSA9IHt9O1xuXG4gIHNoaXBJbnRlcmZhY2UuZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoO1xuXG4gIGZvciAobGV0IHggPSAwOyB4IDwgbGVuZ3RoOyB4ICs9IDEpIHtcbiAgICBzaGlwU3RhdHVzW3hdID0gZmFsc2U7XG4gIH1cblxuICBzaGlwSW50ZXJmYWNlLmhpdCA9IChudW0pID0+IHtcbiAgICBpZiAobnVtIDw9IGxlbmd0aCAmJiBzaGlwU3RhdHVzW251bV0gIT09IHRydWUpIHtcbiAgICAgIHNoaXBTdGF0dXNbbnVtXSA9IHRydWU7XG4gICAgICByZXR1cm4gc2hpcFN0YXR1c1tudW1dO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7IC8vIHJldHVybnMgZmFsc2UgaWYgcG9zaXRpb24gYWxyZWFkeSBtYXJrZWQgYXMgaGl0LCBvciBpZiBtaXNzZWRcbiAgfTtcblxuICBzaGlwSW50ZXJmYWNlLmNoZWNrSWZQb3NIaXQgPSAobnVtKSA9PiBzaGlwU3RhdHVzW251bV07XG5cbiAgc2hpcEludGVyZmFjZS5pc1N1bmsgPSAoKSA9PiB7XG4gICAgbGV0IHN1bmtTdGF0dXMgPSB0cnVlO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgIE9iamVjdC52YWx1ZXMoc2hpcFN0YXR1cykuZm9yRWFjaCgodmFsKSA9PiB7XG4gICAgICBpZiAodmFsID09PSBmYWxzZSkge1xuICAgICAgICBzdW5rU3RhdHVzID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHN1bmtTdGF0dXM7XG4gIH07XG5cbiAgcmV0dXJuIHNoaXBJbnRlcmZhY2U7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiaW1wb3J0IHsgUGxheWVyLCBDb21wdXRlclBsYXllciB9IGZyb20gXCIuLi9nYW1lUGllY2VzL3BsYXllclwiO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1jeWNsZVxuaW1wb3J0IHtcbiAgbWFya01pc3MsXG4gIHNoaXBIaXQsXG4gIHNldEdhbWVPdmVyLFxuICBpbmZvRGlzcGxheSxcbn0gZnJvbSBcIi4uL3VpL3VzZXJJbnRlcmZhY2VcIjtcblxuY29uc3QgR2FtZUNvbnRyb2xsZXIgPSAocGxheWVyQm9hcmQsIGNvbXB1dGVyQm9hcmQpID0+IHtcbiAgY29uc3QgcGxheWVyID0gUGxheWVyKCk7XG4gIGNvbnN0IGNvbXB1dGVyID0gQ29tcHV0ZXJQbGF5ZXIoKTtcbiAgbGV0IGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXI7XG5cbiAgY29uc3QgY29tcHV0ZXJUdXJuID0gKCkgPT4ge1xuICAgIGluZm9EaXNwbGF5KFwiQ3VycmVudCBwbGF5ZXI6IENvbXB1dGVyXCIpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKGNvbXB1dGVyLnJhbmRvbUF0dGFjayhwbGF5ZXJCb2FyZCkpIHtcbiAgICAgICAgc2hpcEhpdChcInBsYXllclwiLCBjb21wdXRlci5nZXRMYXN0QXR0YWNrKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFya01pc3MoXCJwbGF5ZXJcIiwgY29tcHV0ZXIuZ2V0TGFzdEF0dGFjaygpKTtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXI7XG5cbiAgICAgIGlmIChwbGF5ZXJCb2FyZC5jaGVja0ZvckdhbWVPdmVyKCkpIHtcbiAgICAgICAgc2V0R2FtZU92ZXIoXCJjb21wdXRlclwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpbmZvRGlzcGxheShcIllvdXIgdHVyblwiKTtcbiAgICB9LCAxMDAwKTtcbiAgfTtcblxuICBjb25zdCBwbGF5ZXJUdXJuID0gKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuZGF0YXNldC5zdGF0dXMgPT09IFwiaGl0XCIgfHwgY3VycmVudFBsYXllciA9PT0gQ29tcHV0ZXJQbGF5ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocGxheWVyQm9hcmQuY2hlY2tGb3JHYW1lT3ZlcigpKSB7XG4gICAgICBzZXRHYW1lT3ZlcihcIkNvbXB1dGVyXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChwbGF5ZXIuYXR0YWNrKGNvbXB1dGVyQm9hcmQsIGUudGFyZ2V0LmRhdGFzZXQuaWQpKSB7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlLnRhcmdldC5pbm5lclRleHQgPSBcIlhcIjtcbiAgICB9XG4gICAgZS50YXJnZXQuZGF0YXNldC5zdGF0dXMgPSBcImhpdFwiO1xuICAgIGN1cnJlbnRQbGF5ZXIgPSBDb21wdXRlclBsYXllcjtcblxuICAgIGlmIChjb21wdXRlckJvYXJkLmNoZWNrRm9yR2FtZU92ZXIoKSkge1xuICAgICAgc2V0R2FtZU92ZXIoXCJwbGF5ZXJcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29tcHV0ZXJUdXJuKCk7XG5cbiAgICBpZiAocGxheWVyQm9hcmQuY2hlY2tGb3JHYW1lT3ZlcigpKSB7XG4gICAgICBzZXRHYW1lT3ZlcihcIkNvbXB1dGVyXCIpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4geyBjb21wdXRlclR1cm4sIHBsYXllclR1cm4gfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVDb250cm9sbGVyO1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1jeWNsZVxuaW1wb3J0IEdhbWVDb250cm9sbGVyIGZyb20gXCIuLi9sb2dpYy9nYW1lTG9vcFwiO1xuaW1wb3J0IEJvYXJkIGZyb20gXCIuLi9nYW1lUGllY2VzL2dhbWVCb2FyZFwiO1xuaW1wb3J0IHJlc2V0IGZyb20gXCIuLi8uLi9pbWFnZXMvcmVzZXQucG5nXCI7XG5cbmNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIik7XG5jb25zdCBwbGF5ZXJHcmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbnBsYXllckdyaWQuZGF0YXNldC50eXBlID0gXCJwbGF5ZXJcIjtcbnBsYXllckdyaWQuaWQgPSBcImJvYXJkXCI7XG5cbmNvbnN0IGNvbXB1dGVyR3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5jb21wdXRlckdyaWQuaWQgPSBcImJvYXJkXCI7XG5jb21wdXRlckdyaWQuZGF0YXNldC50eXBlID0gXCJjb21wdXRlclwiO1xuXG5jb25zdCByZXNldEJ1dHRvbiA9IG5ldyBJbWFnZSgpO1xucmVzZXRCdXR0b24uc3JjID0gcmVzZXQ7XG5cbmNvbnN0IHNldFNoaXBDZWxsID0gKGlkKSA9PiB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwbGF5ZXIke2lkfWApLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xufTtcblxuY29uc3Qgc2hpcEhpdCA9IChwbGF5ZXIsIGlkKSA9PiB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3BsYXllcn0ke2lkfWApLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG59O1xuXG5jb25zdCBtYXJrTWlzcyA9IChwbGF5ZXIsIGlkKSA9PiB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3BsYXllcn0ke2lkfWApLmlubmVyVGV4dCA9IFwiWFwiO1xufTtcblxuY29uc3Qgc2V0dXBCb2FyZHMgPSAocGxheWVyQm9hcmQsIGNvbXB1dGVyQm9hcmQpID0+IHtcbiAgY29uc3QgYm9hcmQgPSBwbGF5ZXJCb2FyZC5nZXRCb2FyZCgpOyAvLyB3ZSB3YW50IHRoZSBwbGF5ZXIgdG8gYmUgYWJsZSB0byBzZWUgdGhlaXIgc2hpcHNcblxuICBmb3IgKGxldCB4ID0gMDsgeCA8IDU7IHggKz0gMSkge1xuICAgIGlmICh4ICUgMiA9PT0gMCkge1xuICAgICAgcGxheWVyQm9hcmQucGxhY2VSYW5kb21Ib3Jpem9udGFsKHgpO1xuICAgICAgY29tcHV0ZXJCb2FyZC5wbGFjZVJhbmRvbUhvcml6b250YWwoeCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXB1dGVyQm9hcmQucGxhY2VSYW5kb21WZXJ0aWNhbCh4KTtcbiAgICAgIHBsYXllckJvYXJkLnBsYWNlUmFuZG9tVmVydGljYWwoeCk7XG4gICAgfVxuICB9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICBmb3IgKGNvbnN0IFtrZXldIG9mIE9iamVjdC5lbnRyaWVzKGJvYXJkKSkge1xuICAgIGNvbnN0IGN1cnJlbnRSb3cgPSBib2FyZFtrZXldO1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgY3VycmVudFJvdy5sZW5ndGg7IHggKz0gMSkge1xuICAgICAgaWYgKGN1cnJlbnRSb3dbeF0uc3RhdHVzID09PSBcIm9jY3VwaWVkXCIpIHtcbiAgICAgICAgc2V0U2hpcENlbGwoa2V5LnRvVXBwZXJDYXNlKCkgKyB4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGluZm9EaXNwbGF5ID0gKHRleHQpID0+IHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjdXJyZW50VHVyblwiKS5pbm5lclRleHQgPSB0ZXh0O1xufTtcblxuY29uc3Qgc2V0dXBHcmlkID0gKGdyaWQsIHR5cGUsIGNvbnRyb2xsZXIpID0+IHtcbiAgY29udGVudC5hcHBlbmRDaGlsZChncmlkKTtcbiAgY29uc3Qgcm93cyA9IFtcIkFcIiwgXCJCXCIsIFwiQ1wiLCBcIkRcIiwgXCJFXCIsIFwiRlwiLCBcIkdcIiwgXCJIXCIsIFwiSVwiLCBcIkpcIl07XG4gIHJvd3MuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICByb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDEwOyB4ICs9IDEpIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY2VsbFwiKTtcbiAgICAgIGNlbGwuZGF0YXNldC5pZCA9IGtleSArIHg7XG4gICAgICBjZWxsLmlkID0gdHlwZSArIGtleSArIHg7XG4gICAgICBpZiAoZ3JpZC5kYXRhc2V0LnR5cGUgPT09IFwiY29tcHV0ZXJcIikge1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgIGNvbnRyb2xsZXIucGxheWVyVHVybihlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfVxuICAgIGdyaWQuYXBwZW5kQ2hpbGQocm93KTtcbiAgfSk7XG59O1xuXG5jb25zdCBzZXR1cCA9ICgpID0+IHtcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBCb2FyZCgpO1xuICBjb25zdCBjb21wdXRlckJvYXJkID0gQm9hcmQoKTtcbiAgY29uc3QgZ2FtZUNvbnRyb2xsZXIgPSBHYW1lQ29udHJvbGxlcihwbGF5ZXJCb2FyZCwgY29tcHV0ZXJCb2FyZCk7XG4gIGNvbnN0IGN1cnJlbnRUdXJuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgY3VycmVudFR1cm4uaWQgPSBcImN1cnJlbnRUdXJuXCI7XG4gIGNvbnN0IGluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBpbmZvLmlkID0gXCJpbmZvXCI7XG4gIGluZm8uYXBwZW5kKHJlc2V0QnV0dG9uKTtcbiAgaW5mby5hcHBlbmQoY3VycmVudFR1cm4pO1xuXG4gIGN1cnJlbnRUdXJuLmlubmVyVGV4dCA9IFwiQ2xpY2sgYSBjZWxsIHRvIGJlZ2luXCI7XG4gIHJlc2V0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNlbGxcIik7XG4gICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hpcFwiKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImhpdFwiKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRDZWxsID0gY2VsbDtcbiAgICAgIGN1cnJlbnRDZWxsLmlubmVyVGV4dCA9IFwiXCI7XG4gICAgfSk7XG4gICAgcGxheWVyQm9hcmQucmVzZXRCb2FyZCgpO1xuICAgIGNvbXB1dGVyQm9hcmQucmVzZXRCb2FyZCgpO1xuICAgIHNldHVwQm9hcmRzKHBsYXllckJvYXJkLCBjb21wdXRlckJvYXJkKTtcbiAgfSk7XG4gIHNldHVwR3JpZChwbGF5ZXJHcmlkLCBcInBsYXllclwiLCBnYW1lQ29udHJvbGxlcik7XG4gIHNldHVwR3JpZChjb21wdXRlckdyaWQsIFwiY29tcHV0ZXJcIiwgZ2FtZUNvbnRyb2xsZXIpO1xuICBjb250ZW50LmFwcGVuZENoaWxkKHBsYXllckdyaWQpO1xuICBjb250ZW50LmFwcGVuZChpbmZvKTtcbiAgY29udGVudC5hcHBlbmRDaGlsZChjb21wdXRlckdyaWQpO1xuICBzZXR1cEJvYXJkcyhwbGF5ZXJCb2FyZCwgY29tcHV0ZXJCb2FyZCk7XG59O1xuXG5jb25zdCBzZXRHYW1lT3ZlciA9ICh3aW5uZXIpID0+IHtcbiAgY29uc3QgcmVzZXRTdGF0dXMgPSBcIkNsaWNrIHRvIHBsYXkgYWdhaW5cIjtcbiAgaWYgKHdpbm5lciA9PT0gXCJwbGF5ZXJcIikge1xuICAgIGluZm9EaXNwbGF5KGBZb3Ugd2luXFxuICR7cmVzZXRTdGF0dXN9YCk7XG4gIH0gZWxzZSB7XG4gICAgaW5mb0Rpc3BsYXkoXCJDb21wdXRlciB3aW5zIFxcbiBDbGljayB0byBwbGF5IGFnYWluXCIpO1xuICB9XG59O1xuXG5leHBvcnQgeyBzZXR1cEJvYXJkcywgc2V0dXAsIHNoaXBIaXQsIG1hcmtNaXNzLCBzZXRHYW1lT3ZlciwgaW5mb0Rpc3BsYXkgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9R2x1dGVuOndnaHRAMzAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvXFxudjIuMCB8IDIwMTEwMTI2XFxuTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsXFxuYm9keSxcXG5kaXYsXFxuc3BhbixcXG5hcHBsZXQsXFxub2JqZWN0LFxcbmlmcmFtZSxcXG5oMSxcXG5oMixcXG5oMyxcXG5oNCxcXG5oNSxcXG5oNixcXG5wLFxcbmJsb2NrcXVvdGUsXFxucHJlLFxcbmEsXFxuYWJicixcXG5hY3JvbnltLFxcbmFkZHJlc3MsXFxuYmlnLFxcbmNpdGUsXFxuY29kZSxcXG5kZWwsXFxuZGZuLFxcbmVtLFxcbmltZyxcXG5pbnMsXFxua2JkLFxcbnEsXFxucyxcXG5zYW1wLFxcbnNtYWxsLFxcbnN0cmlrZSxcXG5zdHJvbmcsXFxuc3ViLFxcbnN1cCxcXG50dCxcXG52YXIsXFxuYixcXG51LFxcbmksXFxuY2VudGVyLFxcbmRsLFxcbmR0LFxcbmRkLFxcbm9sLFxcbnVsLFxcbmxpLFxcbmZpZWxkc2V0LFxcbmZvcm0sXFxubGFiZWwsXFxubGVnZW5kLFxcbnRhYmxlLFxcbmNhcHRpb24sXFxudGJvZHksXFxudGZvb3QsXFxudGhlYWQsXFxudHIsXFxudGgsXFxudGQsXFxuYXJ0aWNsZSxcXG5hc2lkZSxcXG5jYW52YXMsXFxuZGV0YWlscyxcXG5lbWJlZCxcXG5maWd1cmUsXFxuZmlnY2FwdGlvbixcXG5mb290ZXIsXFxuaGVhZGVyLFxcbmhncm91cCxcXG5tZW51LFxcbm5hdixcXG5vdXRwdXQsXFxucnVieSxcXG5zZWN0aW9uLFxcbnN1bW1hcnksXFxudGltZSxcXG5tYXJrLFxcbmF1ZGlvLFxcbnZpZGVvIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3JkZXI6IDA7XFxuICBmb250LXNpemU6IDEwMCU7XFxuICBmb250OiBpbmhlcml0O1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSxcXG5hc2lkZSxcXG5kZXRhaWxzLFxcbmZpZ2NhcHRpb24sXFxuZmlndXJlLFxcbmZvb3RlcixcXG5oZWFkZXIsXFxuaGdyb3VwLFxcbm1lbnUsXFxubmF2LFxcbnNlY3Rpb24ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcbiAgbGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLFxcbnVsIHtcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsXFxucSB7XFxuICBxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLFxcbmJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsXFxucTphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuICBib3JkZXItc3BhY2luZzogMDtcXG59XFxuXFxuI2NvbnRlbnQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIGF1dG8gMWZyO1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGZvbnQtZmFtaWx5OiBHbHV0ZW4sIGN1cnNpdmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGRlMmViO1xcbn1cXG5cXG4jYm9hcmQge1xcbiAgd2lkdGg6IDQwMHB4O1xcbiAgaGVpZ2h0OiA0MDBweDtcXG5cXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgIHRvIHJpZ2h0IHRvcCxcXG4gICAgI2UxNWIxNyxcXG4gICAgI2U3NGYxYixcXG4gICAgI2VkNDAyMCxcXG4gICAgI2YyMmMyNixcXG4gICAgI2Y3MDAyZFxcbiAgKTtcXG5cXG4gIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4wMikgMHB4IDFweCAzcHggMHB4LFxcbiAgICByZ2JhKDI3LCAzMSwgMzUsIDAuMTUpIDBweCAwcHggMHB4IDFweDtcXG59XFxuXFxuI2JvYXJkW2RhdGEtdHlwZT1cXFwiY29tcHV0ZXJcXFwiXTpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5yb3cge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC1jb2x1bW46IDEvLTE7XFxufVxcbi5jZWxsIHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGJvcmRlcjogc29saWQgMXB4O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NmZmZmO1xcbn1cXG5cXG4uc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuXFxuLmhpdCB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBvcGFjaXR5OiAwO1xcbn1cXG5cXG4jaW5mbyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC1jb2x1bW46IDI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIGF1dG87XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAganVzdGlmeS1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICB3aWR0aDogMTcwcHg7XFxuICBtaW4td2lkdGg6IDE3MHB4O1xcbiAgZ3JpZC1nYXA6IDIwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFxuICBoZWlnaHQ6IDUwcHg7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxufVxcblxcbiNjdXJyZW50VHVybiB7XFxuICBhbGlnbi1zZWxmOiBzdGFydDtcXG59XFxuI2luZm8gaW1nIHtcXG4gIHdpZHRoOiAzMnB4O1xcbiAgaGVpZ2h0OiAzMnB4O1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbiAgZ3JpZC1yb3c6IDE7XFxufVxcblxcbiNpbmZvIGltZzpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbiNjdXJyZW50VHVybiB7XFxuICBncmlkLXJvdzogMjtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7O0NBR0M7O0FBR0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWlGRSxTQUFTO0VBQ1QsVUFBVTtFQUNWLFNBQVM7RUFDVCxlQUFlO0VBQ2YsYUFBYTtFQUNiLHdCQUF3QjtBQUMxQjtBQUNBLGdEQUFnRDtBQUNoRDs7Ozs7Ozs7Ozs7RUFXRSxjQUFjO0FBQ2hCO0FBQ0E7RUFDRSxjQUFjO0FBQ2hCO0FBQ0E7O0VBRUUsZ0JBQWdCO0FBQ2xCO0FBQ0E7O0VBRUUsWUFBWTtBQUNkO0FBQ0E7Ozs7RUFJRSxXQUFXO0VBQ1gsYUFBYTtBQUNmO0FBQ0E7RUFDRSx5QkFBeUI7RUFDekIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1DQUFtQztFQUNuQyxhQUFhO0VBQ2IsWUFBWTtFQUNaLDRCQUE0QjtFQUM1Qix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTs7RUFFYixvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixtQ0FBbUM7RUFDbkMsMEJBQTBCO0VBQzFCOzs7Ozs7O0dBT0M7O0VBRUQ7MENBQ3dDO0FBQzFDOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQ0FBc0M7RUFDdEMsaUJBQWlCO0FBQ25CO0FBQ0E7RUFDRSxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIscUJBQXFCO0VBQ3JCLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWixVQUFVO0FBQ1o7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsY0FBYztFQUNkLG1CQUFtQjtFQUNuQiw2QkFBNkI7RUFDN0IsMEJBQTBCO0VBQzFCLFdBQVc7RUFDWCxxQkFBcUI7RUFDckIsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLGtCQUFrQjs7RUFFbEIsWUFBWTtFQUNaLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjtBQUNBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsV0FBVztBQUNiOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFdBQVc7QUFDYlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0L1xcbnYyLjAgfCAyMDExMDEyNlxcbkxpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5AaW1wb3J0IHVybChcXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1HbHV0ZW46d2dodEAzMDAmZGlzcGxheT1zd2FwXFxcIik7XFxuXFxuaHRtbCxcXG5ib2R5LFxcbmRpdixcXG5zcGFuLFxcbmFwcGxldCxcXG5vYmplY3QsXFxuaWZyYW1lLFxcbmgxLFxcbmgyLFxcbmgzLFxcbmg0LFxcbmg1LFxcbmg2LFxcbnAsXFxuYmxvY2txdW90ZSxcXG5wcmUsXFxuYSxcXG5hYmJyLFxcbmFjcm9ueW0sXFxuYWRkcmVzcyxcXG5iaWcsXFxuY2l0ZSxcXG5jb2RlLFxcbmRlbCxcXG5kZm4sXFxuZW0sXFxuaW1nLFxcbmlucyxcXG5rYmQsXFxucSxcXG5zLFxcbnNhbXAsXFxuc21hbGwsXFxuc3RyaWtlLFxcbnN0cm9uZyxcXG5zdWIsXFxuc3VwLFxcbnR0LFxcbnZhcixcXG5iLFxcbnUsXFxuaSxcXG5jZW50ZXIsXFxuZGwsXFxuZHQsXFxuZGQsXFxub2wsXFxudWwsXFxubGksXFxuZmllbGRzZXQsXFxuZm9ybSxcXG5sYWJlbCxcXG5sZWdlbmQsXFxudGFibGUsXFxuY2FwdGlvbixcXG50Ym9keSxcXG50Zm9vdCxcXG50aGVhZCxcXG50cixcXG50aCxcXG50ZCxcXG5hcnRpY2xlLFxcbmFzaWRlLFxcbmNhbnZhcyxcXG5kZXRhaWxzLFxcbmVtYmVkLFxcbmZpZ3VyZSxcXG5maWdjYXB0aW9uLFxcbmZvb3RlcixcXG5oZWFkZXIsXFxuaGdyb3VwLFxcbm1lbnUsXFxubmF2LFxcbm91dHB1dCxcXG5ydWJ5LFxcbnNlY3Rpb24sXFxuc3VtbWFyeSxcXG50aW1lLFxcbm1hcmssXFxuYXVkaW8sXFxudmlkZW8ge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJvcmRlcjogMDtcXG4gIGZvbnQtc2l6ZTogMTAwJTtcXG4gIGZvbnQ6IGluaGVyaXQ7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLFxcbmFzaWRlLFxcbmRldGFpbHMsXFxuZmlnY2FwdGlvbixcXG5maWd1cmUsXFxuZm9vdGVyLFxcbmhlYWRlcixcXG5oZ3JvdXAsXFxubWVudSxcXG5uYXYsXFxuc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuICBsaW5lLWhlaWdodDogMTtcXG59XFxub2wsXFxudWwge1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSxcXG5xIHtcXG4gIHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsXFxuYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSxcXG5xOmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgY29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG4gIGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cXG5cXG4jY29udGVudCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgYXV0byAxZnI7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgZm9udC1mYW1pbHk6IEdsdXRlbiwgY3Vyc2l2ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0ZGUyZWI7XFxufVxcblxcbiNib2FyZCB7XFxuICB3aWR0aDogNDAwcHg7XFxuICBoZWlnaHQ6IDQwMHB4O1xcblxcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudChcXG4gICAgdG8gcmlnaHQgdG9wLFxcbiAgICAjZTE1YjE3LFxcbiAgICAjZTc0ZjFiLFxcbiAgICAjZWQ0MDIwLFxcbiAgICAjZjIyYzI2LFxcbiAgICAjZjcwMDJkXFxuICApO1xcblxcbiAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjAyKSAwcHggMXB4IDNweCAwcHgsXFxuICAgIHJnYmEoMjcsIDMxLCAzNSwgMC4xNSkgMHB4IDBweCAwcHggMXB4O1xcbn1cXG5cXG4jYm9hcmRbZGF0YS10eXBlPVxcXCJjb21wdXRlclxcXCJdOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnJvdyB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLWNvbHVtbjogMS8tMTtcXG59XFxuLmNlbGwge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYm9yZGVyOiBzb2xpZCAxcHg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNjY2ZmZmY7XFxufVxcblxcbi5zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIG9wYWNpdHk6IDA7XFxufVxcblxcbiNpbmZvIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLWNvbHVtbjogMjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gYXV0bztcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHdpZHRoOiAxNzBweDtcXG4gIG1pbi13aWR0aDogMTcwcHg7XFxuICBncmlkLWdhcDogMjBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG5cXG4gIGhlaWdodDogNTBweDtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuI2N1cnJlbnRUdXJuIHtcXG4gIGFsaWduLXNlbGY6IHN0YXJ0O1xcbn1cXG4jaW5mbyBpbWcge1xcbiAgd2lkdGg6IDMycHg7XFxuICBoZWlnaHQ6IDMycHg7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICBncmlkLXJvdzogMTtcXG59XFxuXFxuI2luZm8gaW1nOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuI2N1cnJlbnRUdXJuIHtcXG4gIGdyaWQtcm93OiAyO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSwgZGVkdXBlKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19pXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIlwiLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIiBhbmQgXCIpLmNvbmNhdChpdGVtWzJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyID09IG51bGwgPyBudWxsIDogdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSkge1xuICB2YXIgX2l0ZW0gPSBfc2xpY2VkVG9BcnJheShpdGVtLCA0KSxcbiAgICAgIGNvbnRlbnQgPSBfaXRlbVsxXSxcbiAgICAgIGNzc01hcHBpbmcgPSBfaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5Eb20gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRvbS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRvbVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdXG4gICAgfTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZXNJbkRvbS5wdXNoKHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogYWRkU3R5bGUob2JqLCBvcHRpb25zKSxcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRvbVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRG9tW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRvbVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRvbS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoc3R5bGUsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KHN0eWxlKTtcbiAgcmV0dXJuIHN0eWxlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGUpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZSwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBvYmouY3NzO1xuICB2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChtZWRpYSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUoXCJtZWRpYVwiKTtcbiAgfVxuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZSwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGUpIHtcbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCB7IHNldHVwIH0gZnJvbSAnLi9hcHAvdWkvdXNlckludGVyZmFjZSc7XG5cbnNldHVwKCk7XG4iXSwibmFtZXMiOlsiU2hpcCIsImdlbmVyYXRlQm9hcmQiLCJwYXJzZUNvb3JkIiwic3RhdHVzTWVzc2FnZXMiLCJvY2N1cGllZCIsInVub2NjdXBpZWQiLCJwbGFjZUhvcml6b250YWwiLCJib2FyZCIsInN0YXJ0Q2VsbCIsImVuZENlbGwiLCJzdGFydFJvdyIsImJvYXJkRWRpdCIsImN1cnJlbnRDZWxsIiwic3RhdHVzIiwiRXJyb3IiLCJsZW5ndGgiLCJzaGlwIiwicG9zIiwicGxhY2VWZXJ0aWNhbCIsImVuZFJvdyIsImNlbGwiLCJPYmplY3QiLCJlbnRyaWVzIiwia2V5IiwiY2hlY2tTaGlwcyIsImFsbFN1bmsiLCJmb3JFYWNoIiwiaXRlbSIsImlzU3VuayIsIkJvYXJkIiwiYm9hcmRJbnRlcmZhY2UiLCJjdXJyZW50Qm9hcmQiLCJnZXRCb2FyZCIsInBsYWNlIiwieCIsInkiLCJjb29yZEEiLCJjb29yZEIiLCJyb3ciLCJ0cnlUb1BsYWNlIiwiY29vcmQxIiwiY29vcmQyIiwiZXJyb3IiLCJwbGFjZVJhbmRvbUhvcml6b250YWwiLCJzaXplIiwiY29vcmRzIiwiY2VsbHMiLCJjZWxsSW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJzbGljZSIsImNvb3JkSW5kZXgiLCJzcGxpY2UiLCJwbGFjZVJhbmRvbVZlcnRpY2FsIiwicmVjZWl2ZUF0dGFjayIsImhpdFN1Y2Nlc2Z1bCIsImhpdFN0YXR1cyIsImhpdCIsImNoZWNrSGl0U3RhdHVzIiwiY29vcmQiLCJjZWxsQ29udGVudCIsImdldFNoaXAiLCJjaGVja0ZvclNoaXAiLCJjaGVja0ZvckdhbWVPdmVyIiwicmVzZXRCb2FyZCIsImEiLCJiIiwiYyIsImQiLCJlIiwiZiIsImciLCJoIiwiaSIsImoiLCJ2YWx1ZSIsInB1c2giLCJzcGxpdCIsInRvTG93ZXJDYXNlIiwicGFyc2VJbnQiLCJzZXR1cFVub2NjdXBpZWQiLCJwb3NpdGlvbnMiLCJ1bm9jY3VwaWVkUG9zaXRpb25zIiwiY3VycmVudENvb3JkcyIsInZhbCIsIlBsYXllciIsImF0dGFjayIsIkNvbXB1dGVyUGxheWVyIiwia2V5cyIsImxhc3RBdHRhY2tDb29yZCIsImdldExhc3RBdHRhY2siLCJyYW5kb21BdHRhY2siLCJpbmRleCIsInNoaXBTdGF0dXMiLCJzaGlwSW50ZXJmYWNlIiwiZ2V0TGVuZ3RoIiwibnVtIiwiY2hlY2tJZlBvc0hpdCIsInN1bmtTdGF0dXMiLCJ2YWx1ZXMiLCJtYXJrTWlzcyIsInNoaXBIaXQiLCJzZXRHYW1lT3ZlciIsImluZm9EaXNwbGF5IiwiR2FtZUNvbnRyb2xsZXIiLCJwbGF5ZXJCb2FyZCIsImNvbXB1dGVyQm9hcmQiLCJwbGF5ZXIiLCJjb21wdXRlciIsImN1cnJlbnRQbGF5ZXIiLCJjb21wdXRlclR1cm4iLCJzZXRUaW1lb3V0IiwicGxheWVyVHVybiIsInRhcmdldCIsImRhdGFzZXQiLCJpZCIsImNsYXNzTGlzdCIsImFkZCIsImlubmVyVGV4dCIsInJlc2V0IiwiY29udGVudCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInBsYXllckdyaWQiLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsImNvbXB1dGVyR3JpZCIsInJlc2V0QnV0dG9uIiwiSW1hZ2UiLCJzcmMiLCJzZXRTaGlwQ2VsbCIsInNldHVwQm9hcmRzIiwiY3VycmVudFJvdyIsInRvVXBwZXJDYXNlIiwidGV4dCIsInNldHVwR3JpZCIsImdyaWQiLCJjb250cm9sbGVyIiwiYXBwZW5kQ2hpbGQiLCJyb3dzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldHVwIiwiZ2FtZUNvbnRyb2xsZXIiLCJjdXJyZW50VHVybiIsImluZm8iLCJhcHBlbmQiLCJxdWVyeVNlbGVjdG9yQWxsIiwicmVtb3ZlIiwid2lubmVyIiwicmVzZXRTdGF0dXMiXSwic291cmNlUm9vdCI6IiJ9