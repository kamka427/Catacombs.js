import {
  startmap,
  startLocations,
  Piece,
  Gem,
  gemTypes,
  genTreasureLocations,
  remainingElements,
  Field,
} from "./constants.js";

import { randomBetween } from "./utils.js";

class GameMap {
  map: Array<Array<Field>>;
  randomfield: Field;
  remaining: Array<Piece>;

  constructor() {
    this.remaining = [...remainingElements];
    this.map = this.generateMap();

    this.randomfield = this.generateRandom();
  }
  generateRandom() {
    const rnd = randomBetween(0, this.remaining.length);
    const field =
      this.remaining[rnd] === "straight"
        ? new Field(this.remaining[rnd], randomBetween(0, 1) * 90)
        : new Field(this.remaining[rnd], randomBetween(0, 3) * 90);
    this.remaining.splice(rnd, 1);
    return field;
  }
  generateMap = () =>
    startmap.map((e) =>
      e.map((e) => (e === undefined ? this.generateRandom() : e))
    );
}

class Treasure {
  row: number;
  col: number;
  type: Gem;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    this.type = gemTypes[Math.floor(Math.random() * gemTypes.length)];
  }
}

class Player {
  row: number;
  col: number;
  startRow: number;
  startCol: number;
  number: number;
  treasureCards: Array<Treasure>;
  isAnimated: boolean

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
    this.isAnimated = false
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
  fallenTreasure: Treasure;
  currentPlayer: number;
  availableFields: Array<Array<number>>;
  visited: Array<Array<number>>;
  phase: string;
  ended: boolean;
  lastPushed: string
  constructor(playerNum: number, treasurePerPlayer: number) {
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
    this.lastPushed = "none"
    // graphExplore(this);
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

class DraggableField {
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
}
