var player , playerImg;

var backgroundS , backgroundImg;

var magicBall , MGImg;

var candies , candyImg , candy2Img , candy3Img;

var witch , witchImg;

var edge1 , edge2 ;

var witchBall , witchBallImg;

var health = 5;

var score = 0;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	playerImg = loadImage("fairy.png");
	backgroundImg = loadImage("bg.jpg");
	MGImg = loadImage("magicBall.gif");
	candyImg = loadImage("candy2.png");
	candy2Img = loadImage("candy3.png");
	candy3Img = loadImage("candy4.png");
	witchImg = loadImage("witch.png");
	witchBallImg = loadImage("badBall.png");

}

function setup() {

	createCanvas(800, 700);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.

	backgroundS = createSprite(400,350,800,700);
	backgroundS.addImage("bg",backgroundImg);

	player = createSprite(400,580,30,30);
	player.addImage("pl",playerImg);
	player.scale = 0.45;

	edge1 = createSprite(3,400,5,800);
	edge1.debug = true;
	edge1.visible = false;

	edge2 = createSprite(797,400,5,800);
	edge2.debug = true;
	edge2.visible = false;

	magicBallGroup = new Group();
	witchBallGroup = new Group();
	candyGroup = new Group();

	Engine.run(engine);
  
}


function draw() {

  rectMode(CENTER);
  background(0);


	if(keyIsDown(LEFT_ARROW)){
		player.velocityX = -5;
	}

	if(keyIsDown(RIGHT_ARROW)){
		player.velocityX = 5;
	}

	if(keyDown("space")){
		magicBall = createSprite(player.x , player.y ,10,5);
		magicBall.velocityX = 0;
		magicBall.velocityY = -4;
		magicBall.addImage("bl",MGImg);
		magicBall.scale = 0.05;
		magicBallGroup.add(magicBall);
	}

	if(frameCount % 60 === 0){
		candies = createSprite(random(0, 800),10,10,10);
		candies.velocityY = 5;
		
		var rand = Math.round(random(1,3));
		switch(rand){
			case 1: candies.addImage("cn",candyImg);
					candies.scale = 0.2;
			break;
			case 2: candies.addImage("cn",candy2Img);
					candies.scale = 0.2;
			break;
			case 3: candies.addImage("cn",candy3Img);
					candies.scale = 0.2;
			break;
		}
		candyGroup.add(candies);
	}

	if(frameCount % 120 === 0){
		witch = createSprite(random(0, 800),10,10,10);
		witch.velocityY = 3;
		witch.velocityX = random(-3,3);
		witch.addImage("wt",witchImg);
		witch.scale = 0.3;
	}

	/*if(frameCount % 100 == 0){
		witchBall = createSprite(witch.x , witch.y , 5,15);
		witchBall.velocityX = random(3 , -3);
		witchBall.velocityY = random(-6 , 6);
		witchBall.addImage("be",witchBallImg);
		witchBall.scale = 0.05;
		witchBallGroup.add(witchBall);
	}

	if(witchBallGroup.isTouching(player)){
		health = health-1;
	}
	*/
	if(magicBallGroup.isTouching(candies)){
		score = score+10;
	}

	if(score <= 50){
		text("YOU'RE GETTING THERE!" , 400 , 350);

	}

	if(score == 100){
		text("GREAT JOB!!" , 400 , 350);
	}
    
	drawSprites();

	text("SCORE : " + score , 700 , 50 );
	text("HEALTH : " + health , 700 , 80);
                                              
		createEdgeSprites();

		//witch.bounceOff(edge1);
		//witch.bounceOff(edge2);

		player.bounceOff(edge1);
		player.bounceOff(edge2);
 
}



