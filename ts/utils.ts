import { Field } from "./constants.js";
import { drawMap } from "./graphics.js";
import { getMousePosition } from "./mouse.js";
import { game } from "./main.js";

export const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min));

const getCol = (arr: Field[][], n: number): Array<Field> =>
  arr.map((row: Field[]) => row[n]);

export function push(index: number, direction: string) {
  let tmp: Field;
  let fell = false;
  const col: Array<Field> = getCol(game.gameMap.map, index);
  switch (direction) {
    case "left":
      tmp = game.gameMap.map[index].shift();
      game.gameMap.map[index].push(game.gameMap.randomfield);
      game.gameMap.randomfield = tmp;
      for (let i = 0; i < game.players.length; i++) {
        if (game.players[i].col === 0 && game.players[i].row === index)
          game.players[i].col = 6;
        else if (game.players[i].row === index) game.players[i].col--;
      }
      if (!fell && game.fallenTreasure !== null) {
        game.fallenTreasure.row = index;
        game.fallenTreasure.col = 7;
        game.treasuresAll.push(game.fallenTreasure);
        game.fallenTreasure = null;
      }
      for (let i = 0; i < game.treasuresAll.length; i++) {
        if (
          game.treasuresAll[i].row === index &&
          game.treasuresAll[i].col === 0
        ) {
          game.fallenTreasure = game.treasuresAll[i];
          game.fallenTreasure.row = null;
          game.fallenTreasure.col = null;
          game.treasuresAll.splice(
            game.treasuresAll.indexOf(game.treasuresAll[i]),
            1
          );
          fell = true;
          if (i < game.treasuresAll.length) game.treasuresAll[i].col--;
        } else if (game.treasuresAll[i].row === index)
          game.treasuresAll[i].col--;
      }

      break;

    case "right":
      tmp = game.gameMap.map[index].pop();
      game.gameMap.map[index].unshift(game.gameMap.randomfield);
      game.gameMap.randomfield = tmp;
      for (let i = 0; i < game.players.length; i++) {
        if (game.players[i].col === 6 && game.players[i].row === index)
          game.players[i].col = 0;
        else if (game.players[i].row === index) game.players[i].col++;
      }
      if (!fell && game.fallenTreasure !== null) {
        game.fallenTreasure.row = index;
        game.fallenTreasure.col = -1;
        game.treasuresAll.push(game.fallenTreasure);
        game.fallenTreasure = null;
      }
      for (let i = 0; i < game.treasuresAll.length; i++) {
        if (
          game.treasuresAll[i].row === index &&
          game.treasuresAll[i].col === 6
        ) {
          game.fallenTreasure = game.treasuresAll[i];
          game.fallenTreasure.row = null;
          game.fallenTreasure.col = null;
          game.treasuresAll.splice(
            game.treasuresAll.indexOf(game.treasuresAll[i]),
            1
          );
          fell = true;
          if (i < game.treasuresAll.length) game.treasuresAll[i].col++;
        } else if (game.treasuresAll[i].row === index)
          game.treasuresAll[i].col++; // hibás minden iránynál ha hirtelen van váltás irányok között
      }
      console.log(game.fallenTreasure);
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
      for (let i = 0; i < game.players.length; i++) {
        if (game.players[i].col === index && game.players[i].row === 6)
          game.players[i].row = 0;
        else if (game.players[i].col === index) game.players[i].row++;
      }
      if (!fell && game.fallenTreasure !== null) {
        game.fallenTreasure.row = -1;
        game.fallenTreasure.col = index;
        game.treasuresAll.push(game.fallenTreasure);
        game.fallenTreasure = null;
      }
      for (let i = 0; i < game.treasuresAll.length; i++) {
        if (
          game.treasuresAll[i].row === 6 &&
          game.treasuresAll[i].col === index
        ) {
          game.fallenTreasure = game.treasuresAll[i];
          game.fallenTreasure.row = null;
          game.fallenTreasure.col = null;
          game.treasuresAll.splice(
            game.treasuresAll.indexOf(game.treasuresAll[i]),
            1
          );
          fell = true;
          if (i < game.treasuresAll.length) game.treasuresAll[i].row++;
        } else if (game.treasuresAll[i].col === index)
          game.treasuresAll[i].row++;
      }
      break;

    case "up":
      tmp = game.gameMap.map[0][index];
      game.gameMap.map[0][index] = col[1];
      game.gameMap.map[1][index] = col[2];
      game.gameMap.map[2][index] = col[3];
      game.gameMap.map[3][index] = col[4];
      game.gameMap.map[4][index] = col[5];
      game.gameMap.map[5][index] = col[6];
      game.gameMap.map[6][index] = game.gameMap.randomfield;
      game.gameMap.randomfield = tmp;
      for (let i = 0; i < game.players.length; i++) {
        if (game.players[i].row === 0 && game.players[i].col === index)
          game.players[i].row = 6;
        else if (game.players[i].col === index) game.players[i].row--;
      }
      if (!fell && game.fallenTreasure !== null) {
        game.fallenTreasure.row = 7;
        game.fallenTreasure.col = index;
        game.treasuresAll.push(game.fallenTreasure);
        game.fallenTreasure = null;
      }
      for (let i = 0; i < game.treasuresAll.length; i++) {
        if (
          game.treasuresAll[i].row === 0 &&
          game.treasuresAll[i].col === index
        ) {
          game.fallenTreasure = game.treasuresAll[i];
          game.fallenTreasure.row = null;
          game.fallenTreasure.col = null;
          game.treasuresAll.splice(
            game.treasuresAll.indexOf(game.treasuresAll[i]),
            1
          );
          fell = true;
          if (i < game.treasuresAll.length) game.treasuresAll[i].row--;
        } else if (game.treasuresAll[i].col === index)
          game.treasuresAll[i].row--;
      }
      console.log(game.fallenTreasure);
      break;
  }
  game.availableFields = [];
  drawMap();
}

