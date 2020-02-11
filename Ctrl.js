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

  // const changeInputs = (color, stroke) => {

  // }
  return {
    getElements: () => {
      return UIElements;
    }
  };
})();
document.addEventListener("change", e => {
  console.log("change done");
});

/* ******************************** */
const DrawCtrl = (uiCtlr => {
  let lastX = 0,
    lastY = 0;
  // isDrawing = false;

  const el = uiCtlr.getElements();
  const draw = (e, drawStyles = {}) => {
    const ctx = el.canvas.getContext("2d");
    // drawing options
    ctx.lineJoin = drawStyles.lineJoin;
    ctx.lineCap = drawStyles.lineCap;
    ctx.strokeStyle = drawStyles.color;
    ctx.lineWidth = drawStyles.stroke;
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

let drawStyles = {
  color: UICtrl.getElements().inputs.color.value,
  stroke: UICtrl.getElements().inputs.stroke.value
};

console.log(drawStyles.color, drawStyles.stroke);

UICtrl.getElements().canvas.addEventListener("mousemove", e => {
  DrawCtrl.draw(e, {
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
