let isFiring = false;
let b = {x: 0, y:0, dir:0}; //bullet - dir attr has nothing to do with graphics just essential to the physics engine
let dir = 0; //direction canon has point toward to point to mouse
let humanToDraw = 'human.jpg'; //human to draw - gets randomly shuffled from humans
let bigSplash ={splashing: false, splashX: 0}
let cannon = genImg('imgs/other','cannon.jpg'); //the cannon's HTMLImgElement
let mouse; //mouse pos
let canvas = document.getElementById('canv'); //canvas
let ctx = canvas.getContext('2d'); //context
let humansThrown = 0;
let cannonPos = {x: 50, y: 430};
let humans = ["human.jpg", "human2.jpg"]//humans

document.onload = function (event) {
    mouse = {x: event.clientX, y: event.clientX};
}

canvas.onmousemove = function (event) {mouse.x = event.clientX; mouse.y = event.clientY;}; //setting variable mouse to mouse coords so that I can access mouse coordinates at will (and not have to do everyhing that relates to mouse coords in an event)
canvas.onclick = fireHumanJpg(mouse);

async function fireHumanJpg(event){
    if (!isFiring && event.x < 400 && dir > -0.750215999198772) {
        humanToDraw = humans[Math.floor(Math.random()*humans.length)]; //shuffling humans
        b = {x: 50, y: 430, dir: dir}; 
        isFiring = true;
        moveProjectileSteps(50, -20, 70);
        let vel = {x: Math.sin(b.dir) * 22, y:Math.cos(b.dir) * 22} //progress/translation/velocity I'm calling it vel 
        while (!b.y > 500) { //loop
            b.x -= vel.x; 
            b.y -= vel.y;
            vel.y -= 1;
            await new Promise(resolve => setTimeout(resolve, 10)) //slowing down the loop to scratch-like speed - this script was originally in scratchlang
            if (b.y > 500) { //has "hit the ocean" - inverted y, inverted sign
                humansThrown++;
                bigSplash.splashing = true;
                bigSplash.splashX = b.x;
                await new Promise(resolve => setTimeout(resolve, 300));
                bigSplash.splashing = false;
                isFiring = false;
                return;
            }
        }
        isFiring = false;      
    }
}

try {
    for (var i in ['0', '1', '2']) {
        console.log(i);
    } 
} catch {
    console.log("Nope list iterating simply doesn't work in JS *tear tear*")
}

function moveProjectileSteps(steps, offsetX = 0, offsetY = 0) {
    b.x = b.x + Math.sin(dir) * 50; //thx to scratch dictionary for providing an alternative to "Move () steps" in Scratch (which I translated to JS)
    b.y = b.y - Math.cos(dir) * 50; //same as prev comment
    b.y += offsetY;
    b.x += offsetX;
}

function drawImageLookat(img, x, y, lookx, looky){ //thanks to someone on StackOverflow for this script
    ctx.setTransform(1, 0, 0, 1, x, y);  // set scale and origin
    if (!isFiring) {
        dir = Math.atan2(looky - y, lookx - x);
    }
    ctx.rotate(dir); // set angle
    ctx.drawImage(img,-img.width / 2, -img.height / 2); // draw image
    ctx.setTransform(1, 0, 0, 1, 0, 0); // restore default not needed if you use setTransform for other rendering operations 
}

function genImg(directory = '', fileName) { //generates an image without generating unnecessary vars for ever HTMLImgElement
    let myImg = document.createElement('img');
    myImg.src = directory+'/'+fileName;
    return myImg;
}

function updateHTMLHumansThrownElem(nextValue) {
    document.getElementById('humans-thrown').innerText = ' '+nextValue.toString();
}

function render() {
    ctx.clearRect(0, 0, 1500, 1500);
    if (isFiring) {
        let my= genImg('imgs/humans', humanToDraw);
        ctx.drawImage(my, b.x, b.y);
    }
    if (bigSplash.splashing) {
        let spatch = genImg('imgs/other', 'splash-from-water.jpg');
        ctx.drawImage(spatch, bigSplash.splashX, 370);
    }
    drawImageLookat(cannon, cannonPos.x, cannonPos.y, mouse.x, mouse.y);
}

async function main() {
    render();
    updateHTMLHumansThrownElem(humansThrown);
    requestAnimationFrame(main);
}

main();
// lol these 103 lns of code must be the most annoying codes I've had to make >:(
// but im ok :(