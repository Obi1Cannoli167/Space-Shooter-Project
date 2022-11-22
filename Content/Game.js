//-------------------------------------------------------------------------
//---------------------------GENERAL DECLARATIONS--------------------------
//-------------------------------------------------------------------------

//Declaring abbreviational consts and declaring dimensions of the canvas itself, deciding it will be 2-dimensional
const canvas = document.querySelector("canvas");
const life = document.querySelector("#life");
const info = document.querySelector("#info");
const scoreboard = document.querySelector("#scoreboard");
const Timer = document.querySelector("#timer");
const gameOverMenu = document.querySelector("#gameOver");
const c = canvas.getContext("2d");
canvas.width = 1080;
canvas.height = 810;
const innerWidth = canvas.width;
const innerHeight = canvas.height;
const cX = innerWidth/2;
const cY = innerHeight/2;

//Code for the sleep command
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Informing the player how to proceed
info.textContent="Press the spacebar to start the game"

// ------------------------------------------------------------------------
// ---------------------------CLASSES_AND_ENTITIES-------------------------
// ------------------------------------------------------------------------
//Blueprint of a projectile object
class playerBullet {
    constructor(x, y, color, size, velocity, damage){
        this.x = x,
        this.y = y,
        this.color = color,
        this.size = size,
        this.velocity = velocity;
        this.damage = damage;
    }
    draw(){
        c.save();
        c.fillStyle = this.color;
        c.beginPath();
        c.ellipse(this.x, this.y, this.size*3, this.size, 0, 0, 2*Math.PI);
        c.fill();
        c.stroke();
        c.restore();
    }
    update(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}
//blueprint of the player itself
class Player {
    constructor(x, y, color, size, velocity) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.size = size,
        this.velocity = velocity;
    }
    draw() {
        c.fillStyle = this.color;
        c.beginPath();
        c.moveTo(this.x-this.size,this.y);
        c.lineTo(this.x-this.size*1.35,this.y+this.size*0.7);
        c.lineTo(this.x-this.size,this.y);
        c.lineTo(this.x-this.size*1.35,this.y+this.size*0.7);
        c.lineTo(this.x+this.size,this.y);
        c.lineTo(this.x-this.size*1.35,this.y-this.size*0.7);
        c.font="20px Consolas";
        c.fillText("Player", this.x-this.size*1.5, this.y-this.size);
        c.closePath();
        c.fill();
        c.stroke();
    }
    update(){
        this.draw();
    }
}
//Blueprint of the enemy itself. Similar to the player object but made to be facing the opposite direction and is colored orange
class Enemy {
    constructor(x, y, color, size, velocity, health) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.size = size,
        this.velocity = velocity,
        this.health = health;
    }
    draw() {
        c.fillStyle = this.color;
        c.beginPath();
        c.moveTo(this.x+this.size,this.y);
        c.lineTo(this.x+this.size*1.35,this.y-this.size*0.7);
        c.lineTo(this.x+this.size,this.y);
        c.lineTo(this.x+this.size*1.35,this.y-this.size*0.7);
        c.lineTo(this.x-this.size,this.y);
        c.lineTo(this.x+this.size*1.35,this.y+this.size*0.7);
        c.font="20px Consolas";
        c.fillText(this.health+"HP", this.x-this.size*1.5, this.y-this.size);
        c.closePath();
        c.fill();
        c.stroke();
    }
    update(){
        this.draw();
        this.x = this.x - this.velocity.x;
        this.y = this.y - this.velocity.y;
    }
}
//A squared object made to give temporary powers to the player once consumed
class PowerUp {
    constructor(x, y, color, size, velocity) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.size = size,
        this.velocity = velocity;
    }
    draw() {
        c.fillStyle = this.color;
        c.beginPath();
        c.moveTo(this.x+this.size, this.y);
        c.lineTo(this.x+this.size, this.y+this.size);
        c.lineTo(this.x, this.y+this.size);
        c.lineTo(this.x, this.y);
        c.font="20px Consolas";
        c.fill();
        c.fillStyle = "White";
        c.fillText("UP!", this.x+this.size/8,this.y+this.size/1.5);
        c.closePath();
        c.stroke();
    }
    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}
