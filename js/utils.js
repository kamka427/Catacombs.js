import { graphNext } from "./graphexporation.js";
import { drawMap } from "./graphics.js";
import { getMousePosition } from "./mouse.js";
export const randomBetween = (min, max) => Math.floor(Math.random() * (max - min));
const getCol = (arr, n) => arr.map((x) => x[n]);
export function push(index, game, direction) {
    let tmp;
    let fell;
    const col = getCol(game.gameMap.map, index);
    switch (direction) {
        case "left":
            tmp = game.gameMap.map[index].shift();
            game.gameMap.map[index].push(game.gameMap.randomfield);
            game.gameMap.randomfield = tmp;
            for (let i = 0; i < game.players.length; i++) {
                if (game.players[i].x === 0 && game.players[i].y === index)
                    game.players[i].x = 6;
                else if (game.players[i].y === index)
                    game.players[i].x--;
            }
            fell = false;
            for (let i = 0; i < game.treasuresAll.length; i++) {
                if (game.treasuresAll[i].x === 0 && game.treasuresAll[i].y === index) {
                    game.fallenTreasure = game.treasuresAll[i];
                    game.fallenTreasure.x = null;
                    game.fallenTreasure.y = null;
                    game.treasuresAll.splice(game.treasuresAll.indexOf(game.treasuresAll[i]), 1);
                    fell = true;
                    // game.treasuresAll[i].x--
                }
                else if (game.treasuresAll[i].y === index)
                    game.treasuresAll[i].x--;
            }
            console.log(game.fallenTreasure);
            if (!fell && game.fallenTreasure !== null) {
                game.fallenTreasure.x = 6;
                game.fallenTreasure.y = index;
                game.treasuresAll.push(game.fallenTreasure);
                game.fallenTreasure = null;
            }
            break;
        case "right":
            tmp = game.gameMap.map[index].pop();
            game.gameMap.map[index].unshift(game.gameMap.randomfield);
            game.gameMap.randomfield = tmp;
            for (let i = 0; i < game.players.length; i++) {
                if (game.players[i].x === 6 && game.players[i].y === index)
                    game.players[i].x = 0;
                else if (game.players[i].y === index)
                    game.players[i].x++;
            }
            fell = false;
            for (let i = 0; i < game.treasuresAll.length; i++) {
                if (game.treasuresAll[i].x === 6 && game.treasuresAll[i].y === index) {
                    game.fallenTreasure = game.treasuresAll[i];
                    game.fallenTreasure.x = null;
                    game.fallenTreasure.y = null;
                    game.treasuresAll.splice(game.treasuresAll.indexOf(game.treasuresAll[i]), 1);
                    fell = true;
                    // game.treasuresAll[i].x++
                }
                else if (game.treasuresAll[i].y === index)
                    game.treasuresAll[i].x++;
            }
            console.log(game.fallenTreasure);
            if (!fell && game.fallenTreasure !== null) {
                game.fallenTreasure.x = 0;
                game.fallenTreasure.y = index;
                game.treasuresAll.push(game.fallenTreasure);
                game.fallenTreasure = null;
            }
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
                if (game.players[i].y === index && game.players[i].x === 6)
                    game.players[i].y = 0;
                else if (game.players[i].x === index)
                    game.players[i].y++;
            }
            fell = false;
            for (let i = 0; i < game.treasuresAll.length; i++) {
                if (game.treasuresAll[i].x === index && game.treasuresAll[i].y === 6) {
                    game.fallenTreasure = game.treasuresAll[i];
                    game.fallenTreasure.x = null;
                    game.fallenTreasure.y = null;
                    game.treasuresAll.splice(game.treasuresAll.indexOf(game.treasuresAll[i]), 1);
                    fell = true;
                    // game.treasuresAll[i].y++
                }
                else if (game.treasuresAll[i].x === index)
                    game.treasuresAll[i].y++;
            }
            console.log(game.fallenTreasure);
            console.log(game);
            if (!fell && game.fallenTreasure !== null) {
                game.fallenTreasure.x = index;
                game.fallenTreasure.y = 0;
                game.treasuresAll.push(game.fallenTreasure);
                game.fallenTreasure = null;
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
                if (game.players[i].y === 0 && game.players[i].x === index)
                    game.players[i].y = 6;
                else if (game.players[i].x === index)
                    game.players[i].y--;
            }
            fell = false;
            for (let i = 0; i < game.treasuresAll.length; i++) {
                if (game.treasuresAll[i].x === index && game.treasuresAll[i].y === 0) {
                    game.fallenTreasure = game.treasuresAll[i];
                    game.fallenTreasure.x = null;
                    game.fallenTreasure.y = null;
                    game.treasuresAll.splice(game.treasuresAll.indexOf(game.treasuresAll[i]), 1);
                    fell = true;
                    // game.treasuresAll[i].y--
                }
                else if (game.treasuresAll[i].x === index)
                    game.treasuresAll[i].y--;
            }
            console.log(game.fallenTreasure);
            if (!fell && game.fallenTreasure !== null) {
                game.fallenTreasure.x = index;
                game.fallenTreasure.y = 6;
                game.treasuresAll.push(game.fallenTreasure);
                game.fallenTreasure = null;
            }
            break;
    }
    drawMap(game);
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
    const locations = graphNext(game.players[game.currentPlayer].x, game.players[game.currentPlayer].y, game);
    console.log(locations);
    const pos = getMousePosition(canvas, e);
    console.log(pos);
    let exists = false;
    for (let i = 0; i < locations.length; i++) {
        if (locations[i][0] === pos.convX && locations[i][1] === pos.convY)
            exists = true;
    }
    if (exists) {
        game.players[game.currentPlayer].x = pos.convX;
        game.players[game.currentPlayer].y = pos.convY;
        drawMap(game);
        endTurn(game);
    }
}
export function endTurn(game) {
    if (game.currentPlayer === 3)
        game.currentPlayer = 0;
    else
        game.currentPlayer++;
}
//# sourceMappingURL=utils.js.map