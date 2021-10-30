System.register("constants", [], function (exports_1, context_1) {
    "use strict";
    var pieceTypes, startmap, gemTypes, startLocations, treasureLocations, genTreasureLocations;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("pieceTypes", pieceTypes = [
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
            ]);
            exports_1("startmap", startmap = [
                ["topleft", "r", "tripledown", "r", "tripledown", "r", "topright"],
                ["r", "r", "r", "r", "r", "r", "r"],
                ["tripleright", "r", "tripleright", "r", "tripledown", "r", "vertical"],
                ["r", "r", "r", "r", "r", "r", "r"],
                ["tripleright", "r", "tripleup", "r", "tripleleft", "r", "vertical"],
                ["r", "r", "r", "r", "r", "r", "r"],
                ["bottomleft", "r", "tripleup", "r", "tripleup", "r", "bottomright"],
            ]);
            exports_1("gemTypes", gemTypes = ["ruby", "diamond", "gold", "silver", "emerald"]);
            exports_1("startLocations", startLocations = [
                [0, 0],
                [6, 6],
                [0, 6],
                [6, 0],
            ]);
            exports_1("treasureLocations", treasureLocations = []);
            /// ki kell venni a kezdohelyeket
            exports_1("genTreasureLocations", genTreasureLocations = () => {
                for (let i = 0; i < startmap.length; i++) {
                    for (let j = 0; j < startmap.length; j++) {
                        treasureLocations.push([i, j]);
                    }
                }
            });
            // genTreasureLocations();
        }
    };
});
System.register("utils", [], function (exports_2, context_2) {
    "use strict";
    var randomBetween;
    var __moduleName = context_2 && context_2.id;
    function swap(x, y) {
        const t = x;
        x = y;
        y = t;
        return [x, y];
    }
    exports_2("swap", swap);
    return {
        setters: [],
        execute: function () {
            exports_2("randomBetween", randomBetween = (min, max) => Math.floor(Math.random() * (max - min)));
        }
    };
});
System.register("classes", ["constants", "utils"], function (exports_3, context_3) {
    "use strict";
    var constants_1, utils_1, GameMap, Treasure, Player, Game, DraggableField;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (constants_1_1) {
                constants_1 = constants_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            GameMap = class GameMap {
                constructor() {
                    this.generateMap = () => constants_1.startmap.map((e) => e.map((e) => e === "r"
                        ? constants_1.pieceTypes[Math.floor(Math.random() * constants_1.pieceTypes.length)]
                        : e));
                    this.map = this.generateMap();
                    this.randomfield =
                        constants_1.pieceTypes[Math.floor(Math.random() * constants_1.pieceTypes.length)];
                }
            };
            exports_3("GameMap", GameMap);
            Treasure = class Treasure {
                constructor() {
                    this.x = utils_1.randomBetween(0, constants_1.startmap.length);
                    this.y = utils_1.randomBetween(0, constants_1.startmap.length);
                    this.type = constants_1.gemTypes[Math.floor(Math.random() * constants_1.gemTypes.length)];
                }
            };
            exports_3("Treasure", Treasure);
            Player = class Player {
                constructor(x, y, tNumber) {
                    this.x = x;
                    this.y = y;
                    this.treasureCards = [];
                    for (let i = 0; i < tNumber; i++) {
                        this.treasureCards.push(new Treasure());
                    }
                }
            };
            exports_3("Player", Player);
            Game = class Game {
                constructor(playerNum, treasurePerPlayer) {
                    this.playerNum = playerNum;
                    this.treasurePerPlayer = treasurePerPlayer;
                    this.treasureSum = playerNum * treasurePerPlayer;
                    this.gameMap = new GameMap();
                    this.players = [];
                    this.treasuresAll = [];
                    this.genPlayers();
                    this.addTreasure();
                }
                genPlayers() {
                    const remainingLoc = [...constants_1.startLocations];
                    for (let i = 0; i < this.playerNum; i++) {
                        const loc = remainingLoc[utils_1.randomBetween(0, remainingLoc.length)];
                        remainingLoc.splice(remainingLoc.indexOf(loc), 1);
                        this.players.push(new Player(loc[0], loc[1], this.treasurePerPlayer));
                    }
                }
                addTreasure() {
                    for (let i = 0; i < this.players.length; i++) {
                        this.players[i].treasureCards.forEach((e) => this.treasuresAll.push(e));
                    }
                }
            };
            exports_3("Game", Game);
            DraggableField = class DraggableField {
                constructor() {
                    this.x = 500;
                    this.y = 0;
                    this.width = 50;
                    this.height = 50;
                }
                updatePos(newX, newY) {
                    this.x = newX;
                    this.y = newY;
                }
            };
            exports_3("DraggableField", DraggableField);
        }
    };
});
System.register("map", ["classes", "utils"], function (exports_4, context_4) {
    "use strict";
    var classes_1, utils_2, gameArea, ctx, game, drag;
    var __moduleName = context_4 && context_4.id;
    function drawMap() {
        ctx.clearRect(0, 0, gameArea.width, gameArea.height);
        for (let i = 0; i < game.gameMap.map.length + 2; i++) {
            for (let j = 0; j < game.gameMap.map.length + 2; j++) {
                if (i === 0 ||
                    j === 0 ||
                    i === game.gameMap.map.length + 1 ||
                    j === game.gameMap.map.length + 1) {
                    ctx.fillText("side", i * 50, j * 50 + 25);
                }
                else
                    ctx.fillText(game.gameMap.map[i - 1][j - 1], i * 50, j * 50 + 25);
                ctx.strokeRect(i * 50, j * 50, 50, 50);
            }
        }
    }
    function drawRandom() {
        ctx.strokeRect(drag.x, drag.y, drag.width, drag.height);
        ctx.fillText(game.gameMap.randomfield, drag.x, drag.y + 25);
    }
    function selectField(e) {
        const x = Math.floor((game.gameMap.map.length * e.clientX) / (game.gameMap.map.length * 50)) - 1;
        const y = Math.floor((game.gameMap.map.length * e.clientY) / (game.gameMap.map.length * 50)) - 1;
        console.log(e);
        console.log(x);
        console.log(y);
    }
    function rotate(e) {
        if (e.clientX >= 10 * 50 && e.clientX <= 12 * 50 && e.clientY <= 50) {
            switch (game.gameMap.randomfield) {
                case "topleft":
                    game.gameMap.randomfield = "topright";
                    break;
                case "topright":
                    game.gameMap.randomfield = "bottomright";
                    break;
                case "bottomright":
                    game.gameMap.randomfield = "bottomleft";
                    break;
                case "bottomleft":
                    game.gameMap.randomfield = "topleft";
                    break;
                case "vertical":
                    game.gameMap.randomfield = "horizontal";
                    break;
                case "horizontal":
                    game.gameMap.randomfield = "vertical";
                    break;
                case "tripleright":
                    game.gameMap.randomfield = "tripledown";
                    break;
                case "tripledown":
                    game.gameMap.randomfield = "tripleleft";
                    break;
                case "tripleleft":
                    game.gameMap.randomfield = "tripleup";
                    break;
                case "tripleup":
                    game.gameMap.randomfield = "tripleright";
                    break;
                default:
                    break;
            }
        }
        drawMap();
    }
    function pushRow(rowNum, direction) {
        if (direction === "left") {
            console.log(utils_2.swap(game.gameMap.map[0][rowNum], game.gameMap.randomfield));
            console.log(game.gameMap.map[0][rowNum]);
            console.log(game.gameMap.randomfield);
            drawMap();
            drawRandom();
        }
    }
    return {
        setters: [
            function (classes_1_1) {
                classes_1 = classes_1_1;
            },
            function (utils_2_1) {
                utils_2 = utils_2_1;
            }
        ],
        execute: function () {
            gameArea = document.querySelector("canvas#gameArea");
            ctx = gameArea.getContext("2d");
            game = new classes_1.Game(2, 2);
            drag = new classes_1.DraggableField();
            drawMap();
            drawRandom();
            document.addEventListener("click", selectField);
        }
    };
});
//# sourceMappingURL=app.js.map