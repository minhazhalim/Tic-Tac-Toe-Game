import Store from './store.js';
import View from './view.js';
const players = [
     {
          id: 1,
          name: 'player1',
          iconClass: 'fa-x',
          colorClass: 'turquoise',
     },
     {
          id: 2,
          name: 'player2',
          iconClass: 'fa-o',
          colorClass: 'yellow',
     }
];
function init(){
     const store = new Store('game-state-key',players);
     const view = new View();
     store.addEventListener('statechange',() => {
          view.render(store.game,store.stats);
     });
     window.addEventListener('storage',() => {
          view.render(store.game,store.stats);
     });
     view.render(store.game,store.stats);
     view.bindGameResetEvent((event) => {
          store.reset();
     });
     view.bindNewRoundEvent((event) => {
          store.newRound();
     });
     view.bindPlayerMoveEvent((square) => {
          const existingMove = store.game.moves.find((move) => move.squareId === +square.id);
          if(existingMove) return;
          store.playerMove(+square.id);
     });
}
window.addEventListener('load',init);