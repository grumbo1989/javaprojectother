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
//arrays
//canvas setup
window.onload=startCanvas
function startCanvas(){
	ctx=document.getElementById("myCanvas").getContext("2d")
	timer = setInterval(updateCanvas, 50)
	Player.xPos = 50
	Player.yPos = 50
}	
//update canvas
function updateCanvas(){
	drawPlayer()
}
//player stuff 
class Player{
	constructor(playerX,playerY){
		this.xPos = playerX
		this.yPos = playerY
	}
}
function drawPlayer(){
	ctx.fillStyle = "#800000"
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