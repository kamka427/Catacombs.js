import { Game } from "./gameclass.js";
import { drawMap } from "./graphics.js";
import { rotate, step } from "./utils.js";
import { clickArrow, dragStart } from "./mouse.js";
import { dragEnd } from "./mouse.js";
import { dragEvt } from "./mouse.js";

export let game: Game;
export const gameArea: HTMLCanvasElement =
  document.querySelector("canvas#gameArea");

const startBtn = document.querySelector("#start");
const manualBtn = document.querySelector("#manual");
const manual = document.querySelector("p");

function startGame() {
  const pCount: number = <number>(
    (<unknown>(<HTMLInputElement>document.querySelector("#pcount")).value)
  );
  const tCount: number = <number>(
    (<unknown>(<HTMLInputElement>document.querySelector("#tcountpp")).value)
  );

  game = new Game(pCount, tCount);
  console.log(game);
  gameArea.classList.remove("hidden");
  drawMap();
}

function showManual() {
  manual.classList.toggle("hidden");
  gameArea.classList.add("hidden");
}

startBtn.addEventListener("click", startGame);
manualBtn.addEventListener("click", showManual);
gameArea.addEventListener("mousedown", dragStart);
gameArea.addEventListener("mousemove", dragEvt);
gameArea.addEventListener("mouseup", dragEnd);
gameArea.addEventListener("click", rotate);
gameArea.addEventListener("click", clickArrow);
gameArea.addEventListener("click", step);
// gameArea.addEventListener("click",()=>push(1,game,"up"))
