import { State } from "../model/state";
import { store } from "../reducers/store";
import { ACTION_GAME_LOOP_INCREMENT_INTERVAL } from "../reducers/gameLoop";

export class Game{
  private intervalId: NodeJS.Timer

  private static instance
  public static getInstance():Game{
    if(!this.instance){
      this.instance=new Game()
    }
    return this.instance
  }

  public start(){
    if(State.get().game.realTime){
      this.intervalId = setInterval(()=>{
        Game.nextTurn()
      }, State.get().game.interval)
    }
  }

  public stop(): any {
    clearInterval(this.intervalId)
  }

  public static nextTurn(): void {
    store.dispatch({
      type: ACTION_GAME_LOOP_INCREMENT_INTERVAL
    })
  }
}