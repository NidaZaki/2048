let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ] 
  
let score = 0;
let bestScore = 0;
let boardCopy;
let boardFinalCopy;

let Stack = [];

window.onload = function() {
    setGame();  
}

function newGame(){
    Stack = [];
    score = 0;
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];
    let tiles = [];
      for(var r = 0; r < 4; r++){
        for(var c = 0; c < 4; c++){
            let tile = document.createElement("div");
            tile.id = r.toString()+"-"+c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            tiles.push(tile);
        }
    }
    document.getElementById("board").replaceChildren(...tiles); 
   
    var gameOver = document.createElement('p');
    gameOver.innerText = "Game Over!"
    gameOver.setAttribute('id', 'game-over');
    document.getElementById("board").append(gameOver);

    var tryAgain = document.createElement('button');
    tryAgain.innerText = "Try Again"
    tryAgain.setAttribute('id', 'try-again');
    tryAgain.onclick = function (){
        newGame();
    }
    document.getElementById("board").append(tryAgain);

    addInitialNumber();
    addInitialNumber();
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
        if(num <= 4096){
            tile.classList.add("x"+num.toString());
        }
        else {
            tile.classList.add("x8192");
        }
    }
}

let lastStateBoard;
function storePreviousTiles(){
    if(Stack.length > 0){
        lastStateBoard = Stack.pop()
        boardCopy = lastStateBoard.configuration;
        score = lastStateBoard.score;
        boardFinalCopy = JSON.parse(JSON.stringify(boardCopy));
        for(let r = 0; r < 4; r++){
            for(let c = 0; c < 4; c++){
                let tile = document.getElementById(r.toString()+"-"+c.toString());
                let num = boardFinalCopy[r][c];
                updateTile(tile, num);
            }
        }

        let scoreElement = document.createElement('p');
        scoreElement.setAttribute('id', 'score');
        document.getElementById('score').innerHTML = score;
        board = JSON.parse(JSON.stringify(boardFinalCopy));

    }

    if(isGameOver()){
        document.getElementById("game-over").style.visibility = 'hidden';
        document.getElementById("try-again").style.visibility = 'hidden';
        for (let index = 0; index < document.getElementsByClassName("tile").length; index++) {
            document.getElementsByClassName("tile")[index].style.opacity = "1.0";
        }
    }
}

document.addEventListener("keydown", (e) => {      
    var name = e.code;
    if(name === "KeyU"){
        storePreviousTiles();
    }
    else if(name === "ArrowLeft"){
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
    
} );

function swipeLeft(){

    boardCopy = JSON.parse(JSON.stringify(board));

    let element = {
        configuration: boardCopy,
        score: score,
      }; 
   
    Stack.push(element);

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

    boardCopy = JSON.parse(JSON.stringify(board));
    
    let element = {
        configuration: boardCopy,
        score: score,
      }; 
   
    Stack.push(element);
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

function isGameOver(){

    if(score > bestScore){
        bestScore = score;
        let bestScoreElement = document.createElement('p');
        bestScoreElement.setAttribute('id', 'best-score');
        document.getElementById('best-score').innerHTML = bestScore;
    }
 

    for(var r = 0; r < 4; r++){
        for(var c = 0; c < 4;  c++){
            if(board[r][c] === 0){
                return false;
            }         
        }
    }

    for (var r = 0; r < 4 - 1; r++) {
        for (var c = 0; c < 4 - 1; c++) {
          var value = board[r][c]
          if (value !== 0 && (value == board[r + 1][c] || value == board[r][c + 1])) {
            return false;
          }
        }
    }

    return true;
  
}

function boardHasEmptyTile(){
    for(var r = 0; r < 4; r++){
        for(var c = 0; c < 4;  c++){
            if(board[r][c] === 0){
                return true;
            }         
        }
    }
    return false;
}

function addInitialNumber(){            // initially calling it twice!!

    if(isGameOver()){
        document.getElementById("game-over").style.visibility = 'visible';
        document.getElementById("try-again").style.visibility = 'visible';
        for (let index = 0; index < document.getElementsByClassName("tile").length; index++) {
            document.getElementsByClassName("tile")[index].style.opacity = "0.5";
        }
    }

    if(!boardHasEmptyTile()){
        return;
    }

    let found = false;

    while(!found){              // !found condition is evaluating to true
        var r = Math.floor(Math.random() * 4)
        var c = Math.floor(Math.random() * 4);
        if(board[r][c] == 0){
            board[r][c] = setTwoOrFour(); 
            let tile = document.getElementById(r.toString()+"-"+c.toString());
            let num = board[r][c];
            updateTile(tile, num); 
            found = true;
        }      
    }

    let scoreElement = document.createElement('p');
    scoreElement.setAttribute('id', 'score');
    document.getElementById('score').innerHTML = score;

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
            score += board[r][0]
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
                score += board[r][1]
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
                score += board[r][2]
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
    boardCopy = JSON.parse(JSON.stringify(board));
    
    let element = {
        configuration: boardCopy,
        score: score,
      }; 
   
    Stack.push(element);

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

    boardCopy = JSON.parse(JSON.stringify(board));

    let element = {
        configuration: boardCopy,
        score: score,
      }; 
   
    Stack.push(element);
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
