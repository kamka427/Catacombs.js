type Piece = "topleft" | "topright" | "bottomleft" | "bottomright" |
    "vertical" | "horizontal" | "tripleright" | "tripleleft" | "tripleup" |
    "tripledown" | "r"
const pieceTypes: Array<Piece> = ["topleft", "topright", "bottomleft", "bottomright",
    "vertical", "horizontal", "tripleright", "tripleleft", "tripleup",
    "tripledown"]
const startmap: Array<Array<Piece>> = [
    ["topleft", "r", "tripledown", "r", "tripledown", "r", "topright"],
    ["r", "r", "r", "r", "r", "r", "r"],
    ["tripleright", "r", "tripleright", "r", "tripledown", "r", "vertical"],
    ["r", "r", "r", "r", "r", "r", "r"],
    ["tripleright", "r", "tripleup", "r", "tripleleft", "r", "vertical"],
    ["r", "r", "r", "r", "r", "r", "r"],
    ["bottomleft", "r", "tripleup", "r", "tripleup", "r", "bottomright"],
]
type Gem = "ruby" | "diamond" | "gold" | "silver" | "emerald"
const gemTypes: Array<Gem> = ["ruby", "diamond", "gold", "silver", "emerald"]
const startLocations: Array<Array<number>> = [[0, 0], [6,6], [0, 6], [6, 0]]
const treasureLocations: Array<Array<number>> = []


/// ki kell venni a kezdohelyeket
const genTreasureLocations = () => {
    for (let i = 0; i < startmap.length; i++) {
        for (let j = 0; j < startmap.length; j++) {
            treasureLocations.push([i,j])   
        } 
    }
}
genTreasureLocations()
const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min))
class GameMap {
    map: Array<Array<Piece>>
    randomfield: Piece

    constructor() {
        this.map = this.generateMap()
        this.randomfield = pieceTypes[Math.floor(Math.random() * pieceTypes.length)]
    }
    generateMap = () => startmap.map(e => e.map(e => e === 'r' ?
        pieceTypes[Math.floor(Math.random() * pieceTypes.length)] : e))
}

class Treasure {
    x: number
    y: number
    type: Gem

    constructor() {
        this.x = randomBetween(0, startmap.length)
        this.y = randomBetween(0, startmap.length)
        this.type = gemTypes[Math.floor(Math.random() * gemTypes.length)]
    }
}

class Player {
    x: number
    y: number
    treasureCards: Array<Treasure>

    constructor(x: number, y: number, tNumber: number) {
        this.x = x
        this.y = y
        this.treasureCards = []
        for (let i = 0; i < tNumber; i++) {
            this.treasureCards.push(new Treasure())
        }
    }
}

class Game {
    playerNum: number
    treasurePerPlayer: number
    treasureSum: number
    gameMap: GameMap
    players: Array<Player>
    treasuresAll: Array<Treasure>
    constructor(playerNum: number, treasurePerPlayer: number) {
        this.playerNum = playerNum
        this.treasurePerPlayer = treasurePerPlayer
        this.treasureSum= playerNum * treasurePerPlayer
        this.gameMap = new GameMap()
        this.players =[]
        this.treasuresAll = []
        this.genPlayers()
        this.addTreasure()
    }
    genPlayers() {
        let remainingLoc: Array<Array<number>> = [...startLocations]
        for (let i = 0; i < this.playerNum; i++) {
            let loc: number[] = remainingLoc[randomBetween(0, remainingLoc.length)]
            remainingLoc.splice(remainingLoc.indexOf(loc), 1)      
            this.players.push(new Player(loc[0], loc[1], this.treasurePerPlayer))
        }
    }
    addTreasure() {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].treasureCards.forEach(e => this.treasuresAll.push(e))
        }
    }
}


let game = new Game(2, 2)














const fields = document.querySelectorAll("div.field")
let gameArea: any = Array.from(fields)

split()
function split() {
    let results = []
    while (gameArea.length > 0) {
        results.push(gameArea.splice(0, 7))
    }
    gameArea = Array.from(results);
}

updateMap()
function updateMap() {
    for (let i = 0; i < game.gameMap.map.length; i++) {
        for (let j = 0; j < game.gameMap.map.length; j++) {
            gameArea[i][j].innerText = game.gameMap.map[i][j]
        }
    }
    for (let i = 0; i < game.treasuresAll.length; i++) {
        gameArea[game.treasuresAll[i].x][game.treasuresAll[i].y].style.color = "red";

    }
    for (let i = 0; i < game.players.length; i++) {
        gameArea[game.players[i].x][game.players[i].y].style.color = "blue";

    }
}

const arrows = document.querySelectorAll("div.arrow")

function arrowPush() {

}