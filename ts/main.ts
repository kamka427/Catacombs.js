import { Game } from "./gameclass.js";
import { drawMap } from "./graphics.js";
import { rotate, step } from "./utils.js";
import { clickArrow, dragStart, gameLoop } from "./mouse.js";
import { dragEnd } from "./mouse.js";
import { dragEvt } from "./mouse.js";

export let game: Game;
export const gameArea: HTMLCanvasElement =
  document.querySelector("canvas#gameArea");

const startBtn = document.querySelector("#start");
const manualBtn = document.querySelector("#manual");
const saveBtn = document.querySelector("#save");
const loadBtn = document.querySelector("#load");
const manual = document.querySelector("p");

const state = localStorage.getItem("state");
if (state !== null) loadBtn.classList.toggle("hidden");

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
function loadGame() {
  game = JSON.parse(state);

  console.log(game);
  gameArea.classList.remove("hidden");
  drawMap();
}

function saveGame() {
  localStorage.setItem("state", JSON.stringify(game));
}

function showManual() {
  manual.classList.toggle("hidden");
  gameArea.classList.add("hidden");
}

startBtn.addEventListener("click", startGame);
manualBtn.addEventListener("click", showManual);
saveBtn.addEventListener("click", saveGame);
loadBtn.addEventListener("click", loadGame);
gameArea.addEventListener("mousedown", dragStart);
gameArea.addEventListener("mousemove", dragEvt);
gameArea.addEventListener("mouseup", dragEnd);
gameArea.addEventListener("click", rotate);
gameArea.addEventListener("click", gameLoop);
