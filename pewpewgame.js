/**
* title: pewpew game (placeholder)
* date: 14/04/23
* author: me
* version: 7.2
vvv IMPORTANT: 
all music and sprites are made by me unless specified :]
THINGS:
weird glitch that gives everything like trails but i like it and im not gonna fix it because it looks cool
make image for restart button
player sprite is good idea too
sprite for explosion projectile
sprite for skeleton projectile
sprite for heal aura thingy
sprite for rewards and shop items like heal potion
boss sprite make it like evil spider or tentacle thing
**/
//constants
const WIDTH = 1200
const HEIGHT = 900
const PLAYERSIZE = 25
const WALLSIZE = 56
const MAXSPEED = 8
const SHOPITEMSIZE = 30
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
var fireballCooldownTime = 1
var fireballSpeed = 7
var fireballExplosionSize = 51
var fireballDamage = 5
var fireballUnlocked = "false"
var numProjectiles = 0
var maxProjectiles = 500
var debugInfoOn = 0
var roomNum = 1
var count = 0
var count2 = 0
var spawnedCount = 0
var xDist = 0
var yDist = 0
var trueDist = 0
var iFrames = 0
var roomReward
var doorEntered = "down"
var loadingScreen = 0
var rewardSize = 36
var rewardPreviewSize = 30
var dead = "false"
var random
var coinCount = 0
var enemyCap = 5
var minEnemies = 3
var spawnAttemptMin
var enemyKills = 0
var killsCurrent
var healthCurrent
var healTimer = 0
var healAmount = 15
var healUnlocked = "false"
var attemptingHeal = "false"
var roomHealCap = 1
var roomHeals = 0
var textArray = []
var lastDamageSource 

//arrays
var possibleRewards = ["health","spell","player","miniboss","boss"]
var shopItemArray = []
var shopItemTypes = ["heal","spell","newSpell","player"]
//spells
var magicBlastArray = []
var fireballArray = []
//enemiesd
var biteyArray = []
var skeletonArray = []
var skeletonSize = 15
var skeletonSpeed = 1
var skeletonContactDamage = 3
var skeletonProjDamage = 8
var skeletonProjArray = []
var skeletonProjSpeed = 5
var skeletonProjSize = 6
var skeletonCooldownTimer = 100
var bossSize = 60
var bossSpeed = 4
var bossContactDamage = 10
var bossProjDamage = 7
var bossArray = []
var bossProjArray = []
var bossProjSize = 9
var turtleArray = []
var turtleSize = 24
var turtleySrEncountered = "true"
var bigTurtleSize = 45
var bigTurtleArray = []
//images

