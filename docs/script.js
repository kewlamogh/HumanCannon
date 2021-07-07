// ok thx to @Blindman on stackoverflow for dis


function drawImageLookat(img, x, y, lookx, looky){
    ctx.setTransform(1, 0, 0, 1, x, y);  // set scale and origin
    ctx.rotate(Math.atan2(looky - y, lookx - x)); // set angle
    ctx.drawImage(img,-img.width / 2, -img.height / 2); // draw image
    ctx.setTransform(1, 0, 0, 1, 0, 0); // restore default not needed if you use setTransform for other rendering operations 
}
