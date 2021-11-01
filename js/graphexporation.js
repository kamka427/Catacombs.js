const removeDuplicates = (array) => [...new Set(array.map((elem) => JSON.stringify(elem)))].map(elem => JSON.parse(elem));
export function graphExplore(game) {
    game.availableFields = [];
    graphNext(game.players[game.currentPlayer].row, game.players[game.currentPlayer].col, game);
    if (game.availableFields.length !== 0) {
        for (let i = 0; i < game.availableFields.length; i++) {
            graphNext(game.availableFields[i][0], game.availableFields[i][1], game);
        }
    }
    console.log(game.availableFields);
}
export function graphNext(row, col, game) {
    // const availableFields = [];
    switch (game.gameMap.map[row][col]) {
        case "topleft":
            if (right(col, game, row))
                game.availableFields.push([row, col + 1]);
            if (down(row, game, col))
                game.availableFields.push([row + 1, col]);
            break;
        case "topright":
            if (left(col, game, row))
                game.availableFields.push([row, col - 1]);
            if (down(row, game, col))
                game.availableFields.push([row + 1, col]);
            break;
        case "bottomright":
            if (left(col, game, row))
                game.availableFields.push([row, col - 1]);
            if (up(row, game, col))
                game.availableFields.push([row - 1, col]);
            break;
        case "bottomleft":
            if (right(col, game, row))
                game.availableFields.push([row, col + 1]);
            if (up(row, game, col))
                game.availableFields.push([row - 1, col]);
            break;
        case "horizontal":
            if (right(col, game, row))
                game.availableFields.push([row, col + 1]);
            if (left(col, game, row))
                game.availableFields.push([row, col - 1]);
            break;
        case "vertical":
            if (down(row, game, col))
                game.availableFields.push([row + 1, col]);
            if (up(row, game, col))
                game.availableFields.push([row - 1, col]);
            break;
        case "tripleright":
            if (down(row, game, col))
                game.availableFields.push([row + 1, col]);
            if (up(row, game, col))
                game.availableFields.push([row - 1, col]);
            if (right(col, game, row))
                game.availableFields.push([row, col + 1]);
            break;
        case "tripledown":
            if (down(row, game, col))
                game.availableFields.push([row + 1, col]);
            if (left(col, game, row))
                game.availableFields.push([row, col - 1]);
            if (right(col, game, row))
                game.availableFields.push([row, col + 1]);
            break;
        case "tripleleft":
            if (down(row, game, col))
                game.availableFields.push([row + 1, col]);
            if (up(row, game, col))
                game.availableFields.push([row - 1, col]);
            if (left(col, game, row))
                game.availableFields.push([row, col - 1]);
            break;
        case "tripleup":
            if (up(row, game, col))
                game.availableFields.push([row - 1, col]);
            if (left(col, game, row))
                game.availableFields.push([row, col - 1]);
            if (right(col, game, row))
                game.availableFields.push([row, col + 1]);
            break;
    }
    game.availableFields = removeDuplicates(game.availableFields);
    // let tmp = availableFields
    // console.log(tmp);
    // availableFields = []
    // game.availableFields = availableFields
}
function up(row, game, col) {
    return row - 1 > -1 && (game.gameMap.map[row - 1][col] === "vertical" ||
        game.gameMap.map[row - 1][col] === "topleft" ||
        game.gameMap.map[row - 1][col] === "topright" ||
        game.gameMap.map[row - 1][col] === "tripleright" ||
        game.gameMap.map[row - 1][col] === "tripledown" ||
        game.gameMap.map[row - 1][col] === "tripleleft");
}
function left(col, game, row) {
    return col - 1 > -1 && (game.gameMap.map[row][col - 1] === "horizontal" ||
        game.gameMap.map[row][col - 1] === "bottomleft" ||
        game.gameMap.map[row][col - 1] === "topleft" ||
        game.gameMap.map[row][col - 1] === "tripledown" ||
        game.gameMap.map[row][col - 1] === "tripleup" ||
        game.gameMap.map[row][col - 1] === "tripleright");
}
function down(row, game, col) {
    return row + 1 < game.gameMap.map.length && (game.gameMap.map[row + 1][col] === "vertical" ||
        game.gameMap.map[row + 1][col] === "bottomright" ||
        game.gameMap.map[row + 1][col] === "bottomleft" ||
        game.gameMap.map[row + 1][col] === "tripleright" ||
        game.gameMap.map[row + 1][col] === "tripleup" ||
        game.gameMap.map[row + 1][col] === "tripleleft");
}
function right(col, game, row) {
    return col + 1 < game.gameMap.map.length && (game.gameMap.map[row][col + 1] === "horizontal" ||
        game.gameMap.map[row][col + 1] === "bottomright" ||
        game.gameMap.map[row][col + 1] === "topright" ||
        game.gameMap.map[row][col + 1] === "tripledown" ||
        game.gameMap.map[row][col + 1] === "tripleup" ||
        game.gameMap.map[row][col + 1] === "tripleleft");
}
//# sourceMappingURL=graphexporation.js.map