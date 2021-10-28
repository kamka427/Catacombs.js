////////////////////////////////////////////////////////////////////////////
// const gameArea: HTMLCanvasElement = document.querySelector("canvas#gameArea")
// const ctx: CanvasRenderingContext2D = gameArea.getContext("2d");
// function drawMap(): void {
//     ctx.clearRect(0, 0, gameArea.width, gameArea.height);
//     for (let i = 0; i < gameMap.map.length + 2; i++) {
//         for (let j = 0; j < gameMap.map.length + 2; j++) {
//             if (i === 0 || j === 0 || i === gameMap.map.length + 1 || j === gameMap.map.length + 1) {
//                 ctx.fillText("side", i * 50, j * 50 + 25)
//             }
//             else
//                 ctx.fillText(gameMap.map[i - 1][j - 1], i * 50, j * 50 + 25)
//             ctx.strokeRect(i * 50, j * 50, 50, 50)
//         }
//     }
// }
// drawMap()
// function drawRandom() {
//     ctx.strokeRect(gameMap.randomtlx, gameMap.randomtly, 50, 50);
//     ctx.fillText(gameMap.randomfield, gameMap.randomtlx, gameMap.randomtly + 25);
// }
// drawRandom()
// function selectField(e: MouseEvent) {
//     let x: number = Math.floor((gameMap.map.length * e.clientX) / (gameMap.map.length * 50)) - 1
//     let y: number = Math.floor((gameMap.map.length * e.clientY) / (gameMap.map.length * 50)) - 1
//     console.log(e)
// }
////////////////////////////////////////////////////////////////////////////
// function rotate(e: MouseEvent): void {
//     if (e.clientX >= 10 * 50 && e.clientX <= 12 * 50 && e.clientY <= 50) {
//         switch (gameMap.randomfield) {
//             case "topleft":
//                 gameMap.randomfield = "topright"
//                 break;
//             case "topright":
//                 gameMap.randomfield = "bottomright"
//                 break;
//             case "bottomright":
//                 gameMap.randomfield = "bottomleft"
//                 break;
//             case "bottomleft":
//                 gameMap.randomfield = "topleft"
//                 break;
//             case "vertical":
//                 gameMap.randomfield = "horizontal"
//                 break;
//             case "horizontal":
//                 gameMap.randomfield = "vertical"
//                 break;
//             case "tripleright":
//                 gameMap.randomfield = "tripledown"
//                 break;
//             case "tripledown":
//                 gameMap.randomfield = "tripleleft"
//                 break;
//             case "tripleleft":
//                 gameMap.randomfield = "tripleup"
//                 break;
//             case "tripleup":
//                 gameMap.randomfield = "tripleright"
//                 break;
//             default:
//                 break;
//         }
//     }
//     drawMap()
// }
// function drag(e: MouseEvent) {
//     console.log(e);
//     // if (e.clientX >= gameMap.randomtlx &&
//     //     e.clientX <= gameMap.randomtrx &&
//     //     e.clientY >= gameMap.randomtly &&
//     //     e.clientY <= gameMap.randomtry) {
//             console.log(e);
//             console.log(gameMap);
//             gameMap.calcPos()
//             console.log(gameMap.randomtlx);
//             drawMap()
//             drawRandom()
//     // }
// }
// // document.addEventListener("dblclick", rotate)
// // document.addEventListener("click", selectField)
// document.addEventListener("drag", drag)
// calcPos() {
//     this.randomtlx = 500;
//     this.randomtly = 0;
//     this.randomtrx = this.randomtlx + 50;
//     this.randomtry = this.randomtly;
//     this.randomblx = this.randomtlx;
//     this.randombly = this.randomtly + 50;
//     this.randombrx = this.randomtlx + 50;
//     this.randombry = this.randomtly + 50;
// }
// public calcPos() {
//     this.randomtlx = 500
//     this.randomtly = 0
//     this.randomtrx = this.randomtlx + 50
//     this.randomtry = this.randomtly
//     this.randomblx = this.randomtlx
//     this.randombly = this.randomtly + 50
//     this.randombrx = this.randomtlx + 50
//     this.randombry = this.randomtly + 50
// }
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
const gemTypes = ["ruby", "diamond", "gold", "silver", "emerald"];
const startLocations = [[0, 0], [6, 6], [0, 6], [6, 0]];
const treasureLocations = [];
/// ki kell venni a kezdohelyeket
const genTreasureLocations = () => {
    for (let i = 0; i < startmap.length; i++) {
        for (let j = 0; j < startmap.length; j++) {
            treasureLocations.push([i, j]);
        }
    }
};
genTreasureLocations();
const randomBetween = (min, max) => Math.floor(Math.random() * (max - min));
class GameMap {
    constructor() {
        this.generateMap = () => startmap.map(e => e.map(e => e === 'r' ?
            pieceTypes[Math.floor(Math.random() * pieceTypes.length)] : e));
        this.map = this.generateMap();
        this.randomfield = pieceTypes[Math.floor(Math.random() * pieceTypes.length)];
    }
}
class Treasure {
    constructor() {
        this.x = randomBetween(0, startmap.length);
        this.y = randomBetween(0, startmap.length);
        this.type = gemTypes[Math.floor(Math.random() * gemTypes.length)];
    }
}
class Player {
    constructor(x, y, tNumber) {
        this.x = x;
        this.y = y;
        this.treasureCards = [];
        for (let i = 0; i < tNumber; i++) {
            this.treasureCards.push(new Treasure());
        }
    }
}
class Game {
    constructor(playerNum, treasurePerPlayer) {
        this.playerNum = playerNum;
        this.treasurePerPlayer = treasurePerPlayer;
        this.treasureSum = playerNum * treasurePerPlayer;
        this.gameMap = new GameMap();
        this.players = [];
        this.treasuresAll = [];
        this.genPlayers();
        this.addTreasure();
    }
    genPlayers() {
        let remainingLoc = [...startLocations];
        for (let i = 0; i < this.playerNum; i++) {
            let loc = remainingLoc[randomBetween(0, remainingLoc.length)];
            remainingLoc.splice(remainingLoc.indexOf(loc), 1);
            this.players.push(new Player(loc[0], loc[1], this.treasurePerPlayer));
        }
    }
    addTreasure() {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].treasureCards.forEach(e => this.treasuresAll.push(e));
        }
    }
}
let game = new Game(2, 2);
const fields = document.querySelectorAll("div.field");
let gameArea = Array.from(fields);
split();
function split() {
    let results = [];
    while (gameArea.length > 0) {
        results.push(gameArea.splice(0, 7));
    }
    gameArea = Array.from(results);
}
updateMap();
function updateMap() {
    for (let i = 0; i < game.gameMap.map.length; i++) {
        for (let j = 0; j < game.gameMap.map.length; j++) {
            gameArea[i][j].innerText = game.gameMap.map[i][j];
        }
    }
    for (let i = 0; i < game.treasuresAll.length; i++) {
        gameArea[game.treasuresAll[i].x][game.treasuresAll[i].y].style.color = "red";
    }
    for (let i = 0; i < game.players.length; i++) {
        gameArea[game.players[i].x][game.players[i].y].style.color = "blue";
    }
}
const arrows = document.querySelectorAll("div.arrow");
