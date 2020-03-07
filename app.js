// Using module pattern
// kinda :)

/* ---------------------------------------
UI Controller
------------------------------------------ */
const uiCtrl = (() => {
  // private props & methods
  const UISelectors = {
    canvas: document.querySelector("canvas"),
    clearBtn: document.querySelector(".clear_canvas"),
    eraserBtn: document.querySelector(".eraser_toggle"),
    brushBtn: document.querySelector(".brush_toggle"),
    lineWidth: document.querySelector("#line_width"),
    drawColor: document.querySelector("#drawing_color")
  };

  const ctx = canvas.getContext("2d");

  // last X axis point for pointer when mouse clicked
  let lastX = 0;
  // last Y axis point for pointer when mouse clicked
  let lastY = 0;
  // drawing state
  let isBrush = false,
    isEraser = false,
    isErasing = false,
    isDrawing = false;

  // Public props & methods
  return {
    getDrawState: () => {
      return {
        isBrush,
        isEraser,
        isErasing,
        isDrawing
      };
    },
    // this method is not UI controller domain
    setDrawState: prop => {
      let drawState = uiCtrl.getDrawState();
      // for (let key in drawState) {
      //   console.log(drawState[key]);
      // }
      drawState[prop] = !drawState[prop];
      console.log(drawState);
    },
    // get values of color & line width inputs
    getDrawStyles: () => {
      return {
        // @ts-ignore
        strokeWidth: lineWidth.value,
        // @ts-ignore
        strokeColor: drawColor.value
      };
    },
    // add updateDrawStyles method
    // add setCursor method
    getSelectors: () => {
      return UISelectors;
    }
  };
})();

uiCtrl.setDrawState("isBrush");
// console.log();

/* ---------------------------------------
App Controller
------------------------------------------ */
// const AppCtrl
