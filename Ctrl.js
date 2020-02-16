// const UICtrl = (() => {
//   const UIElements = {
//     canvas: document.querySelector("canvas"),
//     eraser: document.querySelector(".eraser"),
//     inputs: {
//       color: document.querySelector("input[type='color']"),
//       stroke: document.querySelector("input[type='number']")
//     },
//     buttons: {
//       clearBtn: document.querySelector(".clear_canvas"),
//       eraserBtn: document.querySelector(".eraser_toggle")
//     }
//   };
//   const getElements = () => {
//     return UIElements;
//   };
//   return {
//     getElements
//   };
// })();

// const DrawCtrl = (UICtrl => {
//   let lastX = 0,
//     lastY = 0,
//     isDrawing = false;

//   // isDrawing = false;
//   const el = UICtrl.getElements();
//   const draw = (e, drawStyles = {}) => {
//     const ctx = el.canvas.getContext("2d");
//     ctx.lineJoin = "round";
//     ctx.lineCap = "round";
//     // drawing Styles
//     ctx.strokeStyle = drawStyles.color;
//     ctx.lineWidth = drawStyles.stroke;
//     // drawing action
//     if (!isDrawing) return;
//     // draw strokes
//     ctx.beginPath();
//     // start from
//     ctx.moveTo(lastX, lastY);
//     ctx.lineTo(e.offsetX, e.offsetY);
//     ctx.stroke();
//     [lastX, lastY] = [e.offsetX, e.offsetY];
//     console.log(isDrawing);
//   };

//   return {
//     isDrawing,
//     lastX,
//     lastY,
//     draw
//   };
// })(UICtrl);

// document.addEventListener("mouseup" || "mouseout", e => {
//   DrawCtrl.isDrawing = false;
//   console.log(DrawCtrl.isDrawing);
// });
// document.addEventListener("mousedown", e => {
//   DrawCtrl.isDrawing = true;

//   [DrawCtrl.lastX, DrawCtrl.lastY] = [e.offsetX, e.offsetY];
//   // console.log(DrawCtrl.lastX, DrawCtrl.lastY);
//   console.log(DrawCtrl.isDrawing);
// });
// UICtrl.getElements().canvas.addEventListener("mousemove", e => {
//   const drawStyles = {
//     color: UICtrl.getElements().inputs.color.value,
//     stroke: UICtrl.getElements().inputs.stroke.value
//   };
//   DrawCtrl.draw(e, drawStyles);
//   // console.log(DrawCtrl.isDrawing);
// });

// const App = (uiCtrl => {})(UICtrl);

// // import UICtrl from "./UICtrl.mjs";
// // import DrawCtrl from "./DrawCtrl.mjs";

// // const App = ((UICtrl, DrawCtrl) => {
// //   const loadEventListeners = () => {
// //     // get ui selectors
// //     const UISelectors = UICtrl.getSelectors();
// //     console.log(UISelectors);
// //   };

// //   return {
// //     init: () => {
// //       loadEventListeners();
// //     }
// //   };
// // })(UICtrl, DrawCtrl);

// // App.init();
