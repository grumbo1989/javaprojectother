/**
* title: pewpew game (placeholder)
* date: 14/04/23
* author: me
* version: 6.3
vvv IMPORTANT: 
all music and sprites are made by me unless specified :]
NOTES TO ME IN THE FUTURE
idk do the thing and dont fail :()
**/
//constants
const WIDTH = 1200
const HEIGHT = 900
const PLAYERSIZE = 25
const WALLSIZE = 56
const MAXSPEED = 8
//variables (so many :I)
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
var magicBlastTimer = 0
var magicBlastSize = 5
var magicBlastSpeed = 5
var magicBlastDamage = 500
var magicBlastCooldownTime = 1
var numProjectiles = 0
var maxProjectiles = 500
var debugInfoOn = 0
var roomNum = 1
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
var rewardPreviewSize = 30
var dead = "false"
var random
var coinCount = 0
//arrays
var possibleRewards = ["health","spell","player","miniboss","boss"]
//spells
var magicBlastArray = []
//enemiesd
var monster1Array = []
var monster2Array = []
var monster2Size = 18
var monster2Speed = 1
var monster2ContactDamage = 3
var monster2ProjDamage = 8
var monster2ProjArray = []
var monster2ProjSpeed = 5
var monster2ProjSize = 4
//images
var heartUpgradeImage = new Image
heartUpgradeImage.src = "heartUpgrade.png"
var backgroundImage = new Image
backgroundImage.src = "background.png"
var doorUpOpenImage = new Image
doorUpOpenImage.src = "doorUp.png"
var doorLeftOpenImage = new Image
doorLeftOpenImage.src = "doorLeft.png"
var doorDownOpenImage = new Image
doorDownOpenImage.src = "doorDown.png"
var doorRightOpenImage = new Image
doorRightOpenImage.src = "doorRight.png"
var heartUpgradePreviewImage = new Image
heartUpgradePreviewImage.src = "heartUpgradePreview.png"
var playerUpgradePreviewImage = new Image
playerUpgradePreviewImage.src = "playerUpgradePreview.png"
var spellUpgradePreviewImage = new Image
spellUpgradePreviewImage.src = "spellUpgradePreview.png"
var minibossPreviewImage = new Image
minibossPreviewImage.src = "minibossPreview.png"
var bossPreviewImage = new Image
bossPreviewImage.src = "bossPreview.png"
var magicBlastImage = new Image
magicBlastImage.src = "spell1.png"
//canvas setup
window.onload=startCanvas
function startCanvas(){
	ctx=document.getElementById("myCanvas").getContext("2d")
	timer = setInterval(updateCanvas, 20)
	gameStart()
}
function gameStart(){
	Player.xPos = 500
	Player.yPos = 500
	Player.health = 75
	Player.maxHealth = 75
	Room.rewardX = 576
	Room.rewardY = 400
	Room.state = 0
	Room.upDoor = "closed"
	Room.leftDoor = "closed"
	Room.downDoor = "closed"
	Room.rightDoor = "closed"
	Reward.state = 0
	Reward.type = "health"
	doorEntered = "down"
	dead = "false"
	generateNewRoom()
}
//update canvas
function updateCanvas(){

	ctx.drawImage(backgroundImage,0,0)
	drawDoors()
	if(Player.health < 1){
		youLostLmao()
	}
	checkDirection()
	if(loadingScreen > 0){
		inControl = "false"
	}else {
		inControl = "true"
	}
	if(dashTimer > 0){
		dashTimer--
	}
	if(magicBlastTimer > 0){
		magicBlastTimer--
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
	ctx.font = "30px Papyrus"
	ctx.fillStyle = "black"
	ctx.fillText("Room "+roomNum,60,90)
	ctx.fillStyle = "gold"
	ctx.fillText(coinCount+" Coins",1020,90)
	numProjectiles = magicBlastArray.length
	numMonsters = monster1Array.length + monster2Array.length
	if(dead == "false"){
		updateHealthBar()
		count = 0
		while(count < magicBlastArray.length){
			magicBlastArray[count].moveMagicBlast()
			count++
		}
		count = 0
		while(count < monster1Array.length){
			monster1Array[count].moveMonster1()
			count++
		}
		count = 0
		while(count < monster2Array.length){
			monster2Array[count].moveMonster2()
			monster2Array[count].throwmonster2Proj()
			count++
		}
		count = 0
		while(count < monster2ProjArray.length){
			monster2ProjArray[count].movemonster2Proj()
			count++
		}
		checkSpells()
		drawSpells()
		drawPlayer()
		checkMonsters()
		checkMonsters2()
		checkMonster2Proj()
		drawMonsters()
	}else{
		inControl = "false"
	}
	roomStateCheck()
	if(loadingScreen > 0){
		console.log(loadingScreen)
		loadingScreen--
		ctx.fillStyle = "black"
		ctx.fillRect(0,0,WIDTH,HEIGHT)
	}
}
//
function roomStateCheck(){
	if(numMonsters == "0"){
		if(Reward.state == "0"){
			Reward.state = "1"	
			makeRewardVariety(Reward.type)
		}
		if(Reward.state == "1"){
			drawRewards()
			xDist = Player.xPos - (Room.rewardX + rewardSize)
			yDist = Player.yPos - (Room.rewardY + rewardSize)
			trueDist = Math.sqrt(xDist*xDist + yDist*yDist)
			if(trueDist < PLAYERSIZE + rewardSize + 19){
				grantReward(Reward.variety)
				Reward.state = "2"
				nextRoomsReward()
			}
		}
		if(Reward.state == "2"){
			drawNextRewards()
			if(doorCheck() == "true"){
				roomNum++
				loadingScreen = 25
				if(doorEntered == "up"){
					Player.xPos = 600
					Player.yPos = 100
					Reward.type = Room.downDoor
				}
				if(doorEntered == "left"){
					Player.xPos = 100
					Player.yPos = 450
					Reward.type = Room.rightDoor
				}
				if(doorEntered == "down"){
					Player.xPos = 600
					Player.yPos = 800
					Reward.type = Room.upDoor
				}
				if(doorEntered == "right"){
					Player.xPos = 1100
					Player.yPos = 450
					Reward.type = Room.leftDoor
				}
				generateNewRoom()
			}
		}
	}
}
function makeRewardVariety(type){
	if(type == "health"){
		Reward.variety = "health"
	}
	if(type == "player"){
		if(Math.ceil(Math.random()*2) == 1){
			if(playerSpeed < MAXSPEED){
				Reward.variety = "speed"
			}else{
				Reward.variety = "damage"
			}
		}else{
			Reward.variety = "damage"
		}	
	}
	if(type == "spell"){
		Reward.variety = "spell"
	}
	if(type == "miniboss"){
		if(Math.ceil(Math.random()*2) == 1){
			Reward.variety = "largeHealth"
		}else {
			Reward.variety = "largeSpell"
		}
	}
	if(type == "boss"){
		Reward.variety = "newSpell"
	}
}
function grantReward(variety){
	if(variety == "health"){
		Player.maxHealth += 25
		Player.health += 25
	}
	if(variety == "damage"){
		magicBlastDamage = magicBlastDamage * 1.1
		magicBlastDamage = (Math.ceil(magicBlastDamage*5))/5
	}
	if(variety == "speed"){
		playerSpeed++
	}
	if(variety == "spell"){
		random = Math.ceil(Math.random * 3)
		if(random == 1){
			magicBlastDamage = magicBlastDamage * 1.2
			magicBlastDamage = (Math.ceil(magicBlastDamage*5))/5
		}else if(random == 2){
			magicBlastSpeed = magicBlastSpeed + 1
		}else if(random == 3){
			magicBlastCooldownTime--
		}
	}
	if(variety == "largeHealth"){
		Player.maxHealth += 50
		Player.health += 50
	}
	if(variety == "largeSpell"){
		magicBlastDamage = magicBlastDamage * 1.2
		magicBlastDamage = (Math.ceil(magicBlastDamage*5))/5
		magicBlastSpeed = magicBlastSpeed + 1
		magicBlastCooldownTime--
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
	possibleRewards = ["health","spell","player","miniboss"]
	random = Math.floor(Math.random()*possibleRewards.length)
	Room.upDoor = possibleRewards[random]
	possibleRewards.splice(random, 1)
	random = Math.floor(Math.random()*possibleRewards.length)
	Room.leftDoor = possibleRewards[random]
	possibleRewards.splice(random, 1)
	random = Math.floor(Math.random()*possibleRewards.length)
	Room.downDoor = possibleRewards[random]
	possibleRewards.splice(random, 1)
	random = Math.floor(Math.random()*possibleRewards.length)
	Room.rightDoor = possibleRewards[random]
	possibleRewards.splice(random, 1)
	if((roomNum + 1) / (Math.floor((roomNum + 1) / 10)) == 0){
		Room.upDoor = "boss"
		Room.leftDoor = "boss"
		Room.downDoor = "boss"
		Room.rightDoor = "boss"
	}
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
		Room.rightDoor = "closed"
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
		}else {
			ctx.fillStyle = "#EFB0FF"
			ctx.beginPath()
			ctx.arc(Room.rewardX, Room.rewardY, rewardSize, 0, 2*Math.PI)
			ctx.fill()
		}
	}
}
function drawNextRewards(){
	if(Room.upDoor != "closed"){
		if(Room.upDoor == "health"){
			ctx.drawImage(heartUpgradePreviewImage, 570, 70)
		}
		if(Room.upDoor == "spell"){
			ctx.drawImage(spellUpgradePreviewImage, 570, 70)
		}
		if(Room.upDoor == "player"){
			ctx.drawImage(playerUpgradePreviewImage, 570, 70)
		}
		if(Room.upDoor == "miniboss"){
			ctx.drawImage(minibossPreviewImage, 570, 70)
		}
		if(Room.upDoor == "boss"){
			ctx.drawImage(bossPreviewImage, 570, 70)
		}
	}
	if(Room.leftDoor != "closed"){
		if(Room.leftDoor == "health"){
			ctx.drawImage(heartUpgradePreviewImage, 70, 420)
		}
		if(Room.leftDoor == "spell"){
			ctx.drawImage(spellUpgradePreviewImage, 70, 420)
		}
		if(Room.leftDoor == "player"){
			ctx.drawImage(playerUpgradePreviewImage, 70, 420)
		}
		if(Room.leftDoor == "miniboss"){
			ctx.drawImage(minibossPreviewImage, 70, 420)
		}
		if(Room.leftDoor == "boss"){
			ctx.drawImage(bossPreviewImage, 70, 420)
		}
	}
	if(Room.downDoor != "closed"){
		if(Room.downDoor == "health"){
			ctx.drawImage(heartUpgradePreviewImage, 570, 770)
		}
		if(Room.downDoor == "spell"){
			ctx.drawImage(spellUpgradePreviewImage, 570, 770)
		}
		if(Room.downDoor == "player"){
			ctx.drawImage(playerUpgradePreviewImage, 570, 770)
		}
		if(Room.downDoor == "miniboss"){
			ctx.drawImage(minibossPreviewImage, 570, 770)
		}
		if(Room.downDoor == "boss"){
			ctx.drawImage(bossPreviewImage, 570, 770)
		}
	}
	if(Room.rightDoor != "closed"){
		if(Room.rightDoor == "health"){
			ctx.drawImage(heartUpgradePreviewImage, 1070, 420)
		}
		if(Room.rightDoor == "spell"){
			ctx.drawImage(spellUpgradePreviewImage, 1070, 420)
		}
		if(Room.rightDoor == "player"){
			ctx.drawImage(playerUpgradePreviewImage, 1070, 420)
		}
		if(Room.rightDoor == "miniboss"){
			ctx.drawImage(minibossPreviewImage, 1070, 420)
		}
		if(Room.rightDoor == "boss"){
			ctx.drawImage(bossPreviewImage, 1070, 420)
		}
	}
}
function generateNewRoom(lastRoomReward, entryDoor, lastRoomVariant){
	monster1Array = []
	if(Reward.type == "miniboss"){
		monster1Array.push(new Monster1(600, 450, 80, 45, 14, 3))
	}else{
		random = Math.ceil(Math.random()*3)
		if(random == 1 || roomNum == 1){
			monster1Array.push(new Monster1(300,400,30,20, 5, 2))
			monster1Array.push(new Monster1(500,200,30,20, 5, 2))
			monster1Array.push(new Monster1(400,600,30,20, 5, 2))
		}else if(random == 2){
			monster2Array.push(new Monster2(400,500,15,100))
			monster2Array.push(new Monster2(500,400,15,100))
			monster2Array.push(new Monster2(600,300,15,100))
			monster2Array.push(new Monster2(700,200,15,100))
			monster2Array.push(new Monster2(600,500,15,100))
		}else{
			monster1Array.push(new Monster1(400,400,30,20, 5, 2))
			monster1Array.push(new Monster1(500,200,30,20, 5, 2))
			monster2Array.push(new Monster2(700,300,15,100))
			monster2Array.push(new Monster2(500,300,15,100))
		}
	}
	Reward.state = 0
}
//door entering stuff
function doorCheck(){
	if(Player.xPos > 500 && Player.xPos < 700 && Player.yPos - PLAYERSIZE < WALLSIZE + 5 && Room.upDoor != "closed" ){
		doorEntered = "down"
		console.log("test")
		return("true")
	}else if(Player.yPos > 350 && Player.yPos < 550 && Player.xPos - PLAYERSIZE < WALLSIZE + 5 && Room.leftDoor != "closed" ){
		doorEntered = "right"
		return("true")
	}else if(Player.xPos > 500 && Player.xPos < 700 && Player.yPos + PLAYERSIZE > 837 && Room.downDoor != "closed" ){
		doorEntered = "up"
		return("true")
	}else if(Player.yPos > 350 && Player.yPos < 550 && Player.xPos + PLAYERSIZE > 1137 && Room.rightDoor != "closed" ){
		doorEntered = "left"
		return("true")
	}else{
		return("false")
	}
}
function drawDoors(){
	ctx.drawImage(doorUpOpenImage,456,-6)
	ctx.drawImage(doorLeftOpenImage,-6,306)
	ctx.drawImage(doorDownOpenImage,456,834)
	ctx.drawImage(doorRightOpenImage,1134,306)
}
//player stuff 
class Player{
	constructor(playerX,playerY,playerHealth,playerMaxHealth){
		this.xPos = playerX
		this.yPos = playerY
		this.health = playerHealth
		this.maxHealth = playerMaxHealth
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
function youLostLmao(){
	dead = "true"
	ctx.fillStyle = "blue"
	ctx.fillRect(450,450,300,100)
}
//health bar
function updateHealthBar(){
	count = 0
	while(count < Player.maxHealth/25){
		count++
		if(Player.health - (Player.maxHealth - count * 25) >= 25){
			ctx.fillStyle = "#DC143C"
		}else if(Player.health - (Player.maxHealth - count * 25) >= 20){
			ctx.fillStyle = "#BB1133"
		}else if(Player.health - (Player.maxHealth - count * 25) >= 15){
			ctx.fillStyle = "#8C0D26"
		}else if(Player.health - (Player.maxHealth - count * 25) >= 10){
			ctx.fillStyle = "#5D091A"
		}else if(Player.health - (Player.maxHealth - count * 25) >= 5){
			ctx.fillStyle = "#2F040D"
		}else {
			ctx.fillStyle = "#000000"
		}
		ctx.beginPath()
		ctx.arc((50 + Player.maxHealth * 2) - (count -1) * 50, 800, 20, 0, 2*Math.PI)
		ctx.fill()
	}
}
//movement
window.addEventListener('keydown', keyDownFunction)
function keyDownFunction(keyboardEvent){
	var keyDown = keyboardEvent.key
	if(inControl == "true"){
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
		if (keyDown==" " && dashTimer == "0"){
			dash()
		}
		if (keyDown=="h" && magicBlastTimer == "0"){
			magicBlast()
		}
		if (keyDown=="p"){
			if(debugInfoOn=="1"){
				debugInfoOn="0"
			}else{
				debugInfoOn="1"
			}
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
window.addEventListener('mousemove', mouseMovedFunction)
function mouseMovedFunction(mouseEvent){
	mouseX = mouseEvent.offsetX
	mouseY = mouseEvent.offsetY
}
window.addEventListener('click', youClicked)
function youClicked(mouseEvent){
	if(dead == "true"){
		if(mouseX > 450 && mouseX < 750 && mouseY > 450 && mouseY < 550){
			gameStart()
		}
	}
}
//monsters 
class Monster1{
	constructor(monster1X,monster1Y,monster1Health,monster1Size,monster1Damage,monster1Speed){
		this.xPos = monster1X
		this.yPos = monster1Y
		this.health = monster1Health
		this.size = monster1Size
		this.damage = monster1Damage
		this.speed = monster1Speed
	}
	moveMonster1(){
		if(this.xPos >= Player.xPos - this.size && this.xPos <= Player.xPos + this.size){
			if(this.yPos > Player.yPos){
				this.yPos -= this.speed
			}else if(this.yPos < Player.yPos){
				this.yPos += this.speed
			}
		}else if(this.yPos >= Player.yPos - this.size && this.yPos <= Player.yPos + this.size){
			if(this.xPos > Player.xPos){
				this.xPos -= this.speed
			}else if(this.xPos < Player.xPos){
				this.xPos += this.speed
			}
		}else {
			random = Math.ceil(Math.random()*2)
			if(random == 1){
				if(this.yPos > Player.yPos){
					this.yPos -= this.speed
				}else if(this.yPos < Player.yPos){
					this.yPos += this.speed
				}
			}else {
				if(this.xPos > Player.xPos){
					this.xPos -= this.speed
				}else if(this.xPos < Player.xPos){
					this.xPos += this.speed
				}
			}
		}
	}
}
class Monster2{
	//will run away from the player while throwing x amount of projectiles at them then start chasing them normally when they run out of projectiles
	constructor(monster2X,monster2Y,monster2Health,monster2Cooldown){
		this.xPos = monster2X
		this.yPos = monster2Y
		this.health = monster2Health
		this.cooldown = monster2Cooldown
	}
	moveMonster2(){	
		if(this.xPos >= Player.xPos - monster2Size && this.xPos <= Player.xPos + monster2Size){
			if(this.yPos > Player.yPos){
				this.yPos -= monster2Speed
			}else if(this.yPos < Player.yPos){
				this.yPos += monster2Speed
			}
		}else if(this.yPos >= Player.yPos - monster2Size && this.yPos <= Player.yPos + monster2Size){
			if(this.xPos > Player.xPos){
				this.xPos -= monster2Speed
			}else if(this.xPos < Player.xPos){
				this.xPos += monster2Speed
			}
		}else {
			random = Math.ceil(Math.random()*2)
			if(random == 1){
				if(this.yPos > Player.yPos){
					this.yPos -= monster2Speed
				}else if(this.yPos < Player.yPos){
					this.yPos += monster2Speed
				}
			}else {
				if(this.xPos > Player.xPos){
					this.xPos -= monster2Speed
				}else if(this.xPos < Player.xPos){
					this.xPos += monster2Speed
				}
			}
		}
	}
	throwmonster2Proj(){
		if(this.cooldown == 0){
			//will only throw when the projectile will hit the player (if they were to not move once it was thrown)
			if(this.xPos < Player.xPos + PLAYERSIZE && this.xPos > Player.xPos - PLAYERSIZE && this.yPos > Player.yPos){
				monster2ProjArray.push(new monster2Proj(this.xPos,this.yPos,"up"))
				this.cooldown = 100
			}
			if(this.yPos < Player.yPos + PLAYERSIZE && this.yPos > Player.yPos - PLAYERSIZE && this.xPos > Player.xPos){
				monster2ProjArray.push(new monster2Proj(this.xPos,this.yPos,"left"))
				this.cooldown = 100
			}
			if(this.xPos < Player.xPos + PLAYERSIZE && this.xPos > Player.xPos - PLAYERSIZE && this.yPos < Player.yPos){
				monster2ProjArray.push(new monster2Proj(this.xPos,this.yPos,"down"))
				this.cooldown = 100
			}
			if(this.yPos < Player.yPos + PLAYERSIZE && this.yPos > Player.yPos - PLAYERSIZE && this.xPos < Player.xPos){
				monster2ProjArray.push(new monster2Proj(this.xPos,this.yPos,"right"))
				this.cooldown = 100
			}
		}else{
			this.cooldown--
		}
	}
}
class monster2Proj{
	constructor(monster2ProjX,monster2ProjY,monster2ProjDirection){
		this.xPos = monster2ProjX
		this.yPos = monster2ProjY
		this.direction = monster2ProjDirection
	}
	movemonster2Proj(){
		if(this.direction == "up"){
			this.yPos -= monster2ProjSpeed
		}else if(this.direction == "left"){
			this.xPos -= monster2ProjSpeed
		}else if(this.direction == "down"){
			this.yPos += monster2ProjSpeed
		}else if(this.direction == "right"){
			this.xPos += monster2ProjSpeed
		}	
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
	checkNumber = 0
	while(checkNumber < monster2Array.length){
		ctx.fillStyle = "#DCDCDC"
		ctx.beginPath()
		ctx.arc(monster2Array[checkNumber].xPos,monster2Array[checkNumber].yPos, monster2Size, 0, 2*Math.PI)
		ctx.fill()
		checkNumber++
	}
	checkNumber = 0
	while(checkNumber < monster2ProjArray.length){
		ctx.fillStyle = "#808080"
		ctx.beginPath()
		ctx.arc(monster2ProjArray[checkNumber].xPos,monster2ProjArray[checkNumber].yPos, monster2ProjSize, 0, 2*Math.PI)
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
		while(checkNumber2 < magicBlastArray.length){
			xDist = monster1Array[checkNumber].xPos -  magicBlastArray[checkNumber2].xPos
			yDist = monster1Array[checkNumber].yPos -  magicBlastArray[checkNumber2].yPos
			trueDist = Math.sqrt(xDist*xDist + yDist*yDist)
			if(trueDist < monster1Array[checkNumber].size + magicBlastSize){
				monster1Array[checkNumber].health -= magicBlastDamage
				magicBlastArray.splice(checkNumber2, 1)
			}
			checkNumber2++
		}
		checkNumber++
	}
	checkNumber = 0
	while(checkNumber < monster1Array.length){
		if(monster1Array[checkNumber].health < 1){
			monster1Array.splice(checkNumber,1)
			if(Math.ceil(Math.random() * 3) == 2){
				coinCount += Math.floor(Math.random() * 5) + 5
			}
		}
		checkNumber++
	}
}
function checkMonsters2(){
	checkNumber = 0
	while(checkNumber < monster2Array.length){
		xDist = Player.xPos -  monster2Array[checkNumber].xPos
		yDist = Player.yPos -  monster2Array[checkNumber].yPos
		trueDist = Math.sqrt(xDist*xDist + yDist*yDist)
		if(trueDist < monster2Size + PLAYERSIZE && iFrames == 0){
			Player.health -= monster2ContactDamage
			iFrames = 30
		}
		checkNumber++
	}
	checkNumber = 0
	while(checkNumber < monster2Array.length){
		checkNumber2 = 0
		while(checkNumber2 < magicBlastArray.length){
			xDist = monster2Array[checkNumber].xPos -  magicBlastArray[checkNumber2].xPos
			yDist = monster2Array[checkNumber].yPos -  magicBlastArray[checkNumber2].yPos
			trueDist = Math.sqrt(xDist*xDist + yDist*yDist)
			if(trueDist < monster2Size + magicBlastSize){
				monster2Array[checkNumber].health -= magicBlastDamage
				magicBlastArray.splice(checkNumber2, 1)
			}
			checkNumber2++
		}
		checkNumber++
	}
	checkNumber = 0
	while(checkNumber < monster2Array.length){
		if(monster2Array[checkNumber].health < 1){
			monster2Array.splice(checkNumber,1)
			if(Math.ceil(Math.random() * 3) == 2){
				coinCount += Math.floor(Math.random() * 5) + 5
			}
		}
		checkNumber++
	}
}
function checkMonster2Proj(){
	checkNumber = 0
	while(checkNumber < monster2ProjArray.length){
		if(monster2ProjArray[checkNumber].xPos + monster2ProjSize > WIDTH - WALLSIZE || monster2ProjArray[checkNumber].yPos + monster2ProjSize > HEIGHT - WALLSIZE || monster2ProjArray[checkNumber].xPos - monster2ProjSize < 0 + WALLSIZE || monster2ProjArray[checkNumber].yPos - monster2ProjSize < 0 + WALLSIZE){
			monster2ProjArray.splice(checkNumber,1)
		}
		checkNumber++
	}
	checkNumber = 0
	while(checkNumber < monster2ProjArray.length){
		xDist = Player.xPos -  monster2ProjArray[checkNumber].xPos
		yDist = Player.yPos -  monster2ProjArray[checkNumber].yPos
		trueDist = Math.sqrt(xDist*xDist + yDist*yDist)
		if(trueDist < PLAYERSIZE + monster2ProjSize){
			Player.health -= monster2ProjDamage
			monster2ProjArray.splice(checkNumber, 1)
			iFrames = 30
		}
		checkNumber++
	}
}
//spells
function magicBlast(){
	magicBlastTimer = magicBlastCooldownTime
	magicBlastArray.push(new MagicBlastProjectile(Player.xPos,Player.yPos, facingDirection))
}
class MagicBlastProjectile{
	constructor(magicBlastX, magicBlastY, magicBlastDirection){
		this.xPos = magicBlastX
		this.yPos = magicBlastY
		this.direction = magicBlastDirection
	}
	moveMagicBlast(){
		if(this.direction == "up"){
			this.yPos -= magicBlastSpeed
		}else if(this.direction == "upLeft"){
			this.xPos -= magicBlastSpeed
			this.yPos -= magicBlastSpeed 
		}else if(this.direction == "left"){
			this.xPos -= magicBlastSpeed
		}else if(this.direction == "downLeft"){
			this.xPos -= magicBlastSpeed
			this.yPos += magicBlastSpeed
		}else if(this.direction == "down"){
			this.yPos += magicBlastSpeed
		}else if(this.direction == "downRight"){
			this.xPos += magicBlastSpeed
			this.yPos += magicBlastSpeed
		}else if(this.direction == "right"){
			this.xPos += magicBlastSpeed
		}else if(this.direction == "upRight"){
			this.xPos += magicBlastSpeed
			this.yPos -= magicBlastSpeed
		}
	}
}
//
function fireball(){
	fireballTimer = fireballCooldownTime
	fireballArray.push(new FireballProjectile(Player.xPos,Player.yPos, facingDirection))
}
class FireballProjectile{
	constructor(fireballX, fireballY, fireballDirection, fireballExploded, fireballSize){
		this.xPos = fireballX
		this.yPos = fireballY
		this.direction = fireballDirection
		this.exploded = fireballExploded
		this.size = fireballSize
	}
	moveFireball(){
		if(this.direction == "up"){
			this.yPos -= fireballSpeed
		}else if(this.direction == "upLeft"){
			this.xPos -= fireballSpeed
			this.yPos -= fireballSpeed 
		}else if(this.direction == "left"){
			this.xPos -= mfireballSpeed
		}else if(this.direction == "downLeft"){
			this.xPos -= fireballSpeed
			this.yPos += fireballSpeed
		}else if(this.direction == "down"){
			this.yPos += fireballSpeed
		}else if(this.direction == "downRight"){
			this.xPos += fireballSpeed
			this.yPos += fireballSpeed
		}else if(this.direction == "right"){
			this.xPos += fireballSpeed
		}else if(this.direction == "upRight"){
			this.xPos += fireballSpeed
			this.yPos -= fireballSpeed
		}
	}
}
//
function drawSpells(){
	checkNumber = 0
	while(checkNumber < magicBlastArray.length){
		ctx.drawImage(magicBlastImage, magicBlastArray[checkNumber].xPos - magicBlastSize, magicBlastArray[checkNumber].yPos - magicBlastSize)
		checkNumber++
	}

}
function checkSpells(){
	checkNumber = 0
	while(checkNumber < magicBlastArray.length){
		if(magicBlastArray[checkNumber].xPos + magicBlastSize > WIDTH - WALLSIZE || magicBlastArray[checkNumber].yPos + magicBlastSize > HEIGHT - WALLSIZE || magicBlastArray[checkNumber].xPos - magicBlastSize < 0 + WALLSIZE || magicBlastArray[checkNumber].yPos - magicBlastSize < 0 + WALLSIZE){
			magicBlastArray.splice(checkNumber,1)
		}
		checkNumber++
	}
	while(numProjectiles > maxProjectiles){
		magicBlastArray.splice(0,1)
		numProjectiles--
	}
}
//debug info
function drawDebugInfo(){
	ctx.font = "15px arial"
	ctx.fillStyle = "white"
	ctx.fillText(numProjectiles+" projectiles", 1100, 40)
	ctx.fillText(facingDirection, 1100, 60)
	ctx.fillText(Player.health+" hp",1100, 700)
	ctx.fillText(monster1Array.length+" monsters left",1100,80)
	ctx.fillText(magicBlastDamage+" "+magicBlastSpeed+" "+magicBlastCooldownTime,1050,750)
}
