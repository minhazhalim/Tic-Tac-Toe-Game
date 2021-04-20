const humanPlayer = 'O';
const artificialIntelligencePlayer = 'X';
const winnerCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]];
const cell = document.querySelectorAll('.cell');
const button = document.querySelector('button');
let originBoard;
button.addEventListener('click',startGame);
function startGame(){
     document.querySelector('.endgame').style.display = 'none';
     originBoard = Array.from(Array(9).keys());
     for(var i=0;i<cell.length;i++){
          cell[i].innerText = '';
          cell[i].style.removeProperty('background-color');
          cell[i].addEventListener('click',turnClick,false);
     }
}
startGame();
function turnClick(square){
     if(typeof originBoard[square.target.id] == 'number'){
          turn(square.target.id,humanPlayer);
          if(!checkWinner(originBoard,humanPlayer) && !checkTie()){
               turn(bestSpot(),artificialIntelligencePlayer);
          }
     }
}
function turn(squareId,player){
     originBoard[squareId] = player;
     document.getElementById(squareId).innerText = player;
     let gameWon = checkWinner(originBoard,player);
     if(gameWon){
          gameOver(gameWon);
     }
}
function checkWinner(board,player){
     let plays = board.reduce((a,e,i) => (e === player) ? a.concat(i) : a,[]);
     let gameWon = null;
     for(let [index,winner] of winnerCombos.entries()){
          if(winner.every(element => plays.indexOf(element)>-1)){
               gameWon = {index: index,player: player};
               break;
          }
     }
     return gameWon;
}
function gameOver(gameWon){
     for(let index of winnerCombos[gameWon.index]){
          document.getElementById(index).style.backgroundColor = gameWon.player == humanPlayer ? "blue" : "red";
     }
     for(var i=0;i<cell.length;i++){
          cell[i].removeEventListener('click',turnClick,false);
     }
     declareWinner(gameWon.player == humanPlayer ? "You Win😀😀" : "You Lose😱😱");
}
function declareWinner(who){
     document.querySelector('.endgame').style.display = 'block';
     document.querySelector('.text').innerText = who;
}
function emptySquares(){
     return originBoard.filter(s => typeof s == 'number');
}
function bestSpot(){
     return minimax(originBoard,artificialIntelligencePlayer).index;
}
function checkTie(){
     if(emptySquares().length == 0){
          for(var i=0;i<cell.length;i++){
               cell[i].style.backgroundColor = 'green';
               cell[i].removeEventListener('click',turnClick,false);
          }
          declareWinner("Tie Game😌😌");
          return true;
     }
     return false;
}
function minimax(newBoard,player){
     var availableSpots = emptySquares();
     if(checkWinner(newBoard,humanPlayer)){
          return {score: -10};
     }else if(checkWinner(newBoard,artificialIntelligencePlayer)){
          return {score: 10};
     }else if(availableSpots.length === 0){
          return {score: 0};
     }
     var moves = [];
     for(var i=0;i<availableSpots.length;i++){
          var move = {};
          move.index = newBoard[availableSpots[i]];
          newBoard[availableSpots[i]] = player;
          if(player == artificialIntelligencePlayer){
               var result = minimax(newBoard,humanPlayer);
               move.score = result.score;
          }else{
               var result = minimax(newBoard,artificialIntelligencePlayer);
               move.score = result.score;
          }
          newBoard[availableSpots[i]] = move.index;
          moves.push(move);
     }
     var bestMove;
     if(player === artificialIntelligencePlayer){
          var bestScore = -10000;
          for(var i=0;i<moves.length;i++){
               if(moves[i].score>bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
               }
          }
     }else{
          var bestScore = 10000;
          for(var i=0;i<moves.length;i++){
               if(moves[i].score<bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
               }
          }
     }
     return moves[bestMove];
}