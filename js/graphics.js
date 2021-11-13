import { game } from "./main.js";
const gameArea = document.querySelector("canvas#gameArea");
const ctx = gameArea.getContext("2d");
const statusArea = document.querySelector("canvas#statusArea");
const ctxs = statusArea.getContext("2d");
ctx.lineJoin = "round";
export function drawStatus() {
    ctxs.clearRect(0, 0, statusArea.width, statusArea.height);
    let x = 0;
    game.players.forEach((e) => {
        if (e.treasureCards.length > 0) {
            let color;
            switch (e.number) {
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
            ctxs.fillStyle = color;
            ctxs.fillRect(x, 0, 112.5, 50);
            ctxs.strokeStyle = "black";
            ctxs.lineWidth = 3;
            if (e.number === game.currentPlayer) {
                ctxs.strokeRect(x + 1, 0 + 2, 110, 47);
            }
            ctxs.fillStyle = "white";
            ctxs.fillRect(x + 35, 0 + 5, 72, 40);
            ctxs.fillStyle = "black";
            ctxs.fillText((e.number + 1).toString(), x + 15, statusArea.height / 2, 50);
            ctxs.fillText("Sor: " +
                (e.treasureCards[0].row !== null
                    ? e.treasureCards[0].row
                    : "leesett"), x + 40, 14, 200);
            ctxs.fillText("Oszlop: " +
                (e.treasureCards[0].col !== null
                    ? e.treasureCards[0].col
                    : "leesett").toString(), x + 40, 24, 200);
            ctxs.fillText("Típus: " + e.treasureCards[0].type.toString(), x + 40, 34, 200);
            ctxs.fillText("Állás: " + e.treasureCards.length + "/" + game.treasurePerPlayer, x + 40, 44, 200);
            x += 112.5;
        }
    });
}
export function drawMap() {
    drawStatus();
    ctx.clearRect(0, 0, gameArea.width, gameArea.height);
    ctx.fillStyle = "brown";
    ctx.fillRect(0, 0, gameArea.height, gameArea.height);
    for (let row = 0; row < game.gameMap.map.length + 2; row++) {
        for (let col = 0; col < game.gameMap.map.length + 2; col++) {
            if ((col === 0 &&
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
                    col % 2 === 0)) {
                drawArrows(col * 50, row * 50);
            }
            else if (!(col === 0 ||
                row === 0 ||
                col === game.gameMap.map.length + 1 ||
                row === game.gameMap.map.length + 1)) {
                drawField(game.gameMap.map[row - 1][col - 1].type, game.gameMap.map[row - 1][col - 1].rotation, game.gameMap.map[row - 1][col - 1].avaliable, col * 50, row * 50, 50);
            }
        }
    }
    drawField(game.gameMap.randomfield.type, game.gameMap.randomfield.rotation, false, game.draggableField.x, game.draggableField.y, 50);
    drawPlayers();
    drawTreasures();
    showActualTreasure();
    // offset += 0.001
    // requestAnimationFrame(anim)
}
// let offset = 0;
// function anim() {
//   offset += 0.01;
//   slideAnimation("left", 2, offset);
// }
function drawArrows(row, col) {
    if (row === 0)
        drawArrow(90, row, col, 50);
    //bal
    else if (row / 50 === game.gameMap.map.length + 1)
        //jobb
        drawArrow(270, row, col, 50);
    else if (col === 0)
        drawArrow(180, row, col, 50);
    //felso
    else if (col / 50 === game.gameMap.map.length + 1)
        drawArrow(0, row, col, 50); //also
}
function drawPlayers() {
    const usedPos = [];
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
        let counter = 0;
        usedPos.forEach((e) => {
            if (e.row === game.players[i].row && e.col === game.players[i].col)
                counter++;
        });
        console.log(counter);
        if (counter < 2) {
            drawPlayer(color, (game.players[i].col + 1) * 50 + (counter === 0 ? 1 : 4) * 10, (game.players[i].row + 1) * 50 + 10, 10);
            if (game.currentPlayer === game.players[i].number) {
                drawPlayer("yellow", (game.players[game.currentPlayer].col + 1) * 50 +
                    (counter === 0 ? 1 : 4) * 10, (game.players[game.currentPlayer].row + 1) * 50 + 10, 5);
            }
        }
        else {
            drawPlayer(color, (game.players[i].col + 1) * 50 + (counter === 2 ? 1 : 4) * 10, (game.players[i].row + 1) * 50 + 4 * 10, 10);
            if (game.currentPlayer === game.players[i].number) {
                drawPlayer("yellow", (game.players[game.currentPlayer].col + 1) * 50 +
                    (counter === 2 ? 1 : 4) * 10, (game.players[game.currentPlayer].row + 1) * 50 + 4 * 10, 5);
            }
        }
        usedPos.push({ row: game.players[i].row, col: game.players[i].col });
    }
}
function drawTreasures() {
    for (let i = 0; i < game.treasuresAll.length; i++) {
        const color = determineColor(game.treasuresAll[i].type);
        drawTreasure(color, (game.treasuresAll[i].col + 1) * 50 + 17, (game.treasuresAll[i].row + 1) * 50 + 17, 15);
    }
    if (game.fallenTreasure !== null) {
        const fallenColor = determineColor(game.fallenTreasure.type);
        drawTreasure(fallenColor, game.draggableField.x + 17, game.draggableField.y + 17, 15);
    }
}
function determineColor(type) {
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
function showActualTreasure() {
    if (game.players[game.currentPlayer].treasureCards.length !== 0) {
        if (game.players[game.currentPlayer].treasureCards[0].row !== null &&
            game.players[game.currentPlayer].treasureCards[0].col !== null) {
            drawTreasure("yellow", (game.players[game.currentPlayer].treasureCards[0].col + 1) * 50 +
                10 +
                12, (game.players[game.currentPlayer].treasureCards[0].row + 1) * 50 +
                10 +
                12, 5);
        }
        else {
            drawTreasure("yellow", game.draggableField.x + 22, game.draggableField.y + 22, 5);
        }
    }
    else {
        drawTreasure("yellow", (game.players[game.currentPlayer].startRow + 1) * 50 + 10 + 12, (game.players[game.currentPlayer].startCol + 1) * 50 + 10 + 12, 5);
    }
}
export function drawField(type, rotation, active, row, col, size) {
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
function drawPlayer(color, row, col, size) {
    ctx.fillStyle = color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(row, col, size, 0, 360);
    ctx.fill();
    ctx.stroke();
}
function drawTreasure(color, row, col, size) {
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
function drawArrow(rotation, row, col, size) {
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
// export function drawEnd(){
//   ctx.clearRect(0, 0, gameArea.width, gameArea.height);
//   ctx.fillStyle = "black"
//   ctx.fillRect(gameArea.width/2-100,gameArea.height/2-100,100,100)
//   ctx.fillStyle = "red"
//   ctx.fillText(game.currentPlayer + 1 + ". játékos nyerte a játékot!",gameArea.width/2-100,gameArea.height/2-100);
// }
export function slideAnimation(direction, index, offset) {
    ctx.clearRect(0, 0, gameArea.width, gameArea.height);
    drawMap();
    if (direction === "right" || direction === "left") {
        for (let i = 0; i < game.gameMap.map.length; i++) {
            drawField(game.gameMap.map[index - 1][i].type, game.gameMap.map[index - 1][i].rotation, game.gameMap.map[index - 1][i].avaliable, (direction === "left" ? i + 2 - offset : i + offset) * 50, index * 50, 50);
        }
        for (let i = 0; i < game.treasuresAll.length; i++) {
            if (game.treasuresAll[i].row + 1 === index) {
                const color = determineColor(game.treasuresAll[i].type);
                drawTreasure(color, (game.treasuresAll[i].col +
                    (direction === "left" ? 2 - offset : offset)) *
                    50 +
                    17, (game.treasuresAll[i].row + 1) * 50 + 17, 15);
                drawTreasure("yellow", (game.players[game.currentPlayer].treasureCards[0].col +
                    (direction === "left" ? 2 - offset : offset)) *
                    50 +
                    10 +
                    12, (game.players[game.currentPlayer].treasureCards[0].row + 1) * 50 +
                    10 +
                    12, 5);
            }
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
                console.log(counter);
                if (counter < 2) {
                    drawPlayer(color, (game.players[i].col +
                        (direction === "left" ? 2 - offset : offset)) *
                        50 +
                        (counter === 0 ? 1 : 4) * 10, (game.players[i].row + 1) * 50 + 10, 10);
                    if (game.currentPlayer === game.players[i].number) {
                        drawPlayer("yellow", (game.players[game.currentPlayer].col +
                            (direction === "left" ? 2 - offset : offset)) *
                            50 +
                            (counter === 0 ? 1 : 4) * 10, (game.players[game.currentPlayer].row + 1) * 50 + 10, 5);
                    }
                }
                else {
                    drawPlayer(color, (game.players[i].col +
                        (direction === "left" ? 2 - offset : offset)) *
                        50 +
                        (counter === 2 ? 1 : 4) * 10, (game.players[i].row + 1) * 50 + 4 * 10, 10);
                    if (game.currentPlayer === game.players[i].number) {
                        drawPlayer("yellow", (game.players[game.currentPlayer].col +
                            (direction === "left" ? 2 - offset : offset)) *
                            50 +
                            (counter === 2 ? 1 : 4) * 10, (game.players[game.currentPlayer].row + 1) * 50 + 4 * 10, 5);
                    }
                }
                usedPos.push({ row: game.players[i].row, col: game.players[i].col });
            }
        }
    }
    else {
        for (let i = 0; i < game.gameMap.map.length; i++) {
            drawField(game.gameMap.map[i][index - 1].type, game.gameMap.map[i][index - 1].rotation, game.gameMap.map[i][index - 1].avaliable, index * 50, (direction === "up" ? i + 2 - offset : i + offset) * 50, 50);
        }
        for (let i = 0; i < game.treasuresAll.length; i++) {
            if (game.treasuresAll[i].col + 1 === index) {
                const color = determineColor(game.treasuresAll[i].type);
                drawTreasure(color, (game.treasuresAll[i].col + 1) * 50 + 17, (game.treasuresAll[i].row +
                    (direction === "up" ? 2 - offset : offset)) *
                    50 +
                    17, 15);
                drawTreasure("yellow", (game.players[game.currentPlayer].treasureCards[0].col + 1) * 50 +
                    10 +
                    12, (game.players[game.currentPlayer].treasureCards[0].row +
                    (direction === "up" ? 2 - offset : offset)) *
                    50 +
                    10 +
                    12, 5);
            }
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
                console.log(counter);
                if (counter < 2) {
                    drawPlayer(color, (game.players[i].col + 1) * 50 + (counter === 0 ? 1 : 4) * 10, (game.players[i].row + (direction === "up" ? 2 - offset : offset)) *
                        50 +
                        10, 10);
                    if (game.currentPlayer === game.players[i].number) {
                        drawPlayer("yellow", (game.players[game.currentPlayer].col + 1) * 50 +
                            (counter === 0 ? 1 : 4) * 10, (game.players[game.currentPlayer].row +
                            (direction === "up" ? 2 - offset : offset)) *
                            50 +
                            10, 5);
                    }
                }
                else {
                    drawPlayer(color, (game.players[i].col + 1) * 50 + (counter === 2 ? 1 : 4) * 10, (game.players[i].row + (direction === "up" ? 2 - offset : offset)) *
                        50 +
                        4 * 10, 10);
                    if (game.currentPlayer === game.players[i].number) {
                        drawPlayer("yellow", (game.players[game.currentPlayer].col + 1) * 50 +
                            (counter === 2 ? 1 : 4) * 10, (game.players[game.currentPlayer].row +
                            (direction === "up" ? 2 - offset : offset)) *
                            50 +
                            4 * 10, 5);
                    }
                }
                usedPos.push({ row: game.players[i].row, col: game.players[i].col });
            }
        }
    }
}
//# sourceMappingURL=graphics.js.map