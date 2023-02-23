let board = [
    [2, 2, 2, 2],
    [0, 2, 2, 2],
    [4, 4, 8, 8],
    [4, 4, 8, 8]
  ]

  //let boardAfterAddingZeros = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]
  var indexRow;
  var indexCol;
  var positions = [];
  

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
    }
    else if( name === "ArrowRight"){
        swipeRight();
    }
    else if (name === "ArrowUp"){
        swipeUp();
    }
    else if(name === "ArrowDown"){
        swipeDown();
    }
} )
  //addInitialNumber();
 
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

  function addInitialNumber(){
    for(var r = 0; r < 4; r++){
        indexRow = parseInt(Math.random() * 4)
        for(var c = 0; c < 4; c++){
            indexCol = parseInt(Math.random() * 4)   
        }
        if(positions.length < 2){                   // randomly assigning 2's or 4's at any two positions
            board[indexRow][indexCol] = (Math.random() < 0.5) ? 2 : 4; 
            positions.push({r : indexRow, c : indexCol});
        }
     }
     console.log(positions)
  }

// swipe left [2,0,0,2] => [2,2]
//1. clear all zeroes [2,2,2]
//2. 0-0, 0-1 gets added to 4 if same numbers, then 4 compared with 2, 
            //  i. if not same [4,0,2]
          
//i. 3. removes zeroes [4,2]
//4. add zeroes at the end [4,2,0,0] 
  // ii. if same, repeat 2 [4,4] (same)
 
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

// function add03Numbers(){
//     console.log(board)
//     for(var r = 0; r < board.length; r++){
//         for(var c = 0; c < board[r].length; c++){
//         if((board[r][0] && board[r][3] !== null) && (board[r][1] === 0) && (board[r][2] === 0)){
          
//            if(board[r][0] === board[r][3]){             // adding similar numbers
//             board[r][0] = board[r][0] + board[r][3]
//             board[r][3] = 0
//            }
//         }
//         }
//     }
// }

// function add02Numbers(){
//     console.log(board)
//     for(var r = 0; r < board.length; r++){
//         for(var c = 0; c < board[r].length; c++){
//         if((board[r][0] && board[r][2] !== null) && (board[r][1] === 0)){
          
//            if(board[r][0] === board[r][2]){             // adding similar numbers
//             board[r][0] = board[r][0] + board[r][2]
//             board[r][2] = 0
//            }
//         }
//         }
//     }
// }

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
    console.log(board)
}

function addTrailingZeroesForRight(){
    for(var r = 0; r < 4; r++){
        for(var c = 0; c < 4; c++){
            if(board[r].length <= c){
                board[r].unshift(0);
            } 
        }
    }
    console.log(board)
}

// UP:
// [2, 0, 2, 0] -> [4,0]              [4,16] [4,8,0,0]
// [2, 0, 2, 0] -> [0,0]              [8,0]
// [4, 8, 4, 0] -> [8,16]              [0,0]
// [4, 8, 4, 0] -> [0,0,]              [0,0]

// 1. if num > 0, compare == r1 with r2, r1 = sum, r2 = 0
// 2. r1 = r2 ; r2 = r3
// 3. clear all zeroes
// 4. add zeros 

function transposeColsInRows(){
    for(var r = 0 ; r < 4; r++){
        for(var c = r ; c < 4; c++){
            var initial = board[r][c];
            board[r][c] = board[c][r];
            board[c][r] = initial
        }
    }
    console.log(board)
}

function finalTranspose(){
    for(var r = 0 ; r < 4; r++){
        for(var c = r ; c < 4; c++){
            var initial = board[r][c];
            board[r][c] = board[c][r];
            board[c][r] = initial
        }
    }
    console.log(board)
}

// function add01ColNumbers(){
//     for(var r = 0; r < 4; r++){
//         for (var c = 0; c < 4; c++){
//             if(board[0][c] && board[0][c] !== null){
//                 if(board[0][c] === board[1][c]){
//                     board[0][c] = board[0][c] + board[1][c]
//                     board[1][c] = 0
//                 }
//             }
            
//         }
//     }
// }

// function add12ColNumbers(){
//     for(var r = 0; r < 4; r++){
//         for (var c = 0; c < 4; c++){
//             if(board[1][c] && board[2][c] !== null){
//                 if(board[1][c] === board[2][c]){
//                     board[1][c] = board[1][c] + board[2][c]
//                     board[2][c] = 0
//                 }
//             }
            
//         }
//     }
//     console.log(board);
// }

// function add23ColNumbers(){
//     for(var r = 0; r < 4; r++){
//         for (var c = 0; c < 4; c++){
//             if(board[2][c] && board[3][c] !== null){
//                 if(board[2][c] === board[3][c]){
//                     board[2][c] = board[2][c] + board[3][c]
//                     board[3][c] = 0
//                 }
//             }  
//         }
//     }
//     console.log(board)
// }

function addSimilarNumbersForUp(){
    transposeColsInRows();
    clearAllZeroes();
    add01Numbers();
    add12Numbers();
    add23Numbers();
    clearAllZeroes();
}

//let boardCopy = JSON.parse(JSON.stringify(board));

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