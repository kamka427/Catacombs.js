type piece = "topleft" | "topright" | "bottomleft" | "bottomright" |
    "linevertical" | "linehorizontal" | "lineright" | "lineleft" | "lineup" |
    "linedown" | "random"

const pieceTypes: Array<piece> = ["topleft", "topright", "bottomleft", "bottomright",
    "linevertical", "linehorizontal", "lineright", "lineleft", "lineup",
    "linedown"]

const startmap: Array<Array<piece>> = [
    ["topleft", "random", "linedown", "random", "linedown", "random", "topright"],
    ["random", "random", "random", "random", "random", "random", "random"],
    ["lineright", "random", "lineright", "random", "linedown", "random", "linevertical"],
    ["random", "random", "random", "random", "random", "random", "random"],
    ["lineright", "random", "lineup", "random", "lineleft", "random", "linevertical"],
    ["random", "random", "random", "random", "random", "random", "random"],
    ["bottomleft", "random", "lineup", "random", "lineup", "random", "bottomright"],
]

class GameMap {
    map: Array<Array<piece>>
    randomfield: piece

    constructor() {
        this.map = this.generateMap()
        this.randomfield = pieceTypes[Math.floor(Math.random() * pieceTypes.length)]
    }

    generateMap = () => startmap.map(e => e.map(e => e === 'random' ? pieceTypes[Math.floor(Math.random() * pieceTypes.length)] : e))
}

let gameMap: GameMap = new GameMap();

////////////////////////////////////////////////////////////////////////////
const gameArea: HTMLCanvasElement = document.querySelector("canvas#gameArea")
const ctx: CanvasRenderingContext2D = gameArea.getContext("2d");

function drawMap(): void {
    ctx.clearRect(0,0,gameArea.width,gameArea.height);
    for (let i = 0; i < gameMap.map.length+2; i++) {
        for (let j = 0; j < gameMap.map.length+2; j++) {
            if(i === 0 || j ===0 || i === gameMap.map.length+1 || j === gameMap.map.length+1) {
                ctx.fillText("side", i * 50, j * 50 + 25)
            }
            else
            ctx.fillText(gameMap.map[i-1][j-1], i * 50, j * 50 + 25)
            ctx.strokeRect(i * 50, j * 50, 50, 50)
        }
    }
    ctx.strokeRect(10 * 50, 0 * 50, 50, 50);
    ctx.fillText(gameMap.randomfield, 10 * 50, 0 * 50 + 25);
}
drawMap()

////////////////////////////////////////////////////////////////////////////
function rotate(e: MouseEvent): void {
    let x: number = Math.floor((gameMap.map.length * e.clientX) / (gameMap.map.length * 50)) -1
    let y: number = Math.floor((gameMap.map.length * e.clientY) / (gameMap.map.length * 50)) -1
    if(x >= 0 && x < gameMap.map.length && y >= 0 && y < gameMap.map.length)
    gameMap.map[x][y] = 'lineup'
    drawMap()
}

document.addEventListener("dblclick",rotate)