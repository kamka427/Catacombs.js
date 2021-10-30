const gameArea = document.querySelector("canvas#gameArea");
const ctx = gameArea.getContext("2d");
export function drawMap(game, drag) {
    ctx.clearRect(0, 0, gameArea.width, gameArea.height);
    for (let i = 0; i < game.gameMap.map.length + 2; i++) {
        for (let j = 0; j < game.gameMap.map.length + 2; j++) {
            if ((i === 0 && j > 0 && j < game.gameMap.map.length && j % 2 === 0) ||
                (i === game.gameMap.map.length + 1 &&
                    j > 0 &&
                    j < game.gameMap.map.length &&
                    j % 2 === 0) ||
                (j === 0 && i > 0 && i < game.gameMap.map.length && i % 2 === 0)
                || (j === game.gameMap.map.length + 1 && i > 0 && i < game.gameMap.map.length && i % 2 === 0)) {
                ctx.fillText("side", i * 50, j * 50 + 25);
            }
            else if (i === 0 || j === 0 || i === game.gameMap.map.length + 1 || j === game.gameMap.map.length + 1)
                ctx.strokeRect(i * 50, j * 50, 50, 50);
            else
                ctx.fillText(game.gameMap.map[j - 1][i - 1], i * 50, j * 50 + 25);
            ctx.strokeRect(i * 50, j * 50, 50, 50);
        }
    }
    ctx.strokeRect(drag.x, drag.y, drag.width, drag.height);
    ctx.fillText(game.gameMap.randomfield, drag.x, drag.y + 25);
}
// export function drawRandom(game: Game, drag: DraggableField) {
//   ctx.strokeRect(drag.x, drag.y, drag.width, drag.height);
//   ctx.fillText(game.gameMap.randomfield, drag.x, drag.y + 25);
// }
//# sourceMappingURL=graphics.js.map