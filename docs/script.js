// ok thx to @Blindman on stackoverflow for the drawimagelookat func

let isFiring = false;
let b = {x: 0, y:0};
let cannon = document.createElement('img');
let mouse = {x: undefined, y: undefined}
let ctx = document.getElementById('canv').getContext('2d');
cannon.src = 'cannon.jpg';

document.onmousemove = function (event) {mouse.x = event.clientX; mouse.y = event.clientY;};

document.onclick = async function (event){
    b = {x: 50, y: 125};
    for (var i = 0; i <= 60; i++) {
        b.y -= 5;
        await new Promise(resolve => setTimeout(resolve, 1))
    }
}

function drawImageLookat(img, x, y, lookx, looky){
    ctx.setTransform(1, 0, 0, 1, x, y);  // set scale and origin
    ctx.rotate(Math.atan2(looky - y, lookx - x)); // set angle
    ctx.drawImage(img,-img.width / 2, -img.height / 2); // draw image
    ctx.setTransform(1, 0, 0, 1, 0, 0); // restore default not needed if you use setTransform for other rendering operations 
    let my=document.createElement('img');
    my.src = 'human (2).jpg';
    ctx.drawImage(my, b.x, b.y)
}

function render() {
    ctx.clearRect(0, 0, 1500, 1500);
    drawImageLookat(cannon, 50, 430, mouse.x, mouse.y);
}
async function main() {
    render();
    requestAnimationFrame(main);
}
main();