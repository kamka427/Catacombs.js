import { startmap, startLocations, pieceTypes, gemTypes, genTreasureLocations, } from "./constants.js";
import { graphNext } from "./graphexporation.js";
import { randomBetween } from "./utils.js";
export class GameMap {
    constructor() {
        this.generateMap = () => startmap.map((e) => e.map((e) => e === "r"
            ? pieceTypes[Math.floor(Math.random() * pieceTypes.length)]
            : e));
        this.map = this.generateMap();
        this.randomfield =
            pieceTypes[Math.floor(Math.random() * pieceTypes.length)];
    }
}
export class Treasure {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.type = gemTypes[Math.floor(Math.random() * gemTypes.length)];
    }
}
export class Player {
    constructor(row, col, pNumber, treasures) {
        this.row = row;
        this.col = col;
        this.startRow = row;
        this.startCol = col;
        this.number = pNumber;
        this.treasureCards = treasures;
    }
}
export class Game {
    constructor(playerNum, treasurePerPlayer) {
        this.playerNum = playerNum;
        this.treasurePerPlayer = treasurePerPlayer;
        this.treasureSum = playerNum * treasurePerPlayer;
        this.gameMap = new GameMap();
        this.draggableField = new DraggableField();
        this.players = [];
        this.treasuresAll = [];
        this.treasureLocations = genTreasureLocations();
        console.log(this.treasureLocations);
        this.genPlayers();
        this.addTreasure();
        this.fallenTreasure = null;
        this.currentPlayer = 0;
        graphNext(this.players[this.currentPlayer].row, this.players[this.currentPlayer].col, this);
    }
    genPlayers() {
        const remainingLoc = [...startLocations];
        for (let i = 0; i < this.playerNum; i++) {
            const loc = remainingLoc[randomBetween(0, remainingLoc.length)];
            remainingLoc.splice(remainingLoc.indexOf(loc), 1);
            this.players.push(new Player(loc[0], loc[1], i, this.genTreasure(this.treasurePerPlayer)));
        }
    }
    genTLoc() {
        const loc = this.treasureLocations[randomBetween(0, this.treasureLocations.length)];
        this.treasureLocations.splice(this.treasureLocations.indexOf(loc), 1);
        return loc;
    }
    genTreasure(n) {
        const treasures = [];
        for (let i = 0; i < n; i++) {
            const loc = this.genTLoc();
            treasures.push(new Treasure(loc[0], loc[1]));
        }
        return treasures;
    }
    addTreasure() {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].treasureCards.forEach((e) => this.treasuresAll.push(e));
        }
    }
}
export class DraggableField {
    constructor() {
        this.x = 500;
        this.y = 0;
        this.width = 50;
        this.height = 50;
        this.isDragged = false;
    }
    updatePos(newX, newY) {
        this.x = newX;
        this.y = newY;
    }
}
//# sourceMappingURL=classes.js.map