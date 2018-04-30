import { war2ImplementationInitialState } from '../implementations/war2/war2State'
import { clone } from '../util/util'
import { IBehavior, IUnitTypeBehavior } from './behavior-interfaces'
import { IBox, IPlayer, IResource, IState, IUnit, IUnitType } from './state-interfaces'
import { StateAccessReSelectImpl } from './stateSelectors'
import { StateAccessHelper } from './StateAccessHelper'

const initialState = war2ImplementationInitialState

export class State {

  private static instance: State
  private stateInternal: IState

  private constructor () {
    this.stateInternal = initialState()
    this.stateInternal.uiState = this.stateInternal.uiState || {
      currentPlayer:this.stateInternal.players.find(p => !p.isAI).id,
      playerControls: [],
      unitSelection: [],
      unitAttacks: [],
      unitDeads: [],
    }
  }

  public static getInstance (): State {
    if (!this.instance) {
      this.instance = new State()
    }
    return this.instance
  }

  public static get (): IState {
    return this.getInstance().stateInternal
  }

  public static clone (state: IState): IState {
    const s = clone<IState>(state)
    s.timestamp = Date.now()
    return s
  }

  public static modify (state: IState, modify: (state: IState) => void): IState {
    // cloning so we dont mutate!
    // const c = this.clone(state)
    // c.timestamp = Date.now()
    // modify(c)
    // this.getInstance().stateInternal = c
    // return c

    // without cloning!
    state.timestamp = Date.now()
    modify(state)
    this.getInstance().stateInternal = state
    
    // debug    
    const debugWindow = window as any
    debugWindow.PerplexedState = state

    return state
  }

  private static helperInstance:StateAccess
  public static getHelper():StateAccess {
    if (!this.helperInstance) {
      this.helperInstance = new StateAccessHelper()
      // this.helperInstance = new StateAccessReSelectImpl()
    }
    return  this.helperInstance
  }
}



export interface StateAccess {

  player (state:IState, playerId: string): IPlayer
  
  playerResource (state:IState, playerId: string, resourceId: string): IResource
  playerUnitTypes (state:IState, playerId: string): IUnitType[]
  
  unitType (state:IState, unitType: string): IUnitType
  
  unitBehavior (behavior: IBehavior, unitId: string): IUnitTypeBehavior

  unitsNear(state: IState, box: IBox, radio: number): {targetUnit: IUnit, targetBox: IBox}[]
  getAvailablePlacesFor(state: IState, playerId: string): IBox[]

  iaPlayer(state:IState):IPlayer
  iaPlayers(state:IState): IPlayer[]
  humanPlayer(state:IState):IPlayer
  humanPlayers(state:IState): IPlayer[]

}
