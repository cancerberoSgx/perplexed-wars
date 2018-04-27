import { IUnitActionResolver, IUnitActionResolverData } from './unitActionResolvers'
import { IBox, IUnit , IState , IPlayer } from '../state/state-interfaces'
import { findUnit, getPathMatrix } from '../util/util'
import * as PF from 'pathfinding'
import { Game } from '../state/game'

export class MoveResolver implements IUnitActionResolver {
  private finder: any
  public resolve ({ state, unit, box, player }: IUnitActionResolverData): void {
    if (!this.finder) {
      this.finder = new PF.AStarFinder({ allowDiagonal: state.game.allowDiagonal })
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
        if (newBox && !newBox.units.find(u => u.type.isBase)) {
          box.units = box.units.filter(u => u.id !== unit.id) // remove from old box
          newBox.units.push(unit) // add to new box
          unit.moved = true
        }
      } else {
        // TODO: if there is no path, we should still try to move the unit. Issue. if I block the two base - no unit moves no matter that all lthe board is free
      }
    }
  }
}
