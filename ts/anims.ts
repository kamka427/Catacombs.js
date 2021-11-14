import {
  determineColor,
  drawArrows,
  drawField,
  drawMap,
  drawPlayer,
  drawTreasure,
} from "./graphics.js";
import { game } from "./main.js";
const gameArea: HTMLCanvasElement = document.querySelector("canvas#gameArea");

const ctx: CanvasRenderingContext2D = gameArea.getContext("2d");

export function slideAnimation(
  direction: string,
  index: number,
  offset: number
) {
  ctx.clearRect(0, 0, gameArea.width, gameArea.height);
  drawMap();

  if (direction === "right" || direction === "left") {
    for (let i = 0; i < game.gameMap.map.length; i++) {
      drawField(
        game.gameMap.map[index - 1][i].type,
        game.gameMap.map[index - 1][i].rotation,
        game.gameMap.map[index - 1][i].avaliable,
        (direction === "left" ? i + 2 - offset : i + offset) * 50,
        index * 50,
        50
      );
    }
    if (direction === "right")
      drawField(
        game.gameMap.randomfield.type,
        game.gameMap.randomfield.rotation,
        false,
        (7 + offset) * 50,
        index * 50,
        50
      );
    else {
      drawField(
        game.gameMap.randomfield.type,
        game.gameMap.randomfield.rotation,
        false,
        (1 - offset) * 50,
        index * 50,
        50
      );
    }
    for (let i = 0; i < game.treasuresAll.length; i++) {
      if (game.treasuresAll[i].row + 1 === index) {
        const color = determineColor(game.treasuresAll[i].type);
        drawTreasure(
          color,
          (game.treasuresAll[i].col +
            (direction === "left" ? 2 - offset : offset)) *
            50 +
            17,
          (game.treasuresAll[i].row + 1) * 50 + 17,
          15
        );
      }
    }
    if (
      game.players[game.currentPlayer].treasureCards.length > 0 &&
      game.players[game.currentPlayer].treasureCards[0].row + 1 === index
    ) {
      drawTreasure(
        "yellow",
        (game.players[game.currentPlayer].treasureCards[0].col +
          (direction === "left" ? 2 - offset : offset)) *
          50 +
          10 +
          12,
        (game.players[game.currentPlayer].treasureCards[0].row + 1) * 50 +
          10 +
          12,
        5
      );
    }
    const usedPos = [];
    for (let i = 0; i < game.players.length; i++) {
      if (game.players[i].row + 1 === index) {
        let color;
        switch (game.players[i].number) {
          case 0:
            color = "blue";
            break;
          case 1:
            color = "red";
            break;
          case 2:
            color = "green";
            break;
          case 3:
            color = "purple";
            break;
        }
        let counter = 0;
        usedPos.forEach((e) => {
          if (e.row === game.players[i].row && e.col === game.players[i].col)
            counter++;
        });

        if (counter < 2) {
          drawPlayer(
            color,
            (game.players[i].col +
              (direction === "left" ? 2 - offset : offset)) *
              50 +
              (counter === 0 ? 1 : 4) * 10,
            (game.players[i].row + 1) * 50 + 10,
            10,
            game.players[i].isAnimated
          );
          if (game.currentPlayer === game.players[i].number) {
            drawPlayer(
              "yellow",
              (game.players[game.currentPlayer].col +
                (direction === "left" ? 2 - offset : offset)) *
                50 +
                (counter === 0 ? 1 : 4) * 10,
              (game.players[game.currentPlayer].row + 1) * 50 + 10,
              5,
              false
            );
          }
        } else {
          drawPlayer(
            color,
            (game.players[i].col +
              (direction === "left" ? 2 - offset : offset)) *
              50 +
              (counter === 2 ? 1 : 4) * 10,
            (game.players[i].row + 1) * 50 + 4 * 10,
            10,
            game.players[i].isAnimated
          );
          if (game.currentPlayer === game.players[i].number) {
            drawPlayer(
              "yellow",
              (game.players[game.currentPlayer].col +
                (direction === "left" ? 2 - offset : offset)) *
                50 +
                (counter === 2 ? 1 : 4) * 10,
              (game.players[game.currentPlayer].row + 1) * 50 + 4 * 10,
              5,
              false
            );
          }
        }
        usedPos.push({ row: game.players[i].row, col: game.players[i].col });
      }
    }
  } else {
    for (let i = 0; i < game.gameMap.map.length; i++) {
      drawField(
        game.gameMap.map[i][index - 1].type,
        game.gameMap.map[i][index - 1].rotation,
        game.gameMap.map[i][index - 1].avaliable,
        index * 50,
        (direction === "up" ? i + 2 - offset : i + offset) * 50,
        50
      );
    }
    if (direction === "up")
      drawField(
        game.gameMap.randomfield.type,
        game.gameMap.randomfield.rotation,
        false,
        index * 50,
        (1 - offset) * 50,
        50
      );
    else {
      drawField(
        game.gameMap.randomfield.type,
        game.gameMap.randomfield.rotation,
        false,
        index * 50,
        (7 + offset) * 50,
        50
      );
    }
    for (let i = 0; i < game.treasuresAll.length; i++) {
      if (game.treasuresAll[i].col + 1 === index) {
        const color = determineColor(game.treasuresAll[i].type);
        drawTreasure(
          color,
          (game.treasuresAll[i].col + 1) * 50 + 17,
          (game.treasuresAll[i].row +
            (direction === "up" ? 2 - offset : offset)) *
            50 +
            17,
          15
        );
      }
    }
    if (
      game.players[game.currentPlayer].treasureCards.length > 0 &&
      game.players[game.currentPlayer].treasureCards[0].col + 1 === index
    ) {
      drawTreasure(
        "yellow",
        (game.players[game.currentPlayer].treasureCards[0].col + 1) * 50 +
          10 +
          12,
        (game.players[game.currentPlayer].treasureCards[0].row +
          (direction === "up" ? 2 - offset : offset)) *
          50 +
          10 +
          12,
        5
      );
    }
    const usedPos = [];
    for (let i = 0; i < game.players.length; i++) {
      if (game.players[i].col + 1 === index) {
        let color;
        switch (game.players[i].number) {
          case 0:
            color = "blue";
            break;
          case 1:
            color = "red";
            break;
          case 2:
            color = "green";
            break;
          case 3:
            color = "purple";
            break;
        }
        let counter = 0;
        usedPos.forEach((e) => {
          if (e.row === game.players[i].row && e.col === game.players[i].col)
            counter++;
        });

        if (counter < 2) {
          drawPlayer(
            color,
            (game.players[i].col + 1) * 50 + (counter === 0 ? 1 : 4) * 10,
            (game.players[i].row + (direction === "up" ? 2 - offset : offset)) *
              50 +
              10,
            10,
            game.players[i].isAnimated
          );
          if (game.currentPlayer === game.players[i].number) {
            drawPlayer(
              "yellow",
              (game.players[game.currentPlayer].col + 1) * 50 +
                (counter === 0 ? 1 : 4) * 10,
              (game.players[game.currentPlayer].row +
                (direction === "up" ? 2 - offset : offset)) *
                50 +
                10,
              5,
              false
            );
          }
        } else {
          drawPlayer(
            color,
            (game.players[i].col + 1) * 50 + (counter === 2 ? 1 : 4) * 10,
            (game.players[i].row + (direction === "up" ? 2 - offset : offset)) *
              50 +
              4 * 10,
            10,
            game.players[i].isAnimated
          );
          if (game.currentPlayer === game.players[i].number) {
            drawPlayer(
              "yellow",
              (game.players[game.currentPlayer].col + 1) * 50 +
                (counter === 2 ? 1 : 4) * 10,
              (game.players[game.currentPlayer].row +
                (direction === "up" ? 2 - offset : offset)) *
                50 +
                4 * 10,
              5,
              false
            );
          }
        }
        usedPos.push({ row: game.players[i].row, col: game.players[i].col });
      }
    }
  }
  ctx.fillStyle = "brown";
  for (let row = 0; row < game.gameMap.map.length + 2; row++) {
    for (let col = 0; col < game.gameMap.map.length + 2; col++) {
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
        ctx.fillRect(col * 50, row * 50, 50, 50);
        drawArrows(col * 50, row * 50);
      }
    }
  }
}

