import { getAvailablePlacesFor, getUnitsNearImplementation } from '../../util/util'
import { IBehavior, IUnitTypeBehavior } from '../behavior-interfaces'
import { IPlayer, IResource, IState, IUnitType, IBox, IPlayerUIState } from '../state-interfaces'
import { StateAccess } from './StateAccess'

export class StateAccessHelper implements StateAccess {

  public player (state:IState, playerId: string): IPlayer {
    return state.players.find(p => p.id === playerId)
  }

  public playerResource (state:IState, playerId: string, resourceId: string): IResource { 
    return this.player(state, playerId).resources.find(r => r.id === resourceId)
  }

  public playerUnitTypes (state:IState, playerId: string): IUnitType[] {
    const result: IUnitType[] = []
    this.player(state, playerId).unitTypes.forEach(u => {
      const r = this.unitType(state, u)
      if (r) {
        result.push(r)
      }
    })
    return result
  }

  public unitType (state:IState, unitType: string): IUnitType { 
    return state.unitsTypes.find(p => p.id === unitType)
  }

  public unitBehavior (behavior: IBehavior, unitId: string): IUnitTypeBehavior {
    return behavior.unitTypes.find(u => u.id === unitId)
  }

  public unitsNear = getUnitsNearImplementation

  public getAvailablePlacesFor = getAvailablePlacesFor


  public iaPlayer(state:IState):IPlayer {
    return state.players.find(p => p.isAI)
  }
  public humanPlayer(state:IState):IPlayer {
    return state.players.find(p => !p.isAI)
  }

  public iaPlayers(state:IState):IPlayer[] {
    return state.players.filter(p => p.isAI)
  }
  public humanPlayers(state:IState):IPlayer[] {
    return state.players.filter(p => !p.isAI)
  }

  public box(state: IState, x: number, y: number): IBox {
    return state.board.boxes.find(b => b.x === x && b.y === y) 
  }

  public playerControls(state: IState, playerId: string): IPlayerUIState {
    return state.uiState.playerControls.find(pc => pc.playerId === playerId)
  }
}


