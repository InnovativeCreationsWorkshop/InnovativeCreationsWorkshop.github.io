import { canvas, canvasContext } from './main.js';
import { snakeArray, score } from './gameSetup.js';

export function drawCanvas() {
  canvasContext.fillStyle = '#ceddbb';
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

export function gameOver() {
  clearInterval(gameInterval);
  document.getElementById('gameOverMessage').innerText = 'Game Over!';
  document.getElementById('score').innerText = 'Final Score: ' + score;
  document.getElementById('restartButton').style.display = 'block';
}
