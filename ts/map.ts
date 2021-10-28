type piece = "topleft" | "topright" | "bottomleft" | "bottomright" |
    "vertical" | "horizontal" | "tripleright" | "tripleleft" | "tripleup" |
    "tripledown" | "r"

const pieceTypes: Array<piece> = ["topleft", "topright", "bottomleft", "bottomright",
    "vertical", "horizontal", "tripleright", "tripleleft", "tripleup",
    "tripledown"]

const startmap: Array<Array<piece>> = [
    ["topleft", "r", "tripledown", "r", "tripledown", "r", "topright"],
    ["r", "r", "r", "r", "r", "r", "r"],
    ["tripleright", "r", "tripleright", "r", "tripledown", "r", "vertical"],
    ["r", "r", "r", "r", "r", "r", "r"],
    ["tripleright", "r", "tripleup", "r", "tripleleft", "r", "vertical"],
    ["r", "r", "r", "r", "r", "r", "r"],
    ["bottomleft", "r", "tripleup", "r", "tripleup", "r", "bottomright"],
]

class GameMap {
    map: Array<Array<piece>>
    randomfield: piece
    randomtlx: number
    randomtrx: number
    randomblx: number
    randombrx: number

    randomtly: number
    randomtry: number
    randombly: number
    randombry: number

    constructor() {
        this.map = this.generateMap()
        this.randomfield = pieceTypes[Math.floor(Math.random() * pieceTypes.length)]
    }
    generateMap = () => startmap.map(e => e.map(e => e === 'r' ?
        pieceTypes[Math.floor(Math.random() * pieceTypes.length)] : e))
}

let gameMap: GameMap = new GameMap();

const fields = document.querySelectorAll("div.field")
let gameArea:any = Array.from(fields) 

split()
function split() {
    let results = []
    while(gameArea.length > 0){
       results.push(gameArea.splice(0, 7))
    }
    gameArea = Array.from(results);
}

updateMap()
function updateMap() {
    for (let i = 0; i < gameMap.map.length; i++) {
        for (let j = 0; j <  gameMap.map.length; j++) {
            gameArea[i][j].innerText = gameMap.map[i][j]
        }  
    }
}