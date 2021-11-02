import { Field } from "./constants.js";
import { game } from "./main.js";

const gameArea: HTMLCanvasElement = document.querySelector("canvas#gameArea");
const ctx: CanvasRenderingContext2D = gameArea.getContext("2d");

const bottomleft = new Image();

bottomleft.src = "../assets/bottomleft.png";

const bottomright = new Image();
bottomright.src = "../assets/bottomright.png";
const leftarrow = new Image();
leftarrow.src = "../assets/leftarrow.png";
const horizontal = new Image();
horizontal.src = "../assets/horizontal.png";
const downarrow = new Image();
downarrow.src = "../assets/downarrow.png";
const player = new Image();
player.src = "../assets/player.png";
const rightarrow = new Image();
rightarrow.src = "../assets/rightarrow.png";
const topleft = new Image();
topleft.src = "../assets/topleft.png";
const topright = new Image();
topright.src = "../assets/topright.png";
const tripledown = new Image();
tripledown.src = "../assets/tripledown.png";
const tripleleft = new Image();
tripleleft.src = "../assets/tripleleft.png";
const tripleright = new Image();
tripleright.src = "../assets/tripleright.png";
const tripleup = new Image();
tripleup.src = "../assets/tripleup.png";
const uparrow = new Image();
uparrow.src = "../assets/uparrow.png";
const vertical = new Image();
vertical.src = "../assets/vertical.png";

export function drawMap(): void {
  ctx.clearRect(0, 0, gameArea.width, gameArea.height);
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, gameArea.height, gameArea.height);
  for (let col = 0; col < game.gameMap.map.length + 2; col++) {
    for (let row = 0; row < game.gameMap.map.length + 2; row++) {
      if (
        (col === 0 &&
          row > 0 &&
          row < game.gameMap.map.length &&
          row % 2 === 0) ||
        (col === game.gameMap.map.length + 1 &&
          row > 0 &&
          row < game.gameMap.map.length &&
          row % 2 === 0) ||
        (row === 0 &&
          col > 0 &&
          col < game.gameMap.map.length &&
          col % 2 === 0) ||
        (row === game.gameMap.map.length + 1 &&
          col > 0 &&
          col < game.gameMap.map.length &&
          col % 2 === 0)
      ) {
        // ctx.fillText("side", i * 50, j * 50 + 25);
        dArrow(col * 50, row * 50);
      } else if (
        !(
          col === 0 ||
          row === 0 ||
          col === game.gameMap.map.length + 1 ||
          row === game.gameMap.map.length + 1
        )
      ) {
        dImage(game.gameMap.map[row - 1][col - 1], col * 50, row * 50);
      }
      // ctx.strokeRect(i * 50, j * 50, 50, 50)
    }
  }
  dImage(
    game.gameMap.randomfield,
    game.draggableField.x,
    game.draggableField.y
  );
  drawPlayers();
  drawTreasures();
  // if(game.fallenTreasure !== null)
  drawAvailable();
  drawActualPlayer();
}

function dImage(type: Field, row: number, col: number) {
  if (type.type == "edge" && type.rotation == 0)
    ctx.drawImage(topleft, row, col, 50, 50);
  else if (type.type == "edge" && type.rotation == 1)
    ctx.drawImage(topright, row, col, 50, 50);
  else if (type.type == "edge" && type.rotation == 3)
    ctx.drawImage(bottomleft, row, col, 50, 50);
  else if (type.type == "edge" && type.rotation == 2)
    ctx.drawImage(bottomright, row, col, 50, 50);
  else if (type.type == "straight" && type.rotation == 1)
    ctx.drawImage(horizontal, row, col, 50, 50);
  else if (type.type == "straight" && type.rotation == 0)
    ctx.drawImage(vertical, row, col, 50, 50);
  else if (type.type == "triple" && type.rotation == 3)
    ctx.drawImage(tripleup, row, col, 50, 50);
  else if (type.type == "triple" && type.rotation == 0)
    ctx.drawImage(tripleright, row, col, 50, 50);
  else if (type.type == "triple" && type.rotation == 1)
    ctx.drawImage(tripledown, row, col, 50, 50);
  else if (type.type == "triple" && type.rotation == 2)
    ctx.drawImage(tripleleft, row, col, 50, 50);
}

function dArrow(row: number, col: number) {
  if (row === 0) ctx.drawImage(rightarrow, row, col, 50, 50);
  else if (row / 50 === game.gameMap.map.length + 1)
    ctx.drawImage(leftarrow, row, col, 50, 50);
  else if (col === 0) ctx.drawImage(downarrow, row, col, 50, 50);
  else if (col / 50 === game.gameMap.map.length + 1)
    ctx.drawImage(uparrow, row, col, 50, 50);
}

function drawPlayers() {
  for (let i = 0; i < game.players.length; i++) {
    dPlayer(game.players[i].row, game.players[i].col);
  }
}
function dPlayer(row: number, col: number) {
  // if(game.players[i].number === 1)

  ctx.drawImage(player, (col + 1) * 50, (row + 1) * 50, 20, 20);
}

function drawTreasures() {
  for (let i = 0; i < game.treasuresAll.length; i++) {
    dTreasure(game.treasuresAll[i].row, game.treasuresAll[i].col);
  }
  if (game.fallenTreasure !== null)
    dFallenT(game.draggableField.x, game.draggableField.y);
}
function dFallenT(row: number, col: number) {
  ctx.drawImage(player, row, col, 10, 10);
}

function dTreasure(row: number, col: number) {
  // if(game.players[i].number === 1)

  ctx.drawImage(player, (row + 1) * 50, (col + 1) * 50, 10, 10);
}

export function drawAvailable() {
  ctx.fillStyle = "black";
  for (let i = 0; i < game.availableFields.length; i++) {
    ctx.strokeRect(
      (game.availableFields[i][1] + 1) * 50,
      (game.availableFields[i][0] + 1) * 50,
      50,
      50
    );
  }
}

function drawActualPlayer() {
  ctx.fillStyle = "black";
  ctx.strokeRect(
    (game.players[game.currentPlayer].col + 1) * 50,
    (game.players[game.currentPlayer].row + 1) * 50,
    20,
    20
  );
}
