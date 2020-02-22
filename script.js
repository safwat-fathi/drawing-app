/* 
- use color & line width inputs.
- add clear button functionality. 
*/

// UI elements
const canvas = document.querySelector("canvas"),
  eraser = document.querySelector(".eraser"),
  eraserBtn = document.querySelector(".eraser_toggle"),
  brushBtn = document.querySelector(".brush_toggle");

// drawing/erasing vars
const ctx = canvas.getContext("2d");
// last X axis point for pointer when mouse clicked
let lastX = 0;
// last Y axis point for pointer when mouse clicked
let lastY = 0;
// drawing state
let isBrush,
  isEraser,
  isErasing,
  isDrawing = false;

/* drawing function */
function draw(e) {
  if (!isDrawing) return;

  // draw strokes
  ctx.beginPath();
  // start from
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

/* erasing function */
function erase(e) {
  if (!isErasing) return;

  [lastX, lastY] = [e.offsetX, e.offsetY];
  ctx.clearRect(e.offsetX, e.offsetY, 40, 40);
}

// Event Listeners
const events = [
  "change",
  "click",
  "mousedown",
  "mousemove",
  "mouseup",
  "mouseout"
];

for (let event of events) {
  document.addEventListener(event, e => {
    /* canvas
		----------- */

    if (e.target === canvas && event === "mousemove") {
      if (isBrush) {
        draw(e);
        // console.log(`drawing on ${lastX} and ${lastY}`);
      }
      if (isEraser) {
        erase(e);
        /* move eraser with pointer */
        // @ts-ignore
        eraser.style.left = `${e.offsetX}px`;
        // @ts-ignore
        eraser.style.top = `${e.offsetY}px`;
        // console.log(`erasing on ${lastX} and ${lastY}`);
      }
    }
    if ((isBrush || isEraser) && e.target === canvas && event === "mousedown") {
      console.log("drawing or erasing");

      isBrush ? (isDrawing = true) : (isDrawing = false);
      isEraser ? (isErasing = true) : (isErasing = false);

      [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    if (e.target === canvas && (event === "mouseup" || event === "mouseout")) {
      console.log("done");
      isDrawing = false;
      isErasing = false;

      /* eraser style to origin */
      // @ts-ignore
      eraser.style.left = `0`;
      // @ts-ignore
      eraser.style.top = `0`;
    }

    /* buttons
		----------- */
    if (event === "click" && e.target === brushBtn) {
      isBrush = true;
      isEraser = false;
      console.log("drawing");
    }
    if (event === "click" && e.target === eraserBtn) {
      isEraser = true;
      isBrush = false;
      console.log("erasing");
    }
    /* inputs
		----------- */
  });
}
