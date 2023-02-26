// let board = [
//     [2, 2, 2, 2],
//     [2, 2, 2, 2],
//     [4, 4, 8, 8],
//     [4, 4, 8, 8]
//   ]

let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]  

window.onload = function() {
    setGame();  
}

function setGame(){
    for(var r = 0; r < 4; r++){
        for(var c = 0; c < 4; c++){
            let tile = document.createElement("div");
            tile.id = r.toString()+"-"+c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    addInitialNumber();
    addInitialNumber();
}  

function updateTile(tile, num){   // add styling for each tile
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if(num > 0){
        tile.innerText = num;
        if(num <= 128){
            tile.classList.add("x"+num.toString());
        }
        else {
            tile.classList.add("x512");
        }
    }
}

document.addEventListener("keydown", (e) => {      
    var name = e.code;
    if(name === "ArrowLeft"){
        swipeLeft();
        addInitialNumber();
    }
    else if( name === "ArrowRight"){
        swipeRight();
        addInitialNumber();
    }
    else if (name === "ArrowUp"){
        swipeUp();
        addInitialNumber();
    }
    else if(name === "ArrowDown"){
        swipeDown();
        addInitialNumber();
    }
} )

function swipeLeft(){
    addSimilarNumbersForLeft(); 
    addTrailingZeroesForLeft();
    for(let r = 0; r < 4; r++){
        for(let c = 0; c < 4; c++){
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function swipeRight(){
    addSimilarNumbersForRight();
    addTrailingZeroesForRight();
    for(let r = 0; r < 4; r++){
        for(let c = 0; c < 4; c++){
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function setTwoOrFour(){
    return ((Math.random() < 0.5) ? 2 : 4);
}

function addInitialNumber(){
    
        var r = Math.floor(Math.random() * 4)
        var c = Math.floor(Math.random() * 4);
        if(board[r][c] === 0){
            board[r][c] = setTwoOrFour(); 
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile, num); 
        }
}
 
function clearAllZeroes(){
    for(var r = 0; r < 4; r++){
        for(var c = 0; c < 4; c++){
            if(board[r][c] === 0){                  // clearing all zeroes
                board[r].splice(c,1)
                c--
            }
        }
    }
}

function addSimilarNumbersForLeft(){
    clearAllZeroes();
    add01Numbers();
    add12Numbers();
    add23Numbers();
    clearAllZeroes();
}

function addSimilarNumbersForRight(){
    clearAllZeroes();
    add23Numbers();
    add12Numbers();
    add01Numbers();
    clearAllZeroes()
}

function add01Numbers(){
    for(var r = 0; r < board.length; r++){
        for(var c = 0; c < board[r].length; c++){
        if(board[r][0] && board[r][1] !== null ){
          
           if(board[r][0] === board[r][1]){             // adding similar numbers
            board[r][0] = board[r][0] + board[r][1]
            board[r][1] = 0
           }
        }
        }
    }
}

function add12Numbers(){
    for(var r = 0; r < board.length; r++){
        for(var c = 0; c < board[r].length; c++){
           if(board[r][1] && board[r][2] !== null ){
            
            if(board[r][1] === board[r][2]){             // adding similar numbers
                board[r][1] = board[r][1] + board[r][2]
                board[r][2] = 0
           }
        }
        }
    }
}

function add23Numbers(){
    for(var r = 0; r < board.length; r++){
        for(var c = 0; c < board[r].length; c++){
           if(board[r][2] && board[r][3] !== null ){
            
            if(board[r][2] === board[r][3]){             // adding similar numbers
                board[r][2] = board[r][2] + board[r][3]
                board[r][3] = 0
           }
        }
        }
    }
}

function addTrailingZeroesForLeft(){
    for(var r = 0; r < 4; r++){
        for(var c = 0; c < 4; c++){
            if(board[r].length <= c){
                board[r].push(0);
            } 
        }
    }
}

function addTrailingZeroesForRight(){
    for(var r = 0; r < 4; r++){
        for(var c = 0; c < 4; c++){
            if(board[r].length <= c){
                board[r].unshift(0);
            } 
        }
    }
}

function transposeColsInRows(){
    for(var r = 0 ; r < 4; r++){
        for(var c = r ; c < 4; c++){
            var initial = board[r][c];
            board[r][c] = board[c][r];
            board[c][r] = initial
        }
    }
}

function finalTranspose(){
    for(var r = 0 ; r < 4; r++){
        for(var c = r ; c < 4; c++){
            var initial = board[r][c];
            board[r][c] = board[c][r];
            board[c][r] = initial
        }
    }
}

function addSimilarNumbersForUp(){
    transposeColsInRows();
    clearAllZeroes();
    add01Numbers();
    add12Numbers();
    add23Numbers();
    clearAllZeroes();
}

function swipeUp(){
        addSimilarNumbersForUp();
        addTrailingZeroesForLeft();
        finalTranspose();

    for(let r = 0; r < 4; r++){
        for(let c = 0; c < 4; c++){
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function swipeDown(){
    addSimilarNumbersForDown();
    addTrailingZeroesForRight();
    finalTranspose();
 
    for(let r = 0; r < 4; r++){
        for(let c = 0; c < 4; c++){
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function addSimilarNumbersForDown(){
    transposeColsInRows();
    clearAllZeroes();
    add23Numbers();
    add12Numbers();
    add01Numbers();
    clearAllZeroes();
  
}