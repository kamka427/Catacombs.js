const pieceTypes = ["topleft", "topright", "bottomleft", "bottomright",
    "linevertical", "linehorizontal", "lineright", "lineleft", "lineup",
    "linedown"];
const startmap = [
    ["topleft", "random", "linedown", "random", "linedown", "random", "topright"],
    ["random", "random", "random", "random", "random", "random", "random"],
    ["lineright", "random", "lineright", "random", "linedown", "random", "linevertical"],
    ["random", "random", "random", "random", "random", "random", "random"],
    ["lineright", "random", "lineup", "random", "lineleft", "random", "linevertical"],
    ["random", "random", "random", "random", "random", "random", "random"],
    ["bottomleft", "random", "lineup", "random", "lineup", "random", "bottomright"],
];
// let startmap: Array<Array<piece>> = [
//     ["topleft", "random", "linedown", "random", "linedown", "random", "topright"],
//     ["random","random", "random", "random", "random", "random", "random"],
//     ["lineright", "random", "lineright", "random", "linedown", "random", "linevertical"],
//     ["random","random", "random", "random", "random", "random", "random"],
//     ["lineright", "random", "lineup", "random", "lineleft", "random", "linevertical"],
//     ["random","random", "random", "random", "random", "random", "random"],
//     ["bottomleft", "random", "lineup", "random", "lineup", "random", "bottomright"],
// ]
// let generateMap = () => generatedMap =  startmap.map(n=>n.map(e => e ==='random' ? pieceTypes[Math.floor(Math.random()*pieceTypes.length)] : e))
// let generatedMap: Array<Array<piece>>  = generateMap()
class map {
    constructor() {
        this.generateMap = () => startmap.map(e => e.map(e => e === 'random' ? pieceTypes[Math.floor(Math.random() * pieceTypes.length)] : e));
        this.map = this.generateMap();
        this.randomfield = pieceTypes[Math.floor(Math.random() * pieceTypes.length)];
    }
}
let x = new map();
