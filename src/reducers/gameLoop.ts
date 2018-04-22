import { Action } from "redux";
import { IBox, IState, IUnit } from "../state/interfaces";
import { State } from "../state/state";
import { unitActionResolvers } from "../unitActionResolvers/unitActionResolvers";
import { iterateUnits } from "../util/util";

export const ACTION_GAME_LOOP_INCREMENT_INTERVAL:string = 'game-loop-increment-interval'

export function gameLoop(state:IState, action:Action):IState{
  state = State.get() // TODO: for some reason state argument is not the last / updated one - that's why I need to reasign here . Investigate what I'm doing wrong with redux here
  if(action.type!==ACTION_GAME_LOOP_INCREMENT_INTERVAL){
    return state
  }
  //TODO: this is very unfair: we are moving all units of player1 first and then players's - we should move units in the order they were created !!!
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


