const test = {
	score: null,
	marginTop: null,
	marginLeft: null
}

document.addEventListener("DOMContentLoaded", function(){
	createFood();
	createSnake();
});

function createSnake() {
	let snake = document.createElement("div");
	let gameArea = document.getElementById("game-area");
	snake.setAttribute("class", "snake");
	gameArea.appendChild(snake);
	setSnakeMovement();
}

let setSnakeMovement = () =>	document.addEventListener("keydown", moveSnake);

function moveSnake(event) {
	let snake = document.getElementsByClassName("snake")[0];
	let e = event.keyCode;
	switch(e) {
		case 38: 		
		test.marginTop -= 10;
		snake.style.marginTop = `${test.marginTop}px`;
		distance();
		areaLimits();
		break;
		case 40:
		test.marginTop += 10;
		snake.style.marginTop = `${test.marginTop}px`;
		distance();
		areaLimits();
		break;
		case 37:
		test.marginLeft -= 10;
		snake.style.marginLeft = `${test.marginLeft}px`;
		distance();
		areaLimits();
		break;
		case 39:
		test.marginLeft += 10;
		snake.style.marginLeft = `${test.marginLeft}px`;
		distance();
		areaLimits();
		break;
	}
}

function createFood() {
	let [food, gameArea] = [document.createElement("div"), document.getElementById("game-area")]; 
	let position = (a, b) => Math.round(Math.random() * (a - b) / 10 ) * 10;
	food.style.marginTop = `${position(gameArea.offsetHeight, food.style.height)}px`;
	food.style.marginLeft = `${position(gameArea.offsetWidth, food.style.width)}px`;
	food.setAttribute("class", "food")
	gameArea.appendChild(food);
}

function deleteFood() {
	let elem = document.getElementsByClassName("food")[0];
	elem.remove();
	createFood();
	updateScore()
}

function updateScore(){
	let showScore = document.getElementById("score");
	test.score++;
	showScore.innerHTML = `Score = ${test.score}`;
}

 function getPositionAtCenter(element) {
   const {top, left, width, height} = element.getBoundingClientRect();
   return {
     x: left + width / 2,
     y: top + height / 2
   };
 }

function getDistanceBetweenElements(a, b) {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);
  const dist = Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
  if(dist === 0) {
  	deleteFood();
  }
}

function distance() {
	let snake = document.getElementsByClassName("snake")[0];
 	let food = document.getElementsByClassName("food")[0];
 	getDistanceBetweenElements(snake, food);
 }

function areaLimits () {
	let [area, snake] = [document.getElementById("game-area"), document.getElementsByClassName("snake")[0]];
	let [top, left] = [window.getComputedStyle(snake).marginTop, window.getComputedStyle(snake).marginLeft];
	let [sHeight, sWidth] = [window.getComputedStyle(snake).height, window.getComputedStyle(snake).width];
	let [aHeight, aWidth] = [window.getComputedStyle(area).height, window.getComputedStyle(area).width];

	if(parseInt(top) > parseInt(aHeight) - parseInt(sHeight)){
		snake.style.marginTop = `390px`;
		test.marginTop = 390;
	} else if(parseInt(left) > parseInt(aWidth) - parseInt(sWidth)){
		snake.style.marginLeft = `590px`;
		test.marginLeft = 590;
	} else if(parseInt(top) < 0) {
		snake.style.marginTop = `0px`;
		test.marginTop = 0;
	} else if(parseInt(left) < 0) {
		snake.style.marginLeft = `0px`;
		test.marginLeft = 0;
	}
}