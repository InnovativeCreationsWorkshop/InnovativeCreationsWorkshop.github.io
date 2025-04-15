import { canvas } from './main.js';
import { food, foodSize } from './gameSetup.js';

export function drawFood() {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#b9375e';
  ctx.fillRect(food.x, food.y, foodSize, foodSize);
}

export function generateFood() {
  food.x = Math.floor(Math.random() * (canvas.width / foodSize)) * foodSize;
  food.y = Math.floor(Math.random() * (canvas.height / foodSize)) * foodSize;
}
