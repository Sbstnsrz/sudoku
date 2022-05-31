var scr = document.getElementById("draw");
var draw = scr.getContext("2d");

function doBoardBackground(){
    draw.fillStyle = "WhiteSmoke";
    draw.fillRect(0,0,490,490);
    //Grey backgrounds:
    draw.fillStyle = "Gainsboro";
    draw.fillRect(  2,  2,162,162);
    draw.fillRect(  2,326,162,162);
    draw.fillRect(166,166,162,162);
    draw.fillRect(326,  2,162,162);
    draw.fillRect(326,326,162,162);
}
//draw gameboard lines:
function doLines(){
    var start = true;

    draw.lineCap = "round";
    draw.strokeStyle = "black";

    do{
        for(var i=0;i<10;i++){
            draw.beginPath();
            if(i%3){
                draw.globalAlpha = 0.5;
                draw.lineWidth = 3;
            }else{
                draw.globalAlpha = 1.0;
                draw.lineWidth = 5;
            }

            var lineIndex = (2 + i*54);
            if(start){
                draw.moveTo(lineIndex,  2);
                draw.lineTo(lineIndex,486);
            }else{
                draw.moveTo(  2, lineIndex);
                draw.lineTo(486, lineIndex);
            }
            draw.stroke();
        }
        start = !start;
    }while(!start);
}

function numbersGenerator(){
    
    var matrix = [];
    var j=0;
    var triesCounter=0;
    //Column loop:
    while(j<9){
        var randomLine = [];
        var numbersLine = [];
        //Completes numbersLine whit 1 to 9:
        for(var num=1; num<10; num++){
            numbersLine.push(num);
        }
        //Line loop:
        while(numbersLine.length){
            //Exception for the first line:
            if(j){
                var noList = [];
                var randomPic=0;
                var jBlockRef = Math.floor(j/3)*3;
                var iBlockRef = Math.floor(randomLine.length/3)*3;

                //copies numbersLine to noList:
                for(var i=0; i<numbersLine.length; i++){
                    noList.push(numbersLine[i]);
                }
                //Find in top items, if a number of noList is finded, splices it:
                for(var col=0; col<j; col++){
                    var row = randomLine.length;
                    if(noList.includes(matrix[col][row])){
                        noList.splice(noList.indexOf(matrix[col][row]), 1);
                    }
                }

                //Find numbers in  block section, if found, splice it from noList:
                for(var col=0; (jBlockRef+col)<j; col++){  
                    for(var row=0; (iBlockRef+row)<(iBlockRef+3); row++){
                        if((iBlockRef+row)==randomLine.length && (jBlockRef+col)==j){
                            break;
                        }else if(noList.includes(matrix[jBlockRef+col][iBlockRef+row])){
                            noList.splice(noList.indexOf(matrix[jBlockRef+col][iBlockRef+row]), 1);
                        }
                    }  
                }
                //noList without items means no valid option avail. Interrupt and redo line.
                if(!noList.length){
                    break;
                }
                //All good, pass picked item from numbersLine to randomLine:
                randomPic = Math.floor(Math.random()*noList.length);
                randomLine.push(noList[randomPic]);
                numbersLine.splice(numbersLine.indexOf(noList[randomPic]), 1);
            //First line exception. No verifications needed:
            }else{
                var randomPic = Math.floor(Math.random()*numbersLine.length);
                randomLine.push(numbersLine[randomPic]);
                numbersLine.splice(randomPic,1);
            }

        }
        //If line complete, push to matrix. If not, try again:
        if(randomLine.length==9){
            matrix.push(randomLine);
            triesCounter=0;
            j++;
        }else{
            triesCounter++;
        }
        //If tries more than 9, delete previous line in matrix and continue:
        if(triesCounter>9){
            matrix.pop();
            triesCounter=0;
            j--;
        }
    }

    return matrix;
}

function boardFill(matrix){
    draw.fillStyle = "black";
    draw.lineWidth = 2;
    draw.font = "3em Arial";
    for (var y = 0; y < 9; y++){
        for(var x = 0; x < 9; x++){
            if(matrix[y][x]){
                draw.fillText(matrix[y][x], 54*x + 15, 54*y + 47);
            }
        }
    }
}

function selectionCross(x,y){
    initX = x - x%54;
    initY = y - y%54;

    if(y>484){return false;}

    draw.globalAlpha = 0.2;
    draw.fillStyle = "SkyBlue";
    draw.fillRect(initX+3, 3, 54, 484);
    draw.fillRect(3, initY+3, 484, 54);
    draw.globalAlpha = 1.0;

}

(()=>{
    var solution = numbersGenerator();
    var game = gameGenerator(solution);
    /*
    for(var j=0;j<9;j++){
        for(var i=0;i<9;i++){
            if(Math.round(Math.random())){
                game[j][i] = solution[j][i];
            }
        }
    }
    */
    console.log(game);
    console.log(doMatrix());


    doBoardBackground();
    doLines();
    boardFill(game);

    scr.addEventListener("click", function(e) {
        
        console.log(e.offsetX,e.pageX, e.offsetY, e.pageY);
        doBoardBackground();
        doLines();
        boardFill(game);
        selectionCross(e.offsetX, e.offsetY);
    });
})();

function doMatrix(){
    var matrix=[];
    for(var j=0;j<9;j++){
        var temp = [];
        for(var i=0;i<9;i++){
            temp.push(0);
        }
        matrix.push(temp);
    }
    return matrix;
}

function gameGenerator(puzzle){
    var count = 17;
    var random = doMatrix();
    while(count){
        var j = Math.floor(Math.random()*9);
        var i = Math.floor(Math.random()*9);
        if(puzzle[j][i]!=random[j][i]){
            random[j][i]=puzzle[j][i];
            count--;
        }    
    }
    return random;
}

