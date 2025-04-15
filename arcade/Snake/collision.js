import { snakeArray, food, foodSize, score } from './gameSetup.js';
import { generateFood } from './food.js';
import { canvas } from './main.js';
import { updateInterval } from './main.js';

let gameSpeed = 100;

export function checkFoodCollision() {
  const head = snakeArray[0];
  if (head.x === food.x && head.y === food.y) {
    snakeArray.push({ x: head.x, y: head.y });
    generateFood();
    score++;

    if (gameSpeed > 50) {
      gameSpeed -= 5;
      updateInterval(gameSpeed);
    }
  }
}

export function checkWallCollision() {
  const head = snakeArray[0];
  return head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height;
}

export function checkSelfCollision() {
  const head = snakeArray[0];
  return snakeArray.slice(1).some(seg => seg.x === head.x && seg.y === head.y);
}
