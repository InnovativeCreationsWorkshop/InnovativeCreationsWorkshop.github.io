var canvas;
var canvasContext;

window.onload = function () {
  console.log("Hello World!");
  canvas = document.getElementById("gameCanvas");
  if (!canvas) {
    console.error("Canvas element not found!");
    return;
  }
  canvasContext = canvas.getContext("2d");

  // Listen for keydown events to move paddles
  window.addEventListener("keydown", movePaddles);

  setInterval(function () {
    if (!gameOver) {
      moveEverything();
      drawEverything();
    } else {
      displayWinScreen();
    }
  }, 1000 / framesPerSecond);
};
