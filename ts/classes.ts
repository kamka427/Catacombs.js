import {
  startmap,
  startLocations,
  Piece,
  pieceTypes,
  Gem,
  gemTypes,
} from "./constants.js";
import { randomBetween } from "./utils.js";
export class GameMap {
  map: Array<Array<Piece>>;
  randomfield: Piece;

  constructor() {
    this.map = this.generateMap();
    this.randomfield =
      pieceTypes[Math.floor(Math.random() * pieceTypes.length)];
  }
  generateMap = () =>
    startmap.map((e) =>
      e.map((e) =>
        e === "r"
          ? pieceTypes[Math.floor(Math.random() * pieceTypes.length)]
          : e
      )
    );
}

export class Treasure {
  x: number;
  y: number;
  type: Gem;

  constructor() {
    this.x = randomBetween(0, startmap.length);
    this.y = randomBetween(0, startmap.length);
    this.type = gemTypes[Math.floor(Math.random() * gemTypes.length)];
  }
}

export class Player {
  x: number;
  y: number;
  treasureCards: Array<Treasure>;

  constructor(x: number, y: number, tNumber: number) {
    this.x = x;
    this.y = y;
    this.treasureCards = [];
    for (let i = 0; i < tNumber; i++) {
      this.treasureCards.push(new Treasure());
    }
  }
}

export class Game {
  playerNum: number;
  treasurePerPlayer: number;
  treasureSum: number;
  gameMap: GameMap;
  draggableField: DraggableField
  players: Array<Player>;
  treasuresAll: Array<Treasure>;
  constructor(playerNum: number, treasurePerPlayer: number) {
    this.playerNum = playerNum;
    this.treasurePerPlayer = treasurePerPlayer;
    this.treasureSum = playerNum * treasurePerPlayer;
    this.gameMap = new GameMap();
    this.draggableField = new DraggableField();
    this.players = [];
    this.treasuresAll = [];
    this.genPlayers();
    this.addTreasure();
  }
  genPlayers() {
    const remainingLoc: Array<Array<number>> = [...startLocations];
    for (let i = 0; i < this.playerNum; i++) {
      const loc: number[] = remainingLoc[randomBetween(0, remainingLoc.length)];
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
  x: number;
  y: number;
  width: number;
  height: number;
  isDragged: boolean

  constructor() {
    this.x = 500;
    this.y = 0;
    this.width = 50;
    this.height = 50;
    this.isDragged = false
  }

  updatePos(newX: number, newY: number) {
    this.x = newX;
    this.y = newY;
  }
}
