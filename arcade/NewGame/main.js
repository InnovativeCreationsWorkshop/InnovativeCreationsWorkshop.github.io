// Array of flowers.
let flowers = []; 

function setup() {
  createCanvas(400, 400);
  
  // Generate 20 flowers.
  flowerPower(); 
}

function draw() {
  background('lightblue');
  
  // Call your new function.
  updateAndDrawFlowers();
}




// Function to create 20 flowers.
function flowerPower(){
  for(let i = 0; i < 20; i+=1){
    // Create a flower in a random location.
    let flower1 = createFlower();
    
    // Add the flower to the flowers array.
    flowers.push(flower1);
  }
}

function createFlower() {
  let flower = {
    x: random(20,380),
    y: random(20,380),
    size: random(20, 75),
    lifespan: random(255,300),
    color: color(random(255), random(255), random(255))
  };
  
  return flower;
}

function drawFlower(flower) {
  noStroke();
  fill(flower.color);
  
  // Draw petals.
  ellipse(flower.x, flower.y, flower.size / 2, flower.size);
  ellipse(flower.x, flower.y, flower.size, flower.size / 2);

  // Draw center.
  fill(255, 204, 0);
  circle(flower.x, flower.y, flower.size / 2);
  
}
