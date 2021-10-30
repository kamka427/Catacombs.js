import { drawMap } from "./graphics.js";
export function getMousePosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const convX = Math.floor((x * 11) / canvas.width) - 1;
    const convY = +Math.floor((y * 11) / canvas.height) - 1;
    const position = { convX: convX, convY: convY, x: x, y: y };
    return position;
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
//# sourceMappingURL=mouse.js.map