import { Game } from "./classes.js";
import { Piece } from "./constants.js";

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
}
