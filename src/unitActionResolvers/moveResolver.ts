import { IResolver} from "./unitActionResolvers";
import { IBox, IUnit , IState , IPlayer} from "../state/interfaces";
import { findUnit, getPathMatrix } from "../util/util";
import * as PF from 'pathfinding'

export class MoveResolver implements IResolver {
  private finder: any;
  public resolve({state, unit, box, player}:{state:IState,unit:IUnit, box:IBox, player:IPlayer}):void {
    if(!this.finder){
      this.finder = new PF.AStarFinder({allowDiagonal: state.game.allowDiagonal});
    }
    const foeBases = findUnit(state, (u)=>u.playerId!==player.id&& u.type.isBase) // TODO: assume 2 players!
    if(!foeBases||!foeBases.length){ // this probably means game is over
      return 
    }
    const foeBaseUnit = foeBases[0].unit
    const foeBaseBox = foeBases[0].box 
    if(!unit.type.isBase && !unit.moved && unit.playerId===player.id) {
      const matrix = getPathMatrix(state)
      const grid = new PF.Grid(matrix);
      const path:number[][] = this.finder.findPath(box.x, box.y, foeBaseBox.x, foeBaseBox.y, grid);
      // console.log('MOVING', unit.type.id,  unit.playerId, box.x, box.y, foeBaseBox.x, foeBaseBox.y, path) 
      if(path && path.length>1){  // move the unit now! - matrix will be recalculated for each unit
        const newBox = state.board.boxes.find(b=>b.x===path[1][0]&&b.y===path[1][1]) 
        // TODO: support unit.speed - if unit is fast then take path[speed] - if it si slow, dont move now, move in following turns
        if(newBox && !newBox.units.find(u=>u.type.isBase)) { 
          box.units = box.units.filter(u=>u.id!==unit.id) // remove f|rom old box
          newBox.units.push(unit) // add to new box
          unit.moved=true
        }
      }
    }
  }
}