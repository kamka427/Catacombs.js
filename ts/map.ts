import { Game, DraggableField } from "./classes.js";
import { push } from "./utils.js";
import { getMousePosition } from "./mouse.js";
import { drawMap, drawRandom } from "./graphics.js";

const gameArea: HTMLCanvasElement = document.querySelector("canvas#gameArea");

const game = new Game(2, 2);
const drag = new DraggableField();

drawMap(game,drag);
// drawRandom(game, drag);

function rotate(e: MouseEvent): void {
  const pos = getMousePosition(gameArea, e);
  console.log(pos);
  console.log(drag);

  if (
    pos.x >= drag.x &&
    pos.x <= drag.x + drag.width &&
    pos.y >= drag.y &&
    pos.y <= drag.y + drag.height
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
  drawMap(game,drag);
  // drawRandom(game, drag);
}

function pushRow(index: number, direction: string) {
  push(index, game, direction);
  drawMap(game,drag);
  // drawRandom(game, drag);
}

function dragStart() {
  drag.isDragged = true;
}

function dragEvt(e: MouseEvent) {
  const pos = getMousePosition(gameArea, e);
  if (drag.isDragged) { //kell hogy fölötte álljon
    drag.updatePos(pos.x - drag.width / 2, pos.y - drag.height / 2);
    drawMap(game,drag);
    // drawRandom(game, drag);
  }
}

function dragEnd() {
  drag.isDragged = false;
}

gameArea.addEventListener("mousedown", dragStart);
gameArea.addEventListener("mousemove", dragEvt);
gameArea.addEventListener("mouseup", dragEnd);
gameArea.addEventListener("click", rotate);
// gameArea.addEventListener("click",()=>pushRow(1,"up"))
