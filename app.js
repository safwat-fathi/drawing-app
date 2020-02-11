/* 
- add drawing shapes (triangle, square, circle, etc...) feature.
- fire erasing on (mouseup, mousedown) on canvas after clicking eraser button.
*/
(() => {
  // grabbing elements
  const UISelectors = {
    canvas: document.querySelector("canvas"),
    eraser: document.querySelector(".eraser"),
    inputs: {
      color: document.querySelector("input[type='color']"),
      stroke: document.querySelector("input[type='number']")
    },
    buttons: {
      clearBtn: document.querySelector(".clear_canvas"),
      eraserBtn: document.querySelector(".eraser_toggle"),
      brushBtn: document.querySelector(".brush_toggle")
    }
  };
  // erase flag
  let isErasing = false;
  // draw flag
  let isDrawing = false;
  // drawing styles
  const ctx = UISelectors.canvas.getContext("2d");
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // setting stroke color to color input value
  // @ts-ignore
  ctx.strokeStyle = UISelectors.inputs.color.value;
  // setting stroke line width to number input value
  // @ts-ignore
  ctx.lineWidth = UISelectors.inputs.stroke.value;

  // last X axis point for pointer when mouse clicked
  let lastX = 0;
  // last Y axis point for pointer when mouse clicked
  let lastY = 0;

  // drawing function
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

  // erasing function
  function erase(e) {
    if (!isErasing) return;

    [lastX, lastY] = [e.offsetX, e.offsetY];
    // @ts-ignore
    UISelectors.eraser.style.left = `${lastX}px`;
    // @ts-ignore
    UISelectors.eraser.style.top = `${lastY}px`;
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

  let currentState = isDrawing;

  // iterate through the events array
  events.forEach(event => {
    // listen to every event (bubbling to document)
    document.addEventListener(event, e => {
      if (event === "change") {
        Object.keys(UISelectors.inputs).forEach(input => {
          if (e.target !== UISelectors.inputs[input]) return;
          // @ts-ignore
          ctx.strokeStyle = UISelectors.inputs.color.value;
          // @ts-ignore
          ctx.lineWidth = UISelectors.inputs.stroke.value;
        });
      }
      // on clear button click
      if (event === "click") {
        if (e.target === UISelectors.buttons.clearBtn) {
          ctx.clearRect(
            0,
            0,
            UISelectors.canvas.width,
            UISelectors.canvas.height
          );
        }
        if (e.target === UISelectors.buttons.eraserBtn) {
          isErasing = true;
          isDrawing = false;
          console.log(
            `drawing state is: ${isDrawing}`,
            `erasing state is: ${isErasing}`
          );
        }
        if (e.target === UISelectors.buttons.brushBtn) {
          isErasing = false;
          isDrawing = true;
          console.log(
            `drawing state is: ${isDrawing}`,
            `erasing state is: ${isErasing}`
          );
        }
      }
      // when mouse move draw()
      if (event === "mousemove" && e.target === UISelectors.canvas) {
        draw(e);
        erase(e);
      }
      if (
        (event === "mouseup" || event === "mouseout") &&
        e.target === UISelectors.canvas
      ) {
        isDrawing = false;
        isErasing = false;
        console.log(
          `drawing state is: ${isDrawing}`,
          `erasing state is: ${isErasing}`
        );
      }
      // when mouse clicked set isDrawing flag to true
      // & set mouse coordinates to current pointer position
      if (event === "mousedown") {
        // isDrawing = true;
        // @ts-ignore
        [lastX, lastY] = [e.offsetX, e.offsetY];
      }
    });
  });
})();

/* 
---------------------------------------------------------
----------------------------------------------------------
*/

// import UICtrl from "./UICtrl.mjs";
// import DrawCtrl from "./DrawCtrl.mjs";

// const App = ((UICtrl, DrawCtrl) => {
//   const loadEventListeners = () => {
//     // get ui selectors
//     const UISelectors = UICtrl.getSelectors();
//     console.log(UISelectors);
//   };

//   return {
//     init: () => {
//       loadEventListeners();
//     }
//   };
// })(UICtrl, DrawCtrl);

// App.init();
