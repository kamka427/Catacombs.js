import { Game, DraggableField } from "./classes.js";
import { swap } from "./utils.js";
import { getMousePosition } from "./mouse.js";
import { drawMap, drawRandom } from "./graphics.js";
const gameArea = document.querySelector("canvas#gameArea");
const game = new Game(2, 2);
const drag = new DraggableField();
drawMap(game);
drawRandom(game, drag);
function rotate(e) {
    const pos = getMousePosition(gameArea, e);
    console.log(pos);
    console.log(drag);
    if (pos.x >= drag.x &&
        pos.x <= drag.x + drag.width &&
        pos.y >= drag.y &&
        pos.y <= drag.y + drag.height) {
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
    drawRandom(game, drag);
}
function pushRow(rowNum, direction) {
    if (direction === "left") {
        console.log(swap(game.gameMap.map[0][rowNum], game.gameMap.randomfield));
        console.log(game.gameMap.map[0][rowNum]);
        console.log(game.gameMap.randomfield);
        drawMap(game);
        drawRandom(game, drag);
    }
}
function dragStart() {
    drag.isDragged = true;
}
function dragEvt(e) {
    if (drag.isDragged) {
        drag.updatePos(e.clientX, e.clientY);
        drawMap(game);
        drawRandom(game, drag);
    }
}
function dragEnd() {
    drag.isDragged = false;
}
gameArea.addEventListener("mousedown", dragStart);
gameArea.addEventListener("mousemove", dragEvt);
gameArea.addEventListener("mouseup", dragEnd);
gameArea.addEventListener("click", (e) => rotate(e));
//# sourceMappingURL=map.js.map