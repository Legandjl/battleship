import { setupBoards } from "../gameLoop";

const content = document.querySelector("#content");
const playerGrid = document.createElement("div");
playerGrid.id = "board";
const computerGrid = document.createElement("div");
computerGrid.id = "board";

const setupGrid = (grid) => {
  content.appendChild(playerGrid);
  content.appendChild(computerGrid);
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  rows.forEach((key) => {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let x = 0; x < 10; x += 1) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.id = key + x;
      row.appendChild(cell);
    }
    grid.appendChild(row);
  });
};

const setup = () => {
  content.appendChild(playerGrid);
  content.appendChild(computerGrid);
  setupGrid(playerGrid);
  setupGrid(computerGrid);
  setupBoards();
};

export { setupBoards, setup };
