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
    const curr = game.gameMap.map[row][col];
    if (curr.type === "edge" && curr.rotation === 0) {
        if (right(col, game, row))
            game.availableFields.push([row, col + 1]);
        if (down(row, game, col))
            game.availableFields.push([row + 1, col]);
    }
    if (curr.type === "edge" && curr.rotation === 1) {
        if (left(col, game, row))
            game.availableFields.push([row, col - 1]);
        if (down(row, game, col))
            game.availableFields.push([row + 1, col]);
    }
    if (curr.type === "edge" && curr.rotation === 2) {
        if (left(col, game, row))
            game.availableFields.push([row, col - 1]);
        if (up(row, game, col))
            game.availableFields.push([row - 1, col]);
    }
    if (curr.type === "edge" && curr.rotation === 3) {
        if (right(col, game, row))
            game.availableFields.push([row, col + 1]);
        if (up(row, game, col))
            game.availableFields.push([row - 1, col]);
    }
    if (curr.type === "straight" && curr.rotation === 1) {
        if (right(col, game, row))
            game.availableFields.push([row, col + 1]);
        if (left(col, game, row))
            game.availableFields.push([row, col - 1]);
    }
    if (curr.type === "straight" && curr.rotation === 0) {
        if (down(row, game, col))
            game.availableFields.push([row + 1, col]);
        if (up(row, game, col))
            game.availableFields.push([row - 1, col]);
    }
    if (curr.type === "triple" && curr.rotation === 0) {
        if (down(row, game, col))
            game.availableFields.push([row + 1, col]);
        if (up(row, game, col))
            game.availableFields.push([row - 1, col]);
        if (right(col, game, row))
            game.availableFields.push([row, col + 1]);
    }
    if (curr.type === "triple" && curr.rotation === 1) {
        if (down(row, game, col))
            game.availableFields.push([row + 1, col]);
        if (left(col, game, row))
            game.availableFields.push([row, col - 1]);
        if (right(col, game, row))
            game.availableFields.push([row, col + 1]);
    }
    if (curr.type === "triple" && curr.rotation === 2) {
        if (down(row, game, col))
            game.availableFields.push([row + 1, col]);
        if (up(row, game, col))
            game.availableFields.push([row - 1, col]);
        if (left(col, game, row))
            game.availableFields.push([row, col - 1]);
    }
    if (curr.type === "triple" && curr.rotation === 3) {
        if (up(row, game, col))
            game.availableFields.push([row - 1, col]);
        if (left(col, game, row))
            game.availableFields.push([row, col - 1]);
        if (right(col, game, row))
            game.availableFields.push([row, col + 1]);
    }
    game.availableFields = removeDuplicates(game.availableFields);
    // let tmp = availableFields
    // console.log(tmp);
    // availableFields = []
    // game.availableFields = availableFields
}
function up(row, game, col) {
    return row - 1 > -1 && ((game.gameMap.map[row - 1][col].type === "straight" && game.gameMap.map[row - 1][col].rotation === 0) ||
        (game.gameMap.map[row - 1][col].type === "edge" && game.gameMap.map[row - 1][col].rotation === 0) ||
        (game.gameMap.map[row - 1][col].type === "edge" && game.gameMap.map[row - 1][col].rotation === 1) ||
        (game.gameMap.map[row - 1][col].type === "triple" && game.gameMap.map[row - 1][col].rotation === 0) ||
        (game.gameMap.map[row - 1][col].type === "triple" && game.gameMap.map[row - 1][col].rotation === 1) ||
        (game.gameMap.map[row - 1][col].type === "triple" && game.gameMap.map[row - 1][col].rotation === 2));
}
function left(col, game, row) {
    return col - 1 > -1 && ((game.gameMap.map[row][col - 1].type === "straight" && game.gameMap.map[row][col - 1].rotation === 1) ||
        (game.gameMap.map[row][col - 1].type === "edge" && game.gameMap.map[row][col - 1].rotation === 3) ||
        (game.gameMap.map[row][col - 1].type === "edge" && game.gameMap.map[row][col - 1].rotation === 0) ||
        (game.gameMap.map[row][col - 1].type === "triple" && game.gameMap.map[row][col - 1].rotation === 1) ||
        (game.gameMap.map[row][col - 1].type === "triple" && game.gameMap.map[row][col - 1].rotation === 3) ||
        (game.gameMap.map[row][col - 1].type === "triple" && game.gameMap.map[row][col - 1].rotation === 0));
}
function down(row, game, col) {
    return row + 1 < game.gameMap.map.length && ((game.gameMap.map[row + 1][col].type === "straight" && game.gameMap.map[row + 1][col].rotation === 0) ||
        (game.gameMap.map[row + 1][col].type === "edge" && game.gameMap.map[row + 1][col].rotation === 2) ||
        (game.gameMap.map[row + 1][col].type === "edge" && game.gameMap.map[row + 1][col].rotation === 3) ||
        (game.gameMap.map[row + 1][col].type === "triple" && game.gameMap.map[row + 1][col].rotation === 0) ||
        (game.gameMap.map[row + 1][col].type === "triple" && game.gameMap.map[row + 1][col].rotation === 3) ||
        (game.gameMap.map[row + 1][col].type === "triple" && game.gameMap.map[row + 1][col].rotation === 2));
}
function right(col, game, row) {
    return col + 1 < game.gameMap.map.length && ((game.gameMap.map[row][col + 1].type === "straight" && game.gameMap.map[row][col + 1].rotation === 1) ||
        (game.gameMap.map[row][col + 1].type === "edge" && game.gameMap.map[row][col + 1].rotation === 2) ||
        (game.gameMap.map[row][col + 1].type === "edge" && game.gameMap.map[row][col + 1].rotation === 1) ||
        (game.gameMap.map[row][col + 1].type === "triple" && game.gameMap.map[row][col + 1].rotation === 1) ||
        (game.gameMap.map[row][col + 1].type === "triple" && game.gameMap.map[row][col + 1].rotation === 3) ||
        (game.gameMap.map[row][col + 1].type === "triple" && game.gameMap.map[row][col + 1].rotation === 2));
}
//# sourceMappingURL=graphexporation.js.map