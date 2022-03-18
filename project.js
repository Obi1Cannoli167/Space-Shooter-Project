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
        // const img = document.querySelector("#player")
        // c.drawImage(img, innerWidth, innerHeight)

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
}
class playerBullet {
    constructor(x, y, color, size, velocity){
        this.x = x,
        this.y = y,
        this.color = color,
        this.size = size,
        this.velocity = velocity
    }
    draw(){
        c.fillStyle = this.color
        c.beginPath()
        c.ellipse(this.x, this.y, this.size*3, this.size, 0, 0, 2*Math.PI)
        c.fill()
        c.stroke()
    }
    update(){
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}
function move(w, a, s, d) {
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

const player = new Player(cX,cY,"#f00",50,10);
player.draw();
const bullet = new playerBullet(200, 200, "blue", 9, 5);
window.addEventListener("keypress", (event) => {
    switch (event.key) {
        case "w":move(1,0,0,0);
        break;
        case "a":move(0,1,0,0);
        break;
        case "s":move(0,0,1,0);
        break;
        case "d":move(0,0,0,1);
        break;
    }
})

// ------------------------------------------------------------------------
// --------------------------CORE_MECHANICS--------------------------------
// ------------------------------------------------------------------------


// function followCursor(event) {

// }
// document.addEventListener("mousemove", followCursor)

window.addEventListener("mousemove", function (event) {const distance = Math.hypot(Math.abs(event.clientX - player.x), Math.abs(event.clientY - player.y))
    const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x)
    if (distance!=0) {
        player.y += player.velocity*Math.sin(angle)*(0.033*distance)
        player.x += player.velocity*Math.cos(angle)*(0.033*distance)
    }
}, true); 

let fps = 1000/60
let delta = 0
let lastFrame = 0
let maxFps = 60

let animationId

function pacer() {
    c.clearRect(0,0,innerWidth,innerWidth)
    animationId = requestAnimationFrame(pacer)
    player.draw()
    bullet.draw()
}
pacer()
