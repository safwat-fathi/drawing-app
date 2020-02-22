/* 
- use color & line width inputs.
*/

// UI elements
const canvas = document.querySelector("canvas"),
  eraserBtn = document.querySelector(".eraser_toggle"),
  brushBtn = document.querySelector(".brush_toggle"),
  clearBtn = document.querySelector(".clear_canvas");

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
  ctx.clearRect(e.offsetX, e.offsetY, 30, 30);
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
        canvas.style.cursor = 'url("./img/brush.png") 4 45, auto';
      }
      if (isEraser) {
        erase(e);
        canvas.style.cursor = 'url("./img/eraser.png") 10 12, auto';
      }
    }
    if ((isBrush || isEraser) && e.target === canvas && event === "mousedown") {
      isBrush ? (isDrawing = true) : (isDrawing = false);
      isEraser ? (isErasing = true) : (isErasing = false);
      // @ts-ignore
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    if (e.target === canvas && (event === "mouseup" || event === "mouseout")) {
      isDrawing = false;
      isErasing = false;
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
    if (event === "click" && e.target === clearBtn) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    /* inputs
		----------- */
  });
}
