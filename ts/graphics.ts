import { game } from "./main.js";

const gameArea: HTMLCanvasElement = document.querySelector("canvas#gameArea");
const ctx: CanvasRenderingContext2D = gameArea.getContext("2d");
ctx.lineJoin = "round";

export function drawMap(): void {
  ctx.clearRect(0, 0, gameArea.width, gameArea.height);
  ctx.fillStyle = "brown";
  ctx.fillRect(0, 0, gameArea.height, gameArea.height);
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
        drawArrows(col * 50, row * 50);
      } else if (
        !(
          col === 0 ||
          row === 0 ||
          col === game.gameMap.map.length + 1 ||
          row === game.gameMap.map.length + 1
        )
      ) {
        drawField(
          game.gameMap.map[row - 1][col - 1].type,
          game.gameMap.map[row - 1][col - 1].rotation,
          game.gameMap.map[row - 1][col - 1].avaliable,
          col * 50,
          row * 50,
          50
        );
      }
    }
  }

  drawField(
    game.gameMap.randomfield.type,
    game.gameMap.randomfield.rotation,
    false,
    game.draggableField.x,
    game.draggableField.y,
    50
  );

  drawPlayers();
  drawTreasures();
  drawActualPlayer();
  showActualTreasure();
}

function drawArrows(row: number, col: number) {
  if (row === 0) drawArrow(90, row, col, 50);
  //bal
  else if (row / 50 === game.gameMap.map.length + 1)
    //jobb
    drawArrow(270, row, col, 50);
  else if (col === 0) drawArrow(180, row, col, 50);
  //felso
  else if (col / 50 === game.gameMap.map.length + 1) drawArrow(0, row, col, 50); //also
}

function drawPlayers() {
  for (let i = 0; i < game.players.length; i++) {
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
    drawPlayer(
      color,
      (game.players[i].col + 1) * 50 + 10,
      (game.players[i].row + 1) * 50 + 10,
      10
    );
  }
}

function drawTreasures() {
  for (let i = 0; i < game.treasuresAll.length; i++) {
    const color = determineColor(game.treasuresAll[i].type);
    drawTreasure(
      color,
      (game.treasuresAll[i].col + 1) * 50 + 17,
      (game.treasuresAll[i].row + 1) * 50 + 17,
      15
    );
  }
  if (game.fallenTreasure !== null) {
    const fallenColor = determineColor(game.fallenTreasure.type);
    drawTreasure(
      fallenColor,
      game.draggableField.x + 17,
      game.draggableField.y + 17,
      15
    );
  }
}
function determineColor(type: string) {
  let color;
  switch (type) {
    case "ruby":
      color = "red";
      break;

    case "diamond":
      color = "blue";
      break;

    case "gold":
      color = "gold";
      break;

    case "silver":
      color = "silver";
      break;

    case "emerald":
      color = "green";
      break;
  }
  return color;
}

function drawActualPlayer() {
  drawPlayer(
    "yellow",
    (game.players[game.currentPlayer].col + 1) * 50 + 10,
    (game.players[game.currentPlayer].row + 1) * 50 + 10,
    5
  );
}

function showActualTreasure() {
  // const color = determineColor(game.players[game.currentPlayer].treasureCards[0].type)
  if(game.players[game.currentPlayer].treasureCards.length !==0)
  drawTreasure(
    "yellow",
    (game.players[game.currentPlayer].treasureCards[0].col + 1) * 50 + 10 + 12,
    (game.players[game.currentPlayer].treasureCards[0].row + 1) * 50 + 10 + 12,
    5
  );
}

function drawField(
  type: string,
  rotation: number,
  active: boolean,
  row: number,
  col: number,
  size: number
) {
  ctx.save();
  ctx.translate(row + size / 2, col + size / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-(row + size / 2), -(col + size / 2));
  ctx.strokeStyle = "brown";
  ctx.lineWidth = 1;
  ctx.strokeRect(row, col, size, size);
  ctx.fillStyle = active === true ? "green" : "gold";
  ctx.fillRect(row, col, size, size);
  ctx.lineWidth = 20;
  ctx.fillStyle = "black";
  switch (type) {
    case "edge":
      ctx.beginPath();
      ctx.moveTo(row + size / 2, col + size);
      ctx.lineTo(row + size / 2, col + size / 2);
      ctx.lineTo(row + size, col + size / 2);
      ctx.stroke();
      break;

    case "straight":
      ctx.beginPath();
      ctx.moveTo(row + size / 2, col);
      ctx.lineTo(row + size / 2, col + size);
      ctx.stroke();
      break;

    case "triple":
      ctx.beginPath();
      ctx.moveTo(row + size / 2, col + size);
      ctx.lineTo(row + size / 2, col);
      ctx.moveTo(row + size / 2, col + size / 2);
      ctx.lineTo(row + size, col + size / 2);
      ctx.stroke();
      break;
  }
  ctx.restore();
}

function drawPlayer(color: string, row: number, col: number, size: number) {
  ctx.fillStyle = color;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(row, col, size, 0, 360);
  ctx.fill();
  ctx.stroke();
}

function drawTreasure(color: string, row: number, col: number, size: number) {
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.save();
  ctx.translate(row + size / 2, col + size / 2);
  ctx.rotate((45 * Math.PI) / 180);
  ctx.translate(-(row + size / 2), -(col + size / 2));
  ctx.fillStyle = color;
  ctx.fillRect(row, col, size, size);
  ctx.strokeRect(row, col, size, size);
  ctx.restore();
}

function drawArrow(rotation: number, row: number, col: number, size: number) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "gold";
  ctx.save();
  ctx.translate(row + size / 2, col + size / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-(row + size / 2), -(col + size / 2));
  ctx.beginPath();
  ctx.moveTo(row, col + size);
  ctx.lineTo(row + size / 2, col);
  ctx.lineTo(row + size, col + size);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}
