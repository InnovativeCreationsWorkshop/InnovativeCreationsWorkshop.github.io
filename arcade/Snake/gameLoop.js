import { drawCanvas } from './utils.js';
import { drawSnake, moveSnake } from './snake.js';
import { drawFood } from './food.js';
import { checkWallCollision, checkSelfCollision, checkFoodCollision } from './collision.js';

export function theGame() {
  drawCanvas();
  drawSnake();
  drawFood();
  moveSnake();

  if (checkWallCollision() || checkSelfCollision()) {
    import('./utils.js').then(mod => mod.gameOver());
    return;
  }

  checkFoodCollision();
}
