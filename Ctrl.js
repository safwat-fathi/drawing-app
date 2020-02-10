const UICtrl = (() => {
  const UIElements = {
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
  const getElements = () => {
    return UIElements;
  };
  return {
    getElements
  };
})();

const DrawCtrl = (uiCtlr => {
  let lastX = 0,
    lastY = 0;
  // isDrawing = false;
  const el = uiCtlr.getElements();
  const draw = (e, options = {}) => {
    const ctx = el.canvas.getContext(options.contextType);
    // drawing options
    ctx.lineJoin = options.lineJoin;
    ctx.lineCap = options.lineCap;
    // drawing action
    // if (!isDrawing) return;
    // draw strokes
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    // console.log(lastX, lastY);
  };

  return {
    // isDrawing,
    lastX,
    lastY,
    draw
  };
})(UICtrl);

UICtrl.getElements().canvas.addEventListener("mousemove", e => {
  DrawCtrl.draw(e, {
    contextType: "2d",
    lineJoin: "round",
    lineCap: "round"
  });
});
UICtrl.getElements().canvas.addEventListener("mouseup" || "mouseout", e => {
  // DrawCtrl.isDrawing = false;
  console.log("not drawing");
});
UICtrl.getElements().canvas.addEventListener("mousedown", e => {
  // DrawCtrl.isDrawing = true;
  [DrawCtrl.lastX, DrawCtrl.lastY] = [e.offsetX, e.offsetY];
  console.log("drawing");
});

const App = (uiCtrl => {})(UICtrl);

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
