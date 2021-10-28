////////////////////////////////////////////////////////////////////////////
// const gameArea: HTMLCanvasElement = document.querySelector("canvas#gameArea")
// const ctx: CanvasRenderingContext2D = gameArea.getContext("2d");
// function drawMap(): void {
//     ctx.clearRect(0, 0, gameArea.width, gameArea.height);
//     for (let i = 0; i < gameMap.map.length + 2; i++) {
//         for (let j = 0; j < gameMap.map.length + 2; j++) {
//             if (i === 0 || j === 0 || i === gameMap.map.length + 1 || j === gameMap.map.length + 1) {
//                 ctx.fillText("side", i * 50, j * 50 + 25)
//             }
//             else
//                 ctx.fillText(gameMap.map[i - 1][j - 1], i * 50, j * 50 + 25)
//             ctx.strokeRect(i * 50, j * 50, 50, 50)
//         }
//     }
// }
// drawMap()
// function drawRandom() {
//     ctx.strokeRect(gameMap.randomtlx, gameMap.randomtly, 50, 50);
//     ctx.fillText(gameMap.randomfield, gameMap.randomtlx, gameMap.randomtly + 25);
// }
// drawRandom()
// function selectField(e: MouseEvent) {
//     let x: number = Math.floor((gameMap.map.length * e.clientX) / (gameMap.map.length * 50)) - 1
//     let y: number = Math.floor((gameMap.map.length * e.clientY) / (gameMap.map.length * 50)) - 1
//     console.log(e)
// }
////////////////////////////////////////////////////////////////////////////
// function rotate(e: MouseEvent): void {
//     if (e.clientX >= 10 * 50 && e.clientX <= 12 * 50 && e.clientY <= 50) {
//         switch (gameMap.randomfield) {
//             case "topleft":
//                 gameMap.randomfield = "topright"
//                 break;
//             case "topright":
//                 gameMap.randomfield = "bottomright"
//                 break;
//             case "bottomright":
//                 gameMap.randomfield = "bottomleft"
//                 break;
//             case "bottomleft":
//                 gameMap.randomfield = "topleft"
//                 break;
//             case "vertical":
//                 gameMap.randomfield = "horizontal"
//                 break;
//             case "horizontal":
//                 gameMap.randomfield = "vertical"
//                 break;
//             case "tripleright":
//                 gameMap.randomfield = "tripledown"
//                 break;
//             case "tripledown":
//                 gameMap.randomfield = "tripleleft"
//                 break;
//             case "tripleleft":
//                 gameMap.randomfield = "tripleup"
//                 break;
//             case "tripleup":
//                 gameMap.randomfield = "tripleright"
//                 break;
//             default:
//                 break;
//         }
//     }
//     drawMap()
// }
// function drag(e: MouseEvent) {
//     console.log(e);
//     // if (e.clientX >= gameMap.randomtlx &&
//     //     e.clientX <= gameMap.randomtrx &&
//     //     e.clientY >= gameMap.randomtly &&
//     //     e.clientY <= gameMap.randomtry) {
//             console.log(e);
//             console.log(gameMap);
//             gameMap.calcPos()
//             console.log(gameMap.randomtlx);
//             drawMap()
//             drawRandom()
//     // }
// }
// // document.addEventListener("dblclick", rotate)
// // document.addEventListener("click", selectField)
// document.addEventListener("drag", drag)


// calcPos() {
//     this.randomtlx = 500;
//     this.randomtly = 0;
//     this.randomtrx = this.randomtlx + 50;
//     this.randomtry = this.randomtly;
//     this.randomblx = this.randomtlx;
//     this.randombly = this.randomtly + 50;
//     this.randombrx = this.randomtlx + 50;
//     this.randombry = this.randomtly + 50;
// }

// public calcPos() {
//     this.randomtlx = 500
//     this.randomtly = 0

//     this.randomtrx = this.randomtlx + 50
//     this.randomtry = this.randomtly

//     this.randomblx = this.randomtlx
//     this.randombly = this.randomtly + 50

//     this.randombrx = this.randomtlx + 50
//     this.randombry = this.randomtly + 50
// }