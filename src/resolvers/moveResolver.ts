import * as PF from 'pathfinding'
import { IBox, IUnit } from '../state/state-interfaces'
import { findUnit, getPathMatrix } from '../util/util'
import { IUnitActionResolver, IUnitActionResolverData } from './unitActionResolvers'
import { Behavior } from '../state/behavior'
import { StateAccessHelper } from '../state/access/StateAccessHelper'
import { State } from '../state/state'

export class MoveResolver implements IUnitActionResolver {
  private finder: any
  public resolve ({ state, unit, box, player }: IUnitActionResolverData): void {
    if (unit.type.isBase || unit.state.speed === 0 || unit.moved || unit.playerId !== player.id) {
      return 
    }
    if (!this.finder) {
      this.finder = new PF.AStarFinder({ allowDiagonal: state.game.allowDiagonal ? 1 : 0 })
    }
    const foeBases = findUnit(state, (u) => u.playerId !== player.id && u.type.isBase)
    if (!foeBases || !foeBases.length) { // this probably means game is over
      return
    }
    const foeBaseBox = foeBases[0].box
    const matrix = getPathMatrix(state)
    const grid = new PF.Grid(matrix)
    const path: number[][] = this.finder.findPath(box.x, box.y, foeBaseBox.x, foeBaseBox.y, grid)

    if (path && path.length > 1) {  // move the unit now! - matrix will be recalculated for each unit
      const newBox = state.board.boxes.find(b => b.x === path[1][0] && b.y === path[1][1])
      doMove(newBox, box, unit)       
    }
    
    if (!unit.moved) {// if we didn't found a path to enemy base (is blocked), we still try to move the unit randomly because it could be the enemy base is temporarily blocked and the two players unit blocking each other eternally
      const availablePlaces = State.getHelper().getAvailablePlacesFor(state, player.id)
      if (availablePlaces && availablePlaces.length) {
        doMove(availablePlaces[Math.floor(Math.random() * availablePlaces.length)] , box, unit) 
      }
    }
  }
}

function doMove(newBox:IBox, oldBox:IBox, unit: IUnit) {
  const unitBehavior = State.getHelper().unitBehavior(Behavior.get(), unit.type.id)
  if (newBox && unitBehavior.unitShouldMoveThisTurn({ unit, box: newBox, oldBox }) && unitBehavior.unitCanMoveHere({ unit, box: newBox, oldBox })) {
    oldBox.units = oldBox.units.filter(u => u.id !== unit.id) // remove from old box
    newBox.units.push(unit) // add to new box
    unit.moved = true
  }
}
