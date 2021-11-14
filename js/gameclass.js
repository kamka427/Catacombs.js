import { startmap, startLocations, gemTypes, genTreasureLocations, remainingElements, Field, } from "./constants.js";
import { randomBetween } from "./utils.js";
class GameMap {
    constructor() {
        this.generateMap = () => startmap.map((e) => e.map((e) => (e === undefined ? this.generateRandom() : e)));
        this.remaining = [...remainingElements];
        this.map = this.generateMap();
        this.randomfield = this.generateRandom();
    }
    generateRandom() {
        const rnd = randomBetween(0, this.remaining.length);
        const field = this.remaining[rnd] === "straight"
            ? new Field(this.remaining[rnd], randomBetween(0, 1) * 90)
            : new Field(this.remaining[rnd], randomBetween(0, 3) * 90);
        this.remaining.splice(rnd, 1);
        return field;
    }
}
class Treasure {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.type = gemTypes[Math.floor(Math.random() * gemTypes.length)];
    }
}
class Player {
    constructor(row, col, pNumber, treasures) {
        this.row = row;
        this.col = col;
        this.startRow = row;
        this.startCol = col;
        this.number = pNumber;
        this.treasureCards = treasures;
        this.isAnimated = false;
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
        this.genPlayers();
        this.addTreasure();
        this.fallenTreasure = null;
        this.currentPlayer = 0;
        this.availableFields = [];
        this.visited = [
            [...new Array(7).fill(1)],
            [...new Array(7).fill(1)],
            [...new Array(7).fill(1)],
            [...new Array(7).fill(1)],
            [...new Array(7).fill(1)],
            [...new Array(7).fill(1)],
            [...new Array(7).fill(1)],
        ];
        this.phase = "insert";
        this.ended = false;
        this.lastPushed = "none";
        // graphExplore(this);
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
class DraggableField {
    constructor() {
        this.x = 500;
        this.y = 0;
        this.width = 50;
        this.height = 50;
        this.isDragged = false;
    }
}
//# sourceMappingURL=gameclass.js.map