var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieGroup;
var gravestone;
var ammo
var heart1,heart2,heart3
var heart1Img,heart2Img,heart3Img
var gameState="fight"
var life=3
var bullets=80

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")
  player_fallen = loadImage("assets/shooter-fallen.png")
  graveyard = loadImage("assets/rip.png")
  ammoImg = loadImage("assets/bullet.png")

  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   gravestone = createSprite(displayWidth/2,displayHeight/2)
   gravestone.x = player.x
   gravestone.y = player.y
   gravestone.addImage(graveyard)
   gravestone.scale=1.6
   gravestone.visible=false

  

  ammogroup = createGroup();
 

  heart1=createSprite(windowWidth-150,40,20,20)
  heart1.addImage(heart1Img)
  heart1.scale=0.3
  heart1.visible=false

  heart2=createSprite(windowWidth-150,40,20,20)
  heart2.addImage(heart2Img)
  heart2.scale=0.3
  heart2.visible=false

  heart3=createSprite(windowWidth-150,40,20,20)
  heart3.addImage(heart3Img)
  heart3.scale=0.3
  
  zombieGroup = new Group()


}

function draw() {
  background(0); 
 
  

if(gameState==="fight"){



if(zombieGroup.isTouching(player)){

for(var i=0;i<zombieGroup.length;i++){

if(zombieGroup[i].isTouching(player)){
  zombieGroup[i].destroy()

}

}

}

if(zombieGroup.isTouching(ammogroup)){

  for(var i=0;i<zombieGroup.length;i++){
  
  if(zombieGroup[i].isTouching(ammogroup)){
    zombieGroup[i].destroy()
    ammogroup.destroyEach()
  }
  
  }
  
  }

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  spawnAmmo()
  player.addImage(shooter_shooting)
 bullets=bullets-1
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
spawnZombie()
}

drawSprites();

text("Bullets:"+bullets,windowWidth-150,60)

}

function spawnZombie() {
if(frameCount % 50 === 0){
  

  zombie=createSprite(random(500,1100),random(100,500),40,40)
zombie.addImage(zombieImg)
zombie.velocityX=-10
zombie.scale=0.15
zombie.debuh=true
zombie.lifetime=400
zombieGroup.add(zombie)
}

}

function spawnAmmo() {
  ammo = createSprite(displayWidth,displayHeight)
  ammo.x = player.x
  ammo.y = player.y
  ammo.addImage(ammoImg)
  ammo.scale=0.13
  ammo.velocityX = 10
  ammogroup.add(ammo)
}