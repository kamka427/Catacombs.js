const pieceTypes = ["topleft", "topright", "bottomleft", "bottomright",
    "vertical", "horizontal", "tripleright", "tripleleft", "tripleup",
    "tripledown"];
const startmap = [
    ["topleft", "r", "tripledown", "r", "tripledown", "r", "topright"],
    ["r", "r", "r", "r", "r", "r", "r"],
    ["tripleright", "r", "tripleright", "r", "tripledown", "r", "vertical"],
    ["r", "r", "r", "r", "r", "r", "r"],
    ["tripleright", "r", "tripleup", "r", "tripleleft", "r", "vertical"],
    ["r", "r", "r", "r", "r", "r", "r"],
    ["bottomleft", "r", "tripleup", "r", "tripleup", "r", "bottomright"],
];
class GameMap {
    constructor() {
        this.generateMap = () => startmap.map(e => e.map(e => e === 'r' ? pieceTypes[Math.floor(Math.random() * pieceTypes.length)] : e));
        this.map = this.generateMap();
        this.randomfield = pieceTypes[Math.floor(Math.random() * pieceTypes.length)];
    }
}
let gameMap = new GameMap();
////////////////////////////////////////////////////////////////////////////
const gameArea = document.querySelector("canvas#gameArea");
const ctx = gameArea.getContext("2d");
function drawMap() {
    ctx.clearRect(0, 0, gameArea.width, gameArea.height);
    for (let i = 0; i < gameMap.map.length + 2; i++) {
        for (let j = 0; j < gameMap.map.length + 2; j++) {
            if (i === 0 || j === 0 || i === gameMap.map.length + 1 || j === gameMap.map.length + 1) {
                ctx.fillText("side", i * 50, j * 50 + 25);
            }
            else
                ctx.fillText(gameMap.map[i - 1][j - 1], i * 50, j * 50 + 25);
            ctx.strokeRect(i * 50, j * 50, 50, 50);
        }
    }
    ctx.strokeRect(10 * 50, 0 * 50, 50, 50);
    ctx.fillText(gameMap.randomfield, 10 * 50, 0 * 50 + 25);
}
drawMap();
////////////////////////////////////////////////////////////////////////////
function rotate(e) {
    let x = Math.floor((gameMap.map.length * e.clientX) / (gameMap.map.length * 50)) - 1;
    let y = Math.floor((gameMap.map.length * e.clientY) / (gameMap.map.length * 50)) - 1;
    if (x >= 0 && x < gameMap.map.length && y >= 0 && y < gameMap.map.length)
        gameMap.map[x][y] = 'tripleup';
    drawMap();
}
document.addEventListener("dblclick", rotate);
