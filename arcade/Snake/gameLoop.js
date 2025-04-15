import { drawCanvas } from './Snake/utils.js';
import { drawSnake, moveSnake } from './Snake/snake.js';
import { drawFood } from './Snake/food.js';
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
