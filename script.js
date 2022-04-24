let particles = []
let img
function preload(){
    img = loadImage('./img/logo.png')
}

function setup() {
    createCanvas(400, 400)
    placeParticles()
}

function draw() {
    background(20)

    for(let i = 0; i < particles.length; i++){
        particles[i].update()
        particles[i].draw()
    }

    image(img, width/2 - img.width/2, height/2 - img.height, img.width, img.height)
}

function placeParticles(){

}


class Particle {
    constructor(x, y, c) {
        this.x = x
        this.y = y

        this.c = c

        this.homeX = x
        this.homeY = y
    }

    update() {
        // mouse
        let mouseD = dist(this.x, this.y, mouseX, mouseY)
        let mouseA = atan2(this.y - mouseY, this.x - mouseX)

        // home
        let homeD = dist(this.x, this.y, this.homeX, this.homeY)
        let homeA = atan2(this.homeY - this.y, this.homeX - this.x)

        // forces
        let mouseF = constrain(map(mouseD, 0, 100, 10, 0), 0, 10)
        let homeF = map(homeD, 0, 100, 0, 10)

        let vx = cos(mouseA) * mouseF
        vx += cos(homeA) * homeF

        let vy = sin(mouseA) * mouseF
        vy += sin(homeA) * homeF

        this.x += vx
        this.y += vy
    }

    draw() {
        fill(0, 40);
        stroke(0, 40);
        ellipse(this.homeX, this.homeY, 5, 5);
        line(this.x, this.y, this.homeX, this.homeY);
        noStroke();
        fill(this.c)
        ellipse(this.x, this.y, 5, 5)
    }
}




