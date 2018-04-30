import { ACTION_ADD_UNIT, IAddUnitAction } from '../reducers/addNewUnit'
import { store } from '../reducers/store'
import { StateAccessHelper } from '../state/access/StateAccessHelper'
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
    const helper = State.getHelper()
    const player = helper.player(state, this.id)

    let c: BuildConditionResult
    
    // order by health
    const strongCanBuy = helper.playerUnitTypes(state, this.id).concat() // clone the array we dont want to modify it!
      .sort((a,b) => a.properties.health < b.properties.health ? 1 : -1) // units ordered by health
      .find(u => {// get the first that we can buy
        const buildResult = !u.isBase && u.properties.damage > 0 && (c = helper.unitBehavior(Behavior.get(), u.id).buildCondition(player))
        return buildResult.canBuild
      }) 

    if (!strongCanBuy) {
      return
    }

    const availablePlace = (helper.getAvailablePlacesFor(state, this.id) || [])
      .find(box => 
        helper.unitBehavior(Behavior.get(), strongCanBuy.id).unitCanBeCreatedHere(this.id, box),
      )
    if (!availablePlace) {
      return 
    }
    // find a available board box
    const addUnitAction: IAddUnitAction = {
      type: ACTION_ADD_UNIT,
      unitId: strongCanBuy.id,
      many: 1,
      x: availablePlace.x,
      y: availablePlace.y,
      playerId: this.id,
    }
    store().dispatch(addUnitAction)

  }
}
