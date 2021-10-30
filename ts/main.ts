import { Game } from "./classes.js";
import { push } from "./utils.js";
import { getMousePosition } from "./mouse.js";
import { drawMap } from "./graphics.js";

const startBtn = document.querySelector("#start");
const manualBtn = document.querySelector("#manual");
const pCount: any = (<HTMLInputElement>document.querySelector("#pcount")).value;
const tCount: any = (<HTMLInputElement>document.querySelector("#tcountpp"))
  .value;
const gameArea: HTMLCanvasElement = document.querySelector("canvas#gameArea");

let game: Game
function startGame() {
  game = new Game(pCount, tCount);
  console.log(game);
  gameArea.classList.remove("hidden")
  drawMap(game);
}

startBtn.addEventListener("click", startGame);



function rotate(e: MouseEvent): void {
  const pos = getMousePosition(gameArea, e);
  console.log(pos);

  if (
    pos.x >= game.draggableField.x &&
    pos.x <= game.draggableField.x + game.draggableField.width &&
    pos.y >= game.draggableField.y &&
    pos.y <= game.draggableField.y + game.draggableField.height
  ) {
    console.log(game.gameMap.randomfield);
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
  drawMap(game);

}

function pushRow(index: number, direction: string) {
  push(index, game, direction);
  drawMap(game);

}

function dragStart() {
  game.draggableField.isDragged = true;
}

function dragEvt(e: MouseEvent) {
  const pos = getMousePosition(gameArea, e);
  if (game.draggableField.isDragged
    && 
      pos.x >= game.draggableField.x &&
      pos.x <= game.draggableField.x + game.draggableField.width &&
      pos.y >= game.draggableField.y &&
      pos.y <= game.draggableField.y + game.draggableField.height
    ){
    game.draggableField.updatePos(
      pos.x - game.draggableField.width / 2,
      pos.y - game.draggableField.height / 2
    );
    drawMap(game);
  }
}

function dragEnd() {
  game.draggableField.isDragged = false;
}

gameArea.addEventListener("mousedown", dragStart);
gameArea.addEventListener("mousemove", dragEvt);
gameArea.addEventListener("mouseup", dragEnd);
gameArea.addEventListener("click", rotate);
// gameArea.addEventListener("click",()=>pushRow(1,"up"))
