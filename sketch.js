//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,restart




var trex,trex_running,trex_collided;
var ground,groundImage , invisibleground; 
var obstacle1,obstacle2,obstacle3,obstacle4 , obstacle5, obstacle6;
var cloudImage;
var obstaclesGroup,cloudsGroup
var score=0;
function preload (){
trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  
  groundImage = loadImage("ground2.png");
trex_collided = loadImage("trex_collided.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
obstacle6=loadImage("obstacle6.png")
  cloudImage=loadImage("cloud.png")
}
function setup() {
  createCanvas(600,200);
  trex=createSprite(50,180,10,10);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale= 0.6;
  
  ground = createSprite(200,180,400,10);
  ground.addImage(groundImage);
  ground.x = ground.width/2;
  ground.velocityX = -3;
  
  invisibleground = createSprite (200,190,400,10);
invisibleground.visible =false
  cloudsGroup=new Group();
  obstaclesGroup = new Group();
   gameOver = createSprite(200,300);
 restart = createSprite(200,340);
gameOver.setAnimation("gameOver");
gameOver.scale = 0.5;
restart.setAnimation("restart");
restart.scale = 0.5;
}

function draw() {
  background(255);                  
  text("score " + score,500,50)
  if(gameState===PLAY){
  score=score+Math.round(getFrameRate()/60);
  
  
  if(ground.x < 0 ){
    ground.x =ground.width/2;
  }
  
  if(keyDown("space")){
    trex.velocityY = -12;
  }
  trex.velocityY=trex.velocityY+ 0.8;
  

  
  spawnClouds();
  spawnObstacles();

if(obstaclesGroup.isTouching(trex)){
  playSound("jump.mp3");
  gameState = END;
  playSound("die.mp3");
}
}

else if(gameState === END) {
gameOver.visible = true;
restart.visible = true;

//set velcity of each game object to 0
ground.velocityX = 0;
trex.velocityY = 0;
obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);

//change the trex animation
trex.changeAnimation("collided",trex_collided);

//set lifetime of the game objects so that they are never destroyed
obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);


}

if(mousePressedOver(restart)) {
reset();
}

//console.log(trex.y);

//stop trex from falling down
trex.collide(invisibleGround);

drawSprites();
}

function reset(){
gameState = PLAY;

gameOver.visible = false;
restart.visible = false;

ObstaclesGroup.destroyEach();
CloudsGroup.destroyEach();

trex.changeAnimation("running",trex_running);

count = 0;

}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round (random(1,6));
switch(rand){
  case 1:obstacle.addImage(obstacle1);
    break;
  case 2:obstacle.addImage(obstacle2);
    break;
    case 3:obstacle.addImage(obstacle3);
    break;
    case 4:obstacle.addImage(obstacle4);
    break;
    case 5:obstacle.addImage(obstacle5)
    ;
    break;
    case 6:obstacle.addImage(obstacle6);
    break;
    default:break;
}
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    obstaclesGroup.add(obstacle)
    
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y =Math.round( random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
    
  }
}