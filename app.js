(function() {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  // if browser does not support canvas
  if (!canvas.getContext) {
    console.log("sorry!");
  }

  console.log("do it");
})();
