import { Game } from "./classes.js";

const availableFields = [];

export function graphNext(x: number, y: number, game: Game) {
    switch (game.gameMap.map[x][y]) {
        case "topleft":
            if (y + 1 < game.gameMap.map.length)
                availableFields.push(game.gameMap.map[x][y + 1]);
            if (x + 1 < game.gameMap.map.length)
                availableFields.push(game.gameMap.map[x + 1][y]);
            break;
        case "topright":
            if (y + 1 < game.gameMap.map.length)
                availableFields.push(game.gameMap.map[x][y + 1]);
            if (x - 1 > 0)
                availableFields.push(game.gameMap.map[x - 1][y]);
            break;
        case "bottomright":
            if (y - 1 > 0)
                availableFields.push(game.gameMap.map[x][y - 1]);
            if (x - 1 > 0)
                availableFields.push(game.gameMap.map[x - 1][y]);
            break;
        case "bottomleft":
            if (y - 1 > 0)
                availableFields.push(game.gameMap.map[x][y - 1]);
            if (x + 1 < game.gameMap.map.length)
                availableFields.push(game.gameMap.map[x + 1][y]);
            break;
        case "vertical":
            if (y + 1 < game.gameMap.map.length)
                availableFields.push(game.gameMap.map[x][y + 1]);
            if (y - 1 > 0)
                availableFields.push(game.gameMap.map[x][y - 1]);
            break;
        case "horizontal":
            if (x + 1 < game.gameMap.map.length)
                availableFields.push(game.gameMap.map[x + 1][y]);
            if (x - 1 > 0)
                availableFields.push(game.gameMap.map[x - 1][y]);
            break;
        case "tripleright":
            if (y + 1 < game.gameMap.map.length)
                availableFields.push(game.gameMap.map[x][y + 1]);
            if (y - 1 > 0)
                availableFields.push(game.gameMap.map[x][y - 1]);
            if (x + 1 < game.gameMap.map.length)
                availableFields.push(game.gameMap.map[x + 1][y]);
            break;
        case "tripledown":
            if (x + 1 < game.gameMap.map.length)
                availableFields.push(game.gameMap.map[x + 1][y]);
            if (x - 1 > 0)
                availableFields.push(game.gameMap.map[x - 1][y]);
            if (y + 1 < game.gameMap.map.length)
                availableFields.push(game.gameMap.map[x][y + 1]);
            break;
        case "tripleleft":
            if (y + 1 < game.gameMap.map.length)
                availableFields.push(game.gameMap.map[x][y + 1]);
            if (y - 1 > 0)
                availableFields.push(game.gameMap.map[x][y - 1]);
            if (x - 1 > 0)
                availableFields.push(game.gameMap.map[x - 1][y]);
            break;
        case "tripleup":
            if (x + 1 < game.gameMap.map.length)
                availableFields.push(game.gameMap.map[x + 1][y]);
            if (x - 1 > 0)
                availableFields.push(game.gameMap.map[x - 1][y]);
            if (y - 1 > 0)
                availableFields.push(game.gameMap.map[x][y - 1]);
            break;
    }
}
