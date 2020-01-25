/* 
- add drawing shapes (triangle, square, circle, etc...) feature.
*/

(function() {
  // grabbing elements
  const $canvas = document.querySelector("canvas");
  const $color = document.querySelector("input[type='color']");

  // setting canvas width with the styled width
  let canvasStyle = window.getComputedStyle($canvas);
  let canvasWidth = canvasStyle.getPropertyValue("width").replace(/px/gi, "");
  $canvas.width = Number(canvasWidth);

  // drawing styles
  const ctx = $canvas.getContext("2d");

  // changing stroke color to color input value
  ctx.strokeStyle = $color.value;

  // changing stroke color on color input change
  $color.addEventListener("change", () => {
    ctx.strokeStyle = $color.value;
    console.log($color.value);
  });
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = 10;

  // draw flag
  let isDrawing = false;

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
  }

  // when mouse move draw()
  $canvas.addEventListener("mousemove", draw);

  // when mouse clicked set isDrawing flag to true
  // & set mouse coordinates to current pointer position
  $canvas.addEventListener("mousedown", e => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  // when mouse is not clicked do not draw()
  $canvas.addEventListener("mouseup", () => (isDrawing = false));
  // when mouse is out of canvas do not draw()
  $canvas.addEventListener("mouseout", () => (isDrawing = false));
})();
