// Clicking in the box toggles fullscreen on and off.
function setup() {
    background('rgba(0,255,0, 0.25)')
}
function mousePressed() {
    if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
        let fs = fullscreen()
        fullscreen(!fs)
    }
}
