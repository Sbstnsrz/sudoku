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

function buttons(){
    var numbersLine = [];

    draw.fillStyle = "WhiteSmoke";
    draw.fillRect(2, 540, 486 ,54);
    draw.fillStyle = "black";

    for(var num=1; num<10; num++){
        numbersLine.push(num);
    }
    for(var i=0; i<8; i++){
        draw.beginPath();
        draw.lineWidth = 3;
        var lineIndex = (56 + i*54);
        draw.moveTo(lineIndex,2+54*10);
        draw.lineTo(lineIndex, 54*11);
        draw.stroke();
    }

    draw.lineWidth = 5;
    draw.beginPath();
    draw.moveTo(  2,540);
    draw.lineTo(486,540);
    draw.lineTo(486,594);
    draw.lineTo(  2,594);
    draw.lineTo(  2,540);
    draw.stroke();


    for(var x = 0; x < 9; x++){
        if(numbersLine[x]){
            draw.fillText(numbersLine[x], 54*x + 15, 54*10 + 47);
        }
    }
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

function clickSelection(prev, x,y){
    var initX = (x - x%54)/54;
    var initY = (y - y%54)/54;

    var loc = [initX, initY];

    if((initY==9) || (prev[0]==loc[0] && prev[1]==loc[1])){
        return [];
    }else if(initY==10){
        return loc;
    }else{
        console.log("Cross");
        drawCross(loc);
        return loc;
    }
}

function drawCross(loc){
    draw.globalAlpha = 0.2;
    draw.fillStyle = "SkyBlue";
    draw.fillRect(loc[0]*54+3, 3, 54, 484);
    draw.fillRect(3, loc[1]*54+3, 484, 54);
    draw.globalAlpha = 1.0;
}

(()=>{
    var solution = numbersGenerator();
    var game = gameGenerator(solution);
    var answer = doMatrix();
    
    var selection = [];

    boardReload(game, answer);

    scr.addEventListener("click", function(e) {
        
        boardReload(game, answer);

        var tempSel = clickSelection(selection, e.offsetX, e.offsetY);
        if(tempSel[1] == 10){
            if(game[selection[1]][selection[0]] == 0){
                if(answer[selection[1]][selection[0]] == tempSel[0]+1){
                    answer[selection[1]][selection[0]] = 0;
                }else{
                    answer[selection[1]][selection[0]] = tempSel[0]+1;
                }
                boardReload(game, answer);
                console.log(answer);
            }
        }

        selection=tempSel;

        console.log(selection);
    });
})();

function boardReload(game, answer){
    doBoardBackground();
    doLines();
    draw.fillStyle = "blue";
    boardFill(answer);
    draw.fillStyle = "black";
    boardFill(game);
    buttons();
}

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
    var count = 30;
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

function setNumber(select, x, y){
    
}

