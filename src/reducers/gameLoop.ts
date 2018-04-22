import { Action } from "redux";
import { IState, IBox, IUnit, IPlayer } from "../state/interfaces";
import { State } from "../state/state";
import { getAvailablePlacesFor, getPathMatrix, findUnit, iterateUnits, copy } from "../util/util";
import { IResolver, unitActionResolvers } from "../unitActionResolvers/unitActionResolvers";
import { MoveResolver } from "../unitActionResolvers/moveResolver";

export const ACTION_GAME_LOOP_INCREMENT_INTERVAL:string = 'game-loop-increment-interval'

export function gameLoop(state:IState, action:Action):IState{
  state = State.get() // TODO: for some reason state arg is not the last one that's why I need to reasign here
  if(action.type!==ACTION_GAME_LOOP_INCREMENT_INTERVAL){
    return state
  }
  state.players.forEach(player=>{
    iterateUnits(state, (box:IBox, unit:IUnit)=>{
      unitActionResolvers.forEach(resolver=>resolver.resolve({state, unit, box, player}))
    })
    // clean up moved flag from all units   
    iterateUnits(state, (box:IBox, unit:IUnit)=>{
      unit.moved=false
    })
  })
  return State.modify(state, s=>{
    s.game.time = s.game.time+s.game.interval
  })
}


