import { push } from "./utils.js";
import { game, gameArea } from "./main.js";
import { drawMap } from "./graphics.js";
export function getMousePosition(event) {
    const rect = gameArea.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const convCol = Math.floor((x * 11) / gameArea.width) - 1;
    const convRow = Math.floor((y * 9) / gameArea.height) - 1;
    return { convRow: convRow, convCol: convCol, x: x, y: y };
}
export function dField(e) {
    if (game.phase === "insert") {
        const loc = getMousePosition(e);
        if (game.lastPushed !== "down1" && loc.convCol === 1 && loc.convRow === -1) {
            game.draggableField.x = (loc.convCol + 1) * 50;
            game.draggableField.y = (loc.convRow + 1) * 50;
        }
        else if (game.lastPushed !== "down3" && loc.convCol === 3 && loc.convRow === -1) {
            game.draggableField.x = (loc.convCol + 1) * 50;
            game.draggableField.y = (loc.convRow + 1) * 50;
        }
        else if (game.lastPushed !== "down5" && loc.convCol === 5 && loc.convRow === -1) {
            game.draggableField.x = (loc.convCol + 1) * 50;
            game.draggableField.y = (loc.convRow + 1) * 50;
        }
        else if (game.lastPushed !== "right1" && loc.convCol === -1 && loc.convRow === 1) {
            game.draggableField.x = (loc.convCol + 1) * 50;
            game.draggableField.y = (loc.convRow + 1) * 50;
        }
        else if (game.lastPushed !== "right3" && loc.convCol === -1 && loc.convRow === 3) {
            game.draggableField.x = (loc.convCol + 1) * 50;
            game.draggableField.y = (loc.convRow + 1) * 50;
        }
        else if (game.lastPushed !== "right5" && loc.convCol === -1 && loc.convRow === 5) {
            game.draggableField.x = (loc.convCol + 1) * 50;
            game.draggableField.y = (loc.convRow + 1) * 50;
        }
        else if (game.lastPushed !== "left1" && loc.convCol === 7 && loc.convRow === 1) {
            game.draggableField.x = (loc.convCol + 1) * 50;
            game.draggableField.y = (loc.convRow + 1) * 50;
        }
        else if (game.lastPushed !== "left3" && loc.convCol === 7 && loc.convRow === 3) {
            game.draggableField.x = (loc.convCol + 1) * 50;
            game.draggableField.y = (loc.convRow + 1) * 50;
        }
        else if (game.lastPushed !== "left5" && loc.convCol === 7 && loc.convRow === 5) {
            game.draggableField.x = (loc.convCol + 1) * 50;
            game.draggableField.y = (loc.convRow + 1) * 50;
        }
        else if (game.lastPushed !== "up1" && loc.convCol === 1 && loc.convRow === 7) {
            game.draggableField.x = (loc.convCol + 1) * 50;
            game.draggableField.y = (loc.convRow + 1) * 50;
        }
        else if (game.lastPushed !== "up3" && loc.convCol === 3 && loc.convRow === 7) {
            game.draggableField.x = (loc.convCol + 1) * 50;
            game.draggableField.y = (loc.convRow + 1) * 50;
        }
        else if (game.lastPushed !== "up5" && loc.convCol === 5 && loc.convRow === 7) {
            game.draggableField.x = (loc.convCol + 1) * 50;
            game.draggableField.y = (loc.convRow + 1) * 50;
        }
        else {
            game.draggableField.x = 500;
            game.draggableField.y = 0;
        }
        drawMap();
    }
}
export function clickArrow(e) {
    const loc = getMousePosition(e);
    if (loc.convCol === 1 && loc.convRow === -1) {
        if (game.lastPushed !== "down1") {
            push(1, "down");
            game.lastPushed = "up1";
            return true;
        }
    }
    if (loc.convCol === 3 && loc.convRow === -1) {
        if (game.lastPushed !== "down3") {
            push(3, "down");
            game.lastPushed = "up3";
            return true;
        }
    }
    if (loc.convCol === 5 && loc.convRow === -1) {
        if (game.lastPushed !== "down5") {
            push(5, "down");
            game.lastPushed = "up5";
            return true;
        }
    }
    if (loc.convCol === -1 && loc.convRow === 1) {
        if (game.lastPushed !== "right1") {
            push(1, "right");
            game.lastPushed = "left1";
            return true;
        }
    }
    if (loc.convCol === -1 && loc.convRow === 3) {
        if (game.lastPushed !== "right3") {
            push(3, "right");
            game.lastPushed = "left3";
            return true;
        }
    }
    if (loc.convCol === -1 && loc.convRow === 5) {
        if (game.lastPushed !== "right5") {
            push(5, "right");
            game.lastPushed = "left5";
            return true;
        }
    }
    if (loc.convCol === 7 && loc.convRow === 1) {
        if (game.lastPushed !== "left1") {
            push(1, "left");
            game.lastPushed = "right1";
            return true;
        }
    }
    if (loc.convCol === 7 && loc.convRow === 3) {
        if (game.lastPushed !== "left3") {
            push(3, "left");
            game.lastPushed = "right3";
            return true;
        }
    }
    if (loc.convCol === 7 && loc.convRow === 5) {
        if (game.lastPushed !== "left5") {
            push(5, "left");
            game.lastPushed = "right5";
            return true;
        }
    }
    if (loc.convCol === 1 && loc.convRow === 7) {
        if (game.lastPushed !== "up1") {
            push(1, "up");
            game.lastPushed = "down1";
            return true;
        }
    }
    if (loc.convCol === 3 && loc.convRow === 7) {
        if (game.lastPushed !== "up3") {
            push(3, "up");
            game.lastPushed = "down3";
            return true;
        }
    }
    if (loc.convCol === 5 && loc.convRow === 7) {
        if (game.lastPushed !== "up5") {
            push(5, "up");
            game.lastPushed = "down5";
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=mouse.js.map