import { Game } from "./gameclass.js";
import { drawMap } from "./graphics.js";
import { endTurn, rotate, step } from "./utils.js";
import { clickArrow, dragStart } from "./mouse.js";
import { dragEnd } from "./mouse.js";
import { dragEvt } from "./mouse.js";
import { graphExplore } from "./graphexporation.js";

export let game: Game;
export const gameArea: HTMLCanvasElement =
  document.querySelector("canvas#gameArea");

const start = document.querySelector("#startscreen")
const startBtn = document.querySelector("#start");
const manualBtn = document.querySelector("#manual");
const saveBtn = document.querySelector("#save");
const loadBtn = document.querySelector("#load");
const manual = document.querySelector("p");
const end = document.querySelector("#end");
const restartBtn = document.querySelector("#restart");
const endText = document.querySelector("#endtext")

const state = localStorage.getItem("state");
if (state !== null) loadBtn.classList.toggle("hidden");

function startGame() {
  const pCount: number = <number>(
    (<unknown>(<HTMLInputElement>document.querySelector("#pcount")).value)
  );
  const tCount: number = <number>(
    (<unknown>(<HTMLInputElement>document.querySelector("#tcountpp")).value)
  );

  start.classList.add("hidden")
  game = new Game(pCount, tCount);

  gameArea.classList.remove("hidden");
  drawMap();
}
function loadGame() {
  start.classList.add("hidden")

  const state = localStorage.getItem("state");
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
  gameArea.classList.toggle("hidden");
}

function gameLoop(e: MouseEvent) {
  if (game.ended === false) {
    if (game.phase === "insert") {
      if (clickArrow(e) !== false) {
        game.phase = "step";
        graphExplore(game);
        drawMap();
        return;
      }
    }
    if (game.phase === "step") {
      if (step(e) !== false) {
        game.phase = "insert";
        return;
      }
    }
  } else if(game.ended === true) {
    end.classList.remove("hidden")
    gameArea.classList.add("hidden")
    endText.innerHTML = "Az " + (game.currentPlayer + 1) + ". játékos nyerte a játékot!"

  }
}
function restart(){
  gameArea.classList.add("hidden")
  game = null
  end.classList.add("hidden")
  start.classList.remove("hidden")
}


startBtn.addEventListener("click", startGame);
manualBtn.addEventListener("click", showManual);
saveBtn.addEventListener("click", saveGame);
loadBtn.addEventListener("click", loadGame);
restartBtn.addEventListener("click", restart);
gameArea.addEventListener("mousedown", dragStart);
gameArea.addEventListener("mousemove", dragEvt);
gameArea.addEventListener("mouseup", dragEnd);
gameArea.addEventListener("click", rotate);
gameArea.addEventListener("click", gameLoop);
