import { graphNext } from "./graphexporation.js";
import { drawMap } from "./graphics.js";
import { getMousePosition } from "./mouse.js";
export const randomBetween = (min, max) => Math.floor(Math.random() * (max - min));
const getCol = (arr, n) => arr.map((row) => row[n]);
export function push(index, game, direction) {
    let tmp;
    let fell = false;
    console.log(fell);
    const col = getCol(game.gameMap.map, index);
    switch (direction) {
        case "left":
            tmp = game.gameMap.map[index].shift();
            game.gameMap.map[index].push(game.gameMap.randomfield);
            game.gameMap.randomfield = tmp;
            for (let i = 0; i < game.players.length; i++) {
                if (game.players[i].col === 0 && game.players[i].row === index)
                    game.players[i].col = 6;
                else if (game.players[i].row === index)
                    game.players[i].col--;
            }
            // fell = false;
            if (!fell && game.fallenTreasure !== null) {
                game.fallenTreasure.row = 7;
                game.fallenTreasure.col = index;
                game.treasuresAll.push(game.fallenTreasure);
                game.fallenTreasure = null;
            }
            for (let i = 0; i < game.treasuresAll.length; i++) {
                if (game.treasuresAll[i].row === 0 && game.treasuresAll[i].col === index) {
                    game.fallenTreasure = game.treasuresAll[i];
                    game.fallenTreasure.row = null;
                    game.fallenTreasure.col = null;
                    game.treasuresAll.splice(game.treasuresAll.indexOf(game.treasuresAll[i]), 1);
                    fell = true;
                    if (i < game.treasuresAll.length)
                        game.treasuresAll[i].row--;
                }
                else if (game.treasuresAll[i].col === index)
                    game.treasuresAll[i].row--;
            }
            console.log(game.fallenTreasure);
            break;
        case "right":
            tmp = game.gameMap.map[index].pop();
            game.gameMap.map[index].unshift(game.gameMap.randomfield);
            game.gameMap.randomfield = tmp;
            for (let i = 0; i < game.players.length; i++) {
                if (game.players[i].col === 6 && game.players[i].row === index)
                    game.players[i].col = 0;
                else if (game.players[i].row === index)
                    game.players[i].col++;
            }
            // fell = false;
            if (!fell && game.fallenTreasure !== null) {
                game.fallenTreasure.row = -1;
                game.fallenTreasure.col = index;
                game.treasuresAll.push(game.fallenTreasure);
                game.fallenTreasure = null;
            }
            for (let i = 0; i < game.treasuresAll.length; i++) {
                if (game.treasuresAll[i].row === 6 && game.treasuresAll[i].col === index) {
                    game.fallenTreasure = game.treasuresAll[i];
                    game.fallenTreasure.row = null;
                    game.fallenTreasure.col = null;
                    game.treasuresAll.splice(game.treasuresAll.indexOf(game.treasuresAll[i]), 1);
                    fell = true;
                    if (i < game.treasuresAll.length)
                        game.treasuresAll[i].row++;
                }
                else if (game.treasuresAll[i].col === index)
                    game.treasuresAll[i].row++; // hibás minden iránynál ha hirtelen van váltás irányok között
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
                else if (game.players[i].col === index)
                    game.players[i].row++;
            }
            // fell = false;
            if (!fell && game.fallenTreasure !== null) {
                game.fallenTreasure.row = index;
                game.fallenTreasure.col = -1;
                game.treasuresAll.push(game.fallenTreasure);
                game.fallenTreasure = null;
            }
            for (let i = 0; i < game.treasuresAll.length; i++) {
                if (game.treasuresAll[i].row === index && game.treasuresAll[i].col === 6) {
                    game.fallenTreasure = game.treasuresAll[i];
                    game.fallenTreasure.row = null;
                    game.fallenTreasure.col = null;
                    game.treasuresAll.splice(game.treasuresAll.indexOf(game.treasuresAll[i]), 1);
                    fell = true;
                    if (i < game.treasuresAll.length)
                        game.treasuresAll[i].col++;
                }
                else if (game.treasuresAll[i].row === index)
                    game.treasuresAll[i].col++;
            }
            console.log(game.fallenTreasure);
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
                else if (game.players[i].col === index)
                    game.players[i].row--;
            }
            // fell = false;
            if (!fell && game.fallenTreasure !== null) {
                game.fallenTreasure.row = index;
                game.fallenTreasure.col = 7;
                game.treasuresAll.push(game.fallenTreasure);
                game.fallenTreasure = null;
            }
            for (let i = 0; i < game.treasuresAll.length; i++) {
                if (game.treasuresAll[i].row === index && game.treasuresAll[i].col === 0) {
                    game.fallenTreasure = game.treasuresAll[i];
                    game.fallenTreasure.row = null;
                    game.fallenTreasure.col = null;
                    game.treasuresAll.splice(game.treasuresAll.indexOf(game.treasuresAll[i]), 1);
                    fell = true;
                    if (i < game.treasuresAll.length)
                        game.treasuresAll[i].col--;
                }
                else if (game.treasuresAll[i].row === index)
                    game.treasuresAll[i].col--;
            }
            console.log(game.fallenTreasure);
            break;
    }
    drawMap(game);
    console.log(game.treasuresAll);
}
export function rotate(game, gameArea, e) {
    const pos = getMousePosition(gameArea, e);
    console.log(pos);
    if (pos.x >= game.draggableField.x &&
        pos.x <= game.draggableField.x + game.draggableField.width &&
        pos.y >= game.draggableField.y &&
        pos.y <= game.draggableField.y + game.draggableField.height) {
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
        }
    }
    drawMap(game);
}
export function step(canvas, game, e) {
    // const locations = graphNext(
    //   game.players[game.currentPlayer].row,
    //   game.players[game.currentPlayer].col,
    //   game
    // );
    graphNext(game.players[game.currentPlayer].row, game.players[game.currentPlayer].col, game);
    // console.log(locations);
    console.log(game.players);
    const pos = getMousePosition(canvas, e);
    console.log(pos);
    let exists = false;
    for (let i = 0; i < game.availableFields.length; i++) {
        if (game.availableFields[i][1] === pos.convCol && game.availableFields[i][0] === pos.convRow)
            exists = true;
    }
    console.log(exists);
    if (exists) {
        game.players[game.currentPlayer].row = pos.convRow;
        game.players[game.currentPlayer].col = pos.convCol;
        // drawMap(game);
        endTurn(game);
    }
    drawMap(game);
}
export function endTurn(game) {
    if (game.currentPlayer === game.players.length - 1)
        game.currentPlayer = 0;
    else
        game.currentPlayer++;
    graphNext(game.players[game.currentPlayer].row, game.players[game.currentPlayer].col, game);
}
//# sourceMappingURL=utils.js.map