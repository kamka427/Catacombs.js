//Név: Neszlényi Kálmán Balázs
//Neptun kód: DPU51T
//Dátum: 2021. 11. 14.

//Konstans értékek a pályageneráláshoz

export class Field {
  type: Piece;
  rotation: number;
  avaliable: boolean;
  constructor(type: Piece, rotation: number) {
    this.type = type;
    this.rotation = rotation;
    this.avaliable = false;
  }
}

export type Piece = "straight" | "triple" | "edge";

export const pieceTypes: Array<Piece> = ["straight", "triple", "edge"];

export const startmap: Array<Array<Field>> = [
  [
    new Field("edge", 0),
    undefined,
    new Field("triple", 90),
    undefined,
    new Field("triple", 90),
    undefined,
    new Field("edge", 90),
  ],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [
    new Field("triple", 0),
    undefined,
    new Field("triple", 0),
    undefined,
    new Field("triple", 90),
    undefined,
    new Field("triple", 180),
  ],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [
    new Field("triple", 0),
    undefined,
    new Field("triple", 270),
    undefined,
    new Field("triple", 180),
    undefined,
    new Field("triple", 180),
  ],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [
    new Field("edge", 270),
    undefined,
    new Field("triple", 270),
    undefined,
    new Field("triple", 270),
    undefined,
    new Field("edge", 180),
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
export const genTreasureLocations = () => {
  const treasureLocations = [];
  for (let i = 0; i < startmap.length; i++) {
    for (let j = 0; j < startmap.length; j++) {
      if (
        !(i === 0 && j === 0) &&
        !(i === 6 && j === 6) &&
        !(i === 0 && j === 6) &&
        !(i === 6 && j === 0)
      )
        treasureLocations.push([i, j]);
    }
  }
  return treasureLocations;
};
