var npcNum = 0;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var asteroidType;


function asteroidSpawner()
{
	var newAsteroid = new Asteroid();
}

function Asteroid()
{

	var randomLeft = eval(Math.floor(Math.random() * windowWidth));
	
	var randomSize = eval(Math.floor(Math.random() * 50 + 40));

	var randomAsteroid = eval(Math.floor(Math.random() * 2));
	if(randomAsteroid === 1)
	{
		asteroidType = "src='assets/astroid.png'";
	}
	else
	{
		asteroidType = "src='assets/astroidTwo.png'"; 
	}
	

	npcNum++;
	

	this.name = "asteroid_"+npcNum;

	this.w = randomSize;
	this.h = randomSize;

	if((randomLeft + randomSize) < windowWidth)
	{
	
		document.getElementById('npcSpawner').innerHTML +="<img "+asteroidType+"class='asteroid' id='"+this.name+"'style='position:absolute; height:"+randomSize+"px; width:"+randomSize+"px; top: 0px; left:"+randomLeft+"px;'/>";
	}
	
	
	else
	{
		
		var randomValue = eval(Math.floor(Math.random() * 2));
		if(randomValue === 1)
		{
			
			document.getElementById('npcSpawner').innerHTML +="<img "+asteroidType+"class='asteroid' id='"+this.name+"'style='position:absolute; height:"+randomSize+"px; width:"+randomSize+"px; top: 0px; left: 30%;'/>";
		}
		else
		{

			document.getElementById('npcSpawner').innerHTML +="<img "+asteroidType+"class='asteroid' id='"+this.name+"'style='position:absolute; height:"+randomSize+"px; width:"+randomSize+"px; top: 0px; left: 60%;'/>";
		}
	}
	
	
	this.y = document.getElementById(this.name).style.top; 
 
	this.x = document.getElementById(this.name).style.left; 
	

	this.clearMe = setInterval(asteroidMove,80, this);	

	asteroidArray.push(this);
}

function asteroidMove(newAsteroid)
{

	newAsteroid.x = document.getElementById(newAsteroid.name).offsetLeft - document.getElementById(newAsteroid.name).scrollLeft +  document.getElementById(newAsteroid.name).clientLeft;
	newAsteroid.y = parseInt(document.getElementById(newAsteroid.name).style.top);

	newAsteroid.w = parseInt(document.getElementById(newAsteroid.name).style.width); 
	newAsteroid.h = parseInt(document.getElementById(newAsteroid.name).style.height);

	var shipW = document.getElementById('playerShip').clientWidth;
	var shipH = document.getElementById('playerShip').clientHeight;

	var shipX = playerShip.offsetLeft - playerShip.scrollLeft +  playerShip.clientLeft;
	var shipY = playerShip.offsetTop - playerShip.scrollTop +  playerShip.clientTop;	
	

	document.getElementById(newAsteroid.name).style.top = (newAsteroid.y + 10)+'px';


	if((((newAsteroid.x + newAsteroid.x) > shipX) && (newAsteroid.x < (shipX + shipW))) && ((newAsteroid.y > shipY) && (newAsteroid.y < windowHeight)))
	{
	
		clearInterval(newAsteroid.clearMe);
		var currentIndex = asteroidArray.indexOf(newAsteroid);
		asteroidArray.splice(currentIndex, 1);
		
		var asteroidParent = document.getElementById(newAsteroid.name);
		asteroidParent.parentNode.removeChild(asteroidParent);
		
		
		playerHealth -= 25;
		document.getElementById("healthDisplay").innerHTML = "";
		document.getElementById("healthDisplay").innerHTML += "Health: " + playerHealth + "%";
	}
	

	var bottomBoundry = windowHeight - newAsteroid.h;


	if(newAsteroid.y >= bottomBoundry)
	{

		clearInterval(newAsteroid.clearMe);
		var currentIndex = asteroidArray.indexOf(newAsteroid);
		asteroidArray.splice(currentIndex, 1);
		
		var asteroidParent = document.getElementById(newAsteroid.name);
		asteroidParent.parentNode.removeChild(asteroidParent);
	}

	shipStatus()
}

function enemyShipSpawner()
{

	var randomSpawnTime = eval(Math.floor(Math.random() * 8 + 1));
	

	if(randomSpawnTime == 8)
	{
		var newEnemyShip = new enemyShip();
	}
}

function enemyShip()
{

	var randomLeft = eval(Math.floor(Math.random() * windowWidth));
	
	
	npcNum++;
	
	
	this.name = "enemyShip_"+npcNum;
	
	
	if((randomLeft + 80) < windowWidth)
	{  
	
		document.getElementById('npcSpawner').innerHTML +="<img src='assets/enemyShip.png' class='enemyShip' id='"+this.name+"'style='position:absolute; height:30px; width:80px; top: 0px; left:"+randomLeft+"px;'/>";
	}
	
	
	this.y = document.getElementById(this.name).style.top;
	
	this.x = document.getElementById(this.name).style.left;
	
	this.clearMe = setInterval(enemyShipMove,80, this);	
	
	enemyShipArray.push(this);
}

function enemyShipMove(newEnemyShip)
{
	newEnemyShip.y = parseInt(document.getElementById(newEnemyShip.name).style.top);
	document.getElementById(newEnemyShip.name).style.top = (newEnemyShip.y + 10)+'px';
	if(newEnemyShip.y > windowHeight)
	{
		clearInterval(newEnemyShip.clearMe);
		var currentIndex = enemyShipArray.indexOf(newEnemyShip);
		enemyShipArray.splice(currentIndex, 1);
		
		var enemyShipParent = document.getElementById(newEnemyShip.name);
		enemyShipParent.parentNode.removeChild(enemyShipParent);
	}
}