// ------------------------------------------------------------------------
// --------------------------CORE_MECHANICS--------------------------------
// ------------------------------------------------------------------------
//Declaring arrays for objects in order to organize each and every individual object inside
const playerBullets = [];
const enemies = [];
const powerUps = [];
//Declaring plenty of different variables made to serve as a way to spice up the game and make it more whole
var playerBulletVelocity = 7;
let lives = 3;
let swerve = 0;
let difficultyIndex = 0;
let radicalDifficultyIndex = 0;
let powerUpMultiplier = 1;
let powerUpMode = false;
let gameOn = false;
let gameOver = false;
let score = 0;
let seconds = 0;

//Initially declaring the player object, made to be centered on the canvas itself3
const player = new Player(cX,cY,"#f00",20,10);
player.draw();33
//A function that activates whenever the mouse is moving inside the game (canvas), reads the cursor position and uses calculus to draw the player object to the cursor in an animated fashion, as the further away the cursor is, the further the displacement
function mouseMove() {
    canvas.addEventListener("mousemove", function (event) {
        const distance = Math.hypot(Math.abs(event.clientX - player.x), Math.abs(event.clientY - player.y));
        const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x);
        //To make sure it displaces itself whenever needed
        if (distance!=0) {
            player.y += player.velocity*Math.sin(angle)*(0.033*distance);
            player.x += player.velocity*Math.cos(angle)*(0.033*distance);
        }
    }, true); 
}

//This function appends a bullet object into the array whenever clicked on the mouse. 
canvas.addEventListener("mousedown", (event) => {
    if (gameOn) {
        playerBullets.push(new playerBullet(player.x, player.y, "blue", 10*powerUpMultiplier/1.75, {x: playerBulletVelocity*powerUpMultiplier, y:0}, 3*powerUpMultiplier));
    }
});
//This also works with the spacebar now.
window.addEventListener("keydown", (event) => {
    if (event.key == " ") {
        if (gameOn) {
            shoot()
            async function shoot() {
                playerBullets.push(new playerBullet(player.x, player.y, "blue", 10*powerUpMultiplier/1.75, {x: playerBulletVelocity*powerUpMultiplier, y:0}, 3*powerUpMultiplier));
                await sleep(1000)
            }
        }
    }
});

//This function makes enemies spawn but progressively faster as shown in the math
function spawnEnemies() {
    setTimeout(() => {
        setInterval(() => {
            if (!gameOver) {
                let randomSize = parseInt(Math.floor(Math.random()*10+10)*(1+difficultyIndex/180));
                let randomYPos = parseInt(Math.floor(Math.random()*innerHeight/2+innerHeight/4));
               enemies.push(new Enemy(innerWidth+100, randomYPos, "orange", randomSize, {x: 2, y:0}, randomSize));
               console.log(enemies);
            }
        }, (2000/(1+difficultyIndex/60)));
    }, 6500);
}

//This function takes the two variables and increments them intermittently within a given time interval
function difficultyIncrease() {
    setTimeout(() => {
        setInterval(() => {
            difficultyIndex++;
        }, 1000);
        setInterval(() => {
            radicalDifficultyIndex++;
            lives += Math.floor(score/300);
            life.textContent="Lives: "+lives;
            info.textContent="They've evolved! "+Math.floor(score/300)+" lives have been given.";
            setTimeout(() => {
                info.textContent="";
            }, 2000);
        }, 30000);
    }, 6500);
}

//Keeps track of how long you've been in the game
function timer() {
    setTimeout(() => {
        Timer.textContent="Time: 0";
        setInterval(() => {
                if (!gameOver) {
                seconds++;
                Timer.textContent="Time: "+seconds;
            }
        }, 1000);
    }, 6500);
}

