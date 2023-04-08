import Store from './store.js';
export default class View {
     $ = {};
     $$ = {};
     constructor(){
          this.$.menu = this.#qs('[data-id="menu"]');
          this.$.menuButton = this.#qs('[data-id="menu-button"]');
          this.$.menuItems = this.#qs('[data-id="menu-items"]');
          this.$.resetButton = this.#qs('[data-id="reset-button"]');
          this.$.newRoundButton = this.#qs('[data-id="new-round-button"]');
          this.$.modal = this.#qs('[data-id="modal"]');
          this.$.modalText = this.#qs('[data-id="modal-text"]');
          this.$.modalButton = this.#qs('[data-id="modal-button"]');
          this.$.turn = this.#qs('[data-id="turn"]');
          this.$.p1Wins = this.#qs('[data-id="p1-wins"]');
          this.$.p2Wins = this.#qs('[data-id="p2-wins"]');
          this.$.ties = this.#qs('[data-id="ties"]');
          this.$.grid = this.#qs('[data-id="grid"]');
          this.$$.squares = this.#qsAll('[data-id="square"]');
          this.$.menuButton.addEventListener('click',(event) => {
               this.#toggleMenu();
          });
     }
     bindGameResetEvent(handler){
          this.$.resetButton.addEventListener('click',handler);
          this.$.modalButton.addEventListener('click',handler);
     }
     bindNewRoundEvent(handler){
          this.$.newRoundButton.addEventListener('click',handler);
     }
     #updateScoreboard(p1Wins,p2Wins,ties){
          this.$.p1Wins.innerText = `${p1Wins} wins`;
          this.$.p2Wins.innerText = `${p2Wins} wins`;
          this.$.ties.innerText = `${ties} wins`;
     }
     #openModal(message){
          this.$.modal.classList.remove('hidden');
          this.$.modalText.innerText = message;
     }
     #closeModal(){
          this.$.modal.classList.add('hidden');
     }
     #closeMenu(){
          this.$.menuItems.classList.add('hidden');
          this.$.menuButton.classList.remove('border');
          const icon = this.$.menuButton.querySelector('i');
          icon.classList.add('fa-chevron-down');
          icon.classList.remove('fa-chevron-up');
     }
     #toggleMenu(){
          this.$.menuItems.classList.toggle('hidden');
          this.$.menuButton.classList.toggle('border');
          const icon = this.$.menuButton.querySelector('i');
          icon.classList.toggle('fa-chevron-down');
          icon.classList.toggle('fa-chevron-up');
     }
     #handlePlayerMove(squareElement,player){
          const i = document.createElement('i');
          i.classList.add('fa-solid',player.iconClass,player.colorClass);
          squareElement.replaceChildren(i);
     }
     #setTurnIndicator(player){
          const i = document.createElement('i');
          const p = document.createElement('p');
          i.classList.add('fa-solid',player.colorClass,player.iconClass);
          p.classList.add(player.colorClass);
          p.innerText = `${player.name}, you're up!`;
          this.$.turn.replaceChildren(i,p);
     }
     #qs(selector,parent){
          const element = parent ? parent.querySelector(selector) : document.querySelector(selector);
          if(!element) throw new Error('Could Not Find Element');
          return element;
     }
     #qsAll(selector){
          const elementList = document.querySelectorAll(selector);
          if(!elementList) throw new Error('Could Not Find Elements');
          return elementList;
     }
     /**
      * @param {*}
      * @param {*}
      * @param {*}
      * @param {*}
      */
     #delegate(element,selector,eventKey,handler){
          element.addEventListener(eventKey,(event) => {
               if(event.target.matches(selector)){
                    handler(event.target);
               }
          });
     }
     bindPlayerMoveEvent(handler){
          this.#delegate(this.$.grid,'[data-id="square"]','click',handler);
     }
     #closeAll(){
          this.#closeModal();
          this.#closeMenu();
     }
     #clearMoves(){
          this.$$.squares.forEach((square) => {
               square.replaceChildren();
          });
     }
     #initializeMoves(moves){
          this.$$.squares.forEach((square) => {
               const existingMove = moves.find((move) => move.squareId === +square.id);
               if(existingMove){
                    this.#handlePlayerMove(square,existingMove.player);
               }
          });
     }
     /**
      * @see
      */
     render(game,stats){
          const {playerWithStats,ties} = stats;
          const {moves,currentPlayer,status: {isCompleted,winner},} = game;
          this.#closeAll();
          this.#clearMoves();
          this.#updateScoreboard(playerWithStats[0].wins,playerWithStats[1].wins,ties);
          this.#initializeMoves(moves);
          if(isCompleted){
               this.#openModal(winner ? `${winner.name} wins!` : 'Tie!');
               return;
          }
          this.#setTurnIndicator(currentPlayer);
     }
}