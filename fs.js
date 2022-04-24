// Clicking in the box toggles fullscreen on and off.
function setup() {
    background(200)
}
function mousePressed() {
    if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
        let fs = fullscreen()
        fullscreen(!fs)
    }
}
