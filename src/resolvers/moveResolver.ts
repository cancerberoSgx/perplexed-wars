import { IUnitActionResolver, IUnitActionResolverData } from './unitActionResolvers'
import { IBox, IUnit , IState , IPlayer } from '../state/state-interfaces'
import { findUnit, getPathMatrix, getAvailablePlacesFor } from '../util/util'
import * as PF from 'pathfinding'
import { Game } from '../state/game'

export class MoveResolver implements IUnitActionResolver {
  private finder: any
  public resolve ({ state, unit, box, player }: IUnitActionResolverData): void {
    if (!this.finder) {
      this.finder = new PF.AStarFinder({ allowDiagonal: state.game.allowDiagonal ? 1 : 0 })
    }
    const foeBases = findUnit(state, (u) => u.playerId !== player.id && u.type.isBase)
    if (!foeBases || !foeBases.length) { // this probably means game is over
      return
    }
    const foeBaseUnit = foeBases[0].unit
    const foeBaseBox = foeBases[0].box
    if (!unit.type.isBase && unit.state.speed !== 0 && !unit.moved && unit.playerId === player.id /* &&
    unit.type.unitShouldMove({unit, box})  TODO*/) {
      const matrix = getPathMatrix(state)
      const grid = new PF.Grid(matrix)
      const path: number[][] = this.finder.findPath(box.x, box.y, foeBaseBox.x, foeBaseBox.y, grid)
      if (path && path.length > 1) {  // move the unit now! - matrix will be recalculated for each unit
        const newBox = state.board.boxes.find(b => b.x === path[1][0] && b.y === path[1][1])
        doMove(newBox, box, unit)       
      }
      
      if (!unit.moved) {
        // if there is no path, we still try to move the unit. Issue. It coul dbe the enemy base is temporarily blocked and the two players unit blocking each other eternally
        const availablePlaces = getAvailablePlacesFor(player.id, state)
        if (availablePlaces && availablePlaces.length) {
          doMove(availablePlaces[Math.floor(Math.random() * availablePlaces.length)] , box, unit) 
        }
      }
    }
  }
}
function doMove(newBox:IBox, oldBox:IBox, unit: IUnit) {
  if (newBox && !newBox.units.find(u => u.type.isBase)) {
    oldBox.units = oldBox.units.filter(u => u.id !== unit.id) // remove from old box
    newBox.units.push(unit) // add to new box
    unit.moved = true
  }
}
