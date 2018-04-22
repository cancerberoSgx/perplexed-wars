import { Action } from "redux";
import { IState, IBox, IUnit } from "../model/interfaces";
import { State } from "../model/state";
import { getAvailablePlacesFor, getPathMatrix, findUnit, iterateUnits, copy } from "../util/util";
import * as PF from 'pathfinding'

export const ACTION_GAME_LOOP_INCREMENT_INTERVAL:string = 'game-loop-increment-interval'

// export interface IGameLoopIncrementInterval extends Action{
//   interval: number
// }

export function gameLoop(state:IState, action:Action):IState{
  state = State.get() // TODO: for some reason state arg is not the last one that's why I need to reasign here
  if(action.type!==ACTION_GAME_LOOP_INCREMENT_INTERVAL){
    return state
  }
  const finder = new PF.AStarFinder({allowDiagonal: state.game.allowDiagonal});
  state.players.forEach(player=>{
    const foeBases = findUnit(state, (u)=>u.playerId!==player.id&& u.type.isBase) // TODO: assume 2 players
    const foeBaseUnit = foeBases[0].unit
    const foeBaseBox = foeBases[0].box    
    iterateUnits(state, (box:IBox, unit:IUnit)=>{
      if(!unit.type.isBase && !unit.moved && unit.playerId===player.id) {
        const matrix = getPathMatrix(state)
        const grid = new PF.Grid(matrix);
        const path:number[][] = finder.findPath(box.x, box.y, foeBaseBox.x, foeBaseBox.y, grid); 
        if(path && path.length>1){  // move the unit now! - matrix will be recalculated for each unit
          const newBox = state.board.boxes.find(b=>b.x===path[1][0]&&b.y===path[1][1]) 
          // TODO: support unit.speed - if unit is fast then take path[speed] - if it si slow, dont move now, move in following turns
          if(newBox && !newBox.units.find(u=>u.type.isBase)) { 
            box.units = box.units.filter(u=>u.id!==unit.id) // remove from old box
            newBox.units.push(unit) // add to new box
            unit.moved=true
          }
        }
      }
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