const musicSound = new Audio("./music/music.mp3");
let direction = { x: 0, y: 0 }; //jis direction m we r moving the snake
var score = 0;
var highscore = 0;
var snakeHead = [{ x: 9, y: 9 }]; //initially snake is in 11th row and 11th column
var food = { x: 5, y: 5 }; //initially food is in 5th row and 5th column
var lastRenderTime = 0;
var snakeSpeed = 7; //initially snake speed
function main(currentTime) {
  //game loop
  window.requestAnimationFrame(main);
  var secondsTillLastRender = (currentTime - lastRenderTime) / 1000; //1000 so as to convert in seconds
  if (secondsTillLastRender < 1 / snakeSpeed) {
    //snake will move 7 times(=snake speed) in a second
    // if secondsTillLastRender <1/7 ,don't render
    return;
  }
  // console.log("render");
  lastRenderTime = currentTime;
 
  gameOperations();
}
window.requestAnimationFrame(main);
function isCollide(snake) {
  //if snake bumps into itself
  for (var i = 1; i < snakeHead.length; i++) {
    {
      if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) return true;
    }
  }
  //if snake bumps into any of the walls
  if(snake[0].x >= 19 || snake[0].x <=0 || snake[0].y >= 19 || snake[0].y <=0){
    // console.log(snake[0].x);
    // console.log(snake[0].y);
    return true;
}
    
  return false;
}

function gameOperations() {
  //if snake collides into any wall or itself,restart the game
  if (isCollide(snakeHead)) {
    var gameOverSound = new Audio("./music/gameover.mp3");
    musicSound.pause();
    gameOverSound.play();

    $(".heading").html("Game over !<br> Press any key to <br> play again");
    //set snakeHead,direction,food,score,snakeSpeed to initial values
    snakeHead = [{ x: 9, y: 9 }];
    direction = { x: 0, y: 0 };
    food = { x: 5, y: 5 };
    snakeSpeed = 7;
    $(".score-class").text("Score : " + score);
    score = 0;
  }
  //to display snake array
  const gameBoard = document.getElementById("board");
  gameBoard.innerHTML = "";
  snakeHead.forEach((snakeSegment, index) => {
    var snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = snakeSegment.y;
    snakeElement.style.gridColumnStart = snakeSegment.x;
    if (index === 0) {
      snakeElement.classList.add("snake-face");
    } else {
      snakeElement.classList.add("snake-head");
    }

    gameBoard.appendChild(snakeElement);
  });
  //to display food
  var foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.x;
  foodElement.style.gridColumnStart = food.y;
  foodElement.classList.add("snake-food");
  gameBoard.appendChild(foodElement);

  //playing the game with arrow keys
  document.addEventListener("keydown", function (e) {
    musicSound.play();
    direction = { x: 1, y: 0 };//initial direction in which snake starts moving
    $(".heading").html("Enjoy the amazing <br> adventure !");
    $(".score-class").text("Score : " + score);
    //  console.log(event.key);

    switch (e.key) {
      case "ArrowUp":
        console.log("ArrowUp");
        direction.x = 0;
        direction.y = -1;
        break;
      case "ArrowDown":
        console.log("ArrowDown");
        direction.x = 0;
        direction.y = 1;
        break;
      case "ArrowLeft":
        direction.x = -1;
        direction.y = 0;
        console.log("ArrowLeft");
        break;
      case "ArrowRight":
        console.log("ArrowRight");
        direction.x = 1;
        direction.y = 0;
        break;

      default:
        break;
    }
  });
  //moving the snake
  for (var i = snakeHead.length - 2; i >= 0; i--) {
    snakeHead[i + 1] = { ...snakeHead[i] };
  }
  snakeHead[0].x = snakeHead[0].x + direction.x;
  snakeHead[0].y = snakeHead[0].y + direction.y;

  //if snake has eaten food ,regenerate food randomly
  if (snakeHead[0].x === food.x && snakeHead[0].y === food.y) {
    //if coordinates of snake Head and food meet=>snake has eaten food
    var foodSound = new Audio("./music/food.mp3");
    foodSound.volume = 1; //100%
    foodSound.play();
    snakeHead.unshift({
      x: snakeHead[0].x + direction.x,
      y: snakeHead[0].y + direction.y,
    });
    score++;
    //update highscore
    if (score > highscore) {
      highscore++;
    }
    $(".score-class").text("Score : " + score);
    $(".hiscore-class").text("Highscore : " + highscore);
    //after increment of 3 points,increase speed by 4
    for (var i = 0; i < score; i++) {
      if (score === 3 * i) {
        snakeSpeed = snakeSpeed + 4;
      }
      // console.log(snakeSpeed);
    }
    var randomFoodPosition = Math.floor(Math.random() * 18) + 1;
    food = { x: randomFoodPosition, y: randomFoodPosition };
  }
}
