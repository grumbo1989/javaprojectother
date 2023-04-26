/**
* date: 14/04/23
* author: me
* version: 0
vvv IMPORTANT: 
figure out why that thing happens where directions only work after you have pressed upleft
and then fix it
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
var playerSpeed = 4
var facingDirection 
var count = 0
var dashTimer = 0 
var attackSpeed = 1
var dashSpeed = 1 //how fast you move when dashing
var dashCooldown = 1 //time between dashes
var mouseX = 0
var mouseY = 0
var spell1Timer = 0
var spell1Size = 5
var spell1Speed = 5
var numProjectiles = 0
var maxProjectiles = 500

//arrays
//spells
var spell1Array = []
//enemiesd
var monster1Array = []
//canvas setup
window.onload=startCanvas
function startCanvas(){
	ctx=document.getElementById("myCanvas").getContext("2d")
	timer = setInterval(updateCanvas, 20)
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
	if(upPressed == "true"){
		Player.yPos -= playerSpeed
	}
	if(leftPressed == "true"){
		Player.xPos -= playerSpeed
	}
	if(downPressed == "true"){
		Player.yPos += playerSpeed
	}
	if(rightPressed == "true"){
		Player.xPos += playerSpeed
	}
	moveSpells()
	drawSpells()
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
		upPressed = "true"
	}
	if (keyDown=="a"){
		leftPressed = "true"
	}
	if (keyDown=="s"){
		downPressed = "true"
	}
	if (keyDown=="d"){
		rightPressed = "true"
	}
	checkDirection()
	if (keyDown=="f" && dashTimer == "0"){
		dash()
	}
	if (keyDown=="1" && spell1Timer == "0"){
		spell1()
	}
}
window.addEventListener('keyup', keyUpFunction)
function keyUpFunction(keyboardEvent){
	var keyUp = keyboardEvent.key
	if (keyUp=="w"){
		upPressed = "false"
	}
	if (keyUp=="a"){
		leftPressed = "false"
	}
	if (keyUp=="s"){
		downPressed = "false"
	}
	if (keyUp=="d"){
		rightPressed = "false"
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
		if(facingDirection == "upLeft"){
			count = 0
			while(count < 8){
				updateCanvas()
				Player.xPos -= 10
				Player.yPos -= 10
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
		if(facingDirection == "downLeft"){
			count = 0
			while(count < 8){
				updateCanvas()
				Player.xPos -= 10
				Player.yPos += 10
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
		if(facingDirection == "downRight"){
			count = 0
			while(count < 8){
				updateCanvas()
				Player.xPos += 10
				Player.yPos += 10
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
		if(facingDirection == "upRight"){
			count = 0
			while(count < 8){
				updateCanvas()
				Player.xPos += 10
				Player.yPos -= 10
				count++
			}
		}
}
function checkDirection(){
	if(upPressed=="true" && rightPressed=="false" && leftPressed=="false" && downPressed=="false"){
		facingDirection = "up"
	}
	if(upPressed=="true" && rightPressed=="false" && leftPressed=="true" && downPressed=="false"){
		facingDirection = "upLeft"
	}
	if(upPressed=="false" && rightPressed=="false" && leftPressed=="true" && downPressed=="false"){
		facingDirection = "left"
	}
	if(upPressed=="false" && rightPressed=="false" && leftPressed=="true" && downPressed=="true"){
		facingDirection = "downLeft"
	}
	if(upPressed=="false" && rightPressed=="false" && leftPressed=="false" && downPressed=="true"){
		facingDirection = "down"
	}
	if(upPressed=="false" && rightPressed=="true" && leftPressed=="false" && downPressed=="true"){
		facingDirection = "downRight"
	}
	if(upPressed=="false" && rightPressed=="true" && leftPressed=="false" && downPressed=="false"){
		facingDirection = "right"
	}
	if(upPressed=="true" && rightPressed=="true" && leftPressed=="false" && downPressed=="false"){
		facingDirection = "upRight"
	}
}
//mouse stuff
window.addEventListener('mousemove', mouseMovedFunction);
function mouseMovedFunction(mouseEvent){
	mouseX = mouseEvent.offsetX
	mouseY = mouseEvent.offsetY
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
//spells
function spell1(){
	spell1Array.push(new Spell1Projectile(Player.xPos,Player.yPos, facingDirection))
	console.log(facingDirection)
}
class Spell1Projectile{
	constructor(spell1X, spell1Y, spell1Direction){
		this.xPos = spell1X
		this.yPos = spell1Y
		this.direction = spell1Direction
	}
}
function drawSpells(){
	checkNumber = 0
	while(checkNumber < spell1Array.length){
		ctx.fillStyle = "#9932CC"
		ctx.beginPath()
		ctx.arc(spell1Array[checkNumber].xPos,spell1Array[checkNumber].yPos, spell1Size, 0, 2*Math.PI)
		ctx.fill()
		checkNumber++
	}

}
function checkSpells(){

}
function moveSpells(){
	checkNumber = 0
	while(checkNumber < spell1Array.length){
		if(spell1Array[checkNumber].direction == "up"){
			spell1Array[checkNumber].yPos -= spell1Speed
			
		}
		if(spell1Array[checkNumber].direction == "upLeft"){
			spell1Array[checkNumber].xPos -= spell1Speed
			spell1Array[checkNumber].yPos -= spell1Speed
		}
		if(spell1Array[checkNumber].direction == "left"){
			spell1Array[checkNumber].xPos -= spell1Speed
		}
		if(spell1Array[checkNumber].direction == "downLeft"){
			spell1Array[checkNumber].xPos -= spell1Speed
			spell1Array[checkNumber].yPos += spell1Speed
		}
		if(spell1Array[checkNumber].direction == "down"){
			spell1Array[checkNumber].yPos += spell1Speed
		}
		if(spell1Array[checkNumber].direction == "downRight"){
			spell1Array[checkNumber].xPos += spell1Speed
			spell1Array[checkNumber].yPos += spell1Speed
		}
		if(spell1Array[checkNumber].direction == "right"){
			spell1Array[checkNumber].xPos += spell1Speed
		}
		if(spell1Array[checkNumber].direction == "upRight"){
			spell1Array[checkNumber].xPos += spell1Speed
			spell1Array[checkNumber].yPos -= spell1Speed
		}
		checkNumber++
	}
}