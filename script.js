var scr = document.getElementById("draw");
var draw = scr.getContext("2d");
var xUnit = scr.width/100;
var y = scr.height;

draw.fillStyle = "WhiteSmoke";
draw.fillRect(0,0,100*xUnit,100*xUnit);

draw.lineCap = "round";
draw.strokeStyle = "black";


//Grey backgrounds:
draw.fillStyle = "LightGrey";
draw.fillRect(           xUnit,            xUnit, 98/3*xUnit, 98/3*xUnit);
draw.fillRect(           xUnit, (1+98/3*2)*xUnit, 98/3*xUnit, 98/3*xUnit);
draw.fillRect(  (1+98/3)*xUnit,   (1+98/3)*xUnit, 98/3*xUnit, 98/3*xUnit);
draw.fillRect((1+98/3*2)*xUnit,            xUnit, 98/3*xUnit, 98/3*xUnit);
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


function numbersGenerator(){
    
    var matrix = [];

    for(var j=0; j<9; j++){
        var randomLine = [];
        var numbersLine = [];

        for(var num=1; num<10; num++){ numbersLine.push(num);}
        while(numbersLine.length){
           
            if(j>0){
                var noList = [];
                for(var i=0; i<numbersLine.length; i++){
                    noList.push(numbersLine[i]);
                }

                for(var col=0; col<j; col++){
                    var row = randomLine.length;
                    if(noList.includes(matrix[col][row])){
                        noList.splice(noList.indexOf(matrix[col][row]), 1);
                    }
                }
                console.log(noList);

                var randomPic=0;
                if(noList.length>0){
                    randomPic = Math.floor(Math.random()*noList.length);
                }
                randomLine.push(noList[randomPic]);
                numbersLine.splice(numbersLine.indexOf(noList[randomPic]), 1);
            }else{
                var randomPic = Math.floor(Math.random()*numbersLine.length);
                randomLine.push(numbersLine[randomPic]);
                numbersLine.splice(randomPic,1);
            }

        }
        matrix.push(randomLine);
        
    }

    return matrix;
}
( ()=>{
    var matrix = numbersGenerator();
    draw.fillStyle = "black";
    draw.lineWidth = 0.5*xUnit;
    draw.font = "4em Arial";
    for (var y = 0; y < 9; y++){
        for(var x = 0; x < 9; x++){
            draw.fillText(matrix[y][x], (4.5 + x*(98/9))*xUnit, ((98/9)*(y+1)-1)*xUnit);
        }
    }
    console.log(matrix);
})();

