import { Game } from "./classes.js";
import { Piece } from "./constants.js";
import { drawMap } from "./graphics.js";
import { getMousePosition } from "./mouse.js";

export const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min));

const getCol = (arr: any[], n: number): any => arr.map((x: any[]) => x[n]);

export function push(index: number, game: Game, direction: string) {
  let tmp: Piece;
  const col: Array<Piece> = getCol(game.gameMap.map, index);
  switch (direction) {
    case "left":
      tmp = game.gameMap.map[index].shift();
      game.gameMap.map[index].push(game.gameMap.randomfield);
      game.gameMap.randomfield = tmp;
      break;

    case "right":
      tmp = game.gameMap.map[index].pop();
      game.gameMap.map[index].unshift(game.gameMap.randomfield);
      game.gameMap.randomfield = tmp;
      break;

    case "down":
      tmp = game.gameMap.map[index][0];
      game.gameMap.map[0][index] = game.gameMap.randomfield;
      game.gameMap.map[1][index] = col[0];
      game.gameMap.map[2][index] = col[1];
      game.gameMap.map[3][index] = col[2];
      game.gameMap.map[4][index] = col[3];
      game.gameMap.map[5][index] = col[4];
      game.gameMap.map[6][index] = col[5];
      game.gameMap.randomfield = col[6];
      break;

    case "up": //idk jó-e
      tmp = game.gameMap.map[0][index];
      game.gameMap.map[0][index] = col[1];
      game.gameMap.map[1][index] = col[2];
      game.gameMap.map[2][index] = col[3];
      game.gameMap.map[3][index] = col[4];
      game.gameMap.map[4][index] = col[5];
      game.gameMap.map[5][index] = col[6];
      game.gameMap.map[6][index] = game.gameMap.randomfield;
      game.gameMap.randomfield = tmp;
      break;
  }
  drawMap(game)
}

export function rotate(game:Game, gameArea:HTMLCanvasElement, e: MouseEvent): void {
  const pos = getMousePosition(gameArea, e);
  console.log(pos);

  if (
    pos.x >= game.draggableField.x &&
    pos.x <= game.draggableField.x + game.draggableField.width &&
    pos.y >= game.draggableField.y &&
    pos.y <= game.draggableField.y + game.draggableField.height
  ) {
    console.log(game.gameMap.randomfield);
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
  drawMap(game);
}