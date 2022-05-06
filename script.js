// p5.disableFriendlyErrors = true // disables FES

let particles = []
let res = 2
let img

function preload() {
    //img = loadImage('./img/avatar.png', dror)
    img = loadImage('./img/drorK.png')
}

function setup() {
    // ellipseMode(CENTER)
    // imageMode(CENTER)

    imageSmoothingEnabled = true
    img.drawingContext.imageSmoothingQuality = 'high'
    createCanvas(400, 400)
    console.log(img)

    placeParticles()
    noStroke()
    console.log("dror test")
}

function draw() {
    background('hsl(0,0%,5%)')

    for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw()
    }
}

function placeParticles() {

    for (let i = 0; i < img.width; i += res) {
        for (let j = 0; j < img.height; j += res) {
            let x = i
            let y = j
            let c = img.get(x, y)
            if (c[3] !== 0) {
                particles.push(new Particle(x, y, c))
            }
        }
    }
}

class Particle {
    constructor(x, y, c) {
        this.x = x + 120
        this.y = y + 120

        this.c = c

        this.homeX = x + 120
        this.homeY = y + 120
    }

    update() {
        
        // mouse
        let mouseD = dist(this.x, this.y, mouseX, mouseY)
        let mouseA = atan2(this.y - mouseY, this.x - mouseX)

        // home
        let homeD = dist(this.x, this.y, this.homeX, this.homeY)
        let homeA = atan2(this.homeY - this.y, this.homeX - this.x)

        // forces
        let mouseF = constrain(map(mouseD, 0, 80, 50, 0), 0, 50)
        let homeF = map(homeD, 0, 80, 0, 50)

        let vx = cos(mouseA) * mouseF
        vx += cos(homeA) * homeF

        let vy = sin(mouseA) * mouseF
        vy += sin(homeA) * homeF

        this.x += vx
        this.y += vy
    }

    draw() {
        fill(this.c)
        ellipse(this.x, this.y, res, res)
    }
}