export function rotate(e: MouseEvent): void {
  const pos = getMousePosition(e);
  console.log(pos);

  if (
    pos.x >= game.draggableField.x &&
    pos.x <= game.draggableField.x + game.draggableField.width &&
    pos.y >= game.draggableField.y &&
    pos.y <= game.draggableField.y + game.draggableField.height
  ) {
    console.log(game.gameMap.randomfield);
    switch (game.gameMap.randomfield.type) {
      case "straight":
        game.gameMap.randomfield.rotation =
          game.gameMap.randomfield.rotation === 0 ? 90 : 0;
        break;
      case "edge":
        game.gameMap.randomfield.rotation =
          game.gameMap.randomfield.rotation === 270
            ? 0
            : (game.gameMap.randomfield.rotation += 90);
        break;
      case "triple":
        game.gameMap.randomfield.rotation =
          game.gameMap.randomfield.rotation === 270
            ? 0
            : (game.gameMap.randomfield.rotation += 90);
        break;
    }
  }
  drawMap();
}
export function step(e: MouseEvent) {
  const pos = getMousePosition(e);
  console.log(pos);
  let exists = false;
  for (let i = 0; i < game.availableFields.length; i++) {
    if (
      game.availableFields[i][1] === pos.convCol &&
      game.availableFields[i][0] === pos.convRow
    )
      exists = true;
  }
  if (exists) {
    game.players[game.currentPlayer].row = pos.convRow;
    game.players[game.currentPlayer].col = pos.convCol;

    if (game.players[game.currentPlayer].treasureCards.length !== 0) {
      for (let i = 0; i < game.treasuresAll.length; i++) {
        if (
          game.treasuresAll[i].row === game.players[game.currentPlayer].row &&
          game.treasuresAll[i].col === game.players[game.currentPlayer].col &&
          game.treasuresAll[i].type ===
            game.players[game.currentPlayer].treasureCards[0].type
        ) {
          game.treasuresAll.splice(i, 1);
          game.players[game.currentPlayer].treasureCards.shift();
        }
      }
    }
    if (
      game.players[game.currentPlayer].treasureCards.length === 0 &&
      game.players[game.currentPlayer].row ===
        game.players[game.currentPlayer].startRow &&
      game.players[game.currentPlayer].col ===
        game.players[game.currentPlayer].startCol
    ) {
      game.ended = true;
      return true;
    }
    game.availableFields = [];
    for (let i = 0; i < game.gameMap.map.length; i++) {
      for (let j = 0; j < game.gameMap.map.length; j++) {
        game.gameMap.map[i][j].avaliable = false;
      }
    }
    endTurn();
    drawMap();

    return true;
  }
  return false;
}

export function endTurn() {
  if (game.currentPlayer === game.players.length - 1) game.currentPlayer = 0;
  else game.currentPlayer++;
}
