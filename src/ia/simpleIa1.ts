import { ACTION_ADD_UNIT, IAddUnitAction } from '../reducers/addNewUnit'
import { store } from '../reducers/store'
import { StateAccessHelper } from '../state/StateAccessHelper'
import { BuildConditionResult } from '../state/behavior-interfaces'
import { IState } from '../state/state-interfaces'
import { IA, IAInformation } from './ia-interfaces'
import { State } from '../state/state'
import { Behavior } from '../state/behavior'

/**
 * TODO: in war example: when no more food build house. But the problem is, to be agnostic, how do we know which building to build to bring the missing resource ? I think th implementation should provide this info.
 *
 * very simple ia. It will buy the most expensive unit available at each turn always trying to buy one. Wont make any buildings.
 * for creating one of me, just create a player with isIA:true and id==data_simple_1
 */
export class SimpleIa1 implements IA {
 
  info: IAInformation

  public name = 'Data ' + Date.now()
  public description = 'very simple ia. It will buy the most heavy/health unit available at each turn always trying to buy one. '
  public id = 'data_simple_1'
  public timestamp = Date.now()

  public setInformation(info: IAInformation) {
    this.info = info
  }

  // lastResources: IResource[]
  public yourTurn (state: IState) {
    const s = State.getHelper()
    const player = s.player(state, this.id)

    let c: BuildConditionResult
    
    // order by health
    const strongCanBuy = s.playerUnitTypes(state, this.id).concat() // clone the array we dont want to modify it!
      .sort((a,b) => a.properties.health < b.properties.health ? 1 : -1) // units ordered by health
      .find(u => {// get the first that we can buy
        const buildResult = !u.isBase && u.properties.damage > 0 && (c = s.unitBehavior(Behavior.get(), u.id).buildCondition(player))
        return buildResult.canBuild
      }) 

    if (!strongCanBuy) {
      return
    }

    const availablePlaces = State.getHelper().getAvailablePlacesFor(state, this.id)
    if (!availablePlaces || !availablePlaces.length) {
      return
    }
    // find a available board box
    const addUnitAction: IAddUnitAction = {
      type: ACTION_ADD_UNIT,
      unitId: strongCanBuy.id,
      many: 1,
      x: availablePlaces[0].x,
      y: availablePlaces[0].y,
      playerId: this.id,
    }
    store().dispatch(addUnitAction)

  }
}
