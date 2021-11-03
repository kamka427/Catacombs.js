export function graphExplore(game) {
    game.availableFields = [];
    game.visited = [
        [...new Array(7).fill(1)],
        [...new Array(7).fill(1)],
        [...new Array(7).fill(1)],
        [...new Array(7).fill(1)],
        [...new Array(7).fill(1)],
        [...new Array(7).fill(1)],
        [...new Array(7).fill(1)],
    ];
    for (let i = 0; i < game.gameMap.map.length; i++) {
        for (let j = 0; j < game.gameMap.map.length; j++) {
            game.gameMap.map[i][j].avaliable = false;
        }
    }
    game.availableFields.push([
        game.players[game.currentPlayer].row,
        game.players[game.currentPlayer].col,
    ]);
    graphNext(game.players[game.currentPlayer].row, game.players[game.currentPlayer].col, game);
    if (game.availableFields.length !== 0) {
        for (let i = 0; i < game.availableFields.length; i++) {
            graphNext(game.availableFields[i][0], game.availableFields[i][1], game);
        }
    }
}
export function graphNext(row, col, game) {
    if (game.visited[row][col] === 1) {
        const curr = game.gameMap.map[row][col];
        if (curr.type === "edge" && curr.rotation === 0) {
            if (right(col, game, row)) {
                game.availableFields.push([row, col + 1]);
                game.gameMap.map[row][col + 1].avaliable = true;
            }
            if (down(row, game, col)) {
                game.availableFields.push([row + 1, col]);
                game.gameMap.map[row + 1][col].avaliable = true;
            }
        }
        if (curr.type === "edge" && curr.rotation === 90) {
            if (left(col, game, row)) {
                game.availableFields.push([row, col - 1]);
                game.gameMap.map[row][col - 1].avaliable = true;
            }
            if (down(row, game, col)) {
                game.availableFields.push([row + 1, col]);
                game.gameMap.map[row + 1][col].avaliable = true;
            }
        }
        if (curr.type === "edge" && curr.rotation === 180) {
            if (left(col, game, row)) {
                game.availableFields.push([row, col - 1]);
                game.gameMap.map[row][col - 1].avaliable = true;
            }
            if (up(row, game, col)) {
                game.availableFields.push([row - 1, col]);
                game.gameMap.map[row - 1][col].avaliable = true;
            }
        }
        if (curr.type === "edge" && curr.rotation === 270) {
            if (right(col, game, row)) {
                game.availableFields.push([row, col + 1]);
                game.gameMap.map[row][col + 1].avaliable = true;
            }
            if (up(row, game, col)) {
                game.availableFields.push([row - 1, col]);
                game.gameMap.map[row - 1][col].avaliable = true;
            }
        }
        if (curr.type === "straight" && curr.rotation === 90) {
            if (right(col, game, row)) {
                game.availableFields.push([row, col + 1]);
                game.gameMap.map[row][col + 1].avaliable = true;
            }
            if (left(col, game, row)) {
                game.availableFields.push([row, col - 1]);
                game.gameMap.map[row][col - 1].avaliable = true;
            }
        }
        if (curr.type === "straight" && curr.rotation === 0) {
            if (down(row, game, col)) {
                game.availableFields.push([row + 1, col]);
                game.gameMap.map[row + 1][col].avaliable = true;
            }
            if (up(row, game, col)) {
                game.availableFields.push([row - 1, col]);
                game.gameMap.map[row - 1][col].avaliable = true;
            }
        }
        if (curr.type === "triple" && curr.rotation === 0) {
            if (down(row, game, col)) {
                game.availableFields.push([row + 1, col]);
                game.gameMap.map[row + 1][col].avaliable = true;
            }
            if (up(row, game, col)) {
                game.availableFields.push([row - 1, col]);
                game.gameMap.map[row - 1][col].avaliable = true;
            }
            if (right(col, game, row)) {
                game.availableFields.push([row, col + 1]);
                game.gameMap.map[row][col + 1].avaliable = true;
            }
        }
        if (curr.type === "triple" && curr.rotation === 90) {
            if (down(row, game, col)) {
                game.availableFields.push([row + 1, col]);
                game.gameMap.map[row + 1][col].avaliable = true;
            }
            if (left(col, game, row)) {
                game.availableFields.push([row, col - 1]);
                game.gameMap.map[row][col - 1].avaliable = true;
            }
            if (right(col, game, row)) {
                game.availableFields.push([row, col + 1]);
                game.gameMap.map[row][col + 1].avaliable = true;
            }
        }
        if (curr.type === "triple" && curr.rotation === 180) {
            if (down(row, game, col)) {
                game.availableFields.push([row + 1, col]);
                game.gameMap.map[row + 1][col].avaliable = true;
            }
            if (up(row, game, col)) {
                game.availableFields.push([row - 1, col]);
                game.gameMap.map[row - 1][col].avaliable = true;
            }
            if (left(col, game, row)) {
                game.availableFields.push([row, col - 1]);
                game.gameMap.map[row][col - 1].avaliable = true;
            }
        }
        if (curr.type === "triple" && curr.rotation === 270) {
            if (up(row, game, col)) {
                game.availableFields.push([row - 1, col]);
                game.gameMap.map[row - 1][col].avaliable = true;
            }
            if (left(col, game, row)) {
                game.availableFields.push([row, col - 1]);
                game.gameMap.map[row][col - 1].avaliable = true;
            }
            if (right(col, game, row)) {
                game.availableFields.push([row, col + 1]);
                game.gameMap.map[row][col + 1].avaliable = true;
            }
        }
        game.visited[row][col] = 0;
        game.gameMap.map[row][col].avaliable = true;
    }
}
function up(row, game, col) {
    return (row - 1 > -1 &&
        game.visited[row - 1][col] === 1 &&
        ((game.gameMap.map[row - 1][col].type === "straight" &&
            game.gameMap.map[row - 1][col].rotation === 0) ||
            (game.gameMap.map[row - 1][col].type === "edge" &&
                game.gameMap.map[row - 1][col].rotation === 0) ||
            (game.gameMap.map[row - 1][col].type === "edge" &&
                game.gameMap.map[row - 1][col].rotation === 90) ||
            (game.gameMap.map[row - 1][col].type === "triple" &&
                game.gameMap.map[row - 1][col].rotation === 0) ||
            (game.gameMap.map[row - 1][col].type === "triple" &&
                game.gameMap.map[row - 1][col].rotation === 90) ||
            (game.gameMap.map[row - 1][col].type === "triple" &&
                game.gameMap.map[row - 1][col].rotation === 180)));
}
function left(col, game, row) {
    return (col - 1 > -1 &&
        game.visited[row][col - 1] === 1 &&
        ((game.gameMap.map[row][col - 1].type === "straight" &&
            game.gameMap.map[row][col - 1].rotation === 90) ||
            (game.gameMap.map[row][col - 1].type === "edge" &&
                game.gameMap.map[row][col - 1].rotation === 270) ||
            (game.gameMap.map[row][col - 1].type === "edge" &&
                game.gameMap.map[row][col - 1].rotation === 0) ||
            (game.gameMap.map[row][col - 1].type === "triple" &&
                game.gameMap.map[row][col - 1].rotation === 90) ||
            (game.gameMap.map[row][col - 1].type === "triple" &&
                game.gameMap.map[row][col - 1].rotation === 270) ||
            (game.gameMap.map[row][col - 1].type === "triple" &&
                game.gameMap.map[row][col - 1].rotation === 0)));
}
function down(row, game, col) {
    return (row + 1 < game.gameMap.map.length &&
        game.visited[row + 1][col] === 1 &&
        ((game.gameMap.map[row + 1][col].type === "straight" &&
            game.gameMap.map[row + 1][col].rotation === 0) ||
            (game.gameMap.map[row + 1][col].type === "edge" &&
                game.gameMap.map[row + 1][col].rotation === 180) ||
            (game.gameMap.map[row + 1][col].type === "edge" &&
                game.gameMap.map[row + 1][col].rotation === 270) ||
            (game.gameMap.map[row + 1][col].type === "triple" &&
                game.gameMap.map[row + 1][col].rotation === 0) ||
            (game.gameMap.map[row + 1][col].type === "triple" &&
                game.gameMap.map[row + 1][col].rotation === 270) ||
            (game.gameMap.map[row + 1][col].type === "triple" &&
                game.gameMap.map[row + 1][col].rotation === 180)));
}
function right(col, game, row) {
    return (col + 1 < game.gameMap.map.length &&
        game.visited[row][col + 1] === 1 &&
        ((game.gameMap.map[row][col + 1].type === "straight" &&
            game.gameMap.map[row][col + 1].rotation === 90) ||
            (game.gameMap.map[row][col + 1].type === "edge" &&
                game.gameMap.map[row][col + 1].rotation === 180) ||
            (game.gameMap.map[row][col + 1].type === "edge" &&
                game.gameMap.map[row][col + 1].rotation === 90) ||
            (game.gameMap.map[row][col + 1].type === "triple" &&
                game.gameMap.map[row][col + 1].rotation === 90) ||
            (game.gameMap.map[row][col + 1].type === "triple" &&
                game.gameMap.map[row][col + 1].rotation === 270) ||
            (game.gameMap.map[row][col + 1].type === "triple" &&
                game.gameMap.map[row][col + 1].rotation === 180)));
}
//# sourceMappingURL=graphexporation.js.map