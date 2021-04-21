const gameboard = document.getElementById('gameboard');
const boxes = Array.from(document.getElementsByClassName('box'));
const restartButton = document.getElementById('restartButton');
const playText = document.getElementById('playText');
const spaces = [null,null,null,null,null,null,null,null,null,];
const o_text = 'O';
const x_text = 'X';
let currentPlayer = o_text;
const drawBoard = () => {
     boxes.forEach((box,index) => {
          let styleString = '';
          if(index<3){
               styleString += `border-bottom: 3px solid var(--primary-color);`;
          }
          if(index % 3 === 0){
               styleString += `border-right: 3px solid var(--primary-color);`;
          }
          if(index % 3 === 2){
               styleString += `border-left: 3px solid var(--primary-color);`;
          }
          if(index>5){
               styleString += `border-top: 3px solid var(--primary-color);`;
          }
          box.style = styleString;
          box.addEventListener('click',boxClicked);
     });
};
function boxClicked(event){
     const id = event.target.id;
     if(!spaces[id]){
          spaces[id] = currentPlayer;
          event.target.innerText = currentPlayer;
          if(hasPlayerWon(currentPlayer)){
               playText.innerHTML = `${currentPlayer} Wins😂😂`;
               return;
          }
          currentPlayer = currentPlayer === o_text ? x_text : o_text;
     }
}
const hasPlayerWon = (player) => {
     if(spaces[0] === player){
          if(spaces[1] === player && spaces[2] === player){
               console.log(`${player} Wins Up Top`);
               return true;
          }
          if(spaces[3] === player && spaces[6] === player){
               console.log(`${player} Wins on the Left`);
               return true;
          }
          if(spaces[4] === player && spaces[8] === player){
               console.log(`${player} Wins on the Diagonal`);
               return true;
          }
     }
     if(spaces[8] === player){
          if(spaces[2] === player && spaces[5] === player){
               console.log(`${player} Wins on the Right`);
               return true;
          }
          if(spaces[7] === player && spaces[6] === player){
               console.log(`${player} Wins on the bottom`);
               return true;
          }
     }
     if(spaces[4] === player){
          if(spaces[3] === player && spaces[5] === player){
               console.log(`${player} Wins on the Middle Horizontal`);
               return true;
          }
          if(spaces[1] === player && spaces[7] === player){
               console.log(`${player} Wins on the Middle Vertical`);
               return true;
          }
     }
};
restartButton.addEventListener('click',() => {
     spaces.forEach((space,index) => {
          spaces[index] = null;
     });
     boxes.forEach((box) => {
          box.innerText = '';
     });
     playText.innerHTML = 'Lets Play🙂🙂';
     currentPlayer = o_text;
});
drawBoard();