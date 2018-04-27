import { IBox, IPlayer, IState, IUnit } from '../state/state-interfaces'
import { IUnitActionResolver, IUnitActionResolverData } from './unitActionResolvers'
import { getUnitsNear } from '../util/util'
import { Game } from '../state/game'
import { Events } from '../state/IGameFramework'

export class AttackResolver implements IUnitActionResolver {
  public resolve ({ state, unit, box, player }: IUnitActionResolverData): void {
    if (!unit.moved && unit.playerId === player.id) {
      const unitsNear = getUnitsNear({ state, unit, box, radio: unit.state.range, predicate: u => u.playerId !== player.id })
      if (unitsNear && unitsNear.length) {
        const { targetUnit, targetBox } = unitsNear[0]
        targetUnit.state.health = targetUnit.state.health - unit.state.damage
        state.uiState.unitAttacks.push({ attacked: targetUnit.id, attacker: unit.id, attackedBox: targetBox.id })
        if (targetUnit.state.health <= 0) {
          targetBox.units = targetBox.units.filter(u => u.id !== targetUnit.id)
          state.uiState.unitDeads.push({ attacked: targetUnit.id, attacker: unit.id, attackedBox: targetBox.id })
          unit.killCount = unit.killCount || 0
          unit.killCount ++
          Game.getInstance().emit(Events.EVENT_AFTER_UNIT_DIE, { state, attackerPlayer: player, attacked: targetUnit, attackedBox: targetBox, attacker: unit,  attackerBox: box })
          // console.log('die, ' + targetUnit.id + ' by ' + unit.id)
        }
        unit.moved = true
      }
    }
  }
}
