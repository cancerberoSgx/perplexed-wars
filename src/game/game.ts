import { State } from "../model/state";
import { store } from "../reducers/store";
import { ACTION_GAME_LOOP_INCREMENT_INTERVAL } from "../reducers/gameLoop";

export class Game{
  protected intervalId: NodeJS.Timer

  public start(){
    this.intervalId = setInterval(()=>{
      store.dispatch({
        type: ACTION_GAME_LOOP_INCREMENT_INTERVAL
      })
    }, State.get().game.interval)
  }

  public stop(): any {
    clearInterval(this.intervalId)
  }
}