import { push } from "./utils.js";

import { game, gameArea } from "./main.js";
import { drawMap } from "./graphics.js";

export function getMousePosition(event: MouseEvent) {
  const rect = gameArea.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const convCol = Math.floor((x * 11) / gameArea.width) - 1;
  const convRow = Math.floor((y * 9) / gameArea.height) - 1;
  return { convRow: convRow, convCol: convCol, x: x, y: y };
}

export function dField(e: MouseEvent) {
  if (game.phase === "insert") {
    const loc = getMousePosition(e);
    if (loc.convCol === 1 && loc.convRow === -1) {
      game.draggableField.x = (loc.convCol + 1) * 50;
      game.draggableField.y = (loc.convRow + 1) * 50;

    } else if (loc.convCol === 3 && loc.convRow === -1) {
      game.draggableField.x = (loc.convCol + 1) * 50;
      game.draggableField.y = (loc.convRow + 1) * 50;

    } else if (loc.convCol === 5 && loc.convRow === -1) {
      game.draggableField.x = (loc.convCol + 1) * 50;
      game.draggableField.y = (loc.convRow + 1) * 50;

    } else if (loc.convCol === -1 && loc.convRow === 1) {
      game.draggableField.x = (loc.convCol + 1) * 50;
      game.draggableField.y = (loc.convRow + 1) * 50;

    } else if (loc.convCol === -1 && loc.convRow === 3) {
      game.draggableField.x = (loc.convCol + 1) * 50;
      game.draggableField.y = (loc.convRow + 1) * 50;

    } else if (loc.convCol === -1 && loc.convRow === 5) {
      game.draggableField.x = (loc.convCol + 1) * 50;
      game.draggableField.y = (loc.convRow + 1) * 50;

    } else if (loc.convCol === 7 && loc.convRow === 1) {
      game.draggableField.x = (loc.convCol + 1) * 50;
      game.draggableField.y = (loc.convRow + 1) * 50;

    } else if (loc.convCol === 7 && loc.convRow === 3) {
      game.draggableField.x = (loc.convCol + 1) * 50;
      game.draggableField.y = (loc.convRow + 1) * 50;

    } else if (loc.convCol === 7 && loc.convRow === 5) {
      game.draggableField.x = (loc.convCol + 1) * 50;
      game.draggableField.y = (loc.convRow + 1) * 50;

    } else if (loc.convCol === 1 && loc.convRow === 7) {
      game.draggableField.x = (loc.convCol + 1) * 50;
      game.draggableField.y = (loc.convRow + 1) * 50;

    } else if (loc.convCol === 3 && loc.convRow === 7) {
      game.draggableField.x = (loc.convCol + 1) * 50;
      game.draggableField.y = (loc.convRow + 1) * 50;

    } else if (loc.convCol === 5 && loc.convRow === 7) {
      game.draggableField.x = (loc.convCol + 1) * 50;
      game.draggableField.y = (loc.convRow + 1) * 50;

    } else {
      game.draggableField.x = 500;
      game.draggableField.y = 0;

    }
    drawMap()
  }
}

// export function dragStart() {
//   game.draggableField.isDragged = true;
// }

// export function dragEvt(e: MouseEvent) {
//   const pos = getMousePosition(e);
//   if (
//     game.draggableField.isDragged &&
//     pos.x >= game.draggableField.x &&
//     pos.x <= game.draggableField.x + game.draggableField.width &&
//     pos.y >= game.draggableField.y &&
//     pos.y <= game.draggableField.y + game.draggableField.height
//   ) {
//     game.draggableField.x = pos.x - game.draggableField.width / 2;
//     game.draggableField.y = pos.y - game.draggableField.height / 2;

//     drawMap();
//   }
// }

// export function dragEnd() {
//   game.draggableField.isDragged = false;
// }

export function clickArrow(e: MouseEvent) {
  const loc = getMousePosition(e);
  if (loc.convCol === 1 && loc.convRow === -1) {
    push(1, "down");
    return true;
  } else if (loc.convCol === 3 && loc.convRow === -1) {
    push(3, "down");
    return true;
  } else if (loc.convCol === 5 && loc.convRow === -1) {
    push(5, "down");
    return true;
  } else if (loc.convCol === -1 && loc.convRow === 1) {
    push(1, "right");
    return true;
  } else if (loc.convCol === -1 && loc.convRow === 3) {
    push(3, "right");
    return true;
  } else if (loc.convCol === -1 && loc.convRow === 5) {
    push(5, "right");
    return true;
  } else if (loc.convCol === 7 && loc.convRow === 1) {
    push(1, "left");
    return true;
  } else if (loc.convCol === 7 && loc.convRow === 3) {
    push(3, "left");
    return true;
  } else if (loc.convCol === 7 && loc.convRow === 5) {
    push(5, "left");
    return true;
  } else if (loc.convCol === 1 && loc.convRow === 7) {
    push(1, "up");
    return true;
  } else if (loc.convCol === 3 && loc.convRow === 7) {
    push(3, "up");
    return true;
  } else if (loc.convCol === 5 && loc.convRow === 7) {
    push(5, "up");
    return true;
  }
  return false;
}
