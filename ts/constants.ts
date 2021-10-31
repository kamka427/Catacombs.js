export type Piece =
  | "topleft"
  | "topright"
  | "bottomleft"
  | "bottomright"
  | "vertical"
  | "horizontal"
  | "tripleright"
  | "tripleleft"
  | "tripleup"
  | "tripledown"
  | "r";

export const pieceTypes: Array<Piece> = [
  "topleft",
  "topright",
  "bottomleft",
  "bottomright",
  "vertical",
  "horizontal",
  "tripleright",
  "tripleleft",
  "tripleup",
  "tripledown",
];

export const startmap: Array<Array<Piece>> = [
  ["topleft", "r", "tripledown", "r", "tripledown", "r", "topright"],
  ["r", "r", "r", "r", "r", "r", "r"],
  ["tripleright", "r", "tripleright", "r", "tripledown", "r", "vertical"],
  ["r", "r", "r", "r", "r", "r", "r"],
  ["tripleright", "r", "tripleup", "r", "tripleleft", "r", "vertical"],
  ["r", "r", "r", "r", "r", "r", "r"],
  ["bottomleft", "r", "tripleup", "r", "tripleup", "r", "bottomright"],
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
  const treasureLocations = []
  for (let i = 0; i < startmap.length; i++) {
    for (let j = 0; j < startmap.length; j++) {
      if(i === 0 && j===0 )
      continue
      else if( i === 6 && j ===6)
      continue
      else if( i === 0 && j ===6)
      continue
      else if( i ===6 && j ===0)
      continue
      else
      treasureLocations.push([i, j]);
    }
  }
  return treasureLocations
};
// genTreasureLocations();
