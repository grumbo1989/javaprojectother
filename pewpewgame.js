/**
* date: 14/04/23
* author: me
* version: 0
vvv IMPORTANT: 
**/
//constants
const WIDTH = 1200
const HEIGHT = 900
const PLAYERSIZE = 25
//variables
var ctx
var upPressed = false
var leftPressed = false
var downPressed = false
var rightPressed = false
var playerSpeed = 13
var facingDirection = "up"
var count = 0
var dashTimer = 0 
var attackSpeed = 1
var dashSpeed = 1 //how fast you move when dashing
var dashCooldown = 1 //time between dashes

//arrays
//enemies
var monster1Array = []
//canvas setup
window.onload=startCanvas
function startCanvas(){
	ctx=document.getElementById("myCanvas").getContext("2d")
	timer = setInterval(updateCanvas, 50)
	Player.xPos = 50
	Player.yPos = 50
	monster1Array.push(new Monster1(300,400,50,30))
	monster1Array.push(new Monster1(500,200,3,20))
	monster1Array.push(new Monster1(400,600,5,14))
}	
//update canvas
function updateCanvas(){
	ctx.fillStyle = "white"
	ctx.fillRect(0,0,WIDTH,HEIGHT)
	if(dashTimer > 0){
		dashTimer--
	}
	if(upPressed == true){
		Player.yPos -= playerSpeed
	}
	if(leftPressed == true){
		Player.xPos -= playerSpeed
	}
	if(downPressed == true){
		Player.yPos += playerSpeed
	}
	if(rightPressed == true){
		Player.xPos += playerSpeed
	}
	drawPlayer()
	checkMonsters()
	drawMonsters()
}
//player stuff 
class Player{
	constructor(playerX,playerY){
		this.xPos = playerX
		this.yPos = playerY
	}
}
function drawPlayer(){
	if(dashTimer == "0"){
	ctx.fillStyle = "#800000"
	}else{
		ctx.fillStyle = "#4169E1"
	}
	ctx.beginPath()
	ctx.arc(Player.xPos, Player.yPos, PLAYERSIZE, 0, 2*Math.PI)
	ctx.fill()
	if(facingDirection == "up"){
		ctx.fillStyle = "black"
		ctx.beginPath()
		ctx.arc(Player.xPos + 7, Player.yPos - 16, 5, 0, 2*Math.PI)
		ctx.fill()
		ctx.beginPath()
		ctx.arc(Player.xPos - 7, Player.yPos - 16, 5, 0, 2*Math.PI)
		ctx.fill()
	}
	if(facingDirection == "left"){
		ctx.fillStyle = "black"
		ctx.beginPath()
		ctx.arc(Player.xPos - 16, Player.yPos + 7, 5, 0, 2*Math.PI)
		ctx.fill()
		ctx.beginPath()
		ctx.arc(Player.xPos - 16, Player.yPos - 7, 5, 0, 2*Math.PI)
		ctx.fill()
	}
	if(facingDirection == "down"){
		ctx.fillStyle = "black"
		ctx.beginPath()
		ctx.arc(Player.xPos - 7, Player.yPos + 16, 5, 0, 2*Math.PI)
		ctx.fill()
		ctx.beginPath()
		ctx.arc(Player.xPos + 7, Player.yPos + 16, 5, 0, 2*Math.PI)
		ctx.fill()
	}
	if(facingDirection == "right"){
		ctx.fillStyle = "black"
		ctx.beginPath()
		ctx.arc(Player.xPos + 16, Player.yPos - 7, 5, 0, 2*Math.PI)
		ctx.fill()
		ctx.beginPath()
		ctx.arc(Player.xPos + 16, Player.yPos + 7, 5, 0, 2*Math.PI)
		ctx.fill()
	}
}
/*
	var xDist = umbrellaHitX - rainHitX
	// y distance
	var yDist = umbrellaHitY - rainHitY

	// diagonal distance (Pythagoras!)
	var dist = Math.sqrt(xDist*xDist + yDist*yDist)
	if (dist < umbrellaHitRadius + rainHitRadius){
		// The raindrop has hit the umbrella, return true
		return(true)
	}else{
		// The raindrop has not hit the umbrella, return false
		return(false)
	}
*/
//movement
window.addEventListener('keydown', keyDownFunction)
function keyDownFunction(keyboardEvent){
	var keyDown = keyboardEvent.key
	if (keyDown=="w"){
		console.log("ehjgjg")
		upPressed = true
		facingDirection = "up"
	}
	if (keyDown=="a"){
		leftPressed = true
		facingDirection = "left"
	}
	if (keyDown=="s"){
		downPressed = true
		facingDirection = "down"
	}
	if (keyDown=="d"){
		rightPressed = true
		facingDirection = "right"
	}
	if (keyDown=="f" && dashTimer == "0"){
		dash()
	}
}
window.addEventListener('keyup', keyUpFunction)
function keyUpFunction(keyboardEvent){
	var keyUp = keyboardEvent.key
	if (keyUp=="w"){
		upPressed = false
	}
	if (keyUp=="a"){
		leftPressed = false
	}
	if (keyUp=="s"){
		downPressed = false
	}
	if (keyUp=="d"){
		rightPressed = false
	}
}
function dash(){
		dashTimer = 20 - dashCooldown
		if(facingDirection == "up"){
			count = 0
			while(count < 8){
				updateCanvas()
				Player.yPos -= 15
				count++
			}
		}
		if(facingDirection == "left"){
			count = 0
			while(count < 8){
				updateCanvas()
				Player.xPos -= 15
				count++
			}
		}
		if(facingDirection == "down"){
			count = 0
			while(count < 8){
				updateCanvas()
				Player.yPos += 15
				count++
			}
		}
		if(facingDirection == "right"){
			count = 0
			while(count < 8){
				updateCanvas()
				console.log("ewqrqweqw")
				Player.xPos += 15
				count++
			}
		}
}
//monsters 
class Monster1{
	constructor(monster1X,monster1Y,monster1Health,monster1Size){
		this.xPos = monster1X
		this.yPos = monster1Y
		this.hp = monster1Health
		this.size = monster1Size
	}
}
function drawMonsters(){
	checkNumber = 0
	while(checkNumber < monster1Array.length){
		ctx.fillStyle = "#2F4F4F"
		ctx.beginPath()
		ctx.arc(monster1Array[checkNumber].xPos,monster1Array[checkNumber].yPos, monster1Array[checkNumber].size, 0, 2*Math.PI)
		ctx.fill()
		checkNumber++
	}
}
function checkMonsters(){
		checkNumber = 0
	while(checkNumber < monster1Array.length){
		if(monster1Array[checkNumber].health < 1){
			monster1Array.splice(checkNumber,1)
		}
		checkNumber++
	}
}