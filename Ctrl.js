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
  let drawingOptions = {
    lineJoin: "",
    lineCap: "",
    contextType: ""
  };
  const el = uiCtlr.getElements();
  const draw = (e, options = {}) => {
    const ctx = el.canvas.getContext(options.contextType);
    ctx.lineJoin = options.lineJoin;
    ctx.lineCap = options.lineCap;
    console.log(ctx);
  };

  return { draw };
})(UICtrl);
DrawCtrl.draw(null, {
  lineJoin: "round",
  lineCap: "round",
  contextType: "2d"
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
