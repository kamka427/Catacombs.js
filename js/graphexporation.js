export function graphNext(x, y, game) {
    let availableFields = [];
    switch (game.gameMap.map[x][y]) {
        case "topleft":
            if (y + 1 < game.gameMap.map.length && (game.gameMap.map[x][y + 1] === "horizontal" ||
                game.gameMap.map[x][y + 1] === "bottomright" ||
                game.gameMap.map[x][y + 1] === "topright" ||
                game.gameMap.map[x][y + 1] === "tripledown" ||
                game.gameMap.map[x][y + 1] === "tripleup" ||
                game.gameMap.map[x][y + 1] === "tripleleft"))
                availableFields.push([x, y + 1]);
            if (x + 1 < game.gameMap.map.length && (game.gameMap.map[x + 1][y] === "vertical" ||
                game.gameMap.map[x + 1][y] === "bottomright" ||
                game.gameMap.map[x + 1][y] === "bottomleft" ||
                game.gameMap.map[x + 1][y] === "tripleright" ||
                game.gameMap.map[x + 1][y] === "tripleup" ||
                game.gameMap.map[x + 1][y] === "tripleleft"))
                availableFields.push([x + 1, y]);
            break;
        case "topright":
            if (y - 1 > -1 && (game.gameMap.map[x][y - 1] === "horizontal" ||
                game.gameMap.map[x][y - 1] === "bottomleft" ||
                game.gameMap.map[x][y - 1] === "topleft" ||
                game.gameMap.map[x][y - 1] === "tripledown" ||
                game.gameMap.map[x][y - 1] === "tripleup" ||
                game.gameMap.map[x][y - 1] === "tripleright"))
                availableFields.push([x, y - 1]);
            if (x + 1 < game.gameMap.map.length && (game.gameMap.map[x + 1][y] === "vertical" ||
                game.gameMap.map[x + 1][y] === "bottomright" ||
                game.gameMap.map[x + 1][y] === "bottomleft" ||
                game.gameMap.map[x + 1][y] === "tripleright" ||
                game.gameMap.map[x + 1][y] === "tripleup" ||
                game.gameMap.map[x + 1][y] === "tripleleft"))
                availableFields.push([x + 1, y]);
            break;
        case "bottomright":
            if (y - 1 > -1 && (game.gameMap.map[x][y - 1] === "horizontal" ||
                game.gameMap.map[x][y - 1] === "bottomleft" ||
                game.gameMap.map[x][y - 1] === "topleft" ||
                game.gameMap.map[x][y - 1] === "tripledown" ||
                game.gameMap.map[x][y - 1] === "tripleup" ||
                game.gameMap.map[x][y - 1] === "tripleright"))
                availableFields.push([x, y - 1]);
            if (x - 1 > -1 && (game.gameMap.map[x - 1][y] === "vertical" ||
                game.gameMap.map[x - 1][y] === "topleft" ||
                game.gameMap.map[x - 1][y] === "topright" ||
                game.gameMap.map[x - 1][y] === "tripleright" ||
                game.gameMap.map[x - 1][y] === "tripledown" ||
                game.gameMap.map[x - 1][y] === "tripleleft"))
                availableFields.push([x - 1, y]);
            break;
        case "bottomleft":
            if (y + 1 < game.gameMap.map.length && (game.gameMap.map[x][y + 1] === "horizontal" ||
                game.gameMap.map[x][y + 1] === "bottomright" ||
                game.gameMap.map[x][y + 1] === "topright" ||
                game.gameMap.map[x][y + 1] === "tripledown" ||
                game.gameMap.map[x][y + 1] === "tripleup" ||
                game.gameMap.map[x][y + 1] === "tripleleft"))
                availableFields.push([x, y + 1]);
            if (x - 1 > -1 && (game.gameMap.map[x - 1][y] === "vertical" ||
                game.gameMap.map[x - 1][y] === "topleft" ||
                game.gameMap.map[x - 1][y] === "topright" ||
                game.gameMap.map[x - 1][y] === "tripleright" ||
                game.gameMap.map[x - 1][y] === "tripledown" ||
                game.gameMap.map[x - 1][y] === "tripleleft"))
                availableFields.push([x - 1, y]);
            break;
        // case "vertical":
        //     if (y + 1 < game.gameMap.map.length)
        //         availableFields.push([x, y + 1]);
        //     if (y - 1 > 0)
        //         availableFields.push([x, y - 1]);
        //     break;
        // case "horizontal":
        //     if (x + 1 < game.gameMap.map.length)
        //         availableFields.push([x + 1, y]);
        //     if (x - 1 > 0)
        //         availableFields.push([x - 1, y]);
        //     break;
        // case "tripleright":
        //     if (y + 1 < game.gameMap.map.length)
        //         availableFields.push([x, y + 1]);
        //     if (y - 1 > 0)
        //         availableFields.push([x, y - 1]);
        //     if (x + 1 < game.gameMap.map.length)
        //         availableFields.push([x + 1, y]);
        //     break;
        // case "tripledown":
        //     if (x + 1 < game.gameMap.map.length)
        //         availableFields.push([x + 1, y]);
        //     if (x - 1 > 0)
        //         availableFields.push([x - 1, y]);
        //     if (y + 1 < game.gameMap.map.length)
        //         availableFields.push([x, y + 1]);
        //     break;
        // case "tripleleft":
        //     if (y + 1 < game.gameMap.map.length)
        //         availableFields.push([x, y + 1]);
        //     if (y - 1 > 0)
        //         availableFields.push([x, y - 1]);
        //     if (x - 1 > 0)
        //         availableFields.push([x - 1, y]);
        //     break;
        // case "tripleup":
        //     if (x + 1 < game.gameMap.map.length)
        //         availableFields.push([x + 1, y]);
        //     if (x - 1 > 0)
        //         availableFields.push([x - 1, y]);
        //     if (y - 1 > 0)
        //         availableFields.push([x, y - 1]);
        //     break;
    }
    let tmp = availableFields;
    console.log(tmp);
    availableFields = [];
    return tmp;
}
//# sourceMappingURL=graphexporation.js.map