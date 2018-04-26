import { Action } from "redux";
import { Game } from "../state/game";
import { State } from "../state/state";
import { IState } from "../state/state-interfaces";

export const ACTION_CHANGE_GAME_SETTINGS:string = 'change-game-settings'
export interface IChangeGameSettingsAction extends Action {
  realTime?: boolean
  paused?: boolean
  interval?:number
  allowDiagonal?:boolean
}
export function changeGameSettings(state:IState, action:IChangeGameSettingsAction):IState{
  state = state || State.get() 
  if(action.type!==ACTION_CHANGE_GAME_SETTINGS){
    return state
  }
  return State.modify(state, s=>{
    s.game.paused = action.paused!==undefined ? action.paused :s.game.paused
    s.game.realTime = action.realTime!==undefined ? action.realTime :s.game.realTime
    s.game.interval = action.interval!==undefined ? action.interval :s.game.interval
    s.game.allowDiagonal = action.allowDiagonal!==undefined ? action.allowDiagonal :s.game.allowDiagonal
    

    if(action.realTime!==undefined|| action.interval!==undefined){
      setTimeout(() => {
        Game.getInstance().stop()
        Game.getInstance().start()
      }, 100);
    }
  })
}


