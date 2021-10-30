const gameArea = document.querySelector("canvas#gameArea");
const ctx = gameArea.getContext("2d");
export function drawMap(game) {
    ctx.clearRect(0, 0, gameArea.width, gameArea.height);
    for (let i = 0; i < game.gameMap.map.length + 2; i++) {
        for (let j = 0; j < game.gameMap.map.length + 2; j++) {
            if ((i === 0 && j > 0 && j < game.gameMap.map.length && j % 2 === 0) ||
                (i === game.gameMap.map.length + 1 &&
                    j > 0 &&
                    j < game.gameMap.map.length &&
                    j % 2 === 0) ||
                (j === 0 && i > 0 && i < game.gameMap.map.length && i % 2 === 0) ||
                (j === game.gameMap.map.length + 1 &&
                    i > 0 &&
                    i < game.gameMap.map.length &&
                    i % 2 === 0)) {
                ctx.fillText("side", i * 50, j * 50 + 25);
            }
            else if (i === 0 ||
                j === 0 ||
                i === game.gameMap.map.length + 1 ||
                j === game.gameMap.map.length + 1)
                ctx.strokeRect(i * 50, j * 50, 50, 50);
            else
                dImage(game.gameMap.map[j - 1][i - 1], i * 50, j * 50); //ctx.fillText(game.gameMap.map[j - 1][i - 1], i * 50, j * 50 + 25);
            // ctx.strokeRect(i * 50, j * 50, 50, 50);
            // dEdge(i*50, j*50)
        }
    }
    dImage(game.gameMap.randomfield, game.draggableField.x, game.draggableField.y);
    // ctx.fillText(
    //   game.gameMap.randomfield,
    //   game.draggableField.x,
    //   game.draggableField.y + 25
    // );
}
function dImage(type, x, y) {
    const img = new Image(50, 50);
    switch (type) {
        case "topleft":
            img.src = "../assets/topleft.png";
            break;
        case "topright":
            img.src = "../assets/topright.png";
            break;
        case "bottomleft":
            img.src = "../assets/bottomleft.png";
            break;
        case "bottomright":
            img.src = "../assets/bottomright.png";
            break;
        case "horizontal":
            img.src = "../assets/horizontal.png";
            break;
        case "vertical":
            img.src = "../assets/vertical.png";
            break;
        case "tripleup":
            img.src = "../assets/tripleup.png";
            break;
        case "tripleright":
            img.src = "../assets/tripleright.png";
            break;
        case "tripledown":
            img.src = "../assets/tripledown.png";
            break;
        case "tripleleft":
            img.src = "../assets/tripleleft.png";
            break;
        default:
            break;
    }
    img.onload = () => ctx.drawImage(img, x, y, 50, 50);
}
function dEdge(x, y) {
    const img = new Image(50, 50);
    img.src = "../assets/edge.png";
    img.onload = () => ctx.drawImage(img, x, y, 50, 50);
}
//# sourceMappingURL=graphics.js.map