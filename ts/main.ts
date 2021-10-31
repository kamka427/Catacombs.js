import { Game } from "./classes.js";
import { drawMap } from "./graphics.js";
import { rotate, step } from "./utils.js";
import { clickArrow, dragStart } from "./mouse.js";
import { dragEnd } from "./mouse.js";
import { dragEvt } from "./mouse.js";

const startBtn = document.querySelector("#start");
const manualBtn = document.querySelector("#manual");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const gameArea: HTMLCanvasElement = document.querySelector("canvas#gameArea");
const manual = document.querySelector("p")

let game: Game;

function startGame() {
  const pCount: number = <number><unknown>(<HTMLInputElement>document.querySelector("#pcount")).value;
  const tCount: number =  <number><unknown>(<HTMLInputElement>document.querySelector("#tcountpp")).value;

  game = new Game(pCount, tCount);
  console.log(game);
  gameArea.classList.remove("hidden");
  drawMap(game);
}

function showManual() {
  manual.classList.toggle("hidden")
  gameArea.classList.add("hidden");

}



startBtn.addEventListener("click", startGame);
manualBtn.addEventListener("click", showManual)
gameArea.addEventListener("mousedown", () => dragStart(game));
gameArea.addEventListener("mousemove", (e) => dragEvt(game, gameArea, e));
gameArea.addEventListener("mouseup", () => dragEnd(game));
gameArea.addEventListener("click", (e) => rotate(game, gameArea, e));
gameArea.addEventListener("click", (e) => clickArrow(game, gameArea, e))
gameArea.addEventListener("click", (e) => step(gameArea, game, e))
// gameArea.addEventListener("click",()=>push(1,game,"up"))
