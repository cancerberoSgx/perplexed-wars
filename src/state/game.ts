import { EventEmitter } from "events";
import { ACTION_GAME_LOOP_INCREMENT_INTERVAL, ITurnEndAction } from "../reducers/gameLoop";
import { store } from "../reducers/store";
import { State } from "./state";
import { IGameFramework, Events, BeforeUnitSelectionEvent, AfterUnitSelectionEvent, AfterAddUnitEvent, BeforeGameFinishEvent, BeforeAddUnitSuccessEvent, Log } from "./IGameFramework";
import { IA } from "../ia/ia-interfaces";
import { StateAccessHelper } from "./StateAccessHelper";
import { IPlayer } from "./state-interfaces";
import { Behavior } from "./behavior";

/**
 * responsible of the game life cycle mostly about turn and dispatching action [[ACTION_GAME_LOOP_INCREMENT_INTERVAL]]
 * 
 * usage: `Game.getInstance()` which returns [[IGameFramework]]
 */
export class Game extends EventEmitter implements IGameFramework { 
  
  // private iaPlayers: IA[] = [];
  private intervalId: NodeJS.Timer
  private static instance
  
  private constructor(){
    super()
  }
  
  // public  getIaFor(playerId: string): IA {
  //   return this.iaPlayers.find(ia=>ia.id===playerId)
  // }
  public static getInstance():IGameFramework{
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
  }

  public stop(): any {
    clearInterval(this.intervalId)
    //TODO: trigger event game stopped
  }
  
  public nextTurn(): void {
    if(State.get().game.gameFinish){
      alert('Game finish, winner is '+State.get().game.winner+ '. Bye.')
      this.stop()
      return 
    }
    if(!State.get().game.paused){
      const action:ITurnEndAction = {
        type: ACTION_GAME_LOOP_INCREMENT_INTERVAL
      };
      store().dispatch(action)
      Behavior.get().players.forEach(p => p.ia && p.ia.yourTurn(State.get()))
      
    }
  }

  // public registerIAPlayer(ia: IA): void {
  //   debugger;
  //   const p = StateAccessHelper.get().player(ia.id)
  //   if(p && p.isAI && p.id===ia.id){
  //     this.iaPlayers.push(ia)
  //   }
  // }

  public log(log:Log):void { 
    console.log(log.message)
  }
}
