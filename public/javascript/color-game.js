var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var reset = document.querySelector("#reset");
var mode = document.querySelectorAll(".mode");

init();

function init(){
	modeBtn();
	setSquares();
	reUp();
}

function modeBtn(){
	for (var i = 0; i < mode.length; i++){
		mode[i].addEventListener("click", function(){
			mode[0].classList.remove("selected");
			mode[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reUp()
		});
	}
}

function setSquares(){
	for (var i = 0; i < squares.length; i++) {
	// add intial colors to squares
		squares[i].style.background = colors[i];
		// add click listeners to squares
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.background;
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.background = clickedColor;
				reset.textContent = "Play Again?"
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again"
			}
		});
	}
}


function reUp () {
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	reset.textContent = "New Colours";
	messageDisplay.textContent = "";
	h1.style.background = "steelblue";
}

reset.addEventListener("click", function(){
	reUp();
	});
}

function changeColors(color){
	for (var i = 0; i < colors.length; i++){
		squares[i].style.background = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var arr = []

	for (var i = 0; i < num; i++){
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	var r = Math.floor(Math.random() * 256)
	var g = Math.floor(Math.random() * 256)
	var b = 	Math.floor(Math.random() * 256)
	return "rgb(" + r + ", " + g + ", " + b + ")";
}









