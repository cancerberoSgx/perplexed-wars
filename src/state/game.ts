import { ACTION_GAME_LOOP_INCREMENT_INTERVAL } from "../reducers/gameLoop";
import { store } from "../reducers/store";
import registerServiceWorker from '../registerServiceWorker';
import { State } from "./state";
import { EventEmitter } from "events";

export class Game extends EventEmitter {
  private intervalId: NodeJS.Timer
  private static instance
  
  private constructor(){
    super()
  }
  
  public static getInstance():Game{
    if(!this.instance){
      this.instance=new Game()
    }
    return this.instance
  }

  public start(){
   this.nextTurn()
   if(State.get().game.realTime){
     this.intervalId = setInterval(()=>{
       this.nextTurn()
     }, State.get().game.interval)
   }
    registerServiceWorker()
  }

  public stop(): any {
    clearInterval(this.intervalId)
  }

  public nextTurn(): void {
    if(State.get().game.gameFinish){
      alert('Game finish, winner is '+State.get().game.winner+ '. Bye.')
      this.stop()
      return 
    }
    if(!State.get().game.paused){
      store.dispatch({
        type: ACTION_GAME_LOOP_INCREMENT_INTERVAL
      })
    }
  }
}