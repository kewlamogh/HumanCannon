// ok thx to @Blindman on stackoverflow for the drawimagelookat func

let cannon = document.createElement('img');
let mouse = {x: undefined, y: undefined}
let ctx = document.getElementById('canv').getContext('2d');
cannon.src = 'cannon.jpg';

document.onmousemove = function (event) {mouse.x = event.clientX; mouse.y = event.clientY;};

function drawImageLookat(img, x, y, lookx, looky){
    ctx.setTransform(1, 0, 0, 1, x, y);  // set scale and origin
    ctx.rotate(Math.atan2(looky - y, lookx - x)); // set angle
    ctx.drawImage(img,-img.width / 2, -img.height / 2); // draw image
    ctx.setTransform(1, 0, 0, 1, 0, 0); // restore default not needed if you use setTransform for other rendering operations 
}

function render() {
    ctx.clearRect(0, 0, 1500, 1500)
    drawImageLookat(cannon, 0, 450, mouse.x, mouse.y);
}
function main() {
    render();
    requestAnimationFrame(main);
}
main();