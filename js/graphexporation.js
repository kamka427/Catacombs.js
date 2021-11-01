export function graphNext(row, col, game) {
    let availableFields = [];
    switch (game.gameMap.map[row][col]) {
        case "topleft":
            if (col + 1 < game.gameMap.map.length && (game.gameMap.map[row][col + 1] === "horizontal" ||
                game.gameMap.map[row][col + 1] === "bottomright" ||
                game.gameMap.map[row][col + 1] === "topright" ||
                game.gameMap.map[row][col + 1] === "tripledown" ||
                game.gameMap.map[row][col + 1] === "tripleup" ||
                game.gameMap.map[row][col + 1] === "tripleleft"))
                availableFields.push([row, col + 1]);
            if (row + 1 < game.gameMap.map.length && (game.gameMap.map[row + 1][col] === "vertical" ||
                game.gameMap.map[row + 1][col] === "bottomright" ||
                game.gameMap.map[row + 1][col] === "bottomleft" ||
                game.gameMap.map[row + 1][col] === "tripleright" ||
                game.gameMap.map[row + 1][col] === "tripleup" ||
                game.gameMap.map[row + 1][col] === "tripleleft"))
                availableFields.push([row + 1, col]);
            break;
        case "topright":
            if (col - 1 > -1 && (game.gameMap.map[row][col - 1] === "horizontal" ||
                game.gameMap.map[row][col - 1] === "bottomleft" ||
                game.gameMap.map[row][col - 1] === "topleft" ||
                game.gameMap.map[row][col - 1] === "tripledown" ||
                game.gameMap.map[row][col - 1] === "tripleup" ||
                game.gameMap.map[row][col - 1] === "tripleright"))
                availableFields.push([row, col - 1]);
            if (row + 1 < game.gameMap.map.length && (game.gameMap.map[row + 1][col] === "vertical" ||
                game.gameMap.map[row + 1][col] === "bottomright" ||
                game.gameMap.map[row + 1][col] === "bottomleft" ||
                game.gameMap.map[row + 1][col] === "tripleright" ||
                game.gameMap.map[row + 1][col] === "tripleup" ||
                game.gameMap.map[row + 1][col] === "tripleleft"))
                availableFields.push([row + 1, col]);
            break;
        case "bottomright":
            if (col - 1 > -1 && (game.gameMap.map[row][col - 1] === "horizontal" ||
                game.gameMap.map[row][col - 1] === "bottomleft" ||
                game.gameMap.map[row][col - 1] === "topleft" ||
                game.gameMap.map[row][col - 1] === "tripledown" ||
                game.gameMap.map[row][col - 1] === "tripleup" ||
                game.gameMap.map[row][col - 1] === "tripleright"))
                availableFields.push([row, col - 1]);
            if (row - 1 > -1 && (game.gameMap.map[row - 1][col] === "vertical" ||
                game.gameMap.map[row - 1][col] === "topleft" ||
                game.gameMap.map[row - 1][col] === "topright" ||
                game.gameMap.map[row - 1][col] === "tripleright" ||
                game.gameMap.map[row - 1][col] === "tripledown" ||
                game.gameMap.map[row - 1][col] === "tripleleft"))
                availableFields.push([row - 1, col]);
            break;
        case "bottomleft":
            if (col + 1 < game.gameMap.map.length && (game.gameMap.map[row][col + 1] === "horizontal" ||
                game.gameMap.map[row][col + 1] === "bottomright" ||
                game.gameMap.map[row][col + 1] === "topright" ||
                game.gameMap.map[row][col + 1] === "tripledown" ||
                game.gameMap.map[row][col + 1] === "tripleup" ||
                game.gameMap.map[row][col + 1] === "tripleleft"))
                availableFields.push([row, col + 1]);
            if (row - 1 > -1 && (game.gameMap.map[row - 1][col] === "vertical" ||
                game.gameMap.map[row - 1][col] === "topleft" ||
                game.gameMap.map[row - 1][col] === "topright" ||
                game.gameMap.map[row - 1][col] === "tripleright" ||
                game.gameMap.map[row - 1][col] === "tripledown" ||
                game.gameMap.map[row - 1][col] === "tripleleft"))
                availableFields.push([row - 1, col]);
            break;
        case "vertical":
            if (col + 1 < game.gameMap.map.length && (game.gameMap.map[row][col + 1] === "bottomleft" ||
                game.gameMap.map[row][col + 1] === "bottomright" ||
                game.gameMap.map[row][col + 1] === "tripleleft" ||
                game.gameMap.map[row][col + 1] === "tripleright" ||
                game.gameMap.map[row][col + 1] === "tripleup"))
                availableFields.push([row, col + 1]);
            if (col - 1 > -1 && (game.gameMap.map[row][col - 1] === "topleft" ||
                game.gameMap.map[row][col - 1] === "topright" ||
                game.gameMap.map[row][col - 1] === "tripleleft" ||
                game.gameMap.map[row][col - 1] === "tripleright" ||
                game.gameMap.map[row][col - 1] === "tripledown"))
                availableFields.push([row, col - 1]);
            break;
        case "horizontal":
            if (row + 1 < game.gameMap.map.length && (game.gameMap.map[row + 1][col] === "bottomright" ||
                game.gameMap.map[row + 1][col] === "topright" ||
                game.gameMap.map[row + 1][col] === "tripleleft" ||
                game.gameMap.map[row + 1][col] === "tripledown" ||
                game.gameMap.map[row + 1][col] === "tripleup"))
                availableFields.push([row + 1, col]);
            if (row - 1 > -1 && (game.gameMap.map[row - 1][col] === "bottomleft" ||
                game.gameMap.map[row - 1][col] === "topleft" ||
                game.gameMap.map[row - 1][col] === "tripleright" ||
                game.gameMap.map[row - 1][col] === "tripleup" ||
                game.gameMap.map[row - 1][col] === "tripledown"))
                availableFields.push([row - 1, col]);
            break;
        // case "tripleright":
        //     if (col + 1 < game.gameMap.map.length)
        //         availableFields.push([row, col + 1]);
        //     if (col - 1 > 0)
        //         availableFields.push([row, col - 1]);
        //     if (row + 1 < game.gameMap.map.length)
        //         availableFields.push([row + 1, col]);
        //     break;
        // case "tripledown":
        //     if (row + 1 < game.gameMap.map.length)
        //         availableFields.push([row + 1, col]);
        //     if (row - 1 > 0)
        //         availableFields.push([row - 1, col]);
        //     if (col + 1 < game.gameMap.map.length)
        //         availableFields.push([row, col + 1]);
        //     break;
        // case "tripleleft":
        //     if (col + 1 < game.gameMap.map.length)
        //         availableFields.push([row, col + 1]);
        //     if (col - 1 > 0)
        //         availableFields.push([row, col - 1]);
        //     if (row - 1 > 0)
        //         availableFields.push([row - 1, col]);
        //     break;
        // case "tripleup":
        //     if (row + 1 < game.gameMap.map.length)
        //         availableFields.push([row + 1, col]);
        //     if (row - 1 > 0)
        //         availableFields.push([row - 1, col]);
        //     if (col - 1 > 0)
        //         availableFields.push([row, col - 1]);
        //     break;
    }
    let tmp = availableFields;
    console.log(tmp);
    availableFields = [];
    return tmp;
}
//# sourceMappingURL=graphexporation.js.map