// ok thx to @Blindman on stackoverflow for the drawimagelookat func

let isFiring = false;
let b = {x: 0, y:0};
let bdir = 0;
let bigSpashX = 0;
let dir = 0;
let humanToDraw = 'human.jpg';
let bigSplashing = false;
let cannon = document.createElement('img');
let mouse = {x: undefined, y: undefined};
let canvas = document.getElementById('canv');
let ctx = document.getElementById('canv').getContext('2d');
let humans = ['human (2).jpg', 'human.jpg', 'human3.jpg']
cannon.src = 'cannon.jpg';

canvas.onmousemove = function (event) {mouse.x = event.clientX; mouse.y = event.clientY;};
canvas.onclick = async function (event){
    //b is actual pos
    //prgs is x & y vars
    //k
    humanToDraw = humans[Math.floor(Math.random()*humans.length)];
    let orig = b.x;
    if (!isFiring && Math.round(dir) == 0 && dir) {
        isFiring = true;
        b = {x: 50, y: 430};
        bdir = dir;
        b.x = b.x + Math.sin(bdir) * 50;
        b.y = b.y - Math.cos(bdir) * 50; 
        let prgs = {x: Math.sin(bdir) * 22, y:Math.cos(bdir) * 22}
        for (var i = 0; i <= 150; i++) {
            b.x -= prgs.x; 
            if (b.x < orig) {
                isFiring = false; 
                bigSplashing = false;
                console.log('hmm');
                return;
            }
            b.y -= prgs.y;
            prgs.y -= 1;
            await new Promise(resolve => setTimeout(resolve, 10))
            if (b.y > 500) { //too low
                bigSplashing = true;
                bigSpashX = b.x;
                await new Promise(resolve => setTimeout(resolve, 300));
                bigSplashing = false;
                isFiring = false;
                return;
            }
        }
        isFiring = false;
        
    }
}

function drawImageLookat(img, x, y, lookx, looky){
    ctx.setTransform(1, 0, 0, 1, x, y);  // set scale and origin
    
    dir = Math.atan2(looky - y, lookx - x);

    ctx.rotate(dir); // set angle
    ctx.drawImage(img,-img.width / 2, -img.height / 2); // draw image
    ctx.setTransform(1, 0, 0, 1, 0, 0); // restore default not needed if you use setTransform for other rendering operations 
}

function render() {
    ctx.clearRect(0, 0, 1500, 1500);
    drawImageLookat(cannon, 50, 430, mouse.x, mouse.y);
    
    if (isFiring) {
        let my=document.createElement('img');
        my.src = humanToDraw;
        ctx.drawImage(my, b.x, b.y);
    }
    
    if (bigSplashing) {
        let spatch = document.createElement('img');
        spatch.src = 'spatch.jpg';
        ctx.drawImage(spatch, bigSpashX, 370);
    }
}
async function main() {
    render();
    requestAnimationFrame(main);
}
main();