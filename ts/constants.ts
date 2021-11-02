export class Field {
  type: Piece;
  rotation: number;
  constructor(type: Piece, rotation: number) {
    this.type = type;
    this.rotation = rotation;
  }
}

export type Piece = "straight" | "triple" | "edge";

export const pieceTypes: Array<Piece> = ["straight", "triple", "edge"];

export const startmap: Array<Array<Field>> = [
  [
    new Field("edge", 0),
    undefined,
    new Field("triple", 1),
    undefined,
    new Field("triple", 1),
    undefined,
    new Field("edge", 1),
  ],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [
    new Field("triple", 0),
    undefined,
    new Field("triple", 0),
    undefined,
    new Field("triple", 1),
    undefined,
    new Field("triple", 2),
  ],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [
    new Field("triple", 0),
    undefined,
    new Field("triple", 3),
    undefined,
    new Field("triple", 2),
    undefined,
    new Field("triple", 2),
  ],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [
    new Field("edge", 3),
    undefined,
    new Field("triple", 3),
    undefined,
    new Field("triple", 3),
    undefined,
    new Field("edge", 2),
  ],
];

export const remainingElements: Array<Piece> = [
  ...new Array(13).fill("straight"),
  ...new Array(15).fill("edge"),
  ...new Array(6).fill("triple"),
];

export type Gem = "ruby" | "diamond" | "gold" | "silver" | "emerald";
export const gemTypes: Array<Gem> = [
  "ruby",
  "diamond",
  "gold",
  "silver",
  "emerald",
];
export const startLocations: Array<Array<number>> = [
  [0, 0],
  [6, 6],
  [0, 6],
  [6, 0],
];
// export const treasureLocations: Array<Array<number>> = [];
export const genTreasureLocations = () => {
  const treasureLocations = [];
  for (let i = 0; i < startmap.length; i++) {
    for (let j = 0; j < startmap.length; j++) {
      if (i === 0 && j === 0) continue;
      else if (i === 6 && j === 6) continue;
      else if (i === 0 && j === 6) continue;
      else if (i === 6 && j === 0) continue;
      else treasureLocations.push([i, j]);
    }
  }
  return treasureLocations;
};
// genTreasureLocations();
