
var speed = 40;
var frameWidth = window.innerWidth;
var frameHeight = window.innerHeight;
var laserNum = 0;
var asteroidSpawnSetInt;
var emenyShipSpawnSetInt;

function laser()
{

	var getShipPosition = parseInt(playerShip.style.left);
	var getShipBottom = parseInt(playerShip.style.bottom);
     
	var laserX = getShipPosition + 30 + "px";
	var laserLeftPos = "left:" + laserX + ";";
   
    var laserY = getShipBottom + 50;
	var laserBottomPos = "bottom:" + laserY + "px;"; 

	laserNum++;
	
	this.name = "laser_"+laserNum;

	document.getElementById('laserSpawner').innerHTML +="<img src='assets/laser.png' class='laser' id='"+this.name+"' style='position:absolute;"+ laserBottomPos +""+ laserLeftPos +"'/>";

	this.clearMe = setInterval(laserMove,10, this);
}

function laserMove(newLaser)
{

	var x = document.getElementById(newLaser.name).offsetLeft - document.getElementById(newLaser.name).scrollLeft +  document.getElementById(newLaser.name).clientLeft;
	var y = document.getElementById(newLaser.name).offsetTop - document.getElementById(newLaser.name).scrollTop +  document.getElementById(newLaser.name).clientTop;

	newLaser.y = parseInt(document.getElementById(newLaser.name).style.bottom);
	document.getElementById(newLaser.name).style.bottom = (newLaser.y + 10)+'px';	

	for(var i = 0; i < asteroidArray.length; i++)
	{
		
		var x1=parseInt(asteroidArray[i].x);
		var y1=parseInt(asteroidArray[i].y);
	
		
		var x2 = x1 + asteroidArray[i].w;
		var y2 = y1 + asteroidArray[i].h;			
			
		if ((x > x1) && (x < x2) && (y > y1) && (y < y2))
		{ 
			
			score += 1;
			document.getElementById("scoreBoard").innerHTML = "";
			document.getElementById("scoreBoard").innerHTML += "Score: " + score;
		
			
			var laserParent = document.getElementById(newLaser.name);
			laserParent.parentNode.removeChild(laserParent);
       		clearInterval(newLaser.clearMe);
			
			var myParent = document.getElementById(asteroidArray[i].name);
			clearInterval(asteroidArray[i].clearMe);
			myParent.parentNode.removeChild(myParent);
			var currentIndex = asteroidArray.indexOf(asteroidArray[i]);
			asteroidArray.splice(currentIndex, 1);
			break;
		} 	
	}
	if(newLaser.y > frameHeight)
	{
		
		var laserParent = document.getElementById(newLaser.name);
		laserParent.parentNode.removeChild(laserParent);
		clearInterval(newLaser.clearMe);
	}
}


function shipAttack()
{
     var newLaser = new laser();
}


function shipLeft()
{
	
	var ship = document.getElementById("playerShip");
	
	
	if (ship.style.left != "")
	{
		 
		if (parseInt(ship.style.left) > 20)
		{
			var currentLeft = parseInt(ship.style.left);
			ship.style.left = (currentLeft - speed) + "px";
		}
	}

	
	else 
	{
		ship.style.left = "5px"; 
	}	
}


function shipRight()
{
	
	var ship = document.getElementById("playerShip");
	
	
	if (ship.style.left != "")
	{
		
		if (parseInt(ship.style.left) < frameWidth - 40)
		{
			var currentLeft = parseInt(ship.style.left);
			ship.style.left = (currentLeft + speed) + "px";
		}
	} 
	
 
	else 
	{
		ship.style.left = "20px";
	}
}


function initalize()
{
	var ship = document.getElementById("playerShip");
	
	var centerX = (frameWidth / 2) - 35;
	ship.style.left = centerX + "px";
	ship.style.bottom = "100px";
	
	asteroidSpawnSetInt = setInterval(asteroidSpawner, 1000);

}


function shipStatus()
{
	if(playerHealth <= 0)
	{
		window.location.href = "deadMenu.html";
	}
}