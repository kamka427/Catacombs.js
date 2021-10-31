export const pieceTypes = [
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
export const startmap = [
    ["topleft", "r", "tripledown", "r", "tripledown", "r", "topright"],
    ["r", "r", "r", "r", "r", "r", "r"],
    ["tripleright", "r", "tripleright", "r", "tripledown", "r", "vertical"],
    ["r", "r", "r", "r", "r", "r", "r"],
    ["tripleright", "r", "tripleup", "r", "tripleleft", "r", "vertical"],
    ["r", "r", "r", "r", "r", "r", "r"],
    ["bottomleft", "r", "tripleup", "r", "tripleup", "r", "bottomright"],
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
// export const treasureLocations: Array<Array<number>> = [];
export const genTreasureLocations = () => {
    const treasureLocations = [];
    for (let i = 0; i < startmap.length; i++) {
        for (let j = 0; j < startmap.length; j++) {
            if (!(i === 0 && j === 0 || i === 6 && j === 6))
                treasureLocations.push([i, j]);
        }
    }
    return treasureLocations;
};
// genTreasureLocations();
//# sourceMappingURL=constants.js.map