export function moveAnim(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  player: number,
  offsetX: number,
  offsetY: number
) {
  drawMap();
  let color;
  switch (game.players[player].number) {
    case 0:
      color = "blue";
      break;
    case 1:
      color = "red";
      break;
    case 2:
      color = "green";
      break;
    case 3:
      color = "purple";
      break;
  }

  if (startX === endX && startY === endY) {
    drawMap();
  } else if (startX !== endX && startY === endY) {
    drawPlayer(
      color,
      (startY + 1) * 50 + 25,
      (startX + (startX > endX ? -offsetX + 2 : offsetX)) * 50 +
        (startX > endX ? 0 : 50),
      10,
      false
    );
  } else if (startX === endX && startY !== endY) {
    drawPlayer(
      color,
      (startY + (startY > endY ? -offsetY + 2 : offsetY)) * 50 +
        (startY > endY ? 0 : 50),
      (startX + 1) * 50 + 25,
      10,
      false
    );
  } else if (startX !== endX && startY !== endY) {
    drawPlayer(
      color,
      (startY + (startY > endY ? -offsetY + 2 : offsetY)) * 50 +
        (startY > endY ? 0 : 50),
      (startX + (startX > endX ? -offsetX + 2 : offsetX)) * 50 +
        (startX > endX ? 0 : 50),
      10,
      false
    );
  }
}
