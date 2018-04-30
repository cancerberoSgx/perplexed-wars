import { IState, IPlayer, IResource, IUnitType, IBox, IUnit, IPlayerUIState } from '../state-interfaces'
import { IUnitTypeBehavior, IBehavior } from '../behavior-interfaces'

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

  box(state:IState, x:number, y:number):IBox

  playerControls(state:IState, playerId: string): IPlayerUIState

}
