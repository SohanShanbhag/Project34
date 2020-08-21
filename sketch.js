var dog, foodfoodS, database, foodS;

function preload()
{
  dogImg = loadImage('dogImg.png');
  happyDogImg = loadImage('dogImg1.png');
}

function setup() {
  database = firebase.database();

  createCanvas(500, 500);
  
  dog = createSprite(250, 400);
  dog.addImage(dogImg);  
  dog.scale = 0.2;

  foodfoodS = database.ref('Food');
  foodfoodS.on('value', readStock, showError);
}


function draw() {
  background("green");

  if(keyWentDown(UP_ARROW) && foodS !== undefined){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }  

  textSize(25)
  fill("white")
  text("Note : Feed the dog by pressing the up arrow", 40, 50)

  textSize(30);
  fill("white")
  text("Stock remaining : " + foodS, 100  , 30);

  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(foodS <= 0){
    foodS = 0;
  }
  else if(foodS > 0){
    foodS = foodS - 1;
  }

  database.ref('/').update({
    Food:x
  })
}

function showError(){
  console.log("Error while accessing the DataBase");
}