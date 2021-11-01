import { Game } from "./classes.js";
import { Piece } from "./constants.js";

const gameArea: HTMLCanvasElement = document.querySelector("canvas#gameArea");
const ctx: CanvasRenderingContext2D = gameArea.getContext("2d");

export function drawMap(game: Game): void {
  ctx.clearRect(0, 0, gameArea.width, gameArea.height);
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, gameArea.height, gameArea.height);
  for (let i = 0; i < game.gameMap.map.length + 2; i++) {
    for (let j = 0; j < game.gameMap.map.length + 2; j++) {
      if (
        (i === 0 && j > 0 && j < game.gameMap.map.length && j % 2 === 0) ||
        (i === game.gameMap.map.length + 1 &&
          j > 0 &&
          j < game.gameMap.map.length &&
          j % 2 === 0) ||
        (j === 0 && i > 0 && i < game.gameMap.map.length && i % 2 === 0) ||
        (j === game.gameMap.map.length + 1 &&
          i > 0 &&
          i < game.gameMap.map.length &&
          i % 2 === 0)
      ) {
        // ctx.fillText("side", i * 50, j * 50 + 25);
        dArrow(i * 50, j * 50, game);
      } else if (
        !(i === 0 ||
          j === 0 ||
          i === game.gameMap.map.length + 1 ||
          j === game.gameMap.map.length + 1)
      ) {
        dImage(game.gameMap.map[j - 1][i - 1], i * 50, j * 50);
      }
      // ctx.strokeRect(i * 50, j * 50, 50, 50)
    }
  }
  dImage(
    game.gameMap.randomfield,
    game.draggableField.x,
    game.draggableField.y
  );
  drawPlayers(game);
  drawTreasures(game);
  // if(game.fallenTreasure !== null)
}

function dImage(type: Piece, x: number, y: number) {
  const img = new Image(50, 50);
  switch (type) {
    case "topleft":
      img.src = "../assets/topleft.png";
      break;
    case "topright":
      img.src = "../assets/topright.png";
      break;
    case "bottomleft":
      img.src = "../assets/bottomleft.png";
      break;
    case "bottomright":
      img.src = "../assets/bottomright.png";
      break;
    case "horizontal":
      img.src = "../assets/horizontal.png";
      break;
    case "vertical":
      img.src = "../assets/vertical.png";
      break;
    case "tripleup":
      img.src = "../assets/tripleup.png";
      break;
    case "tripleright":
      img.src = "../assets/tripleright.png";
      break;
    case "tripledown":
      img.src = "../assets/tripledown.png";
      break;
    case "tripleleft":
      img.src = "../assets/tripleleft.png";
      break;
    default:
      break;
  }
  img.onload = () => ctx.drawImage(img, x, y, 50, 50);
}

function dArrow(x: number, y: number, game: Game) {
  const img = new Image(50, 50);

  if (x === 0) img.src = "../assets/rightarrow.png";
  else if (x / 50 === game.gameMap.map.length + 1)
    img.src = "../assets/leftarrow.png";
  else if (y === 0) img.src = "../assets/downarrow.png";
  else if (y / 50 === game.gameMap.map.length + 1)
    img.src = "../assets/uparrow.png";

  img.onload = () => ctx.drawImage(img, x, y, 50, 50);
}

function drawPlayers(game: Game) {
  for (let i = 0; i < game.players.length; i++) {
    dPlayer(game.players[i].x, game.players[i].y);
  }
}
function dPlayer(x: number, y: number) {
  const img = new Image(50, 50);

  // if(game.players[i].number === 1)

  img.src = "../assets/player.png";
  img.onload = () => ctx.drawImage(img, (y + 1) * 50, (x + 1) * 50, 20, 20);
}

function drawTreasures(game: Game) {
  for (let i = 0; i < game.treasuresAll.length; i++) {
    dTreasure(game.treasuresAll[i].x, game.treasuresAll[i].y);
  }
  if(game.fallenTreasure !== null)
  dFallenT(game.draggableField.x,game.draggableField.y)
}
function dFallenT(x: number, y: number){
  const img = new Image(50, 50);
  img.src = "../assets/player.png";
  img.onload = () => ctx.drawImage(img, x, y, 10, 10);
}

function dTreasure(x: number, y: number) {
  const img = new Image(50, 50);

  // if(game.players[i].number === 1)

  img.src = "../assets/player.png";
  img.onload = () => ctx.drawImage(img, (x + 1) * 50, (y + 1) * 50, 10, 10);
}
