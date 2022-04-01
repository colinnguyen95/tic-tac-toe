let origBoard;
const humanPlayer = 'X';
const aiPlayer = 'O';
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const squares = document.querySelectorAll('.square');
startGame();

// squares.forEach(square => {
//     square.addEventListener('click', () => square.textContent = 'X');
// })

function startGame(){
    document.querySelector('.endgame').getElementsByClassName.display = 'none';
    origBoard = Array.from(Array(9).keys());
    console.log(origBoard);
    for(var i = 0; i < squares.length; i++) {
        squares[i].textContent = '';
        squares[i].style.removeProperty('background-color');
        squares[i].addEventListener('click', turnClick, false);
    }
}

function turnClick(square) {
    console.log(square.target.id);
    turn(square.target.id, humanPlayer);
}

function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).textContent = player;
    let gameWon = checkWin(origBoard, player);
    if(gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
    //find every index the player played in
    let plays = board.reduce((a,e,i) => { // a is accumulator, e is each element in board array, i is index
        return e === player ? a.concat(i) : a;
    }, []);

    let gameWon = null;

    for(let [index, win] of winCombos.entries()) {
        // the every method checks whether all elements in array pass the test implemented in the function
        //has the player played in everyspot that counts as a win for that win
        if(win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index, player};
            break;
        }
    }
    return gameWon;
}

function gameOver(gameWon) {
    for(let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = 
            gameWon.player === humanPlayer ? 'blue' : 'red';
    }
    for(let i = 0; i < squares.length; i++){
        squares[i].removeEventListener('click', turnClick, false);
    }
}