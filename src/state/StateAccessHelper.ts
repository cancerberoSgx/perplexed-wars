import { IState, IPlayer, IResource, IUnitType } from './state-interfaces'
import { State } from './state'
import { Behavior } from './behavior'
import { IBehavior, IUnitTypeBehavior } from './behavior-interfaces'

export class StateAccessHelper {

  private behavior: IBehavior
  private state: IState

  constructor (state?: IState, behavior?: IBehavior) {
    // debugger
    this.state = state || State.get()
    this.behavior = behavior || Behavior.get()
    // this.behavior = behavior
  }

  private static instance: StateAccessHelper

  public static get (state?, behavior?): StateAccessHelper {
    if (!this.instance) {
      this.instance = new StateAccessHelper(state, behavior)
    }
    return this.instance
  }

  // state accessors

  public player (playerId: string): IPlayer {// TODO: cache
    return this.state.players.find(p => p.id === playerId)
  }

  public playerResource (playerId: string, resourceId: string): IResource { // TODO: cache
    return this.player(playerId).resources.find(r => r.id === resourceId)
  }

  public playerUnitTypes (playerId: string): IUnitType[] {// TODO: cache
    const result: IUnitType[] = []
    this.player(playerId).unitTypes.forEach(u => {
      const r = this.unitType(u)
      if (r) {
        result.push(r)
      }
    })
    return result
  }

  public unitType (unitType: string): IUnitType { // TODO: cache
    return this.state.unitsTypes.find(p => p.id === unitType)
  }

  // behavior accessors

  public unitBehavior (unitId: string): IUnitTypeBehavior {
    return this.behavior.unitTypes.find(u => u.id === unitId)
  }

}
