import { generateFood } from './Snake/food.js';

export let snakeArray = [];
export let direction = 'RIGHT';
export let food = {};
export let foodSize = 10;
export let isGameOver = false;
export let score = 0;

export function startGame() {
  document.getElementById('splashScreen').style.display = 'none';
}

export function setupGame() {
  snakeArray = [{ x: 50, y: 50 }, { x: 40, y: 50 }, { x: 30, y: 50 }];
  direction = 'RIGHT';
  food = {};
  foodSize = 10;
  generateFood();
  isGameOver = false;
  score = 0;
}
