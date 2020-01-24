/* 
- set the canvas width to its styled width.
- add changing color feature.
- add drawing shapes (triangle, square, circle, etc...) feature.
*/

(function() {
  const canvas = document.querySelector("canvas");
  let canvasStyle = window.getComputedStyle(canvas);
  let canvasWidth = canvasStyle.getPropertyValue("width");

  // console.log(window.screen.availWidth, window.innerWidth, window.screen.width);
  console.log(canvasWidth);

  const ctx = canvas.getContext("2d");
  canvas.width = 600;
  // draw flag
  let isDrawing = false;

  // drawing styles
  ctx.strokeStyle = "orangered";
  ctx.lineCap = "round";
  ctx.lineWidth = 5;

  // last X axis point for pointer when mouse clicked
  let lastX = 0;
  // last Y axis point for pointer when mouse clicked
  let lastY = 0;

  function draw(e) {
    if (!isDrawing) return;

    // draw strokes
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    console.log(
      `'e.offsetX is ': ${e.offsetX}, "e.offsetY is ":${
        e.offsetY
      }, "lastX is ": ${lastX}, "lastY is ": ${lastY}`
    );
  }

  // when mouse move draw()
  canvas.addEventListener("mousemove", draw);

  // when mouse clicked set isDrawing flag to true
  // & set mouse coordinates to current pointer position
  canvas.addEventListener("mousedown", e => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  // when mouse is not clicked do not draw()
  canvas.addEventListener("mouseup", () => (isDrawing = false));
  // when mouse is out of canvas do not draw()
  canvas.addEventListener("mouseup", () => (isDrawing = false));
})();
