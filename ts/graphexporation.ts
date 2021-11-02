import { Game } from "./gameclass.js";

// const removeDuplicates = (array: number[][]) =>
//   [...new Set(array.map((elem: number[]) => JSON.stringify(elem)))].map(
//     (elem) => JSON.parse(elem)
//   );

export function graphExplore(game: Game) {
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

  game.availableFields.push([
    game.players[game.currentPlayer].row,
    game.players[game.currentPlayer].col,
  ]);

  graphNext(
    game.players[game.currentPlayer].row,
    game.players[game.currentPlayer].col,
    game
  );

  if (game.availableFields.length !== 0) {
    for (let i = 0; i < game.availableFields.length; i++) {
      graphNext(game.availableFields[i][0], game.availableFields[i][1], game);
    }
  }

  console.log(game.visited);

  console.log(game.availableFields);
}

export function graphNext(row: number, col: number, game: Game) {
  if (game.visited[row][col] === 1) {
    const curr = game.gameMap.map[row][col];
    if (curr.type === "edge" && curr.rotation === 0) {
      if (right(col, game, row)) game.availableFields.push([row, col + 1]);
      if (down(row, game, col)) game.availableFields.push([row + 1, col]);
    }

    if (curr.type === "edge" && curr.rotation === 1) {
      if (left(col, game, row)) game.availableFields.push([row, col - 1]);
      if (down(row, game, col)) game.availableFields.push([row + 1, col]);
    }
    if (curr.type === "edge" && curr.rotation === 2) {
      if (left(col, game, row)) game.availableFields.push([row, col - 1]);
      if (up(row, game, col)) game.availableFields.push([row - 1, col]);
    }

    if (curr.type === "edge" && curr.rotation === 3) {
      if (right(col, game, row)) game.availableFields.push([row, col + 1]);
      if (up(row, game, col)) game.availableFields.push([row - 1, col]);
    }

    if (curr.type === "straight" && curr.rotation === 1) {
      if (right(col, game, row)) game.availableFields.push([row, col + 1]);
      if (left(col, game, row)) game.availableFields.push([row, col - 1]);
    }

    if (curr.type === "straight" && curr.rotation === 0) {
      if (down(row, game, col)) game.availableFields.push([row + 1, col]);

      if (up(row, game, col)) game.availableFields.push([row - 1, col]);
    }

    if (curr.type === "triple" && curr.rotation === 0) {
      if (down(row, game, col)) game.availableFields.push([row + 1, col]);

      if (up(row, game, col)) game.availableFields.push([row - 1, col]);

      if (right(col, game, row)) game.availableFields.push([row, col + 1]);
    }

    if (curr.type === "triple" && curr.rotation === 1) {
      if (down(row, game, col)) game.availableFields.push([row + 1, col]);

      if (left(col, game, row)) game.availableFields.push([row, col - 1]);

      if (right(col, game, row)) game.availableFields.push([row, col + 1]);
    }

    if (curr.type === "triple" && curr.rotation === 2) {
      if (down(row, game, col)) game.availableFields.push([row + 1, col]);

      if (up(row, game, col)) game.availableFields.push([row - 1, col]);

      if (left(col, game, row)) game.availableFields.push([row, col - 1]);
    }

    if (curr.type === "triple" && curr.rotation === 3) {
      if (up(row, game, col)) game.availableFields.push([row - 1, col]);

      if (left(col, game, row)) game.availableFields.push([row, col - 1]);

      if (right(col, game, row)) game.availableFields.push([row, col + 1]);
    }
    game.visited[row][col] = 0;
  }

  // game.availableFields = removeDuplicates(game.availableFields)
}
function up(row: number, game: Game, col: number) {
  return (
    row - 1 > -1 &&
    game.visited[row - 1][col] === 1 &&
    ((game.gameMap.map[row - 1][col].type === "straight" &&
      game.gameMap.map[row - 1][col].rotation === 0) ||
      (game.gameMap.map[row - 1][col].type === "edge" &&
        game.gameMap.map[row - 1][col].rotation === 0) ||
      (game.gameMap.map[row - 1][col].type === "edge" &&
        game.gameMap.map[row - 1][col].rotation === 1) ||
      (game.gameMap.map[row - 1][col].type === "triple" &&
        game.gameMap.map[row - 1][col].rotation === 0) ||
      (game.gameMap.map[row - 1][col].type === "triple" &&
        game.gameMap.map[row - 1][col].rotation === 1) ||
      (game.gameMap.map[row - 1][col].type === "triple" &&
        game.gameMap.map[row - 1][col].rotation === 2))
  );
}

function left(col: number, game: Game, row: number) {
  return (
    col - 1 > -1 &&
    game.visited[row][col - 1] === 1 &&
    ((game.gameMap.map[row][col - 1].type === "straight" &&
      game.gameMap.map[row][col - 1].rotation === 1) ||
      (game.gameMap.map[row][col - 1].type === "edge" &&
        game.gameMap.map[row][col - 1].rotation === 3) ||
      (game.gameMap.map[row][col - 1].type === "edge" &&
        game.gameMap.map[row][col - 1].rotation === 0) ||
      (game.gameMap.map[row][col - 1].type === "triple" &&
        game.gameMap.map[row][col - 1].rotation === 1) ||
      (game.gameMap.map[row][col - 1].type === "triple" &&
        game.gameMap.map[row][col - 1].rotation === 3) ||
      (game.gameMap.map[row][col - 1].type === "triple" &&
        game.gameMap.map[row][col - 1].rotation === 0))
  );
}

function down(row: number, game: Game, col: number) {
  return (
    row + 1 < game.gameMap.map.length &&
    game.visited[row + 1][col] === 1 &&
    ((game.gameMap.map[row + 1][col].type === "straight" &&
      game.gameMap.map[row + 1][col].rotation === 0) ||
      (game.gameMap.map[row + 1][col].type === "edge" &&
        game.gameMap.map[row + 1][col].rotation === 2) ||
      (game.gameMap.map[row + 1][col].type === "edge" &&
        game.gameMap.map[row + 1][col].rotation === 3) ||
      (game.gameMap.map[row + 1][col].type === "triple" &&
        game.gameMap.map[row + 1][col].rotation === 0) ||
      (game.gameMap.map[row + 1][col].type === "triple" &&
        game.gameMap.map[row + 1][col].rotation === 3) ||
      (game.gameMap.map[row + 1][col].type === "triple" &&
        game.gameMap.map[row + 1][col].rotation === 2))
  );
}

function right(col: number, game: Game, row: number) {
  return (
    col + 1 < game.gameMap.map.length &&
    game.visited[row][col + 1] === 1 &&
    ((game.gameMap.map[row][col + 1].type === "straight" &&
      game.gameMap.map[row][col + 1].rotation === 1) ||
      (game.gameMap.map[row][col + 1].type === "edge" &&
        game.gameMap.map[row][col + 1].rotation === 2) ||
      (game.gameMap.map[row][col + 1].type === "edge" &&
        game.gameMap.map[row][col + 1].rotation === 1) ||
      (game.gameMap.map[row][col + 1].type === "triple" &&
        game.gameMap.map[row][col + 1].rotation === 1) ||
      (game.gameMap.map[row][col + 1].type === "triple" &&
        game.gameMap.map[row][col + 1].rotation === 3) ||
      (game.gameMap.map[row][col + 1].type === "triple" &&
        game.gameMap.map[row][col + 1].rotation === 2))
  );
}
