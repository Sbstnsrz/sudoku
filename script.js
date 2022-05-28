var scr = document.getElementById("draw");
var draw = scr.getContext("2d");

draw.clearRect(0, 0, scr.width, scr.height);
draw.beginPath();
draw.lineCap = "round";
draw.strokeStyle = "black";

for(var i=0;i<10;i++){
    draw.beginPath();
    if(i%3){
        draw.lineWidth = 1;
    }else{
        draw.lineWidth = 3;
    }
    draw.moveTo(1+i*40,1);
    draw.lineTo(1+i*40,361);
    draw.stroke();
}

for(var i=0;i<10;i++){
    draw.beginPath();
    if(i%3){
        draw.lineWidth = 1;
    }else{
        draw.lineWidth = 3;
    }
    draw.moveTo(1, 1+i*40);
    draw.lineTo(361, 1+i*40);
    draw.stroke();
}
