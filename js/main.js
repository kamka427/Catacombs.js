import { Game } from "./classes.js";
import { drawMap } from "./graphics.js";
import { rotate } from "./utils.js";
import { clickArrow, dragStart } from "./mouse.js";
import { dragEnd } from "./mouse.js";
import { dragEvt } from "./mouse.js";
const startBtn = document.querySelector("#start");
const manualBtn = document.querySelector("#manual");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const gameArea = document.querySelector("canvas#gameArea");
let game;
function startGame() {
    const pCount = document.querySelector("#pcount").value;
    const tCount = document.querySelector("#tcountpp").value;
    game = new Game(pCount, tCount);
    console.log(game);
    gameArea.classList.remove("hidden");
    drawMap(game);
}
startBtn.addEventListener("click", startGame);
gameArea.addEventListener("mousedown", () => dragStart(game));
gameArea.addEventListener("mousemove", (e) => dragEvt(game, gameArea, e));
gameArea.addEventListener("mouseup", () => dragEnd(game));
gameArea.addEventListener("click", (e) => rotate(game, gameArea, e));
gameArea.addEventListener("click", (e) => clickArrow(game, gameArea, e));
// gameArea.addEventListener("click",()=>push(1,game,"up"))
//# sourceMappingURL=main.js.map