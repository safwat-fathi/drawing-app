/* 
- use color & line width inputs.
*/

// UI elements
const canvas = document.querySelector("canvas"),
  clearBtn = document.querySelector(".clear_canvas"),
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
  ctx.clearRect(e.offsetX, e.offsetY, 20, 20);
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
    switch (event) {
      case "click":
        if (e.target === brushBtn) {
          isBrush = true;
          isEraser = false;
        }
        if (e.target === eraserBtn) {
          isEraser = true;
          isBrush = false;
        }
        if (e.target === clearBtn) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        break;
      case "mousemove":
        if (e.target === canvas) {
          if (isBrush) {
            draw(e);
            canvas.style.cursor = "url('./img/brush.png') 1 30, auto";
          }
          if (isEraser) {
            erase(e);
            canvas.style.cursor = "url('./img/eraser.png') 1 30, auto";
          }
        }
        break;
      case "mousedown":
        if ((isBrush || isEraser) && e.target === canvas) {
          isBrush ? (isDrawing = true) : (isDrawing = false);
          isEraser ? (isErasing = true) : (isErasing = false);
          // @ts-ignore
          [lastX, lastY] = [e.offsetX, e.offsetY];
        }
        break;
      case "mouseup":
      case "mouseout":
        if (e.target === canvas) {
          isDrawing = false;
          isErasing = false;
        }
        break;
      default:
        break;
    }
  });
}
