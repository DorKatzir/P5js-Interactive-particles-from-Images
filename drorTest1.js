let canvas
let ctx
let flowField
let flowFieldAnimation

window.onload = () => {
    canvas = document.getElementById('canvasBox1')
    ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height)
    flowField.animate(0)
}

window.addEventListener('resize', () => {
    // console.log('resized')
    cancelAnimationFrame(flowFieldAnimation)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height)
    flowField.animate(0)
})

const mouse = {
    x: 0,
    y: 0,
}

window.addEventListener('mousemove', function (e) {
    // console.log(e)
    mouse.x = e.x
    mouse.y = e.y
})

class FlowFieldEffect {
    #ctx
    #width
    #height
    constructor(ctx, width, height) {
        this.#ctx = ctx
        this.#ctx.lineWidth = 1
        this.#ctx.lineCap = 'round'
        this.#width = width
        this.#height = height
        this.lastTime = 0
        this.interval = 1000 / 60
        this.timer = 0
        this.cellSize = 12
        this.gradient
        this.#createGradient()
        this.#ctx.strokeStyle = this.gradient
        this.radius = 0
        this.vr = 0.03
    }

    #createGradient() {
        this.gradient = this.#ctx.createLinearGradient(
            0,
            0,
            this.#width,
            this.#height
        )
        this.gradient.addColorStop('0.1', '#ff5c33')
        this.gradient.addColorStop('0.3', '#ff66b3')
        // this.gradient.addColorStop('0.5', '#ccccff')
        // this.gradient.addColorStop('0.7', '#b3ffff')
        this.gradient.addColorStop('0.8', '#80ff80')
        this.gradient.addColorStop('0.9', '#ffff33')
    }

    #drawLine(angle, x, y) {
        let positionX = x
        let positionY = y
        let dx = mouse.x - positionX
        let dy = mouse.y - positionY
        let distance = dx * dx + dy * dy
        if (distance > 600000) distance = 600000
        else if (distance < 50000) distance = 50000
        let length = distance / 9000
        this.#ctx.beginPath()
        this.#ctx.moveTo(x, y)
        this.#ctx.lineTo(
            x + Math.cos(angle) * length,
            y + Math.sin(angle) * length
        )
        this.#ctx.stroke()
    }

    animate(timeStamp) {
        const deltaTime = timeStamp - this.lastTime
        this.lastTime = timeStamp

        if (this.timer > this.interval) {
            this.#ctx.clearRect(0, 0, this.#width, this.#height)
            this.radius += this.vr
            if (this.radius > 5 || this.radius < -5) this.vr *= -1

            for (let y = 0; y < this.#height; y += this.cellSize) {
                for (let x = 0; x < this.#width; x += this.cellSize) {
                    // const angle = (Math.cos(x * .007) + Math.sin(y * .007)) * this.radius
                    const angle =
                        (Math.cos(mouse.x * x * 0.000015) +
                            Math.sin(mouse.y * y * 0.000015)) *
                        this.radius
                    this.#drawLine(angle, x, y)
                }
            }

            this.timer = 0
        } else {
            this.timer += deltaTime
        }

        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this))
    }
}
