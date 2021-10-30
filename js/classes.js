import { startmap, startLocations, pieceTypes, gemTypes, } from "./constants.js";
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
    constructor() {
        this.x = randomBetween(0, startmap.length);
        this.y = randomBetween(0, startmap.length);
        this.type = gemTypes[Math.floor(Math.random() * gemTypes.length)];
    }
}
export class Player {
    constructor(x, y, tNumber) {
        this.x = x;
        this.y = y;
        this.treasureCards = [];
        for (let i = 0; i < tNumber; i++) {
            this.treasureCards.push(new Treasure());
        }
    }
}
export class Game {
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
        const remainingLoc = [...startLocations];
        for (let i = 0; i < this.playerNum; i++) {
            const loc = remainingLoc[randomBetween(0, remainingLoc.length)];
            remainingLoc.splice(remainingLoc.indexOf(loc), 1);
            this.players.push(new Player(loc[0], loc[1], this.treasurePerPlayer));
        }
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