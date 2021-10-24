type piece = "topleft" | "topright" | "bottomleft" | "bottomright" |
    "linevertical" | "linehorizontal" | "lineright" | "lineleft" | "lineup" |
    "linedown" | "random"

const pieceTypes: Array<piece> = ["topleft" , "topright" , "bottomleft" , "bottomright" ,
"linevertical" , "linehorizontal" , "lineright" , "lineleft" , "lineup" ,
"linedown"]

const startmap: Array<Array<piece>> = [
    ["topleft", "random", "linedown", "random", "linedown", "random", "topright"],
    ["random","random", "random", "random", "random", "random", "random"],
    ["lineright", "random", "lineright", "random", "linedown", "random", "linevertical"],
    ["random","random", "random", "random", "random", "random", "random"],
    ["lineright", "random", "lineup", "random", "lineleft", "random", "linevertical"],
    ["random","random", "random", "random", "random", "random", "random"],
    ["bottomleft", "random", "lineup", "random", "lineup", "random", "bottomright"],
]

class map{
    map: Array<Array<piece>>
    randomfield: piece
    
    
    constructor(){
        this.map = this.generateMap()
        this.randomfield = pieceTypes[Math.floor(Math.random()*pieceTypes.length)]
    }
    
    generateMap = () => startmap.map(e=>e.map(e => e ==='random' ? pieceTypes[Math.floor(Math.random()*pieceTypes.length)] : e))
}

let x = new map();