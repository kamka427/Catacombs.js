import { Game, DraggableField } from "./classes";
import {swap} from "./utils"

const gameArea: HTMLCanvasElement = document.querySelector("canvas#gameArea");
const ctx: CanvasRenderingContext2D = gameArea.getContext("2d");

const game = new Game(2, 2);
const drag = new DraggableField();

function drawMap(): void {
  ctx.clearRect(0, 0, gameArea.width, gameArea.height);
  for (let i = 0; i < game.gameMap.map.length + 2; i++) {
    for (let j = 0; j < game.gameMap.map.length + 2; j++) {
      if (
        i === 0 ||
        j === 0 ||
        i === game.gameMap.map.length + 1 ||
        j === game.gameMap.map.length + 1
      ) {
        ctx.fillText("side", i * 50, j * 50 + 25);
      } else ctx.fillText(game.gameMap.map[i - 1][j - 1], i * 50, j * 50 + 25);
      ctx.strokeRect(i * 50, j * 50, 50, 50);
    }
  }
}
drawMap();

function drawRandom() {
  ctx.strokeRect(drag.x, drag.y, drag.width, drag.height);
  ctx.fillText(game.gameMap.randomfield, drag.x, drag.y + 25);
}
drawRandom();

function selectField(e: MouseEvent) {
  const x: number =
    Math.floor(
      (game.gameMap.map.length * e.clientX) / (game.gameMap.map.length * 50)
    ) - 1;
  const y: number =
    Math.floor(
      (game.gameMap.map.length * e.clientY) / (game.gameMap.map.length * 50)
    ) - 1;
  console.log(e);
  console.log(x);
  console.log(y);
}

document.addEventListener("click", selectField);

function rotate(e: MouseEvent): void {
  if (e.clientX >= 10 * 50 && e.clientX <= 12 * 50 && e.clientY <= 50) {
    switch (game.gameMap.randomfield) {
      case "topleft":
        game.gameMap.randomfield = "topright";
        break;
      case "topright":
        game.gameMap.randomfield = "bottomright";
        break;
      case "bottomright":
        game.gameMap.randomfield = "bottomleft";
        break;
      case "bottomleft":
        game.gameMap.randomfield = "topleft";
        break;
      case "vertical":
        game.gameMap.randomfield = "horizontal";
        break;
      case "horizontal":
        game.gameMap.randomfield = "vertical";
        break;
      case "tripleright":
        game.gameMap.randomfield = "tripledown";
        break;
      case "tripledown":
        game.gameMap.randomfield = "tripleleft";
        break;
      case "tripleleft":
        game.gameMap.randomfield = "tripleup";
        break;
      case "tripleup":
        game.gameMap.randomfield = "tripleright";
        break;
      default:
        break;
    }
  }
  drawMap();
}

function pushRow(rowNum: number, direction: string) {
  if (direction === "left") {
    console.log(swap(game.gameMap.map[0][rowNum], game.gameMap.randomfield));
    console.log(game.gameMap.map[0][rowNum]);
    console.log(game.gameMap.randomfield);

    drawMap();
    drawRandom();
  }
}
