import { drawMap } from "./graphics.js";
import { push } from "./utils.js";
export function getMousePosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const convX = Math.floor((x * 11) / canvas.width) - 1;
    const convY = Math.floor((y * 9) / canvas.height) - 1;
    return { convX: convX, convY: convY, x: x, y: y };
}
export function dragStart(game) {
    game.draggableField.isDragged = true;
}
export function dragEvt(game, gameArea, e) {
    const pos = getMousePosition(gameArea, e);
    if (game.draggableField.isDragged &&
        pos.x >= game.draggableField.x &&
        pos.x <= game.draggableField.x + game.draggableField.width &&
        pos.y >= game.draggableField.y &&
        pos.y <= game.draggableField.y + game.draggableField.height) {
        game.draggableField.updatePos(pos.x - game.draggableField.width / 2, pos.y - game.draggableField.height / 2);
        drawMap(game);
    }
}
export function dragEnd(game) {
    game.draggableField.isDragged = false;
}
export function clickArrow(game, canvas, e) {
    const loc = getMousePosition(canvas, e);
    if (loc.convX === 1 && loc.convY === -1) {
        push(1, game, "down");
    }
    else if (loc.convX === 3 && loc.convY === -1) {
        push(3, game, "down");
    }
    else if (loc.convX === 5 && loc.convY === -1) {
        push(5, game, "down");
    }
    else if (loc.convX === -1 && loc.convY === 1) {
        push(1, game, "right");
    }
    else if (loc.convX === -1 && loc.convY === 3) {
        push(3, game, "right");
    }
    else if (loc.convX === -1 && loc.convY === 5) {
        push(5, game, "right");
    }
    if (loc.convX === 7 && loc.convY === 1) {
        push(1, game, "left");
    }
    else if (loc.convX === 7 && loc.convY === 3) {
        push(3, game, "left");
    }
    else if (loc.convX === 7 && loc.convY === 5) {
        push(5, game, "left");
    }
    if (loc.convX === 1 && loc.convY === 7) {
        push(1, game, "up");
    }
    else if (loc.convX === 3 && loc.convY === 7) {
        push(3, game, "up");
    }
    else if (loc.convX === 5 && loc.convY === 7) {
        push(5, game, "up");
    }
}
//# sourceMappingURL=mouse.js.map