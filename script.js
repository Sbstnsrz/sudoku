var scr = document.getElementById("draw");
var draw = scr.getContext("2d");

draw.clearRect(0, 0, scr.width, scr.height);
draw.beginPath();
draw.lineCap = "round";
draw.strokeStyle = "black";

for(var i=0;i<10;i++){
    draw.beginPath();
    if(i%3){
        draw.lineWidth = 3;
    }else{
        draw.lineWidth = 5;
    }
    draw.moveTo(2+i*80,2);
    draw.lineTo(2+i*80,722);
    draw.stroke();
}

for(var i=0;i<10;i++){
    draw.beginPath();
    if(i%3){
        draw.lineWidth = 3;
    }else{
        draw.lineWidth = 5;
    }
    draw.moveTo(2, 2+i*80);
    draw.lineTo(722, 2+i*80);
    draw.stroke();
}
