/* 
- set stroke size control element.
- add drawing shapes (triangle, square, circle, etc...) feature.
*/

(function() {
  // grabbing elements
  const $canvas = document.querySelector("canvas");
  const $color = document.querySelector("input[type='color']");
  const $stroke = document.querySelector("input[type='number']");

  // setting canvas width with the styled width
  let canvasStyle = window.getComputedStyle($canvas);
  let canvasWidth = canvasStyle.getPropertyValue("width").replace(/px/gi, "");
  $canvas.width = +canvasWidth;

  // drawing styles
  const ctx = $canvas.getContext("2d");

  // setting stroke color to color input value
  // setting stroke line width to number input value
  ctx.strokeStyle = $color.value;
  ctx.lineWidth = $stroke.value;

  document.addEventListener("change", e => {
    if (e.target !== $color && e.target !== $stroke) return;
    ctx.strokeStyle = $color.value;
    ctx.lineWidth = $stroke.value;
    console.log($color.value, $stroke.value);
  });
  // [
  //   // changing stroke color on color input change
  //   ($color, $stroke)
  // ].addEventListener("change", () => {
  //   ctx.strokeStyle = $color.value;
  //   console.log($color.value);
  // });
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

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
