import { canvas, canvasContext } from './Snake/snake_main.js';
import { snakeArray, score } from './Snake/gameSetup.js';

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
