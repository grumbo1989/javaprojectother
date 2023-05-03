/**
* date: 14/04/23
* author: me
* version: 2.2
vvv IMPORTANT: 
things to doo
finish the room clearing and shit
**/
//constants
const WIDTH = 1200
const HEIGHT = 900
const PLAYERSIZE = 25
const WALLSIZE = 56
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
var spell1Damage = 5
var numProjectiles = 0
var maxProjectiles = 500
var debugInfoOn = 0
var roomNum = 0
var checkNumber = 0
var checkNumber2 = 0
var xDist = 0
var yDist = 0
var trueDist = 0
var iFrames = 0
var roomReward
var doorEntered = "down"
var loadingScreen = "false"
var rewardSize = 24
//arrays
var possibleRewards = ["health"]
//spells
var spell1Array = []
//enemiesd
var monster1Array = []
//images
var heartUpgradeImage = new Image
heartUpgradeImage.src = "heartUpgrade.png"
var backgroundImage = new Image
backgroundImage.src = "background.png"
var doorUpOpenImage = new Image
doorUpOpenImage.src = "doorUp.png"
//canvas setup
window.onload=startCanvas
function startCanvas(){
	ctx=document.getElementById("myCanvas").getContext("2d")
	timer = setInterval(updateCanvas, 20)
	Player.xPos = 500
	Player.yPos = 500
	Player.health = 50
	monster1Array.push(new Monster1(300,400,5,30, 5))
	monster1Array.push(new Monster1(500,200,3,20, 5))
	monster1Array.push(new Monster1(400,600,5,14, 5))
	Room.rewardX = 576
	Room.rewardY = 200
	Room.state = 0
	Room.upDoor = "closed"
	Room.leftDoor = "closed"
	Room.downDoor = "closed"
	Room.rightDoor = "closed"
	Reward.state = 0
	Reward.type = "health"
	generateNewRoom("health","up","start")
}	
//update canvas
function updateCanvas(){
	if(loadingScreen == "true"){
		ctx.fillStyle = "black"
		ctx.fillRect(0,0,WIDTH,HEIGHT)
	}
	ctx.drawImage(backgroundImage,0,0)
	drawDoors()
	checkDirection()
	if(dashTimer > 0){
		dashTimer--
	}
	if(spell1Timer > 0){
		spell1Timer--
	}
	if(iFrames > 0){
		iFrames--
	}
	if(upPressed == "true" && upWallCollision(1)){
		Player.yPos -= playerSpeed
	}
	if(leftPressed == "true" && leftWallCollision(1)){
		Player.xPos -= playerSpeed
	}
	if(downPressed == "true" && downWallCollision(1)){
		Player.yPos += playerSpeed
	}
	if(rightPressed == "true" && rightWallCollision(1)){
		Player.xPos += playerSpeed
	}
	if(debugInfoOn=="1"){
		drawDebugInfo()
	}
	moveSpells()
	numProjectiles = spell1Array.length
	checkSpells()
	drawSpells()
	drawPlayer()
	checkMonsters()
	drawMonsters()
	if(monster1Array.length == "0"){
		if(Reward.state == "0"){
			nextRoomsReward()
			Reward.state = "1"	
			Reward.variety = "health"
		}
		if(Reward.state == "1"){
			xDist = Player.xPos - (Room.rewardX + rewardSize)
			yDist = Player.yPos - (Room.rewardY + rewardSize)
			trueDist = Math.sqrt(xDist*xDist + yDist*yDist)
			if(trueDist < PLAYERSIZE + rewardSize + 19){
				Reward.state = "2"
				console.log("eehehe")
			}
		}
		if(Reward.state == "2"){
			if(doorCheck() == "true"){
				
			}
		}
		drawRewards()
	}
}

