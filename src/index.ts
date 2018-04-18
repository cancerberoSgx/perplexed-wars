import { Game } from './model/Game';
import { Board } from './model/Board';


export function start() {

  const game = new Game();
  const board = new Board();
  
  
  console.log('hello');

  debugger;
  
  const p = document.createElement('p');
  p.innerHTML = 'hello world';
  document.body.appendChild(p);
}
