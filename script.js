let score = null;
let marginTop = null;
let marginLeft = null;

document.addEventListener("DOMContentLoaded", function(){
	createDiv();
	createSnake();
	setKeyEvent();
});

function createDiv() {
	let div = document.createElement("div");
	let gameArea = document.getElementById("game-area");

	let position = function(a, b){
		return Math.random() * a - b;
	}

	div.style.marginTop = position(gameArea.offsetHeight, div.style.height) + "px";
	div.style.marginLeft = position(gameArea.offsetWidth, div.style.width) + "px";
	div.setAttribute("class", "random")
	gameArea.appendChild(div);
}


function deleteDiv() {
	let elem = document.getElementsByClassName("random")[0];
	elem.remove();
	createDiv();
	updateScore()
}

function updateScore(){
	let showScore = document.getElementById("score");
	score++;
	showScore.innerHTML = "Score= " + score;
}

function createSnake() {
	let div = document.createElement("div");
	let gameArea = document.getElementById("game-area");
	div.setAttribute("class", "snake")
	gameArea.appendChild(div);
}


function setKeyEvent() {
	document.addEventListener("keydown", moveSnake)
}

function moveSnake(event) {
	let snake = document.getElementsByClassName("snake")[0];
	let e = event.keyCode;
	switch(e) {
		case 38: 		
		marginTop -= 2
		snake.style.marginTop = marginTop + "px";
		distance()
		test();
		break;
		case 40:
		marginTop += 2;
		snake.style.marginTop = marginTop + "px"
		distance();
		test();
		break;
		case 37:
		marginLeft -= 2;
		snake.style.marginLeft = marginLeft + "px";
		distance();
		test();
		break;
		case 39:
		marginLeft += 2;
		snake.style.marginLeft = marginLeft + "px";
		distance();
		test();
		break;
	}
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
  //console.log(Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y));
  //console.log(typeof(dist))
  if(dist < 25) {
  	deleteDiv();
  }
}

function distance() {
	let snake = document.getElementsByClassName("snake")[0];
 	let random = document.getElementsByClassName("random")[0];
 	getDistanceBetweenElements(snake, random);
 }

 function test(a) {
 	let snake = document.getElementsByClassName("snake")[0];
 	let top = parseInt(window.getComputedStyle(snake).marginTop);
 	let left = parseInt(window.getComputedStyle(snake).marginLeft);
 	if(top <= 0) {
 		snake.style.marginTop = 0 + "px";
 		//console.log(top);
 		console.log(left);
 	} else if(left <= 0) {
 		snake.style.marginLeft = 0 + "px";
 	}
 }