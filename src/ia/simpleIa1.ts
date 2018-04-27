import { getAvailablePlacesFor } from 'util/util'
import { ACTION_ADD_UNIT, IAddUnitAction } from '../reducers/addNewUnit'
import { store } from '../reducers/store'
import { StateAccessHelper } from '../state/StateAccessHelper'
import { BuildConditionResult } from '../state/behavior-interfaces'
import { IState } from '../state/state-interfaces'
import { IA } from './ia-interfaces'

/**
 * TODO: in war example: when no more food build house. But the problem is, to be agnostic, how do we know which building to build to bring the missing resource ? I think th implementation should provide this info.
 *
 * very simple ia. It will buy the most expensive unit available at each turn always trying to buy one. Wont make any buildings.
 * for creating one of me, just create a player with isIA:true and id==data_simple_1
 */
export class SimpleIa1 implements IA {

  public name = 'Data ' + Date.now()
  public description = 'very simple ia. It will buy the most heavy/health unit available at each turn always trying to buy one. '
  public id = 'data_simple_1'
  public timestamp = Date.now()

  public yourTurn (state: IState) {
    const s: StateAccessHelper = StateAccessHelper.get()
    const player = s.player(this.id)
    const playerUnits = s.playerUnitTypes(this.id)

    let c: BuildConditionResult
    // order by health
    const strongCanBuy = s.playerUnitTypes(this.id).concat() // clone the array we dont want to modify it!
      .sort((a,b) => a.properties.health < b.properties.health ? -1 : 1) // units ordered by health
      .find(u => !u.isBase && u.properties.damage > 0 && (c = s.unitBehavior(u.id).buildCondition(player)) && c.canBuild) //first that we can buy

    if (!strongCanBuy) {
      return
    }

    const availablePlaces = getAvailablePlacesFor(this.id, state)
    if (!availablePlaces || !availablePlaces.length) {
      return
    }
    // find a available board box
    const addUnitAction: IAddUnitAction = {
      'type': ACTION_ADD_UNIT,
      unitId: strongCanBuy.id,
      many: 1,
      x: availablePlaces[0].x,
      y: availablePlaces[0].y,
      playerId: this.id
    }
    store().dispatch(addUnitAction)

  }
}
