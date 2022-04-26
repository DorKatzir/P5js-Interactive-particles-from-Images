// p5.disableFriendlyErrors = true // disables FES

let particles = []
let res = 3
let img

function preload() {
    //img = loadImage('./img/avatar.png', dror)
    img = loadImage('./img/drorK.png')
}

function setup() {
    // ellipseMode(CENTER)
    // imageMode(CENTER)
    createCanvas(img.width, img.height)
    placeParticles()
    noStroke()
    console.log(img.drawingContext.imageSmoothingQuality)
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
            // let x = (i / width) * img.width
            // let y = (j / height) * img.height
            let c = img.get(x, y)
            if (c[3] !== 0) {
                particles.push(new Particle(i, j, c))
            }
        }
    }
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
        let mouseF = constrain(map(mouseD, 0, 100, 30, 0), 0, 30)
        let homeF = map(homeD, 0, 100, 0, 30)

        let vx = cos(mouseA) * mouseF
        vx += cos(homeA) * homeF

        let vy = sin(mouseA) * mouseF
        vy += sin(homeA) * homeF

        this.x += vx
        this.y += vy
    }

    draw() {
        // fill(0, 40);
        // stroke(0, 40);
        // ellipse(this.homeX, this.homeY, 5, 5);
        // line(this.x, this.y, this.homeX, this.homeY);

        fill(this.c)
        //ellipse(this.x + (width - img.width)/2, this.y + (height - img.height)/2, res, res)
        ellipse(this.x, this.y, res, res)
    }
}

window.addEventListener('resize', () => {
    width = innerWidth
    height = innerHeight
   //console.log("window resized")
})