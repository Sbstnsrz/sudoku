var scr = document.getElementById("draw");
var draw = scr.getContext("2d");
var xUnit = scr.width/100;
var y = scr.height;

draw.fillStyle = "WhiteSmoke";
draw.fillRect(0,0,100*xUnit,100*xUnit);

//draw.clearRect(0, 0, xUnit*100, y);
//draw.beginPath();
draw.lineCap = "round";
draw.strokeStyle = "black";

draw.fillStyle = "LightGrey";
draw.fillRect((1)*xUnit, (1)*xUnit, 98/3*xUnit, 98/3*xUnit);
draw.fillRect((1)*xUnit, (1+98/3*2)*xUnit, 98/3*xUnit, 98/3*xUnit);
draw.fillRect((1+98/3)*xUnit, (1+98/3)*xUnit, 98/3*xUnit, 98/3*xUnit);
draw.fillRect((1+98/3*2)*xUnit, (1)*xUnit, 98/3*xUnit, 98/3*xUnit);
draw.fillRect((1+98/3*2)*xUnit, (1+98/3*2)*xUnit, 98/3*xUnit, 98/3*xUnit);

//draw gameboard lines:
var start = true;
do{
    for(var i=0;i<10;i++){
        draw.beginPath();
        if(i%3){
            draw.globalAlpha = 0.5;
            draw.lineWidth = 0.5*xUnit;
        }else{
            draw.globalAlpha = 1.0;
            draw.lineWidth = 1.25*xUnit;
        }

        var lineIndex = (1 + i*(98/9))*xUnit;
        if(start){
            draw.moveTo(lineIndex,    xUnit);
            draw.lineTo(lineIndex, 99*xUnit);
        }else{
            draw.moveTo(   xUnit, lineIndex);
            draw.lineTo(99*xUnit, lineIndex);
        }
        draw.stroke();
    }
    start = !start;
}while(!start);


draw.fillStyle = "black";
draw.lineWidth = 0.5*xUnit;
draw.font = "4em Arial";
for (var y = 0; y < 9; y++){
    for(var i = 0; i < 9; i++){
        draw.fillText(i+1, (4.5 + i*(98/9))*xUnit, ((98/9)*(y+1)-1)*xUnit);
    }
}


