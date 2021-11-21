//Név: Neszlényi Kálmán Balázs
//Neptun kód: DPU51T
//Dátum: 2021. 11. 14.
//Konstans értékek a pályageneráláshoz
export class Field {
    constructor(type, rotation) {
        this.type = type;
        this.rotation = rotation;
        this.avaliable = false;
    }
}
export const pieceTypes = ["straight", "triple", "edge"];
export const startmap = [
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
export const remainingElements = [
    ...new Array(13).fill("straight"),
    ...new Array(15).fill("edge"),
    ...new Array(6).fill("triple"),
];
export const gemTypes = [
    "ruby",
    "diamond",
    "gold",
    "silver",
    "emerald",
];
export const startLocations = [
    [0, 0],
    [6, 6],
    [0, 6],
    [6, 0],
];
export const genTreasureLocations = () => {
    const treasureLocations = [];
    for (let i = 0; i < startmap.length; i++) {
        for (let j = 0; j < startmap.length; j++) {
            if (!(i === 0 && j === 0) &&
                !(i === 6 && j === 6) &&
                !(i === 0 && j === 6) &&
                !(i === 6 && j === 0))
                treasureLocations.push([i, j]);
        }
    }
    return treasureLocations;
};