//This is the longest function for a good reason: because it manages the whole pace of the game and refreshes and redraws all the objects dynamically appended to their arrays, hence its name "pacer".
//Much like a referee in a boxing match, it goes through the power of logic and math to assert on what happens to the objects
let animationId;
function pacer() {
    animationId = requestAnimationFrame(pacer);
    //Useful for making the enemies harder to hit, and looks cool
    swerve+=(0.01)*(1+radicalDifficultyIndex);
    c.clearRect(0,0,innerWidth,innerWidth);
    player.update();
    //Calls in on each individual bullet object in the array and removes whatever bullet reaches the end of the canvas
    playerBullets.forEach((bullet, index) => {
        bullet.update();
        if (bullet.x - bullet.size > innerWidth) {
            setTimeout(() => {
                playerBullets.splice(index, 1);
                if (score > 50) {
                    score-=3;
                    scoreboard.textContent="Score: "+score;
                }
            }, 0);
        }
        if (powerUpMode) {
            //Styles the bullets when on power-up mode!!
            bullet.color="White";
        }
    });
    //calls in on each power up and manages the effects of the power-up mode upon consumption and also that you can't take another power-up until the effect is off
    powerUps.forEach((power_up, index) => {
        const distance = Math.hypot(player.x - power_up.x, player.y - power_up.y);
        power_up.update();
        if (power_up.y > innerHeight-power_up.size/2) {
            powerUps.splice(index, 1);
        }
        if (distance - player.size - power_up.size/2 < 1 && !powerUpMode) {
            powerUps.splice(index, 1);
            powerUpMode = true;
            powerUpMultiplier = 2;
            player.color = "White";
            info.textContent="Power-up active!";
            setTimeout(() => {
                info.textContent="";
            }, 1000);
            console.log("powerup activated");
            setTimeout(() => {
                powerUpMultiplier = 1;
                player.color="Red";
                powerUpMode = false;
                info.textContent="Power-up depleted!";
                setTimeout(() => {
                    info.textContent="";
                }, 1000);
                console.log("powerup over");
            }, 5000);
        }
    }); 
    //Calls in on each individual enemy, for instance when the enemy reaches its destination, you get to suffer the consequences!
    enemies.forEach((enemy, index) => {
        enemy.update();
        enemy.velocity={x: 2+(radicalDifficultyIndex/1.5), y: Math.sin(swerve)*(radicalDifficultyIndex/(1.25+radicalDifficultyIndex/2))}
        if (enemy.x <= 0) {
            setTimeout(() => {
                enemies.splice(index, 1);
                lives--;
                score -= 20*(1+radicalDifficultyIndex/4);
                scoreboard.textContent="Score: "+score;
                life.textContent="Lives: "+lives;
            }, 0);
        }
        //Nested on the enemy.forEach function, this part manages the distances between bullets and enemies and whatever bullet hits an enemy, the enemy will suffer its consequences!
        playerBullets.forEach((projectile, bulletindex) => {
            const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            if (distance - projectile.size - enemy.size/1.5 < 1) {
                playerBullets.splice(bulletindex, 1);
                enemy.size -= projectile.damage;
                enemy.health -= projectile.damage;
                score += 3*powerUpMultiplier;
                scoreboard.textContent="Score: "+score;
            }
            //Randomizes the velocity and appends a power-up object with a probability of 1:10 upon death of an enemy.
            if (enemy.health <= 0) {
                setTimeout(() => {
                    let randomX = Math.random()*4-2;
                    let randomY = Math.random()*6-3;
                    let probability = parseInt(Math.random()*10);
                    enemies.splice(index, 1);
                    if (probability == 5) {
                        powerUps.push(new PowerUp(enemy.x, enemy.y, "blue", 40, {x:randomX, y:-randomY}));
                    }
                }, 0);
            }
        });
    });
    //This stops the entire game, disables the pacer function altogether, prevents other functions from working and opens up a menu to restart and for you to look at how you have performed! Share with your friends and brag about it!!
    if (lives <= 0) {
        life.textContent="Lives: 0";
        gameOn=false;
        gameOver=true;
        cancelAnimationFrame(animationId);
        document.querySelector("#scoreCount").textContent="You obtained "+score+" points!";
        document.querySelector("#timeCount").textContent="You lasted "+seconds+" seconds!";
        gameOverMenu.style.visibility="visible";
    }
}
//This initializes all the functions upon the press of the spacebar, and the two other conditions are to prevent you from doing it twice which could make the game go haywire.
//It even Helps you with how the controls work.
window.addEventListener("keydown", event => {
    if (event.key == " " && !gameOn && !gameOver) {
        gameOn=true;
        spawnEnemies();
        mouseMove();
        difficultyIncrease();
        timer();
        life.textContent="Lives: "+lives;
        scoreboard.textContent="Score: 0";
        info.textContent="Move around with your cursor";
        setTimeout(() => {
            info.textContent="Press the left mouse button to shoot projectiles!";
        }, 2000);
        setTimeout(() => {
            info.textContent="Good luck, Cadet!";
        }, 4500);
        setTimeout(() => {
            info.textContent="";
        }, 6000);
    }
});
//This should always be on
pacer();
//This will make sure you can play the game again without pressing F5 in your browser
function restartGame() {
    location.reload();
    gameOverMenu.style.visibility="hidden";
}