import { Game } from "./classes.js";
import { push } from "./utils.js";
import { getMousePosition } from "./mouse.js";
import { drawMap } from "./graphics.js";
const gameArea = document.querySelector("canvas#gameArea");
const game = new Game(2, 2);
drawMap(game);
function rotate(e) {
    const pos = getMousePosition(gameArea, e);
    console.log(pos);
    if (pos.x >= game.draggableField.x &&
        pos.x <= game.draggableField.x + game.draggableField.width &&
        pos.y >= game.draggableField.y &&
        pos.y <= game.draggableField.y + game.draggableField.height) {
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
    // drawRandom(game, drag);
}
function pushRow(index, direction) {
    push(index, game, direction);
    drawMap(game);
    // drawRandom(game, drag);
}
function dragStart() {
    game.draggableField.isDragged = true;
}
function dragEvt(e) {
    const pos = getMousePosition(gameArea, e);
    if (game.draggableField.isDragged
        &&
            pos.x >= game.draggableField.x &&
        pos.x <= game.draggableField.x + game.draggableField.width &&
        pos.y >= game.draggableField.y &&
        pos.y <= game.draggableField.y + game.draggableField.height) {
        game.draggableField.updatePos(pos.x - game.draggableField.width / 2, pos.y - game.draggableField.height / 2);
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
//# sourceMappingURL=map.js.map