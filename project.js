const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1080;
canvas.height = 810;
const innerWidth = canvas.width;
const innerHeight = canvas.height;
const cX = innerWidth/2;
const cY = innerHeight/2;


// ------------------------------------------------------------------------
// ---------------------------CLASSES_AND_ENTITIES-------------------------
// ------------------------------------------------------------------------
class playerBullet {
    constructor(x, y, color, size, velocity){
        this.x = x,
        this.y = y,
        this.color = color,
        this.size = size,
        this.velocity = velocity
    }
    draw(){
        c.save()
        c.fillStyle = this.color
        c.beginPath()
        c.ellipse(this.x, this.y, this.size*3, this.size, 0, 0, 2*Math.PI)
        c.fill()
        c.stroke()
        c.restore()
    }
    update(){
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}
class Player {
    constructor(x, y, color, size, velocity, alpha) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.size = size,
        this.velocity = velocity,
        this.alpha = 1
    }
    draw() {
        c.fillStyle = this.color
        c.beginPath()
        c.moveTo(this.x-this.size,this.y)
        c.lineTo(this.x-this.size*1.35,this.y+this.size*0.7)
        c.lineTo(this.x-this.size,this.y)
        c.lineTo(this.x-this.size*1.35,this.y+this.size*0.7)
        c.lineTo(this.x+this.size,this.y)
        c.lineTo(this.x-this.size*1.35,this.y-this.size*0.7)
        c.closePath()
        c.fill()
        c.stroke()  

    }
    update(){
        this.draw()
    }
    shoot(){
        playerBullets.push(new playerBullet(this.x,this.y+this.size,"blue",9,10))
        console.log("shoot");
    }
}

function ctrl(w, a, s, d, spc) {
    if (w) {
        player.y -= player.velocity
        player.update()
    } 
    if (a) {
        player.x -= player.velocity
        player.update()
    } 
    if (s) {
        player.y += player.velocity
        player.update()
    }
    if (d) {
        player.x += player.velocity
        player.update()
    }
}
const playerBullets = []
const enemies = []
var fireRate = 1000

function fire() {
    setInterval(() => {
        player.shoot()
    }, fireRate);
}
const player = new Player(cX,cY,"#f00",20,10);
player.draw();
window.addEventListener("keypress", (event) => {
    switch (event.key) {
        case "w":ctrl(1,0,0,0);
        break;
        case "a":ctrl(0,1,0,0);
        break;
        case "s":ctrl(0,0,1,0);
        break;
        case "d":ctrl(0,0,0,1);
        break;
    }
})

// ------------------------------------------------------------------------
// --------------------------CORE_MECHANICS--------------------------------
// ------------------------------------------------------------------------


// function followCursor(event) {

// }
// document.addEventListener("mousemove", followCursor)

window.addEventListener("mousemove", function (event) {    const distance = Math.hypot(Math.abs(event.clientX - player.x), Math.abs(event.clientY - player.y))
    const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x)
    if (distance!=0) {
        player.x += player.velocity*Math.cos(angle)*(0.033*distance)
        player.y += player.velocity*Math.sin(angle)*(0.033*distance)
    }
}, true); 

let animationId
function pacer() {
    c.clearRect(0,0,innerWidth,innerWidth)
    animationId = requestAnimationFrame(pacer)
    player.draw()
    playerBullets.update()
}
pacer()
fire()
