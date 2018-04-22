import { Action } from "redux";
import { IState, IBox, IUnit } from "../model/interfaces";
import { State } from "../model/state";
import { getAvailablePlacesFor, getPathMatrix, findUnit, iterateUnits } from "../util/util";
import * as PF from 'pathfinding'

export const ACTION_GAME_LOOP_INCREMENT_INTERVAL:string = 'game-loop-increment-interval'

export interface IGameLoopIncrementInterval extends Action{
  interval: number
}

export function gameLoop(state:IState, action:IGameLoopIncrementInterval):IState{
  state = State.get() // TODO: for some reason state arg is not the last one that's why I need to reasign here
  if(action.type!==ACTION_GAME_LOOP_INCREMENT_INTERVAL){
    return state
  }
  state.players.forEach(player=>{
    const foeBases = findUnit(state, (u)=>u.playerId!==player.id&& u.type.isBase) // TODO: assume 2 players
    const foeBaseUnit = foeBases[0].unit
    const foeBaseBox = foeBases[0].box
    const playerBases = findUnit(state, (u)=>u.playerId===player.id&& u.type.isBase)
    const playerBaseUnit = playerBases[0].unit
    const playerBaseBox = playerBases[0].box
    iterateUnits(state, (box:IBox, unit:IUnit)=>{
      if(!unit.type.isBase && !unit.moved && unit.playerId===player.id) {
        const matrix = getPathMatrix(state)
        const grid = new PF.Grid(matrix);
        const finder = new PF.AStarFinder();
        const path:number[][] = finder.findPath(box.x, box.y, foeBaseBox.x, foeBaseBox.y, grid); 

        // move the unit now! - matrix will be recalculated for each unit
        if(path && path.length>1){
          const newBox = state.board.boxes.find(b=>b.x===path[1][0]&&b.y===path[1][1]) // TODO: unit.speed - we could take path[2] or path[speed] - or if the unit is very slow (speed==0.5 we could not move it now and move it in the next one...)
          if(newBox) { 
            box.units = box.units.filter(u=>u.id!==unit.id) // remove from old box
            newBox.units.push(unit) // add to new box
            unit.moved=true
          }
        }
        else {
          //TODO: what happens when there is no path? now just wait
        }
      }
    })

    // clean up moved flag from all units
   
    iterateUnits(state, (box:IBox, unit:IUnit)=>{
      unit.moved=false
    })
  })
 

  return State.modify(state, s=>{
    s.time = s.time+action.interval
  })
}