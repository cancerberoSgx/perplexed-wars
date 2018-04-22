import { Action } from "redux";
import { IBox, IState, IUnit } from "../state/interfaces";
import { State } from "../state/state";
import { unitActionResolvers } from "../unitActionResolvers/unitActionResolvers";
import { iterateUnits } from "../util/util";
import { Game } from "../state/game";

export const ACTION_CHANGE_GAME_SETTINGS:string = 'change-game-settings'
export interface IChangeGameSettingsAction extends Action {
  realTime?: boolean
  paused?: boolean
  interval?:number
  allowDiagonal?:boolean
}
export function changeGameSettings(state:IState, action:IChangeGameSettingsAction):IState{
  state = State.get() 
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


