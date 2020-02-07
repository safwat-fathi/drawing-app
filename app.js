/* 
- add drawing shapes (triangle, square, circle, etc...) feature.
- stop erasing when "eraser button" clicked again.
*/

(function() {
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
      eraserBtn: document.querySelector(".eraser_toggle")
    }
  };
  let isErasing = false;
  // ****** eraser *******
  // UISelectors.buttons.eraserBtn.addEventListener("click", e => {
  //   let eraser = UISelectors.eraser,
  //     canvas = UISelectors.canvas;
  //   isErasing = true;

  //   // follow pointer
  //   canvas.addEventListener("mouseover" && "mousemove", e => {
  //     if (!isErasing) return;

  //     eraser.style.top = `${e.offsetY}px`;
  //     eraser.style.left = `${e.offsetX}px`;
  //     ctx.clearRect(e.offsetX, e.offsetY, 40, 40);
  //   });
  // });

  // setting canvas width with the styled width
  // let canvasStyle = window.getComputedStyle(canvas);
  // let canvasWidth = canvasStyle.getPropertyValue("width").replace(/px/gi, "");
  // canvas.width = +canvasWidth;

  // drawing styles
  const ctx = UISelectors.canvas.getContext("2d");

  // setting stroke color to color input value
  ctx.strokeStyle = UISelectors.inputs.color.value;
  // setting stroke line width to number input value
  ctx.lineWidth = UISelectors.inputs.stroke.value;

  // Event Listeners
  const events = [
    "change",
    "click",
    "mousedown",
    "mousemove",
    "mouseup",
    "mouseout"
  ];
  // UISelectors.canvas.onmouseout = e => {
  //   isErasing = false;
  //   console.log(`${e.type} of ${e.target}`);
  // };
  // iterate through the events array
  events.forEach(event => {
    // listen to every event (bubbling to document)
    document.addEventListener(event, e => {
      if (event === "change") {
        Object.keys(UISelectors.inputs).forEach(input => {
          if (e.target !== UISelectors.inputs[input]) return;
          ctx.strokeStyle = UISelectors.inputs.color.value;
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
        }
      }
      // when mouse move draw()
      if (event === "mousemove" && e.target === UISelectors.canvas) {
        draw(e);
      }
      if (event === "mouseup" || event === "mouseout") {
        isDrawing = false;
      }
      // when mouse clicked set isDrawing flag to true
      // & set mouse coordinates to current pointer position
      if (event === "mousedown") {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
      }
      // ****** eraser *******
      if (event === "mouseout" && e.target === UISelectors.canvas) {
        isErasing = false;
        UISelectors.eraser.style.top = 0;
        UISelectors.eraser.style.left = 0;
      }
      if (
        (event === "mouseover" || "mousemove") &&
        e.target === UISelectors.canvas
      ) {
        if (!isErasing) return;

        UISelectors.eraser.style.top = `${e.offsetY}px`;
        UISelectors.eraser.style.left = `${e.offsetX}px`;
        ctx.clearRect(e.offsetX, e.offsetY, 40, 40);

        // console.log(`canvas ${event}`, `isErasing: ${isErasing}`);
      }
      // canvas.addEventListener("mouseover" && "mousemove", e => {
      // 	if (!isErasing) return;

      // 	eraser.style.top = `${e.offsetY}px`;
      // 	eraser.style.left = `${e.offsetX}px`;
      // 	ctx.clearRect(e.offsetX, e.offsetY, 40, 40);
      // });
    });
  });

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

  ctx.lineJoin = "round";
  ctx.lineCap = "round";
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
