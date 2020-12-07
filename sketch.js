var sword,sword_img,woosh;
var fruit,fruitgroup,fruit1_img,fruit2_img,fruit3_img,fruit4_img,rand;
var enemygroup,enemy_ani,enemy;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var over_sound,over_img;

function preload(){
  fruit1_img = loadImage("fruit1.png");
  fruit2_img = loadImage("fruit2.png");
  fruit3_img = loadImage("fruit3.png");
  fruit4_img = loadImage("fruit4.png");
  sword_img = loadImage("sword.png");
  enemy_ani = loadAnimation("1.png","2.png");
  over_img = loadImage("over.png");
  over_sound = loadSound("game_over.mp3");
  woosh = loadSound("woosh.mp3");
}

function setup() {
  createCanvas(400, 400);
  sword = createSprite(200,200,20,20);
  sword.addImage(sword_img);
  sword.scale = 0.5;
  fruitgroup = new Group();
  enemygroup = new Group();
  
}

function draw() {
  background("lightblue");
  textSize = 20;
  fill("darkblue");
  text("Score : " + score,300,40);
  if(gameState === PLAY){
    sword.x = World.mouseX;
    sword.y = World.mouseY;
    if(fruitgroup.isTouching(sword)){
      fruitgroup.destroyEach();
      score = score + 2;
      woosh.play();
    }
    if(enemygroup.isTouching(sword)){
      gameState = END;
      over_sound.play();
    }
  }
  else if(gameState === END){
    sword.x = 200;
    sword.y = 200;
    sword.addImage(over_img);
    fruitgroup.destroyEach();
    enemygroup.destroyEach();
    fruitgroup.setVelocityXEach(0);
    enemygroup.setVelocityXEach(0);
    
  }
  fruits();
  enemies();
  drawSprites();
}
function fruits() {
  if (frameCount % 80 === 0) {
    var fruit = createSprite(400, 200, 20, 20);
    position = Math.round(random(1, 2));
    if (position == 1) {
      fruit.x = 405;
      fruit.velocityX = -(7 + (score / 4));
    } else {
      if (position == 2) {
        fruit.x =-5;
        fruit.velocityX = (7 + (score / 4));
      }
    }

    fruit.scale = 0.2;
    rand = Math.round(random(1, 4))

    switch (rand) {
      case 1:
        fruit.addImage(fruit1_img);
        break;
      case 2:
        fruit.addImage(fruit3_img);
        break;
      case 3:
        fruit.addImage(fruit2_img);
        break;
      case 4:
        fruit.addImage(fruit4_img);
    }


    fruit.y = random(10, 390);
    fruit.lifetime = 100;
    
    fruitgroup.add(fruit);
  }
}


function enemies() {
  if (frameCount % 200 === 0) {
    enemy = createSprite(400, 200, 20, 20);
    enemy.addAnimation("moving", enemy_ani);
    enemy.y = Math.round(random(100, 300));
    enemy.velocityX = -(8 + (score / 10));
    enemy.setLifetime = 50;
    enemygroup.add(enemy);
    enemy.scale = 0.5;
  }
}