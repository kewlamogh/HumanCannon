/** 
 * Woohoo!
 * This is my first fully-developed-in VS Code project
 * My first VS Code project
 * My 5th repo on Github
 * ~~and my worst physics ever~~
*/

let isFiring = false;
let b = {x: 0, y:0, dir:0}; //bullet - dir attr has nothing to do with graphics just essential to the physics engine
let bigSplashX = 0; //x to show splash of water - displays in render func if bigSplashing
let dir = 0; //direction canon has point toward to point to mouse
let humanToDraw = 'human.jpg'; //human to draw - gets randomly shuffled from humans
let bigSplashing = false; //has human landed and is it splashing?
let cannon = genImg('cannon.jpg'); //the cannon's HTMLImgElement
let mouse = {x: undefined, y: undefined}; //mouse pos
let canvas = document.getElementById('canv'); //canvas
let ctx = canvas.getContext('2d'); //context
let humans = ['docs/imgs/human2.jpg', 'docs/imgs/human.jpg', 'docs/imgs/human3.jpg']//humans


canvas.onmousemove = function (event) {mouse.x = event.clientX; mouse.y = event.clientY;}; /**
 * Since event.clientX cannot be accessed out of events (because like obviously its the mouse position _at_ an event), so onmousemove
 * i set the var mouse's x to event.clientX and y to event.clientY, so it's as good as being able to access clientX and clientY in top-level and/or plain old not-evt funcs
 */
canvas.onclick = async function (event){ //thanks to Orange-Pear on scratch
    if (!isFiring && event.clientY < 400) {
        humanToDraw = humans[Math.floor(Math.random()*humans.length)]; //shuffling humans
        isFiring = true; 
        b = {x: 50, y: 430, dir: undefined}; 
        b.dir = dir;
    
        b.x = (b.x + Math.sin(b.dir) * 50) + 30; //thx to scratch dictionary for providing an alternative to "Move () steps" in Scratch (which I translated to JS)
        b.y = b.y - Math.cos(b.dir) * 50; //same as prev comment


        let vel = {x: Math.sin(b.dir) * 22, y:Math.cos(b.dir) * 22} //progress/translation/velocity I'm calling it vel 
        for (var i = 0; i <= 150; i++) { //loop
            b.x -= vel.x; 
            b.y -= vel.y;
            vel.y -= 1;
            await new Promise(resolve => setTimeout(resolve, 10)) //slowing down the loop to scratch-like speed - this script was originally in scratchlang
            if (b.y > 500) { //too low
                bigSplashing = true;
                bigSplashX = b.x;
                await new Promise(resolve => setTimeout(resolve, 300));
                bigSplashing = false;
                isFiring = false;
                return;
            }
        }
        isFiring = false;
        
    }
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

function genImg(src) { //generates an image without generating unnecessary vars for ever HTMLImgElement
    let myImg = document.createElement('img');
    myImg.src = src;
    return myImg;
}

function render() {
    ctx.clearRect(0, 0, 1500, 1500);
    drawImageLookat(cannon, 50, 430, mouse.x, mouse.y);
    
    if (isFiring) {
        let my= genImg(humanToDraw);
        ctx.drawImage(my, b.x, b.y);
    }
    
    if (bigSplashing) {
        let spatch = genImg('splash-from-water.jpg');
        ctx.drawImage(spatch, bigSplashX, 370);
    }
}
async function main() {
    render();
    requestAnimationFrame(main);
}
main();
// lol these 95 lns of code must be the most annoying codes I've had to make >:(
// but im ok :(