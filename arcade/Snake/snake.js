import { canvasContext } from './main.js';
import { snakeArray, direction } from './gameSetup.js';

export function drawSnake() {
  canvasContext.fillStyle = '#ce9a60';
  snakeArray.forEach(segment => {
    canvasContext.fillRect(segment.x, segment.y, 10, 10);
  });
}

export function moveSnake() {
  const head = { ...snakeArray[0] };
  if (direction === 'RIGHT') head.x += 10;
  if (direction === 'LEFT') head.x -= 10;
  if (direction === 'UP') head.y -= 10;
  if (direction === 'DOWN') head.y += 10;

  snakeArray.unshift(head);
  snakeArray.pop();
}

export function changeDirection(event) {
  const key = event.key;
  if (key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
  if (key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  if (key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  if (key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
}
