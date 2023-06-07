/**
* title: pewpew game (placeholder)
* date: 14/04/23
* author: me
* version: 7.2
vvv IMPORTANT: 
all music and sprites are made by me unless specified :]
THINGS:
weird glitch that gives everything like trails but i like it and im not gonna fix it because it looks cool
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
var magicBlastDamage = 5
var magicBlastCooldownTime = 10
var fireballTimer = 0
var fireballCooldownTime = 20
var fireballSpeed = 7
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
var fireballArray = []
//enemiesd
var biteyArray = []
var skeletonArray = []
var skeletonSize = 18
var skeletonSpeed = 1
var skeletonContactDamage = 3
var skeletonProjDamage = 8
var skeletonProjArray = []
var skeletonProjSpeed = 5
var skeletonProjSize = 4
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
var biteyImage = new Image
biteyImage.src = "bitey.png"
var skeletonImage = new Image
skeletonImage.src = "skeleton.png"
//canvas setup
window.onload=startCanvas
function startCanvas(){
	ctx=document.getElementById("myCanvas").getContext("2d")
	timer = setInterval(updateCanvas, 20)
	gameStart()
}
function gameStart(){
	//resets the game 
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
	roomNum = 1
	doorEntered = "down"
	dead = "false"
	biteyArray = []
	skeletonArray = []
	skeletonProjArray = []
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
	if(fireballTimer > 0){
		fireballTimer--
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
	numMonsters = biteyArray.length + skeletonArray.length
	if(dead == "false"){
		updateHealthBar()
		count = 0
		while(count < magicBlastArray.length){
			magicBlastArray[count].moveMagicBlast()
			count++
		}
		count = 0
		while(count < fireballArray.length){
			fireballArray[count].moveFireball()
			count++
		}
		count = 0
		while(count < biteyArray.length){
			biteyArray[count].moveBitey()
			count++
		}
		count = 0
		while(count < skeletonArray.length){
			skeletonArray[count].moveSkeleton()
			skeletonArray[count].throwSkeletonProj()
			count++
		}
		count = 0
		while(count < skeletonProjArray.length){
			skeletonProjArray[count].moveSkeletonProj()
			count++
		}
		checkSpells()
		drawSpells()
		drawPlayer()
		checkMonsters()
		checkMonsters2()
		checkSkeletonProj()
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
	biteyArray = []
	if(Reward.type == "miniboss"){
		biteyArray.push(new Bitey(600, 450, 80, 45, 14, 3))
	}else{
		random = Math.ceil(Math.random()*3)
		if(random == 1 || roomNum == 1){
			biteyArray.push(new Bitey(300,400,30,20, 5, 2))
			biteyArray.push(new Bitey(500,200,30,20, 5, 2))
			biteyArray.push(new Bitey(400,600,30,20, 5, 2))
		}else if(random == 2){
			skeletonArray.push(new Skeleton(400,500,15,100))
			skeletonArray.push(new Skeleton(500,400,15,100))
			skeletonArray.push(new Skeleton(600,300,15,100))
			skeletonArray.push(new Skeleton(700,200,15,100))
			skeletonArray.push(new Skeleton(600,500,15,100))
		}else{
			biteyArray.push(new Bitey(400,400,30,20, 5, 2))
			biteyArray.push(new Bitey(500,200,30,20, 5, 2))
			skeletonArray.push(new Skeleton(700,300,15,100))
			skeletonArray.push(new Skeleton(500,300,15,100))
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
		if (keyDown=="j" && fireballTimer == "0"){
			fireball()
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
class Bitey{
	constructor(biteyX,biteyY,biteyHealth,biteySize,biteyDamage,biteySpeed){
		this.xPos = biteyX
		this.yPos = biteyY
		this.health = biteyHealth
		this.size = biteySize
		this.damage = biteyDamage
		this.speed = biteySpeed
	}
	moveBitey(){
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
class Skeleton{
	//will run away from the player while throwing x amount of projectiles at them then start chasing them normally when they run out of projectiles
	constructor(skeletonX,skeletonY,skeletonHealth,skeletonCooldown){
		this.xPos = skeletonX
		this.yPos = skeletonY
		this.health = skeletonHealth
		this.cooldown = skeletonCooldown
	}
	moveSkeleton(){	
		if(this.xPos >= Player.xPos - skeletonSize && this.xPos <= Player.xPos + skeletonSize){
			if(this.yPos > Player.yPos){
				this.yPos -= skeletonSpeed
			}else if(this.yPos < Player.yPos){
				this.yPos += skeletonSpeed
			}
		}else if(this.yPos >= Player.yPos - skeletonSize && this.yPos <= Player.yPos + skeletonSize){
			if(this.xPos > Player.xPos){
				this.xPos -= skeletonSpeed
			}else if(this.xPos < Player.xPos){
				this.xPos += skeletonSpeed
			}
		}else {
			random = Math.ceil(Math.random()*2)
			if(random == 1){
				if(this.yPos > Player.yPos){
					this.yPos -= skeletonSpeed
				}else if(this.yPos < Player.yPos){
					this.yPos += skeletonSpeed
				}
			}else {
				if(this.xPos > Player.xPos){
					this.xPos -= skeletonSpeed
				}else if(this.xPos < Player.xPos){
					this.xPos += skeletonSpeed
				}
			}
		}
	}
	throwSkeletonProj(){
		if(this.cooldown == 0){
			//will only throw when the projectile will hit the player (if they were to not move once it was thrown)
			if(this.xPos < Player.xPos + PLAYERSIZE && this.xPos > Player.xPos - PLAYERSIZE && this.yPos > Player.yPos){
				skeletonProjArray.push(new SkeletonProj(this.xPos,this.yPos,"up"))
				this.cooldown = 100
			}
			if(this.yPos < Player.yPos + PLAYERSIZE && this.yPos > Player.yPos - PLAYERSIZE && this.xPos > Player.xPos){
				skeletonProjArray.push(new SkeletonProj(this.xPos,this.yPos,"left"))
				this.cooldown = 100
			}
			if(this.xPos < Player.xPos + PLAYERSIZE && this.xPos > Player.xPos - PLAYERSIZE && this.yPos < Player.yPos){
				skeletonProjArray.push(new SkeletonProj(this.xPos,this.yPos,"down"))
				this.cooldown = 100
			}
			if(this.yPos < Player.yPos + PLAYERSIZE && this.yPos > Player.yPos - PLAYERSIZE && this.xPos < Player.xPos){
				skeletonProjArray.push(new SkeletonProj(this.xPos,this.yPos,"right"))
				this.cooldown = 100
			}
		}else{
			this.cooldown--
		}
	}
}
class SkeletonProj{
	constructor(skeletonProjX,skeletonProjY,skeletonProjDirection){
		this.xPos = skeletonProjX
		this.yPos = skeletonProjY
		this.direction = skeletonProjDirection
	}
	moveSkeletonProj(){
		if(this.direction == "up"){
			this.yPos -= skeletonProjSpeed
		}else if(this.direction == "left"){
			this.xPos -= skeletonProjSpeed
		}else if(this.direction == "down"){
			this.yPos += skeletonProjSpeed
		}else if(this.direction == "right"){
			this.xPos += skeletonProjSpeed
		}	
	}
}
function drawMonsters(){
	checkNumber = 0
	while(checkNumber < biteyArray.length){
		if(biteyArray[checkNumber].size > 26){
		ctx.fillStyle = "#2F4F4F"
		ctx.beginPath()
		ctx.arc(biteyArray[checkNumber].xPos,biteyArray[checkNumber].yPos, biteyArray[checkNumber].size, 0, 2*Math.PI)
		ctx.fill()
		}else {
			ctx.drawImage(biteyImage,biteyArray[checkNumber].xPos - 25,biteyArray[checkNumber].yPos - 25)
		}
		checkNumber++
	}
	checkNumber = 0
	while(checkNumber < skeletonArray.length){
		ctx.drawImage(skeletonImage,skeletonArray[checkNumber].xPos - 20,skeletonArray[checkNumber].yPos - 20)
		checkNumber++
	}
	checkNumber = 0
	while(checkNumber < skeletonProjArray.length){
		ctx.fillStyle = "#808080"
		ctx.beginPath()
		ctx.arc(skeletonProjArray[checkNumber].xPos,skeletonProjArray[checkNumber].yPos, skeletonProjSize, 0, 2*Math.PI)
		ctx.fill()
		checkNumber++
	}
}
function checkMonsters(){
	checkNumber = 0
	while(checkNumber < biteyArray.length){
		if(biteyArray[checkNumber].size > PLAYERSIZE){
		xDist = biteyArray[checkNumber].xPos -  Player.xPos
		yDist = biteyArray[checkNumber].yPos -  Player.yPos
		}else{
		xDist = Player.xPos -  biteyArray[checkNumber].xPos
		yDist = Player.yPos -  biteyArray[checkNumber].yPos
		}
		trueDist = Math.sqrt(xDist*xDist + yDist*yDist)
		if(trueDist < biteyArray[checkNumber].size + PLAYERSIZE && iFrames == 0){
			Player.health -= biteyArray[checkNumber].damage
			iFrames = 30
		}
		checkNumber++
	}
	checkNumber = 0
	while(checkNumber < biteyArray.length){
		checkNumber2 = 0
		while(checkNumber2 < magicBlastArray.length){
			xDist = biteyArray[checkNumber].xPos -  magicBlastArray[checkNumber2].xPos
			yDist = biteyArray[checkNumber].yPos -  magicBlastArray[checkNumber2].yPos
			trueDist = Math.sqrt(xDist*xDist + yDist*yDist)
			if(trueDist < biteyArray[checkNumber].size + magicBlastSize){
				biteyArray[checkNumber].health -= magicBlastDamage
				magicBlastArray.splice(checkNumber2, 1)
			}
			checkNumber2++
		}
		checkNumber++
	}
	checkNumber = 0
	while(checkNumber < biteyArray.length){
		if(biteyArray[checkNumber].health < 1){
			biteyArray.splice(checkNumber,1)
			if(Math.ceil(Math.random() * 3) == 2){
				coinCount += Math.floor(Math.random() * 5) + 5
			}
		}
		checkNumber++
	}
}
function checkMonsters2(){
	checkNumber = 0
	while(checkNumber < skeletonArray.length){
		xDist = Player.xPos -  skeletonArray[checkNumber].xPos
		yDist = Player.yPos -  skeletonArray[checkNumber].yPos
		trueDist = Math.sqrt(xDist*xDist + yDist*yDist)
		if(trueDist < skeletonSize + PLAYERSIZE && iFrames == 0){
			Player.health -= skeletonContactDamage
			iFrames = 30
		}
		checkNumber++
	}
	checkNumber = 0
	while(checkNumber < skeletonArray.length){
		checkNumber2 = 0
		while(checkNumber2 < magicBlastArray.length){
			xDist = skeletonArray[checkNumber].xPos -  magicBlastArray[checkNumber2].xPos
			yDist = skeletonArray[checkNumber].yPos -  magicBlastArray[checkNumber2].yPos
			trueDist = Math.sqrt(xDist*xDist + yDist*yDist)
			if(trueDist < skeletonSize + magicBlastSize){
				skeletonArray[checkNumber].health -= magicBlastDamage
				magicBlastArray.splice(checkNumber2, 1)
			}
			checkNumber2++
		}
		checkNumber++
	}
	checkNumber = 0
	while(checkNumber < skeletonArray.length){
		if(skeletonArray[checkNumber].health < 1){
			skeletonArray.splice(checkNumber,1)
			if(Math.ceil(Math.random() * 3) == 2){
				coinCount += Math.floor(Math.random() * 5) + 5
			}
		}
		checkNumber++
	}
}
function checkSkeletonProj(){
	checkNumber = 0
	while(checkNumber < skeletonProjArray.length){
		if(skeletonProjArray[checkNumber].xPos + skeletonProjSize > WIDTH - WALLSIZE || skeletonProjArray[checkNumber].yPos + skeletonProjSize > HEIGHT - WALLSIZE || skeletonProjArray[checkNumber].xPos - skeletonProjSize < 0 + WALLSIZE || skeletonProjArray[checkNumber].yPos - skeletonProjSize < 0 + WALLSIZE){
			skeletonProjArray.splice(checkNumber,1)
		}
		checkNumber++
	}
	checkNumber = 0
	while(checkNumber < skeletonProjArray.length){
		xDist = Player.xPos -  skeletonProjArray[checkNumber].xPos
		yDist = Player.yPos -  skeletonProjArray[checkNumber].yPos
		trueDist = Math.sqrt(xDist*xDist + yDist*yDist)
		if(trueDist < PLAYERSIZE + skeletonProjSize){
			Player.health -= skeletonProjDamage
			skeletonProjArray.splice(checkNumber, 1)
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
	fireballArray.push(new FireballProjectile(Player.xPos,Player.yPos, facingDirection, false, 4))
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
	checkNumber = 0
	while(checkNumber < fireballArray.length){
		ctx.fillStyle = "#FF8C00"
		ctx.beginPath()
		ctx.arc(fireballArray[checkNumber].xPos, fireballArray[checkNumber].yPos, fireballArray[checkNumber].size, 0,2*Math.PI)
		ctx.fill()
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
	checkNumber = 0
	while(checkNumber < magicBlastArray.length){
		if(fireballArray[checkNumber].xPos + 4 > WIDTH - WALLSIZE || fireballArray[checkNumber].yPos + 4 > HEIGHT - WALLSIZE || fireballArray[checkNumber].xPos - 4 < 0 + WALLSIZE || fireballArray[checkNumber].yPos - 4 < 0 + WALLSIZE){
			fireballArray.splice(checkNumber,1)
		}
		checkNumber++
	}
	while(numProjectiles > maxProjectiles){
		fireballArray.splice(0,1)
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
	ctx.fillText((biteyArray.length + skeletonArray.length)+" monsters left",1100,80)
	ctx.fillText(magicBlastDamage+" "+magicBlastSpeed+" "+magicBlastCooldownTime,1050,750)
}
