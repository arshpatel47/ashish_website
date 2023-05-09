// Set up the canvas
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

// Load game assets
var backgroundImage = new Image();
backgroundImage.src = "background.jpg";
var birdImage = new Image();
birdImage.src = "bird.png";
var pigImage = new Image();
pigImage.src = "pig.png";
var blockImage = new Image();
blockImage.src = "block.png";

// Set up the physics engine
var engine = Matter.Engine.create();
var world = engine.world;
var ground = Matter.Bodies.rectangle(400, 600, 800, 50, { isStatic: true });
Matter.World.add(world, [ground]);

// Create game objects
var bird = Matter.Bodies.circle(100, 400, 20);
var pig1 = Matter.Bodies.rectangle(600, 550, 50, 50);
var pig2 = Matter.Bodies.rectangle(650, 550, 50, 50);
var block1 = Matter.Bodies.rectangle(625, 500, 50, 50);
Matter.World.add(world, [bird, pig1, pig2, block1]);

// Set up the game loop
Matter.Events.on(engine, "afterUpdate", function() {
  context.drawImage(backgroundImage, 0, 0);
  context.drawImage(birdImage, bird.position.x - 20, bird.position.y - 20, 40, 40);
  context.drawImage(pigImage, pig1.position.x - 25, pig1.position.y - 25, 50, 50);
  context.drawImage(pigImage, pig2.position.x - 25, pig2.position.y - 25, 50, 50);
  context.drawImage(blockImage, block1.position.x - 25, block1.position.y - 25, 50, 50);
  Matter.Engine.update(engine);
});

// Set up mouse interaction
Matter.Events.on(canvas, "mousedown", function(event) {
  Matter.Body.applyForce(bird, bird.position, { x: (event.offsetX - bird.position.x) * 0.05, y: (event.offsetY - bird.position.y) * 0.05 });
});
