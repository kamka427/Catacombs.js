const gameArea = document.querySelector("canvas#gameArea");
const ctx = gameArea.getContext("2d");
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
export function drawMap(game) {
    ctx.clearRect(0, 0, gameArea.width, gameArea.height);
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, gameArea.height, gameArea.height);
    for (let col = 0; col < game.gameMap.map.length + 2; col++) {
        for (let row = 0; row < game.gameMap.map.length + 2; row++) {
            if ((col === 0 && row > 0 && row < game.gameMap.map.length && row % 2 === 0) ||
                (col === game.gameMap.map.length + 1 &&
                    row > 0 &&
                    row < game.gameMap.map.length &&
                    row % 2 === 0) ||
                (row === 0 && col > 0 && col < game.gameMap.map.length && col % 2 === 0) ||
                (row === game.gameMap.map.length + 1 &&
                    col > 0 &&
                    col < game.gameMap.map.length &&
                    col % 2 === 0)) {
                // ctx.fillText("side", i * 50, j * 50 + 25);
                dArrow(col * 50, row * 50, game);
            }
            else if (!(col === 0 ||
                row === 0 ||
                col === game.gameMap.map.length + 1 ||
                row === game.gameMap.map.length + 1)) {
                dImage(game.gameMap.map[row - 1][col - 1], col * 50, row * 50);
            }
            // ctx.strokeRect(i * 50, j * 50, 50, 50)
        }
    }
    dImage(game.gameMap.randomfield, game.draggableField.x, game.draggableField.y);
    drawPlayers(game);
    drawTreasures(game);
    // if(game.fallenTreasure !== null)
    drawAvailable(game);
    drawActualPlayer(game);
}
function dImage(type, row, col) {
    switch (type) {
        case "topleft":
            ctx.drawImage(topleft, row, col, 50, 50);
            break;
        case "topright":
            ctx.drawImage(topright, row, col, 50, 50);
            break;
        case "bottomleft":
            ctx.drawImage(bottomleft, row, col, 50, 50);
            break;
        case "bottomright":
            ctx.drawImage(bottomright, row, col, 50, 50);
            break;
        case "horizontal":
            ctx.drawImage(horizontal, row, col, 50, 50);
            break;
        case "vertical":
            ctx.drawImage(vertical, row, col, 50, 50);
            break;
        case "tripleup":
            ctx.drawImage(tripleup, row, col, 50, 50);
            break;
        case "tripleright":
            ctx.drawImage(tripleright, row, col, 50, 50);
            break;
        case "tripledown":
            ctx.drawImage(tripledown, row, col, 50, 50);
            break;
        case "tripleleft":
            ctx.drawImage(tripleleft, row, col, 50, 50);
            break;
    }
}
function dArrow(row, col, game) {
    if (row === 0)
        ctx.drawImage(rightarrow, row, col, 50, 50);
    else if (row / 50 === game.gameMap.map.length + 1)
        ctx.drawImage(leftarrow, row, col, 50, 50);
    else if (col === 0)
        ctx.drawImage(downarrow, row, col, 50, 50);
    else if (col / 50 === game.gameMap.map.length + 1)
        ctx.drawImage(uparrow, row, col, 50, 50);
}
function drawPlayers(game) {
    for (let i = 0; i < game.players.length; i++) {
        dPlayer(game.players[i].row, game.players[i].col);
    }
}
function dPlayer(row, col) {
    // if(game.players[i].number === 1)
    ctx.drawImage(player, (col + 1) * 50, (row + 1) * 50, 20, 20);
}
function drawTreasures(game) {
    for (let i = 0; i < game.treasuresAll.length; i++) {
        dTreasure(game.treasuresAll[i].row, game.treasuresAll[i].col);
    }
    if (game.fallenTreasure !== null)
        dFallenT(game.draggableField.x, game.draggableField.y);
}
function dFallenT(row, col) {
    ctx.drawImage(player, row, col, 10, 10);
}
function dTreasure(row, col) {
    // if(game.players[i].number === 1)
    ctx.drawImage(player, (row + 1) * 50, (col + 1) * 50, 10, 10);
}
export function drawAvailable(game) {
    ctx.fillStyle = "black";
    for (let i = 0; i < game.availableFields.length; i++) {
        ctx.strokeRect((game.availableFields[i][1] + 1) * 50, (game.availableFields[i][0] + 1) * 50, 50, 50);
    }
}
function drawActualPlayer(game) {
    ctx.fillStyle = "black";
    ctx.strokeRect((game.players[game.currentPlayer].col + 1) * 50, (game.players[game.currentPlayer].row + 1) * 50, 20, 20);
}
//# sourceMappingURL=graphics.js.map