//upgrades
var heartUpgradeImage = new Image
heartUpgradeImage.src = "heartUpgrade.png"
var largeHealthImage = new Image
largeHealthImage.src = "largeHealth.png"
var spellUpgradeImage = new Image
spellUpgradeImage.src = "spellUpgrade.png"
var bigSpellImage = new Image
bigSpellImage.src = "bigSpellUpgrade.png"
var strengthUpgradeImage = new Image
strengthUpgradeImage.src = "strengthUpgrade.png"
var coinPileImage = new Image
coinPileImage.src = "coinPile.png"
var coinBagImage = new Image
coinBagImage.src = "coinChest.png"
//background stuff
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
//next room previews
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
var coinPreviewImage = new Image
coinPreviewImage.src = "coinPreview.png"
//shop stuff
var merchantImage = new Image
merchantImage.src = "shopMerchant.png"
var shopPreviewImage = new Image
shopPreviewImage.src = "shopPreview.png"
var shopHealImage = new Image
shopHealImage.src = "shopHeal.png"
var shopSpeedImage = new Image
shopSpeedImage.src = "shopSpeed.png"
var shopSpellImage = new Image
shopSpellImage.src = "shopSpell.png"
var shopFireballImage = new Image
shopFireballImage.src = "shopFireball.png"
var shopHealSpellImage = new Image
shopHealSpellImage.src = "shopHealSpell.png"
//spell sprites
var magicBlastImage = new Image
magicBlastImage.src = "spell1.png"
var fireballImage = new Image
fireballImage.src = "fireball.png"
var fireballBoomImage = new Image
fireballBoomImage.src = "fireballExplosion.png"
//monster sprites
var biteyImage = new Image
biteyImage.src = "bitey.png"
var skeletonImage = new Image
skeletonImage.src = "skeleton.png"
var skeletonProjImage = new Image
skeletonProjImage.src = "skeletonProj.png"
var minibossImage = new Image 
minibossImage.src = "miniboss.png"
var bossProjImage = new Image
bossProjImage.src = "bossProj.png"
//turtley jr
var turtleImage = new Image
turtleImage.src = "turtle.png"
var turtleShellImage = new Image
turtleShellImage.src = "turtleShell.png"
var turtleSpin1Image = new Image
turtleSpin1Image.src = "turtleSpin1.png"
var turtleSpin2Image = new Image
turtleSpin2Image.src = "turtleSpin2.png"
var turtleSpin3Image = new Image
turtleSpin3Image.src = "turtleSpin3.png"
var turtleSpin4Image = new Image
turtleSpin4Image.src = "turtleSpin4.png"
//turtley sr
var turtleySrImage = new Image
turtleySrImage.src = "turtleySr.png"
var turtleySrLeftImage = new Image
turtleySrLeftImage.src = "turtleySrLeft.png"
var turtleySrShellImage = new Image
turtleySrShellImage.src = "turtleySrShell.png"
var turtleySrSpin1Image = new Image
turtleySrSpin1Image.src = "turtleySrSpin1.png"
var turtleySrSpin2Image = new Image
turtleySrSpin2Image.src = "turtleySrSpin2.png"
//other stuff
var killCountImage = new Image
killCountImage.src = "killCount.png"
var restartButtonImage = new Image
restartButtonImage.src = "restartButton.png"
//canvas setup
window.onload=startCanvas
function startCanvas(){
	ctx=document.getElementById("myCanvas").getContext("2d")
	timer = setInterval(updateCanvas, 20)
	gameStart()
}
function gameStart(){
	//resets the game 
	ctx.textAlign = "center"
	Player.xPos = 600
	Player.yPos = 100
	Player.health = 75
	Player.maxHealth = 75
	playerSpeed = 4
	Room.rewardX = 576
	Room.rewardY = 400
	Room.state = 0
	Room.upDoor = "closed"
	Room.leftDoor = "closed"
	Room.downDoor = "closed"
	Room.rightDoor = "closed"
	Reward.state = 0
	Reward.type = "health"
	magicBlastSize = 5
	magicBlastSpeed = 5
	magicBlastDamage = 5
	magicBlastCooldownTime = 10
	fireballCooldownTime = 40
	fireballSpeed = 7
	fireballExplosionSize = 50
	fireballDamage = 5
	fireballUnlocked = "false"
	healTimer = 0
	healUnlocked = "false"
	healAmount = 15
	roomHealCap = 1
	enemyKills = 0
	roomNum = 1
	coinCount = 0
	doorEntered = "down"
	dead = "false"
	turtleySrEncountered = "false"
	biteyArray = []
	skeletonArray = []
	skeletonProjArray = []
	turtleArray = []
	bigTurtleArray = []
	bossArray = []
	bossProjArray = []
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
	//progressing timers
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
	
	if(debugInfoOn=="1"){
		drawDebugInfo()
	}
	ctx.font = "30px Papyrus"
	ctx.fillStyle = "black"
	ctx.fillText("Room "+roomNum,120,90)
	ctx.fillStyle = "gold"
	ctx.fillText(coinCount+" Coins",1080,90)
	ctx.drawImage(killCountImage,1000,800)
	ctx.fillStyle = "#555555"
	ctx.font = "60px Papyrus"
	ctx.fillText(enemyKills,1085,835)
	numProjectiles = magicBlastArray.length
	numMonsters = biteyArray.length + skeletonArray.length + bossArray.length + turtleArray.length + bigTurtleArray.length
	if(dead == "false"){
		//code that only needs to happen if you aren't dead 
		//move code and wall collision check
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
		if(bossArray.length != 0){
			bossArray[0].moveBoss()
			bossArray[0].shootBossProj()
			checkBoss()
		}
		count = 0
		while(count < bossProjArray.length){
			bossProjArray[count].moveBossProj()
			count++
		}
		healCheck()
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
		count = 0
		while(count < turtleArray.length){
			turtleArray[count].moveTurtle()
			count++
		}
		if(bigTurtleArray.length != 0){
			bigTurtleArray[0].moveBigTurtle()
			turtleySrEncountered = "true"
		}
		if(fireballCooldownTime < 15){
			fireballCooldownTime = 15
		}
		if(magicBlastCooldownTime < 5){
			magicBlastCooldownTime = 5
		}

		checkSpells()
		drawSpells()
		drawPlayer()
		checkMonsters()
		checkMonsters2()
		checkSkeletonProj()
		checkTurtles()
		checkBigTurtle()
		drawMonsters()
	}else{
		inControl = "false"
	}
	roomStateCheck()
	drawPopUpText()
	if(loadingScreen > 0){
		console.log(loadingScreen)
		loadingScreen--
		ctx.fillStyle = "black"
		ctx.fillRect(0,0,WIDTH,HEIGHT)
	}
}
//
function roomStateCheck(){
	if(Reward.type == "shop" && Reward.state != "2"){
		nextRoomsReward()
		Reward.state = "2"
	}
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
			if(Reward.type == "shop"){
				checkShopItems()
				drawShopItems()
			}
			if(doorCheck() == "true"){
				roomHeals = 0
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
		random = Math.random() * 3
		if(random > 2){
			Reward.variety = "largeHealth"
		}else if(random > 1){
			Reward.variety = "largeSpell"
		}else{
			Reward.variety = "coinBag"
		}
	}
	if(type == "boss"){
		random = Math.random() * 3
		if(random > 2){
			Reward.variety = "largeHealth"
		}else if(random > 1){
			Reward.variety = "largeSpell"
		}else{
			Reward.variety = "coinBag"
		}
	}
	if(type == "shop"){
		Reward.variety = "shop"
	}
	if(type == "coins"){
		if(Math.random()*10 > 8.5){
			Reward.variety = "coinBag"
		}else{
			Reward.variety = "coinPile"
		}
	}
}
function grantReward(variety){
	if(variety == "health"){
		Player.maxHealth += 25
		Player.health += 25
		textArray.push(new PopUpText(Player.xPos,Player.yPos,"+25 Max HP","white","15px Comic Sans MS",20))
	}
	if(variety == "damage"){
		magicBlastDamage += 2
		textArray.push(new PopUpText(Player.xPos,Player.yPos,"All Damage Up","white","15px Comic Sans MS",20))
		if(fireballUnlocked == "true"){
			fireballDamage += 3
		}
	}
	if(variety == "speed"){
		playerSpeed++
		textArray.push(new PopUpText(Player.xPos,Player.yPos,"Movement Speed Up","white","15px Comic Sans MS",20))
	}
	if(variety == "spell"){
		if(Math.random()*2 > 1 && fireballUnlocked == "true"){
			random = Math.random() * 3
			if(random > 2){
				fireballDamage += 3
				textArray.push(new PopUpText(Player.xPos,Player.yPos,"Fireball Damage Up","white","15px Comic Sans MS",20))
			}else if(random > 1){
				fireballCooldownTime -= 2
				textArray.push(new PopUpText(Player.xPos,Player.yPos,"Fireball Cooldown Speed Up","white","15px Comic Sans MS",20))
			}else{
				fireballSpeed += 1
				textArray.push(new PopUpText(Player.xPos,Player.yPos,"Fireball Projectile Speed Up","white","15px Comic Sans MS",20))
			}
		}else {
			random = Math.random() * 3
			if(random > 2){
				magicBlastDamage += 2
				textArray.push(new PopUpText(Player.xPos,Player.yPos,"Magic Blast Damage Up","white","15px Comic Sans MS",20))
			}else if(random > 1){
				magicBlastCooldownTime -= 1
				textArray.push(new PopUpText(Player.xPos,Player.yPos,"Magic Blast Cooldown Speed Up","white","15px Comic Sans MS",20))
			}else{
				magicBlastSpeed += 1
				textArray.push(new PopUpText(Player.xPos,Player.yPos,"Magic Blast Projectile Speed Up","white","15px Comic Sans MS",20))
			}
		}
	}
	if(variety == "largeHealth"){
		Player.maxHealth += 50
		Player.health += 50
		textArray.push(new PopUpText(Player.xPos,Player.yPos,"+50 Max HP","white","15px Comic Sans MS",20))
	}
	if(variety == "largeSpell"){
		if(Math.random()*2 > 1 && fireballUnlocked == "true"){
			fireballDamage += 2
			fireballSpeed += 1
			fireballCooldownTime -= 2
			textArray.push(new PopUpText(Player.xPos,Player.yPos,"All Fireball Stats Up","white","15px Comic Sans MS",20))
		}else {
			magicBlastDamage += 2
			magicBlastCooldownTime -= 1
			magicBlastSpeed += 1
			textArray.push(new PopUpText(Player.xPos,Player.yPos,"All Magic Blast Stats Up","white","15px Comic Sans MS",20))
		}
	}
	if(variety == "coinBag"){
		random =  Math.floor(Math.random()*40) + 60
		coinCount += random
		textArray.push(new PopUpText(Player.xPos,Player.yPos,"+"+random+" coins","gold","15px Comic Sans MS",20))
	}
	if(variety == "coinPile"){
		random = Math.floor(Math.random()*15) + 25
		coinCount += random
		textArray.push(new PopUpText(Player.xPos,Player.yPos,"+"+random+" coins","gold","15px Comic Sans MS",20))
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
	possibleRewards = ["health","spell","player","miniboss","shop","coins"]
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
	if((roomNum + 1) % 10 == 0){
		console.log("skkasufausf")
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
		}else if(Reward.variety == "largeHealth"){
			ctx.drawImage(largeHealthImage,Room.rewardX,Room.rewardY)
		}else if(Reward.type == "spell"){
			ctx.drawImage(spellUpgradeImage,Room.rewardX,Room.rewardY)
		}else if(Reward.variety == "largeSpell"){
			ctx.drawImage(bigSpellImage,Room.rewardX,Room.rewardY)
		}else if(Reward.type == "player"){
			ctx.drawImage(strengthUpgradeImage,Room.rewardX,Room.rewardY)
		}else if(Reward.variety == "coinPile"){
			ctx.drawImage(coinPileImage,Room.rewardX,Room.rewardY)
		}else if(Reward.variety == "coinBag"){
			ctx.drawImage(coinBagImage,Room.rewardX,Room.rewardY)
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
		if(Room.upDoor == "shop"){
			ctx.drawImage(shopPreviewImage, 570, 70)
		}
		if(Room.upDoor == "coins"){
			ctx.drawImage(coinPreviewImage, 570, 70)
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
		if(Room.leftDoor == "shop"){
			ctx.drawImage(shopPreviewImage, 70, 420)
		}
		if(Room.leftDoor == "coins"){
			ctx.drawImage(coinPreviewImage, 70, 420)
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
		if(Room.downDoor == "shop"){
			ctx.drawImage(shopPreviewImage, 570, 770)
		}
		if(Room.downDoor == "coins"){
			ctx.drawImage(coinPreviewImage, 570, 770)
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
		if(Room.rightDoor == "shop"){
			ctx.drawImage(shopPreviewImage, 1070, 420)
		}
		if(Room.rightDoor == "coins"){
			ctx.drawImage(coinPreviewImage, 1070, 420)
		}
	}
}
function generateNewRoom(){
	shopItemArray = []
	skeletonCooldownTime = 100
	if(Reward.type == "miniboss"){
		if(Math.random() * 2 > 1){
			biteyArray.push(new Bitey(600, 450, 85 + roomNum * 2, 45, 14, 3))
		}else {
			bigTurtleArray.push(new TurtleySr(600, 450, 75 + roomNum * 2, "normal",150,1,5,"upLeft"))
		}
	}else if(Reward.type == "shop"){
		if((fireballUnlocked == "true" && healUnlocked == "true") || Math.random() * 5 > 3){
			shopItemArray.push(new ShopItem(Math.floor(Math.random()*15)+5+Math.floor(roomNum/5)*5, "heal","false" ))
			shopItemArray.push(new ShopItem(Math.floor(Math.random()*15)+20+Math.floor(roomNum/5)*5, "spell","false"))
			shopItemArray.push(new ShopItem(Math.floor(Math.random()*15)+15+Math.floor(roomNum/5)*5, "player","false"))
		}else{
			shopItemArray.push(new ShopItem(Math.floor(Math.random()*15)+5+Math.floor(roomNum/5)*5, "heal","false"))
			if(healUnlocked == "false" && fireballUnlocked == "false"){
				if(Math.random()*5>2){
					shopItemArray.push(new ShopItem(100+Math.floor(roomNum/5)*10, "fireball","false"))
				}else{
					shopItemArray.push(new ShopItem(75, "healSpell","false"))
				}
			}else if(healUnlocked == "false" && fireballUnlocked == "true"){
				shopItemArray.push(new ShopItem(75, "healSpell","false"))
			}else {
				shopItemArray.push(new ShopItem(100+Math.floor(roomNum/5)*10, "fireball","false"))
			}
			shopItemArray.push(new ShopItem(Math.floor(Math.random()*15)+15+Math.floor(roomNum/5)*5, "player","false"))
		}
	}else if(Reward.type == "boss"){
		bossArray.push(new BossMonster(600,450,roomNum*10,50,"chase",0,0,750,0))
	}else if(roomNum > 10 && Math.random() * 13 > 11){
		random = Math.floor(Math.random() * 3)
		if(random == 2){
			textArray.push(new PopUpText(600,375,"Turtle Mayhem!","DarkGreen","35px Comic Sans MS",45))
			count = 0
			spawnedCount = 0
			if(roomNum > 50){
				minEnemies = 15
				enemyCap = 65
				spawnAttemptMin = 45
			}else if(roomNum > 30){
				minEnemies = 10
				enemyCap = 25
				spawnAttemptMin = 20
			}else if(roomNum > 10){
				minEnemies = 5
				enemyCap = 15
				spawnAttemptMin = 15
			}else {
				minEnemies = 3
				enemyCap = 7
				spawnAttemptMin = 7
			}
			while(spawnedCount < enemyCap && count < spawnAttemptMin){
				if(spawnedCount < minEnemies){
					turtleArray.push(new TurtleyJr(Math.floor(Math.random() * 800)+200,Math.floor(Math.random() * 500)+200,20+(Math.floor(roomNum/5)*5),"normal",350+Math.floor(Math.random() * 100),1,5,"upLeft"))
					spawnedCount++
				}else {
					if((Math.random()*100)+Math.floor((roomNum-10)/5)*2>70){
						turtleArray.push(new TurtleyJr(Math.floor(Math.random() * 800)+200,Math.floor(Math.random() * 500)+200,20+(Math.floor(roomNum/5)*5),"normal",350+Math.floor(Math.random() * 100),1,5,"upLeft"))
						spawnedCount++
					}else if(count >= spawnAttemptMin){
						count = enemyCap
					}
				}
				count++
			}
		}else if(random == 1){
			textArray.push(new PopUpText(600,375,"Double Trouble!","Maroon","35px Comic Sans MS",45))
			biteyArray.push(new Bitey(800, 200, 85 + roomNum * 2, 45, 14, 3))
			biteyArray.push(new Bitey(400, 700, 85 + roomNum * 2, 45, 14, 3))
		}else{
			skeletonCooldownTime = 25
			textArray.push(new PopUpText(600,375,"Skeleton Party!","Gainsboro","35px Comic Sans MS",45))
			count = 0
			spawnedCount = 0
			if(roomNum > 50){
				minEnemies = 15
				enemyCap = 65
				spawnAttemptMin = 45
			}else if(roomNum > 30){
				minEnemies = 10
				enemyCap = 25
				spawnAttemptMin = 20
			}else if(roomNum > 10){
				minEnemies = 5
				enemyCap = 15
				spawnAttemptMin = 15
			}else {
				minEnemies = 3
				enemyCap = 7
				spawnAttemptMin = 7
			}
			while(spawnedCount < enemyCap && count < spawnAttemptMin){
				if(spawnedCount < minEnemies){
					skeletonArray.push(new Skeleton(Math.floor(Math.random() * 800)+200,Math.floor(Math.random() * 500)+200,15+(Math.floor(roomNum/5)*3),100))
					spawnedCount++
				}else {
					if((Math.random()*100)+Math.floor((roomNum-10)/5)*2>70){
						skeletonArray.push(new Skeleton(Math.floor(Math.random() * 800)+200,Math.floor(Math.random() * 500)+200,15+(Math.floor(roomNum/5)*3),100))
						spawnedCount++
					}else if(count >= spawnAttemptMin){
						count = enemyCap
					}
				}
				count++
			}
		}
	}else{
		
		count = 0
		spawnedCount = 0
		if(roomNum > 50){
			minEnemies = 15
			enemyCap = 65
			spawnAttemptMin = 45
		}else if(roomNum > 30){
			minEnemies = 10
			enemyCap = 25
			spawnAttemptMin = 20
		}else if(roomNum > 10){
			minEnemies = 5
			enemyCap = 15
			spawnAttemptMin = 15
		}else {
			minEnemies = 3
			enemyCap = 7
			spawnAttemptMin = 7
		}
		while(spawnedCount < enemyCap && count < spawnAttemptMin){
			if(spawnedCount < minEnemies){
				if(turtleySrEncountered == "true"){
						random = Math.floor(Math.random()*11)
				}else{
					random = Math.floor(Math.random()*9)
				}
				if(random <= 4){
					biteyArray.push(new Bitey(Math.floor(Math.random() * 800)+200,Math.floor(Math.random() * 500)+200,20+(Math.floor(roomNum/5)*5),20,5+Math.floor(roomNum/5),2))
				}else if(random <= 8){
					skeletonArray.push(new Skeleton(Math.floor(Math.random() * 800)+200,Math.floor(Math.random() * 500)+200,15+(Math.floor(roomNum/5)*3),100))
				}else {
					turtleArray.push(new TurtleyJr(Math.floor(Math.random() * 800)+200,Math.floor(Math.random() * 500)+200,20+(Math.floor(roomNum/5)*5),"normal",350+Math.floor(Math.random() * 100),1,5,"upLeft"))
				}
				spawnedCount++
			}else {
				if((Math.random()*100)+Math.floor((roomNum-10)/5)*2>70){
					if(turtleySrEncountered == "true"){
						random = Math.floor(Math.random()*11)
					}else{
						random = Math.floor(Math.random()*9)
					}
					if(random <= 4){
						biteyArray.push(new Bitey(Math.floor(Math.random() * 800)+200,Math.floor(Math.random() * 500)+200,20+(Math.floor(roomNum/5)*5),20,5+Math.floor(roomNum/5),2))
					}else if(random <= 8){
						skeletonArray.push(new Skeleton(Math.floor(Math.random() * 800)+200,Math.floor(Math.random() * 500)+200,15+(Math.floor(roomNum/5)*3),100))
					}else {
						turtleArray.push(new TurtleyJr(Math.floor(Math.random() * 800)+200,Math.floor(Math.random() * 500)+200,20+(Math.floor(roomNum/5)*5),"normal",350+Math.floor(Math.random() * 100),1,5,"upLeft"))
					}
					spawnedCount++
				}else if(count >= spawnAttemptMin){
					count = enemyCap
				}
			}
			count++
		}
	}
	Reward.state = 0
}
//shop code
function drawShopItems(){
	ctx.drawImage(merchantImage,200,230)
	ctx.font = "bold 25px Papyrus"
	ctx.fillStyle = "white"
	if(roomNum > 10 && roomNum < 15){
		ctx.fillText("Inflation's been bad lately so I'm afraid I have to increase the prices.",400,210)
	}else {
		ctx.fillText("Welcome... I sell only the finest potions here.",370,210)
	}
	if(shopItemArray[0].bought == "false"){
		ctx.drawImage(shopHealImage,370,270)
		ctx.font = "20px Papyrus"
		if(coinCount >= shopItemArray[0].cost){
			ctx.fillStyle = "gold"
		}else {
			ctx.fillStyle = "black"
		}
		ctx.fillText(shopItemArray[0].cost+" coins", 400, 350)
	}
	if(shopItemArray[1].bought == "false"){
		if(shopItemArray[1].type == "fireball"){
			ctx.drawImage(shopFireballImage,570,270)
		}else if(shopItemArray[1].type == "healSpell"){
			ctx.drawImage(shopHealSpellImage,570,270)
		}else{
			ctx.drawImage(shopSpellImage,570,270)
		}
		if(coinCount >= shopItemArray[1].cost){
			ctx.fillStyle = "gold"
		}else {
			ctx.fillStyle = "black"
		}
		ctx.font = "20px Papyrus"
		ctx.fillText(shopItemArray[1].cost+" coins", 600, 350)
	}
	if(shopItemArray[2].bought == "false"){
		ctx.drawImage(shopSpeedImage,770,270)
		if(coinCount >= shopItemArray[2].cost){
			ctx.fillStyle = "gold"
		}else {
			ctx.fillStyle = "black"
		}
		ctx.font = "20px Papyrus"
		ctx.fillText(shopItemArray[2].cost+" coins", 800, 350)
	}
}
function checkShopItems(){
	if(collisionCheck(400,300,SHOPITEMSIZE,Player.xPos,Player.yPos,PLAYERSIZE) && coinCount >= shopItemArray[0].cost && shopItemArray[0].bought == "false"){
		random = Math.floor(Math.random()*16) + 35
		Player.health += random
		textArray.push(new PopUpText(Player.xPos,Player.yPos,"+"+random+" HP","white","15px Comic Sans MS",20))
		if(Player.health > Player.maxHealth){
			Player.health = Player.maxHealth
		}
		coinCount -= shopItemArray[0].cost
		shopItemArray[0].bought = "true"
	}
	if(collisionCheck(600,300,SHOPITEMSIZE,Player.xPos,Player.yPos,PLAYERSIZE) && coinCount >= shopItemArray[1].cost && shopItemArray[1].bought == "false"){
		if(shopItemArray[1].type == "fireball"){
			fireballUnlocked = "true"
			textArray.push(new PopUpText(Player.xPos,Player.yPos,"Unlocked Fireball! Press J to shoot an explosive fireball","white","15px Comic Sans MS",40))
		}else if(shopItemArray[1].type == "healSpell"){
			healUnlocked = "true"
			textArray.push(new PopUpText(Player.xPos,Player.yPos,"Unlocked Heal! L to activate, can only be used a few times per room.","white","15px Comic Sans MS",40))
		}else{
			random = Math.random() * 3
			if(random > 2){
				fireballDamage += 2
				fireballSpeed += 1
				fireballCooldownTime -= 2
				textArray.push(new PopUpText(Player.xPos,Player.yPos,"All Fireball Stats Up","white","15px Comic Sans MS",20))
			}else if(random > 1){
				magicBlastDamage += 2
				magicBlastCooldownTime -= 1
				magicBlastSpeed += 1
				textArray.push(new PopUpText(Player.xPos,Player.yPos,"All Magic Blast Stats Up","white","15px Comic Sans MS",20))
			}else{
				healAmount += 5
				roomHealCap
				textArray.push(new PopUpText(Player.xPos,Player.yPos,"Heal Spell Stats Up","white","15px Comic Sans MS",20))
			}
		}
		coinCount -= shopItemArray[1].cost
		shopItemArray[1].bought = "true"
	}
	if(collisionCheck(800,300,SHOPITEMSIZE,Player.xPos,Player.yPos,PLAYERSIZE) && coinCount >= shopItemArray[2].cost && shopItemArray[2].bought == "false"){
		random = Math.floor(Math.random()*2)
		if(random == 1){
			playerSpeed += 1
			textArray.push(new PopUpText(Player.xPos,Player.yPos,"Movement Speed Up","white","15px Comic Sans MS",20))
		}else {
			dashCooldown += 3
			textArray.push(new PopUpText(Player.xPos,Player.yPos,"Dash Cooldown Speed Up","white","15px Comic Sans MS",20))
		}
		coinCount -= shopItemArray[2].cost
		shopItemArray[2].bought = "true"
	}
}
class ShopItem {
	constructor(itemCost,itemType,itemBought){
		this.cost = itemCost
		this.type = itemType
		this.bought = itemBought
	}
}
//door entering stuff
function doorCheck(){
	if(Player.xPos > 500 && Player.xPos < 700 && Player.yPos - PLAYERSIZE - playerSpeed < WALLSIZE && Room.upDoor != "closed" ){
		doorEntered = "down"
		console.log("test")
		return("true")
	}else if(Player.yPos > 350 && Player.yPos < 550 && Player.xPos - PLAYERSIZE - playerSpeed < WALLSIZE && Room.leftDoor != "closed" ){
		doorEntered = "right"
		return("true")
	}else if(Player.xPos > 500 && Player.xPos < 700 && Player.yPos + PLAYERSIZE + playerSpeed > 837 && Room.downDoor != "closed" ){
		doorEntered = "up"
		return("true")
	}else if(Player.yPos > 350 && Player.yPos < 550 && Player.xPos + PLAYERSIZE + playerSpeed> 1137 && Room.rightDoor != "closed" ){
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
	if(attemptingHeal == "true"){
		ctx.strokeStyle = "#00FF00"
		ctx.beginPath()
		ctx.arc(Player.xPos, Player.yPos, PLAYERSIZE + 3, 0, 2*Math.PI)
		ctx.stroke()
	}
}
function youLostLmao(){
	dead = "true"
	ctx.drawImage(restartButtonImage,450,450)
	ctx.fillStyle = "red"
	ctx.font = "bold 40px Papyrus"
	ctx.fillText("Killed by: "+lastDamageSource,600,370)
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
		if (keyDown=="j" && fireballTimer == "0" && fireballUnlocked == "true"){
			fireball()
		}
		if (keyDown=="l" && healTimer == "0" && healUnlocked == "true"){
			healSpell()
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
			if(this.yPos > Player.yPos){
				this.yPos -= this.speed
			}else if(this.yPos < Player.yPos){
				this.yPos += this.speed
			}
			if(this.xPos > Player.xPos){
				this.xPos -= this.speed
			}else if(this.xPos < Player.xPos){
				this.xPos += this.speed
			}	
		}
	}
}
class Skeleton{
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
			if(this.yPos > Player.yPos){
				this.yPos -= skeletonSpeed
			}else if(this.yPos < Player.yPos){
				this.yPos += skeletonSpeed
			}
			if(this.xPos > Player.xPos){
				this.xPos -= skeletonSpeed
			}else if(this.xPos < Player.xPos){
				this.xPos += skeletonSpeed
			}
		}
	}
	throwSkeletonProj(){
		if(this.cooldown == 0){
			//will only throw when the projectile will hit the player (if they were to not move once it was thrown)
			if(this.xPos < Player.xPos + PLAYERSIZE && this.xPos > Player.xPos - PLAYERSIZE && this.yPos > Player.yPos){
				skeletonProjArray.push(new SkeletonProj(this.xPos,this.yPos,"up"))
				this.cooldown = skeletonCooldownTime
			}
			if(this.yPos < Player.yPos + PLAYERSIZE && this.yPos > Player.yPos - PLAYERSIZE && this.xPos > Player.xPos){
				skeletonProjArray.push(new SkeletonProj(this.xPos,this.yPos,"left"))
				this.cooldown = skeletonCooldownTime
			}
			if(this.xPos < Player.xPos + PLAYERSIZE && this.xPos > Player.xPos - PLAYERSIZE && this.yPos < Player.yPos){
				skeletonProjArray.push(new SkeletonProj(this.xPos,this.yPos,"down"))
				this.cooldown = skeletonCooldownTime
			}
			if(this.yPos < Player.yPos + PLAYERSIZE && this.yPos > Player.yPos - PLAYERSIZE && this.xPos < Player.xPos){
				skeletonProjArray.push(new SkeletonProj(this.xPos,this.yPos,"right"))
				this.cooldown = skeletonCooldownTime
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
class TurtleyJr{
	constructor(turtleX,turtleY,turtleHealth,turtlePhase,turtlePhaseTimer,turtleSpeed,turtleDamage,turtleDirection){
		this.xPos = turtleX
		this.yPos = turtleY
		this.health = turtleHealth
		this.phase = turtlePhase
		this.phaseTimer = turtlePhaseTimer
		this.speed = turtleSpeed
		this.damage = turtleDamage
		this.direction = turtleDirection
	}
	moveTurtle(){
		if(this.phase == "normal"){
			this.damage = 5
			if(this.xPos >= Player.xPos - turtleSize && this.xPos <= Player.xPos + turtleSize){
				if(this.yPos > Player.yPos){
					this.yPos -= this.speed
				}else if(this.yPos < Player.yPos){
					this.yPos += this.speed
				}
			}else if(this.yPos >= Player.yPos - turtleSize && this.yPos <= Player.yPos + turtleSize){
				if(this.xPos > Player.xPos){
					this.xPos -= this.speed
				}else if(this.xPos < Player.xPos){
					this.xPos += this.speed
				}
			}else {
				if(this.yPos > Player.yPos){
					this.yPos -= this.speed
				}else if(this.yPos < Player.yPos){
					this.yPos += this.speed
				}
				if(this.xPos > Player.xPos){
					this.xPos -= this.speed
				}else if(this.xPos < Player.xPos){
					this.xPos += this.speed
				}	
			}
			if(this.phaseTimer == 0){
				this.phase = "shell"
				this.phaseTimer = 200
			}
		}else if(this.phase == "spin"){
			this.damage = 10
			if(this.yPos - turtleSize < WALLSIZE){
				if(this.direction == "upLeft"){
					this.direction = "downLeft"
				}else if(this.direction == "upRight"){
					this.direction = "downRight"
				}
			}else if(this.yPos + turtleSize > HEIGHT - WALLSIZE){
				if(this.direction == "downLeft"){
					this.direction = "upLeft"
				}else if(this.direction == "downRight"){
					this.direction = "upRight"
				}
			}else if(this.xPos - turtleSize < WALLSIZE){
				if(this.direction == "upLeft"){
					this.direction = "upRight"
				}else if(this.direction == "downLeft"){
					this.direction = "downRight"
				}
			}else if(this.xPos + turtleSize > WIDTH - WALLSIZE){
				if(this.direction == "upRight"){
					this.direction = "upLeft"
				}else if(this.direction == "downRight"){
					this.direction = "downLeft"
				}
			}
			if(this.direction == "upLeft"){
				this.xPos -= this.speed
				this.yPos -= this.speed
			}else if(this.direction == "upRight"){
				this.xPos += this.speed
				this.yPos -= this.speed
			}else if(this.direction == "downLeft"){
				this.xPos -= this.speed
				this.yPos += this.speed
			}else{
				this.xPos += this.speed
				this.yPos += this.speed
			}
			if(this.phaseTimer == 0){
				this.phaseTimer = 350
				this.speed = 1
				this.phase = "normal"
			}
		}else {
			if(this.phaseTimer == 0){
				this.phase = "spin"
				this.phaseTimer = 350
				random = Math.ceil(Math.random()*4)
				if(random == 1){
					this.direction = "upLeft"
				}else if(random == 2){
					this.direction = "upRight"
				}else if(random == 3){
					this.direction = "downRight"
				}else {
					this.direction = "downLeft"
				}
				this.speed = 7
			}
		}
		if(this.phaseTimer != 0){
			this.phaseTimer--
		}
	}
}
class TurtleySr{
	constructor(bigTurtleX,bigTurtleY,bigTurtleHealth,bigTurtlePhase,bigTurtlePhaseTimer,bigTurtleSpeed,bigTurtleDamage,bigTurtleDirection){
		this.xPos = bigTurtleX
		this.yPos = bigTurtleY
		this.health = bigTurtleHealth
		this.phase = bigTurtlePhase
		this.phaseTimer = bigTurtlePhaseTimer
		this.speed = bigTurtleSpeed
		this.damage = bigTurtleDamage
		this.direction = bigTurtleDirection
	}
	moveBigTurtle(){
		if(this.phase == "normal"){
			this.damage = 5
			if(this.phaseTimer > 200){
				if(this.xPos >= Player.xPos - bigTurtleSize && this.xPos <= Player.xPos + bigTurtleSize){
					if(this.yPos < Player.yPos){
						this.yPos -= this.speed
					}else if(this.yPos > Player.yPos){
						this.yPos += this.speed
					}
				}else if(this.yPos >= Player.yPos - bigTurtleSize && this.yPos <= Player.yPos + bigTurtleSize){
					if(this.xPos < Player.xPos){
						this.xPos -= this.speed
					}else if(this.xPos > Player.xPos){
						this.xPos += this.speed
					}
				}else {
					if(this.yPos < Player.yPos){
						this.yPos -= this.speed
					}else if(this.yPos > Player.yPos){
						this.yPos += this.speed
					}
					if(this.xPos < Player.xPos){
						this.xPos -= this.speed
					}else if(this.xPos > Player.xPos){
						this.xPos += this.speed
					}	
				}
			}else{
				if(this.xPos >= Player.xPos - bigTurtleSize && this.xPos <= Player.xPos + bigTurtleSize){
					if(this.yPos > Player.yPos){
						this.yPos -= this.speed
					}else if(this.yPos < Player.yPos){
						this.yPos += this.speed
					}
				}else if(this.yPos >= Player.yPos - bigTurtleSize && this.yPos <= Player.yPos + bigTurtleSize){
					if(this.xPos > Player.xPos){
						this.xPos -= this.speed
					}else if(this.xPos < Player.xPos){
						this.xPos += this.speed
					}
				}else {
					if(this.yPos > Player.yPos){
						this.yPos -= this.speed
					}else if(this.yPos < Player.yPos){
						this.yPos += this.speed
					}
					if(this.xPos > Player.xPos){
						this.xPos -= this.speed
					}else if(this.xPos < Player.xPos){
						this.xPos += this.speed
					}	
				}
			}
			if(this.phaseTimer == 0){
				this.phase = "shell"
				this.phaseTimer = 50
				textArray.push(new PopUpText(this.xPos,this.yPos,"Ugh, my back is sore. Children, deal with this hooligan!","white","bold 20px Comic Sans MS",40))
				random = Math.ceil(Math.random() * 4) + 3
				while(count < random){
					turtleArray.push(new TurtleyJr(Math.floor(Math.random() * 800)+200,Math.floor(Math.random() * 500)+200,20+(Math.floor(roomNum/5)*5),"normal",350+Math.floor(Math.random() * 100),1,5,"upLeft"))
					count++
				}
			}
		}else if(this.phase == "spin"){
			this.damage = 12
			if(this.yPos - bigTurtleSize < WALLSIZE){
				if(this.direction == "upLeft"){
					this.direction = "downLeft"
				}else if(this.direction == "upRight"){
					this.direction = "downRight"
				}
			}else if(this.yPos + bigTurtleSize > HEIGHT - WALLSIZE){
				if(this.direction == "downLeft"){
					this.direction = "upLeft"
				}else if(this.direction == "downRight"){
					this.direction = "upRight"
				}
			}else if(this.xPos - bigTurtleSize < WALLSIZE){
				if(this.direction == "upLeft"){
					this.direction = "upRight"
				}else if(this.direction == "downLeft"){
					this.direction = "downRight"
				}
			}else if(this.xPos + bigTurtleSize > WIDTH - WALLSIZE){
				if(this.direction == "upRight"){
					this.direction = "upLeft"
				}else if(this.direction == "downRight"){
					this.direction = "downLeft"
				}
			}
			if(this.direction == "upLeft"){
				this.xPos -= this.speed
				this.yPos -= this.speed
			}else if(this.direction == "upRight"){
				this.xPos += this.speed
				this.yPos -= this.speed
			}else if(this.direction == "downLeft"){
				this.xPos -= this.speed
				this.yPos += this.speed
			}else{
				this.xPos += this.speed
				this.yPos += this.speed
			}
			if(this.phaseTimer == 0){
				this.phaseTimer = 300
				this.speed = 1
				this.phase = "normal"
				textArray.push(new PopUpText(this.xPos,this.yPos,"All that spinning made me dizzy...","white","bold 20px Comic Sans MS",40))
			}
		}else {
			if(turtleArray.length != 0){
				this.phaseTimer = 50
			}
			if(this.phaseTimer == 0){
				this.phase = "spin"
				this.phaseTimer = 350
				random = Math.ceil(Math.random()*4)
				if(random == 1){
					this.direction = "upLeft"
				}else if(random == 2){
					this.direction = "upRight"
				}else if(random == 3){
					this.direction = "downRight"
				}else {
					this.direction = "downLeft"
				}
				this.speed = 5
				textArray.push(new PopUpText(this.xPos,this.yPos,"Kids these days can't get anything done!","white","bold 20px Comic Sans MS",40))
			}
		}
		if(this.phaseTimer != 0){
			this.phaseTimer--
		}
	}
}
function drawMonsters(){
	count = 0
	while(count < biteyArray.length){
		if(biteyArray[count].size > 20){
		ctx.drawImage(minibossImage,biteyArray[count].xPos - 45,biteyArray[count].yPos - 45)
		}else {
			ctx.drawImage(biteyImage,biteyArray[count].xPos - 20,biteyArray[count].yPos - 20)
		}
		count++
	}
	count = 0
	while(count < skeletonArray.length){
		ctx.drawImage(skeletonImage,skeletonArray[count].xPos - 15,skeletonArray[count].yPos - 15)
		count++
	}
	count = 0
	while(count < skeletonProjArray.length){
		ctx.drawImage(skeletonProjImage,skeletonProjArray[count].xPos-skeletonProjSize,skeletonProjArray[count].yPos-skeletonProjSize)
		count++
	}
	count = 0
	while(count < bossProjArray.length){
		ctx.drawImage(bossProjImage,bossProjArray[count].xPos-bossProjSize,bossProjArray[count].yPos-bossProjSize)
		count++
	}
	if(bossArray.length != 0){
		ctx.fillStyle = "#660000"
		ctx.beginPath()
		ctx.arc(bossArray[0].xPos,bossArray[0].yPos, bossSize, 0, 2*Math.PI)
		ctx.fill()
	}
	if(bigTurtleArray.length != 0){
		if(bigTurtleArray[0].phase == "normal"){
			if(bigTurtleArray[0].xPos > Player.xPos){
				ctx.drawImage(turtleySrLeftImage,bigTurtleArray[0].xPos-bigTurtleSize,bigTurtleArray[0].yPos-bigTurtleSize)
			}else {
				ctx.drawImage(turtleySrImage,bigTurtleArray[0].xPos-bigTurtleSize,bigTurtleArray[0].yPos-bigTurtleSize)
			}
		}else if(bigTurtleArray[0].phase == "spin"){
			if(Math.ceil(bigTurtleArray[0].phaseTimer/5) % 2 == 0){
				ctx.drawImage(turtleySrSpin1Image,bigTurtleArray[0].xPos-bigTurtleSize,bigTurtleArray[0].yPos-bigTurtleSize)
			}else{
				ctx.drawImage(turtleySrSpin2Image,bigTurtleArray[0].xPos-bigTurtleSize,bigTurtleArray[0].yPos-bigTurtleSize)
			}
		}else{
			ctx.drawImage(turtleySrShellImage,bigTurtleArray[0].xPos-bigTurtleSize,bigTurtleArray[0].yPos-bigTurtleSize)
		}
	}
	count = 0
	while(count < turtleArray.length){
		if(turtleArray[count].phase == "normal"){
			ctx.drawImage(turtleImage,turtleArray[count].xPos-turtleSize,turtleArray[count].yPos-turtleSize)
		}else if(turtleArray[count].phase == "spin"){
			if(Math.ceil(turtleArray[count].phaseTimer/5) % 4 == 0){
				ctx.drawImage(turtleSpin1Image,turtleArray[count].xPos-turtleSize,turtleArray[count].yPos-turtleSize)
			}else if((Math.ceil(turtleArray[count].phaseTimer/5)-2) % 4 == 0){
				ctx.drawImage(turtleSpin2Image,turtleArray[count].xPos-turtleSize,turtleArray[count].yPos-turtleSize)
			}else if((Math.ceil(turtleArray[count].phaseTimer/5)-3) % 4 == 0){
				ctx.drawImage(turtleSpin3Image,turtleArray[count].xPos-turtleSize,turtleArray[count].yPos-turtleSize)
			}else {
				ctx.drawImage(turtleSpin4Image,turtleArray[count].xPos-turtleSize,turtleArray[count].yPos-turtleSize)
			}
		}else{
			ctx.drawImage(turtleShellImage,turtleArray[count].xPos-turtleSize,turtleArray[count].yPos-turtleSize)
		}
		count++
	}
}
//collsion checks for the monsters
function checkMonsters(){
	count = 0
	while(count < biteyArray.length){
		if(collisionCheck(biteyArray[count].xPos,biteyArray[count].yPos,biteyArray[count].size,Player.xPos,Player.yPos,PLAYERSIZE) && iFrames == 0){
			Player.health -= biteyArray[count].damage
			iFrames = 30
			if(biteyArray[count].size > 30){
				lastDamageSource = "Big Bitey"
			}else{
				lastDamageSource = "Bitey"
			}
		}
		count++
	}
	count = 0
	while(count < biteyArray.length){
		count2 = 0
		while(count2 < magicBlastArray.length){
			if(collisionCheck(biteyArray[count].xPos,biteyArray[count].yPos,biteyArray[count].size,magicBlastArray[count2].xPos,magicBlastArray[count2].yPos,magicBlastSize)){
				biteyArray[count].health -= magicBlastDamage
				magicBlastArray.splice(count2, 1)
			}
			count2++
		}
		count++
	}
	count = 0
	while(count < biteyArray.length){
		count2 = 0
		while(count2 < fireballArray.length){
			if(collisionCheck(biteyArray[count].xPos,biteyArray[count].yPos,biteyArray[count].size,fireballArray[count2].xPos,fireballArray[count2].yPos,fireballArray[count2].size)){
				if(fireballArray[count2].exploded == "true" && fireballArray[count2].iFrames == 0){
					fireballArray[count2].iFrames = 15
					biteyArray[count].health -= fireballDamage
				}else {
					fireballArray[count2].exploded = "true"
					if(fireballArray[count2].timer == 0){
						fireballArray[count2].timer = 25
					}

					fireballArray[count2].size = fireballExplosionSize
				}
			}
			count2++
		}
		count++
	}
	count = 0
	while(count < biteyArray.length){
		if(biteyArray[count].health < 1){
			if(Math.ceil(Math.random() * 3) == 2){
				random = Math.floor(Math.random() * 5) + 5
				coinCount += random
				textArray.push(new PopUpText(biteyArray[count].xPos,biteyArray[count].yPos,"+"+random+" coins","gold","15px Comic Sans MS",20))
			}
			biteyArray.splice(count,1)
			enemyKills++
		}
		count++
	}
}
function checkMonsters2(){
	count = 0
	while(count < skeletonArray.length){
		if(collisionCheck(Player.xPos,Player.yPos,PLAYERSIZE,skeletonArray[count].xPos,skeletonArray[count].yPos,skeletonSize) && iFrames == 0){
			Player.health -= skeletonContactDamage
			iFrames = 30
			lastDamageSource = "Skeleton"
		}
		count++
	}
	count = 0
	while(count < skeletonArray.length){
		count2 = 0
		while(count2 < magicBlastArray.length){
			if(collisionCheck(skeletonArray[count].xPos,skeletonArray[count].yPos,skeletonSize,magicBlastArray[count2].xPos,magicBlastArray[count2].yPos,magicBlastSize)){
				skeletonArray[count].health -= magicBlastDamage
				magicBlastArray.splice(count2, 1)
			}
			count2++
		}
		count++
	}
	count = 0
	while(count < skeletonArray.length){
		count2 = 0
		while(count2 < fireballArray.length){
			if(collisionCheck(skeletonArray[count].xPos,skeletonArray[count].yPos,skeletonSize,fireballArray[count2].xPos,fireballArray[count2].yPos,fireballArray[count2].size)){
				if(fireballArray[count2].exploded == "true" && fireballArray[count2].iFrames == 0){
					fireballArray[count2].iFrames = 15
					skeletonArray[count].health -= fireballDamage
				}else {
					fireballArray[count2].exploded = "true"
					if(fireballArray[count2].timer == 0){
						fireballArray[count2].timer = 25
					}
					fireballArray[count2].size = fireballExplosionSize
				}
			}
			count2++
		}
		count++
	}
	count = 0
	while(count < skeletonArray.length){
		if(skeletonArray[count].health < 1){
			if(Math.ceil(Math.random() * 3) == 2){
				random = Math.floor(Math.random() * 5) + 5
				coinCount += random
				textArray.push(new PopUpText(skeletonArray[count].xPos,skeletonArray[count].yPos,"+"+random+" coins","gold","15px Comic Sans MS",20))
			}
			skeletonArray.splice(count,1)
			enemyKills++
		}
		count++
	}
}
function checkSkeletonProj(){
	count = 0
	while(count < skeletonProjArray.length){
		if(skeletonProjArray[count].xPos + skeletonProjSize > WIDTH - WALLSIZE || skeletonProjArray[count].yPos + skeletonProjSize > HEIGHT - WALLSIZE || skeletonProjArray[count].xPos - skeletonProjSize < 0 + WALLSIZE || skeletonProjArray[count].yPos - skeletonProjSize < 0 + WALLSIZE){
			skeletonProjArray.splice(count,1)
		}
		count++
	}
	count = 0
	while(count < skeletonProjArray.length){
		if(collisionCheck(Player.xPos,Player.yPos,PLAYERSIZE,skeletonProjArray[count].xPos,skeletonProjArray[count].yPos,skeletonProjSize)){
			Player.health -= skeletonProjDamage
			skeletonProjArray.splice(count, 1)
			iFrames = 30
			lastDamageSource = "Skeleton"
		}
		count++
	}
}
function checkTurtles(){
	count = 0
	while(count < turtleArray.length){
		if(collisionCheck(turtleArray[count].xPos,turtleArray[count].yPos,turtleSize,Player.xPos,Player.yPos,PLAYERSIZE) && iFrames == 0){
			Player.health -= turtleArray[count].damage
			iFrames = 30
			lastDamageSource = "Turtley Jr."
		}
		count++
	}
	count = 0
	while(count < turtleArray.length){
		count2 = 0
		while(count2 < magicBlastArray.length){
			if(collisionCheck(turtleArray[count].xPos,turtleArray[count].yPos,turtleSize,magicBlastArray[count2].xPos,magicBlastArray[count2].yPos,magicBlastSize)){
				if(turtleArray[count].phase == "normal"){
					turtleArray[count].health -= magicBlastDamage
				}else {
					textArray.push(new PopUpText(turtleArray[count].xPos,turtleArray[count].yPos,"Blocked!","white","15px Comic Sans MS",15))
				}
				magicBlastArray.splice(count2, 1)
			}
			count2++
		}
		count++
	}
	count = 0
	while(count < turtleArray.length){
		count2 = 0
		while(count2 < fireballArray.length){
			if(collisionCheck(turtleArray[count].xPos,turtleArray[count].yPos,turtleSize,fireballArray[count2].xPos,fireballArray[count2].yPos,fireballArray[count2].size)){
				if(fireballArray[count2].exploded == "true" && fireballArray[count2].iFrames == 0){
					fireballArray[count2].iFrames = 15
					if(turtleArray[count].phase == "normal"){
						turtleArray[count].health -= fireballDamage
					}else {
						textArray.push(new PopUpText(turtleArray[count].xPos,turtleArray[count].yPos,"Blocked!","white","15px Comic Sans MS",15))
					}
				}else {
					fireballArray[count2].exploded = "true"
					if(fireballArray[count2].timer == 0){
						fireballArray[count2].timer = 25
					}
					fireballArray[count2].size = fireballExplosionSize
				}
			}
			count2++
		}
		count++
	}
	count = 0
	while(count < turtleArray.length){
		if(turtleArray[count].health < 1){
			if(Math.ceil(Math.random() * 3) == 2){
				random = Math.floor(Math.random() * 5) + 5
				coinCount += random
				textArray.push(new PopUpText(turtleArray[count].xPos,turtleArray[count].yPos,"+"+random+" coins","gold","15px Comic Sans MS",20))
			}
			turtleArray.splice(count,1)
			enemyKills++
		}
		count++
	}	
}
function checkBigTurtle(){
	if(bigTurtleArray.length != 0){
		if(collisionCheck(bigTurtleArray[0].xPos,bigTurtleArray[0].yPos,bigTurtleSize,Player.xPos,Player.yPos,PLAYERSIZE) && iFrames == 0){
			Player.health -= bigTurtleArray[0].damage
			iFrames = 30
			lastDamageSource = "Turtley Sr."
		}
		count = 0
		while(count < magicBlastArray.length){
			if(collisionCheck(bigTurtleArray[0].xPos,bigTurtleArray[0].yPos,bigTurtleSize,magicBlastArray[count].xPos,magicBlastArray[count].yPos,magicBlastSize)){
				if(bigTurtleArray[0].phase == "normal"){
					bigTurtleArray[0].health -= magicBlastDamage
				}else {
					textArray.push(new PopUpText(bigTurtleArray[0].xPos,bigTurtleArray[0].yPos,"Blocked!","white","15px Comic Sans MS",15))
				}
				magicBlastArray.splice(count,1)
			}
			count++
		}
		count = 0
		while(count < fireballArray.length){
			if(collisionCheck(bigTurtleArray[0].xPos,bigTurtleArray[0].yPos,bigTurtleSize,fireballArray[count].xPos,fireballArray[count].yPos,fireballArray[count].size)){
				if(fireballArray[count].exploded == "true" && fireballArray[count].iFrames == 0){
					fireballArray[count].iFrames = 15
					if(bigTurtleArray[0].phase == "normal"){
						bigTurtleArray[0].health -= fireballDamage
					}else {
						textArray.push(new PopUpText(bigTurtleArray[0].xPos,bigTurtleArray[0].yPos,"Blocked!","white","15px Comic Sans MS",15))
					}
				}else {
					fireballArray[count].exploded = "true"
					if(fireballArray[count].timer == 0){
						fireballArray[count].timer = 25
					}
					fireballArray[count].size = fireballExplosionSize
				}
			}
			count++
		}
		if(bigTurtleArray[0].health < 1){
			enemyKills++
			random = Math.floor(Math.random() * 10) + 25
			coinCount += random
			textArray.push(new PopUpText(bigTurtleArray[0].xPos,bigTurtleArray[0].yPos,"+"+random+" coins","gold","15px Comic Sans MS",20))
			bigTurtleArray.splice(0,1)
		}
	}
}
//boss stuff
class BossMonster{
	constructor(bossX,bossY,bossHealth,bossProjCooldown,bossAttackPhase,bossTargetX,bossTargetY,bossPhaseTimer,bossCycle ){
		this.xPos = bossX
		this.yPos = bossY
		this.health = bossHealth
		this.cooldown = bossProjCooldown
		//boss has chase phase where he follows you and shoot you with 3 projectiles at once
		//then there is bullet pain phase where he goes to a spot in the room and telegraphs an attack and shoots like tons of projectiles in 8 directions
		this.phase = bossAttackPhase
		this.targetX = bossTargetX
		this.targetY = bossTargetY
		this.phaseTimer = bossPhaseTimer
		this.cycle = bossCycle
	}
	moveBoss(){
		if(this.phase == "chase"){
			this.targetX = Player.xPos
			this.targetY = Player.yPos
			if(this.phaseTimer == 0){
				this.phase = "bullets"
				this.cycle = 0
			}
		}else {
			if(this.phase == "bullets" && this.phaseTimer == 0){
				this.phase = "change"
				random = Math.ceil(Math.random()*9)
				if(random == 1){
					this.targetX = 400
					this.targetY = 250
				}else if(random == 2){
					this.targetX = 600
					this.targetY = 250
				}else if(random == 3){
					this.targetX = 800
					this.targetY = 250
				}else if(random == 4){
					this.targetX = 400
					this.targetY = 450
				}else if(random == 5){
					this.targetX = 600
					this.targetY = 450
				}else if(random == 6){
					this.targetX = 800
					this.targetY = 450
				}else if(random == 7){
					this.targetX = 400
					this.targetY = 650
				}else if(random == 8){
					this.targetX = 600
					this.targetY = 650
				}else {
					this.targetX = 800
					this.targetY = 650
				}
				this.cycle++
				if(this.cycle == 5){
					this.phase = "chase"
					this.phaseTimer = 500
				}
			}
			if(this.xPos == this.targetX && this.yPos == this.targetY && this.phase == "change"){
				this.phase = "aim"
				this.phaseTimer = 25
			}
			if(this.phase == "aim" && this.phaseTimer == 0){
				this.phase = "bullets"
				this.phaseTimer = 100
			}
		}
		if(this.xPos >= this.targetX && this.xPos <= this.targetX){
			if(this.yPos > this.targetY){
				this.yPos -= bossSpeed
			}else if(this.yPos < this.targetY){
				this.yPos += bossSpeed
			}
		}else if(this.yPos >= this.targetY && this.yPos <= this.targetY){
			if(this.xPos > this.targetX){
				this.xPos -= bossSpeed
			}else if(this.xPos < this.targetX){
				this.xPos += bossSpeed
			}
		}else {
			if(this.yPos > this.targetY){
				this.yPos -= bossSpeed
			}else if(this.yPos < this.targetY){
				this.yPos += bossSpeed
			}
			if(this.xPos > this.targetX){
				this.xPos -= bossSpeed
			}else if(this.xPos < this.targetX){
				this.xPos += bossSpeed
			}
		}
		if(this.phaseTimer != 0){
			this.phaseTimer--
		}
	}
	shootBossProj(){
		if(this.phase == "chase"){
			if(this.cooldown == 0){
				if(this.xPos < Player.xPos + PLAYERSIZE && this.xPos > Player.xPos - PLAYERSIZE){
					if(this.yPos > Player.yPos){
						//up
						bossProjArray.push(new BossProj(this.xPos,this.yPos,"up",5))
					}else {
						//down
						bossProjArray.push(new BossProj(this.xPos,this.yPos,"down",5))
					}
				}else if(this.yPos < Player.yPos + PLAYERSIZE && this.yPos > Player.yPos - PLAYERSIZE){
					if(this.xPos < Player.xPos){
						//right
						bossProjArray.push(new BossProj(this.xPos,this.yPos,"right",5))
					}else {
						//left
						bossProjArray.push(new BossProj(this.xPos,this.yPos,"left",5))
					}
				}else {
					if(this.xPos < Player.xPos){
						if(this.yPos > Player.yPos){
							//up and right
							bossProjArray.push(new BossProj(this.xPos,this.yPos,"upRight",5))
						}else {
							//down and right
							bossProjArray.push(new BossProj(this.xPos,this.yPos,"downRight",5))
						}
					}else{
						if(this.yPos > Player.yPos){
							//up and left
							bossProjArray.push(new BossProj(this.xPos,this.yPos,"upLeft",5))
						}else {
							//down and left
							bossProjArray.push(new BossProj(this.xPos,this.yPos,"downLeft",5))
						}
					}
				}
				this.cooldown = 10
			}else {
				this.cooldown--
			}
		}else {
			if(this.phase == "bullets"){
				if(this.cooldown == 0){
					bossProjArray.push(new BossProj(this.xPos,this.yPos,"up",8))
					bossProjArray.push(new BossProj(this.xPos,this.yPos,"upLeft",8))
					bossProjArray.push(new BossProj(this.xPos,this.yPos,"left",8))
					bossProjArray.push(new BossProj(this.xPos,this.yPos,"downLeft",8))
					bossProjArray.push(new BossProj(this.xPos,this.yPos,"down",8))
					bossProjArray.push(new BossProj(this.xPos,this.yPos,"downRight",8))
					bossProjArray.push(new BossProj(this.xPos,this.yPos,"right",8))
					bossProjArray.push(new BossProj(this.xPos,this.yPos,"upRight",8))
					this.cooldown = 5
				}else {
					this.cooldown-- 
				}
			}else if(this.phase == "aim"){
				//aiming phase
				ctx.strokeStyle = "red"
				ctx.beginPath()
				ctx.moveTo(this.xPos,this.yPos)
				//up
				ctx.lineTo(this.xPos,this.yPos-1000)
				ctx.moveTo(this.xPos,this.yPos)
				//upleft
				ctx.lineTo(this.xPos-1000,this.yPos-1000)
				ctx.moveTo(this.xPos,this.yPos)
				//left
				ctx.lineTo(this.xPos-1000,this.yPos)
				ctx.moveTo(this.xPos,this.yPos)
				//downleft
				ctx.lineTo(this.xPos-1000,this.yPos+1000)
				ctx.moveTo(this.xPos,this.yPos)
				//down
				ctx.lineTo(this.xPos,this.yPos+1000)
				ctx.moveTo(this.xPos,this.yPos)
				//downright
				ctx.lineTo(this.xPos+1000,this.yPos+1000)
				ctx.moveTo(this.xPos,this.yPos)
				//right
				ctx.lineTo(this.xPos+1000,this.yPos)
				ctx.moveTo(this.xPos,this.yPos)
				//upright
				ctx.lineTo(this.xPos+1000,this.yPos-1000)
				ctx.stroke()
			}
		}
	}
}
class BossProj{
	constructor(bossProjX,bossProjY,bossProjDirection,bossProjSpeed){
		this.xPos = bossProjX
		this.yPos = bossProjY
		this.direction = bossProjDirection
		this.speed = bossProjSpeed
	}
	moveBossProj(){
		if(this.direction == "up"){
			this.yPos -= this.speed
		}else if(this.direction == "upLeft"){
			this.xPos -= this.speed
			this.yPos -= this.speed
		}else if(this.direction == "left"){
			this.xPos -= this.speed
		}else if(this.direction == "downLeft"){
			this.xPos -= this.speed
			this.yPos += this.speed
		}else if(this.direction == "down"){
			this.yPos += this.speed
		}else if(this.direction == "downRight"){
			this.xPos += this.speed
			this.yPos += this.speed
		}else if(this.direction == "right"){
			this.xPos += this.speed
		}else if(this.direction == "upRight"){
			this.xPos += this.speed
			this.yPos -= this.speed
		}
	}
}
function checkBoss(){
	if(collisionCheck(bossArray[0].xPos,bossArray[0].yPos,bossSize,Player.xPos,Player.yPos,PLAYERSIZE) && iFrames == 0){
		Player.health -= bossContactDamage
		iFrames = 30
		lastDamageSource = "Witch King"
	}
	count = 0
	while(count < magicBlastArray.length){
		if(collisionCheck(bossArray[0].xPos,bossArray[0].yPos,bossSize,magicBlastArray[count].xPos,magicBlastArray[count].yPos,magicBlastSize)){
			bossArray[0].health -= magicBlastDamage
			magicBlastArray.splice(count,1)
		}
		count++
	}
	count = 0
	while(count < fireballArray.length){
		if(collisionCheck(bossArray[0].xPos,bossArray[0].yPos,bossSize,fireballArray[count].xPos,fireballArray[count].yPos,fireballArray[count].size)){
			if(fireballArray[count].exploded == "true" && fireballArray[count].iFrames == 0){
				fireballArray[count].iFrames = 15
				bossArray[0].health -= fireballDamage
			}else {
				fireballArray[count].exploded = "true"
				if(fireballArray[count].timer == 0){
					fireballArray[count].timer = 25
				}
				fireballArray[count].size = fireballExplosionSize
			}
		}
		count++
	}
	count = 0
	while(count < bossProjArray.length){
		if(bossProjArray[count].xPos + bossProjSize > WIDTH - WALLSIZE || bossProjArray[count].yPos + bossProjSize > HEIGHT - WALLSIZE || bossProjArray[count].xPos - bossProjSize < 0 + WALLSIZE || bossProjArray[count].yPos - bossProjSize < 0 + WALLSIZE){
			bossProjArray.splice(count,1)
		}
		count++
	}
	count = 0
	while(count < bossProjArray.length){
		if(collisionCheck(Player.xPos,Player.yPos,PLAYERSIZE,bossProjArray[count].xPos,bossProjArray[count].yPos,bossProjSize)){
			Player.health -= bossProjDamage
			bossProjArray.splice(count, 1)
			iFrames = 30
			lastDamageSource = "Witch King"
		}
		count++
	}
	if(bossArray[0].health < 1){
		enemyKills++
		random = Math.floor(Math.random() * 10) + 15
		coinCount += random
		textArray.push(new PopUpText(bossArray[0].xPos,bossArray[0].yPos,"+"+random+" coins","gold","15px Comic Sans MS",20))
		bossArray.splice(0,1)
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
	fireballArray.push(new FireballProjectile(Player.xPos,Player.yPos, facingDirection, "false", 6, 60, 0))
}
class FireballProjectile{
	constructor(fireballX, fireballY, fireballDirection, fireballExploded, fireballSize, fireballTimer, fireballIFrames){
		this.xPos = fireballX
		this.yPos = fireballY
		this.direction = fireballDirection
		this.exploded = fireballExploded
		this.size = fireballSize
		this.timer = fireballTimer
		this.iFrames = fireballIFrames
	}
	moveFireball(){
		if(this.iFrames > 0){
			this.iFrames--
		}
		if(this.exploded == "false"){
			if(this.timer < 1){
				this.exploded = "true"
				this.timer = 25
				this.size = fireballExplosionSize
			}else {
				if(this.direction == "up"){
					this.yPos -= fireballSpeed
				}else if(this.direction == "upLeft"){
					this.xPos -= fireballSpeed
					this.yPos -= fireballSpeed 
				}else if(this.direction == "left"){
					this.xPos -= fireballSpeed
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
				this.timer--
			}
		}else {
			if(this.timer > 0){
				this.timer--
			}else{

			}
		}
	}
}
//
function drawSpells(){
	count = 0
	while(count < magicBlastArray.length){
		ctx.drawImage(magicBlastImage, magicBlastArray[count].xPos - magicBlastSize, magicBlastArray[count].yPos - magicBlastSize)
		count++
	}
	count = 0
	while(count < fireballArray.length){
		if(fireballArray[count].exploded == "true"){
			ctx.drawImage(fireballBoomImage,fireballArray[count].xPos-51,fireballArray[count].yPos-51)
		}else{
			ctx.drawImage(fireballImage,fireballArray[count].xPos-6,fireballArray[count].yPos-6)
		}
		count++
	}

}
function checkSpells(){
	count = 0
	while(count < magicBlastArray.length){
		if(magicBlastArray[count].xPos + magicBlastSize > WIDTH - WALLSIZE || magicBlastArray[count].yPos + magicBlastSize > HEIGHT - WALLSIZE || magicBlastArray[count].xPos - magicBlastSize < 0 + WALLSIZE || magicBlastArray[count].yPos - magicBlastSize < 0 + WALLSIZE){
			magicBlastArray.splice(count,1)
		}
		count++
	}
	while(numProjectiles > maxProjectiles){
		magicBlastArray.splice(0,1)
		numProjectiles--
	}
	count = 0
	while(count < fireballArray.length){
		if((fireballArray[count].xPos + 4 > WIDTH - WALLSIZE || fireballArray[count].yPos + 4 > HEIGHT - WALLSIZE || fireballArray[count].xPos - 4 < 0 + WALLSIZE || fireballArray[count].yPos - 4 < 0 + WALLSIZE) && fireballArray[count].exploded == "false"){
			fireballArray[count].exploded = "true"
			fireballArray[count].timer = 25
			fireballArray[count].size = fireballExplosionSize
		}
		count++
	}
	count = 0
	while(count < fireballArray.length){
		if(fireballArray[count].exploded == "true" && fireballArray[count].timer == 0){
			fireballArray.splice(count,1)
		}
		count++
	}
}
function healSpell(){
	if(numMonsters != 0 && roomHeals < roomHealCap){
		healthCurrent = Player.health
		killsCurrent = enemyKills
		healTimer = 750
		attemptingHeal = "true"
		roomHeals++
	}
}
function healCheck(){
	if(healTimer > 0){
		healTimer--
	}
	if(Player.health < healthCurrent){
		attemptingHeal = "false"
	}
	if((healTimer < 500 || enemyKills > killsCurrent) & attemptingHeal == "true"){
		Player.health += healAmount
		attemptingHeal = "false"
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
}
function collisionCheck(x1,y1,r1,x2,y2,r2){
	xDist = x1 - x2
	yDist = y1 - y2
	trueDist = Math.sqrt(xDist*xDist + yDist*yDist)
	if(trueDist < r1 + r2){
		return(true)
	}else {
		return(false)
	}
}
class PopUpText{
	constructor(textX,textY,textString,textColour,textFont,textTime){
		this.xPos = textX
		this.yPos = textY
		this.text = textString
		this.colour = textColour
		this.font = textFont
		this.time = textTime
	}
}
function drawPopUpText(){
	count = 0
	while(count < textArray.length){
		textArray[count].yPos -= 3
		ctx.textAlign = "center"
		ctx.font = textArray[count].font
		ctx.fillStyle = textArray[count].colour
		ctx.fillText(textArray[count].text,textArray[count].xPos,textArray[count].yPos)
		if(textArray[count].time == 0){
			textArray.splice(count,1)
		}else{
			textArray[count].time--
		}
		count++
	}
}