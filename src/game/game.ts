import { State } from "model/state";
import { store } from "redurcers/store";
import { ACTION_GAME_LOOP_INCREMENT_INTERVAL } from "../redurcers/gameLoop";

export interface IGameConfig{
  interval: number
}
export class Game{
  public intervalId: NodeJS.Timer;
  public config: IGameConfig;
  public defaultConfig: IGameConfig = {
    interval: 1000
  }
  constructor(config : IGameConfig){
    this.config = Object.assign({}, this.defaultConfig, config)
  }
  public start(){
    this.intervalId = setInterval(()=>{
      store.dispatch({
        type: ACTION_GAME_LOOP_INCREMENT_INTERVAL,
        interval: this.config.interval
      })
    }, this.config.interval)
  }

  public stop(): any {
    // clearInterval(this.intervalId)
  }
}