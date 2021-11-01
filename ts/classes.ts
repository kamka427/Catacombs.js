import {
  startmap,
  startLocations,
  Piece,
  pieceTypes,
  Gem,
  gemTypes,
  genTreasureLocations,
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
  row: number;
  col: number;
  type: Gem;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    this.type = gemTypes[Math.floor(Math.random() * gemTypes.length)];
  }
}

export class Player {
  row: number;
  col: number;
  startRow: number;
  startCol: number;
  number: number;
  treasureCards: Array<Treasure>;

  constructor(
    row: number,
    col: number,
    pNumber: number,
    treasures: Array<Treasure>
  ) {
    this.row = row;
    this.col = col;
    this.startRow = row;
    this.startCol = col;
    this.number = pNumber;
    this.treasureCards = treasures;
  }
}

export class Game {
  playerNum: number;
  treasurePerPlayer: number;
  treasureSum: number;
  gameMap: GameMap;
  draggableField: DraggableField;
  players: Array<Player>;
  treasuresAll: Array<Treasure>;
  treasureLocations: Array<Array<number>>;
  fallenTreasure: Treasure
  currentPlayer: number
  constructor(playerNum: number, treasurePerPlayer: number) {
    this.playerNum = playerNum;
    this.treasurePerPlayer = treasurePerPlayer;
    this.treasureSum = playerNum * treasurePerPlayer;
    this.gameMap = new GameMap();
    this.draggableField = new DraggableField();
    this.players = [];
    this.treasuresAll = [];
    this.treasureLocations = genTreasureLocations();
    console.log(this.treasureLocations)
    this.genPlayers();
    this.addTreasure();
    this.fallenTreasure = null
    this.currentPlayer = 0
  }
  genPlayers() {
    const remainingLoc: Array<Array<number>> = [...startLocations];
    for (let i = 0; i < this.playerNum; i++) {
      const loc: number[] = remainingLoc[randomBetween(0, remainingLoc.length)];
      remainingLoc.splice(remainingLoc.indexOf(loc), 1);
      this.players.push(
        new Player(loc[0], loc[1], i, this.genTreasure(this.treasurePerPlayer))
      );
    }
  }
  genTLoc() {
    const loc =
      this.treasureLocations[randomBetween(0, this.treasureLocations.length)];
    this.treasureLocations.splice(this.treasureLocations.indexOf(loc), 1);
    return loc;
  }
  genTreasure(n: number) {
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
  x: number;
  y: number;
  width: number;
  height: number;
  isDragged: boolean;

  constructor() {
    this.x = 500;
    this.y = 0;
    this.width = 50;
    this.height = 50;
    this.isDragged = false;
  }

  updatePos(newX: number, newY: number) {
    this.x = newX;
    this.y = newY;
  }
}
