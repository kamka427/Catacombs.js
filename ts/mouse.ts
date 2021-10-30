export function getMousePosition(canvas: HTMLCanvasElement, event: MouseEvent) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const convX = Math.floor((x * 11) / canvas.width) - 1;
  const convY = +Math.floor((y * 11) / canvas.height) - 1;
  const position = { convX: convX, convY: convY, x: x, y: y };
  return position;
}

 