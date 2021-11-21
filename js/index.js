//Név: Neszlényi Kálmán Balázs
//Neptun kód: DPU51T
//Dátum: 2021. 11. 14.
import { Game } from "./gameclass.js";
import { drawMap } from "./graphics.js";
import { rotate, step } from "./utils.js";
import { clickArrow, pushPreview } from "./mouse.js";
import { graphExplore } from "./graphexporation.js";
//Főosztály
export let game;
export const gameArea = document.querySelector("canvas#gameArea");
const statusArea = document.querySelector("canvas#statusArea")
const start = document.querySelector("#startscreen");
const startBtn = document.querySelector("#start");
const manualBtn = document.querySelector("#manual");
const saveBtn = document.querySelector("#save");
const loadBtn = document.querySelector("#load");
const manual = document.querySelector("#manualArea");
const end = document.querySelector("#end");
const restartBtn = document.querySelector("#restart");
const endText = document.querySelector("#endtext");
let pCount = document.querySelector("#pcount").value;
let tCount = document.querySelector("#tcountpp").value;
const treasureInput = document.querySelector("#tcountpp");
function inputUpdate() {
    pCount = document.querySelector("#pcount").value;
    treasureInput.setAttribute("max", (24 / pCount).toString());
    tCount = document.querySelector("#tcountpp").value;
    if (tCount > 24 / pCount) {
        tCount = 24 / pCount;
    }
}
const state = localStorage.getItem("state");
if (state !== null)
    loadBtn.classList.toggle("hidden");
function startGame() {
    start.classList.add("hidden");
    game = new Game(pCount, tCount);
    saveBtn.classList.remove("hidden");
    gameArea.classList.remove("hidden");
    statusArea.classList.remove("hidden");
    manual.classList.add("hidden");
    game.availableFields = [];
    for (let i = 0; i < game.gameMap.map.length; i++) {
        for (let j = 0; j < game.gameMap.map.length; j++) {
            game.gameMap.map[i][j].avaliable = false;
        }
    }
    drawMap();
}
function loadGame() {
    start.classList.add("hidden");
    manual.classList.add("hidden");
    const state = localStorage.getItem("state");
    game = JSON.parse(state);
    game.treasuresAll = []
    for (let i = 0; i < game.players.length; i++) {
        game.players[i].treasureCards.forEach((e) => game.treasuresAll.push(e));
    }
    saveBtn.classList.remove("hidden");
    gameArea.classList.remove("hidden");
    statusArea.classList.remove("hidden");
    drawMap();
}
function saveGame() {
    localStorage.setItem("state", JSON.stringify(game));
}
function showManual() {
    manual.classList.toggle("hidden");
}
function gameLoop(e) {
    if (game.ended === false) {
        if (game.phase === "insert") {
            if (clickArrow(e) !== false) {
                game.phase = "step";
                game.draggableField.x = 500;
                game.draggableField.y = 0;
                graphExplore(game);
                drawMap();
                return;
            }
        }
        if (game.phase === "step") {
            if (step(e) !== false) {
                game.phase = "insert";
                drawMap();
            }
        }
    }
    if (game.ended === true) {
        end.classList.remove("hidden");
        gameArea.classList.add("hidden");
        statusArea.classList.add("hidden");
        saveBtn.classList.add("hidden");
        endText.innerHTML =
            "Az " + (game.currentPlayer + 1) + ". játékos nyerte a játékot!";
    }
}
function restart() {
    gameArea.classList.add("hidden");
    statusArea.classList.add("hidden");
    game = null;
    end.classList.add("hidden");
    start.classList.remove("hidden");
    saveBtn.classList.add("hidden");
}
gameArea.addEventListener("contextmenu", (e) => e.preventDefault());
startBtn.addEventListener("click", startGame);
manualBtn.addEventListener("click", showManual);
saveBtn.addEventListener("click", saveGame);
loadBtn.addEventListener("click", loadGame);
restartBtn.addEventListener("click", restart);
gameArea.addEventListener("mouseup", rotate);
gameArea.addEventListener("click", gameLoop);
gameArea.addEventListener("mousemove", pushPreview);
document.addEventListener("input", inputUpdate);
