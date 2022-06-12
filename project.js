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
        this.velocity = velocity;
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
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}
class Player {
    constructor(x, y, color, size, velocity, alpha) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.size = size,
        this.velocity = velocity,
        this.alpha = 1;
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
        c.closePath();
        c.fill();
        c.stroke();
    }
    update(){
        this.draw();
    }
    // shoot(){
    //     playerBullets.push(new playerBullet(this.x,this.y+this.size,"blue",9,10));
    //     console.log("shoot");
    // }
}

// ------------------------------------------------------------------------
// --------------------------CORE_MECHANICS--------------------------------
// ------------------------------------------------------------------------
const playerBullets = [];
const enemies = [];
var playerBulletVelocity = 5

const player = new Player(cX,cY,"#f00",20,10);
player.draw();
window.addEventListener("mousemove", function (event) {
    const distance = Math.hypot(Math.abs(event.clientX - player.x), Math.abs(event.clientY - player.y));
    const angle = Math.atan2(event.clientY - player.y, event.clientX - player.x);
    if (distance!=0) {
        player.y += player.velocity*Math.sin(angle)*(0.033*distance);
        player.x += player.velocity*Math.cos(angle)*(0.033*distance);
    }
}, true); 
setInterval(() => {
    (playerBullets.push(player.x, player.y, "blue", 8, playerBulletVelocity));
    // console.log(playerBullets);
}, 1000);



let animationId;
function pacer() {
    animationId = requestAnimationFrame(pacer);
    c.clearRect(0,0,innerWidth,innerWidth);
    player.update();
    // playerBullet.update();
}


pacer()
