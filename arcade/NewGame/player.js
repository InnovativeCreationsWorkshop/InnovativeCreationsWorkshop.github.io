function mousePressed() {
  let flower = createFlower();

  // reassign x to be mouseX
  flower.x = mouseX; 
  
  // reassign y to be mouseY
  flower.y = mouseY;

  // add the flower to the flowers array
  flowers.push(flower);
}

function updateAndDrawFlowers() {
  for (let flower of flowers) {

    // Draw the flower.
    drawFlower(flower);

    // Apply wilting effect by reducing size by 1%
    flower.size *= 0.99;

    // Reduce lifespan
    flower.lifespan -= 1;
    
    if (flower.lifespan <= 0) {
      // Save index of the flower.
      let i = flowers.indexOf(flower);
      
      // Remove wilted flower.
      flowers.splice(i, 1);
    }
  }
}