//room stuff
class Room{
	constructor(rewardXPos,rewardYPos, roomUpDoor, roomLeftDoor, roomDownDoor, roomRightDoor){
		this.rewardX = rewardXPos
		this.rewardY = rewardYPos
		this.upDoor = roomUpDoor
		this.leftDoor = roomLeftDoor
		this.downDoor = roomDownDoor
		this.rightDoor = roomRightDoor
	}
}
function nextRoomsReward(){
	Room.upDoor = possibleRewards[Math.floor(Math.random())*possibleRewards.length]
	Room.leftDoor = possibleRewards[Math.floor(Math.random())*possibleRewards.length]
	Room.downDoor = possibleRewards[Math.floor(Math.random())*possibleRewards.length]
	Room.rightDoor = possibleRewards[Math.floor(Math.random())*possibleRewards.length]
	if(doorEntered == "up"){
		Room.upDoor = "closed"
	}
	if(doorEntered == "left"){
		Room.leftDoor = "closed"
	}
	if(doorEntered == "down"){
		Room.downDoor = "closed"
	}
	if(doorEntered == "right"){
		Room.downDoor = "closed"
	}
}
//room reward
class Reward{
	constructor(rewardType,rewardState, rewardVariety){
		this.type = rewardType
		this.state = rewardState
		this.variety = rewardVariety
	}
}
function drawRewards(){
	if(Reward.state == "1"){
		if(Reward.type == "health"){
			ctx.drawImage(heartUpgradeImage,Room.rewardX,Room.rewardY)
		}
	}
}
function generateNewRoom(lastRoomReward, doorEntered, lastRoomVariant){

}
//door entering stuff
function doorCheck(){
	if(Player.xPos > 500 && Player.xPos < 700 && Player.yPos - PLAYERSIZE < WALLSIZE + 5 && Room.upDoor != "closed" ){
		doorEntered = "down"
		return(true)
	}else if(Player.yPos > 350 && Player.yPos < 550 && Player.xPos - PLAYERSIZE < WALLSIZE + 5 && Room.leftDoor != "closed" ){
		doorEntered = "right"
		return(true)
	}else if(Player.xPos > 500 && Player.xPos < 700 && Player.yPos + PLAYERSIZE > HEIGHT - WALLSIZE - 3 && Room.downDoor != "closed" ){
		doorEntered = "up"
		return(true)
	}else if(Player.yPos > 350 && Player.yPos < 550 && Player.xPos + PLAYERSIZE > WIDTH - WALLSIZE - 3 && Room.rightDoor != "closed" ){
		doorEntered = "left"
		return(true)
	}else{
		return(false)
	}
}
function drawDoors(){
	ctx.drawImage(doorUpOpenImage,456,-3)
}
//player stuff 
class Player{
	constructor(playerX,playerY,playerHealth){
		this.xPos = playerX
		this.yPos = playerY
		this.health = playerHealth
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

//movement
window.addEventListener('keydown', keyDownFunction)
function keyDownFunction(keyboardEvent){
	
	var keyDown = keyboardEvent.key
	if (keyDown=="w"){
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
	if (keyDown=="f" && dashTimer == "0"){
		dash()
	}
	if (keyDown=="1" && spell1Timer == "0"){
		spell1()
	}
	if (keyDown=="p"){
		if(debugInfoOn=="1"){
			debugInfoOn="0"
		}else{
			debugInfoOn="1"
		}
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
		dashTimer = 40 - dashCooldown
		if(facingDirection == "up"){
			count = 0
			while(count < 8){
				if(upWallCollision(2)){
					Player.yPos -= 15
				}
				count++
			}
		}
		if(facingDirection == "upLeft"){
			count = 0
			while(count < 6){
				if(leftWallCollision(2)){
					Player.xPos -= 15
				}
				if(upWallCollision(2)){
					Player.yPos -= 15
				}
				count++
			}
		}
		if(facingDirection == "left"){
			count = 0
			while(count < 8){
				if(leftWallCollision(2)){
					Player.xPos -= 15
				}
				count++
			}
		}
		if(facingDirection == "downLeft"){
			count = 0
			while(count < 6){
				if(leftWallCollision(2)){
					Player.xPos -= 15
				}
				if(downWallCollision(2)){
					Player.yPos += 15
				}
				count++
			}
		}
		if(facingDirection == "down"){
			count = 0
			while(count < 8){
				if(downWallCollision(2)){
					Player.yPos += 15
				}
				count++
			}
		}
		if(facingDirection == "downRight"){
			count = 0
			while(count < 6){
				if(rightWallCollision(2)){
					Player.xPos += 15
				}
				if(downWallCollision(2)){
					Player.yPos += 15
				}
				count++
			}
		}
		if(facingDirection == "right"){
			count = 0
			while(count < 8){
				if(rightWallCollision(2)){
					Player.xPos += 15
				}
				count++
			}
		}
		if(facingDirection == "upRight"){
			count = 0
			while(count < 6){
				if(rightWallCollision(2)){
					Player.xPos += 15
				}
				if(upWallCollision(2)){
					Player.yPos -= 15
				}
				count++
			}
		}
}
function checkDirection(){
	if(upPressed=="true"){
		facingDirection = "up"
	}
	if(leftPressed=="true"){
		facingDirection = "left"
	}
	if(downPressed=="true"){
		facingDirection = "down"
	}
	if(rightPressed=="true"){
		facingDirection = "right"
	}
	if(upPressed=="true" && leftPressed=="true"){
		facingDirection = "upLeft"
	}
	if(downPressed=="true" && leftPressed=="true"){
		facingDirection = "downLeft"
	}
	if(downPressed=="true" && rightPressed=="true"){
		facingDirection = "downRight"
	}
	if(upPressed=="true" && rightPressed=="true"){
		facingDirection = "upRight"
	}
}
//wall collision
function upWallCollision(movement){
	if(movement =="1"){
		if(Player.yPos - PLAYERSIZE - playerSpeed < WALLSIZE){
			return(false)
		}else{
			return(true)
		}
	}else{
		if(Player.yPos - PLAYERSIZE - 15 < WALLSIZE){
			return(false)
		}else{
			return(true)
		}
	}
}
function leftWallCollision(movement){
	if(movement =="1"){
		if(Player.xPos - PLAYERSIZE - playerSpeed < WALLSIZE){
			return(false)
		}else{
			return(true)
		}
	}else{
		if(Player.xPos - PLAYERSIZE - 15 < WALLSIZE){
			return(false)
		}else{
			return(true)
		}
	}
}
function downWallCollision(movement){
	if(movement == "1"){
		if(Player.yPos + PLAYERSIZE + playerSpeed > HEIGHT - WALLSIZE){
			return(false)
		}else{
			return(true)
		}
	}else{
		if(Player.yPos + PLAYERSIZE + 15 > HEIGHT - WALLSIZE){
			return(false)
		}else{
			return(true)
		}
	}
}
function rightWallCollision(movement){
	if(movement == "1"){
		if(Player.xPos + PLAYERSIZE + playerSpeed > WIDTH - WALLSIZE){
			return(false)
		}else{
			return(true)
		}
	}else{
		if(Player.xPos + PLAYERSIZE + 15 > WIDTH - WALLSIZE){
			return(false)
		}else{
			return(true)
		}
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
	constructor(monster1X,monster1Y,monster1Health,monster1Size,monster1Damage){
		this.xPos = monster1X
		this.yPos = monster1Y
		this.health = monster1Health
		this.size = monster1Size
		this.damage = monster1Damage
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
		if(monster1Array[checkNumber].size > PLAYERSIZE){
		xDist = monster1Array[checkNumber].xPos -  Player.xPos
		yDist = monster1Array[checkNumber].yPos -  Player.yPos
		}else{
		xDist = Player.xPos -  monster1Array[checkNumber].xPos
		yDist = Player.yPos -  monster1Array[checkNumber].yPos
		}
		trueDist = Math.sqrt(xDist*xDist + yDist*yDist)
		if(trueDist < monster1Array[checkNumber].size + PLAYERSIZE && iFrames == 0){
			Player.health -= monster1Array[checkNumber].damage
			iFrames = 30
		}
		checkNumber++
	}
	checkNumber = 0
	while(checkNumber < monster1Array.length){
		checkNumber2 = 0
		while(checkNumber2 < spell1Array.length){
			xDist = monster1Array[checkNumber].xPos -  spell1Array[checkNumber2].xPos
			yDist = monster1Array[checkNumber].yPos -  spell1Array[checkNumber2].yPos
			trueDist = Math.sqrt(xDist*xDist + yDist*yDist)
			if(trueDist < monster1Array[checkNumber].size + spell1Size){
				monster1Array[checkNumber].health -= spell1Damage
				spell1Array.splice(checkNumber2, 1)
			}
			checkNumber2++
		}
		checkNumber++
	}
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
	spell1Timer = 15
	spell1Array.push(new Spell1Projectile(Player.xPos,Player.yPos, facingDirection))
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
	checkNumber = 0
	while(checkNumber < spell1Array.length){
		if(spell1Array[checkNumber].xPos + spell1Size > WIDTH - WALLSIZE || spell1Array[checkNumber].yPos + spell1Size > HEIGHT - WALLSIZE || spell1Array[checkNumber].xPos - spell1Size < 0 + WALLSIZE || spell1Array[checkNumber].yPos - spell1Size < 0 + WALLSIZE){
			spell1Array.splice(checkNumber,1)
		}
		checkNumber++
	}
	while(numProjectiles > maxProjectiles){
		spell1Array.splice(0,1)
		numProjectiles--
	}
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
//debug info
function drawDebugInfo(){
	ctx.font = "15px arial"
	ctx.fillStyle = "black"
	ctx.fillText(numProjectiles+" projectiles", 1100, 40)
	ctx.fillText(facingDirection, 1100, 60)
	ctx.fillText(Player.health+" hp",1100, 700)
	ctx.fillText(monster1Array.length+" monsters left",1100,80)
}
