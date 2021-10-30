export const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min))

  export function swap(x: string, y: string) {
    const t = x;
    x = y;
    y = t;
    return [x, y];
}
