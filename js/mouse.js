import { drawMap } from "./graphics.js";
import { push } from "./utils.js";
import { game } from "./main.js";
import { gameArea } from "./main.js";
export function getMousePosition(event) {
    const rect = gameArea.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const convCol = Math.floor((x * 11) / gameArea.width) - 1;
    const convRow = Math.floor((y * 9) / gameArea.height) - 1;
    return { convRow: convRow, convCol: convCol, x: x, y: y };
}
export function dragStart() {
    game.draggableField.isDragged = true;
}
export function dragEvt(e) {
    const pos = getMousePosition(e);
    if (game.draggableField.isDragged &&
        pos.x >= game.draggableField.x &&
        pos.x <= game.draggableField.x + game.draggableField.width &&
        pos.y >= game.draggableField.y &&
        pos.y <= game.draggableField.y + game.draggableField.height) {
        game.draggableField.x = pos.x - game.draggableField.width / 2;
        game.draggableField.y = pos.y - game.draggableField.height / 2;
        drawMap();
    }
}
export function dragEnd() {
    game.draggableField.isDragged = false;
}
export function clickArrow(e) {
    const loc = getMousePosition(e);
    if (loc.convCol === 1 && loc.convRow === -1) {
        push(1, "down");
        return true;
    }
    else if (loc.convCol === 3 && loc.convRow === -1) {
        push(3, "down");
        return true;
    }
    else if (loc.convCol === 5 && loc.convRow === -1) {
        push(5, "down");
        return true;
    }
    else if (loc.convCol === -1 && loc.convRow === 1) {
        push(1, "right");
        return true;
    }
    else if (loc.convCol === -1 && loc.convRow === 3) {
        push(3, "right");
        return true;
    }
    else if (loc.convCol === -1 && loc.convRow === 5) {
        push(5, "right");
        return true;
    }
    else if (loc.convCol === 7 && loc.convRow === 1) {
        push(1, "left");
        return true;
    }
    else if (loc.convCol === 7 && loc.convRow === 3) {
        push(3, "left");
        return true;
    }
    else if (loc.convCol === 7 && loc.convRow === 5) {
        push(5, "left");
        return true;
    }
    else if (loc.convCol === 1 && loc.convRow === 7) {
        push(1, "up");
        return true;
    }
    else if (loc.convCol === 3 && loc.convRow === 7) {
        push(3, "up");
        return true;
    }
    else if (loc.convCol === 5 && loc.convRow === 7) {
        push(5, "up");
        return true;
    }
    return false;
}
//# sourceMappingURL=mouse.js.map