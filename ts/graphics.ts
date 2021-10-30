import { Game, DraggableField } from "./classes";

const gameArea: HTMLCanvasElement = document.querySelector("canvas#gameArea");
const ctx: CanvasRenderingContext2D = gameArea.getContext("2d");

export function drawMap(game: Game): void {
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

export function drawRandom(game: Game, drag: DraggableField) {
  ctx.strokeRect(drag.x, drag.y, drag.width, drag.height);
  ctx.fillText(game.gameMap.randomfield, drag.x, drag.y + 25);
}
