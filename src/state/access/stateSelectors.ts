import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'
import { getAvailablePlacesFor, getUnitsNearImplementation, findUnit } from '../../util/util'
import { IBehavior, IUnitTypeBehavior } from '../behavior-interfaces'
import { StateAccess } from './StateAccess'
import { IBox, IState, IUnit, IPlayer, IUnitType ,IResource, IPlayerUIState } from '../state-interfaces'

const unitTypes = (state:IState) => state.unitsTypes
const players = (state:IState) => state.players

export class StateAccessReSelectImpl implements StateAccess {

  public unitsNear = getUnitsNearImplementation

  public getAvailablePlacesFor = getAvailablePlacesFor
  
  public unit: (state:IState, unitId: string) => {unit: IUnit, box: IBox}
  = createCachedSelector( 
    (state:IState) => state,
    (state:IState, unitId:string) => unitId,
    (state, unitId) => {
      const found = findUnit(state, () => true)
      return found.length ? found[0] : null
    },
  )((unitTypes, unitId) => 'unit_' + unitId)
  

  public player: (state:IState, playerId: string) => IPlayer 
  = createCachedSelector( 
    (state:IState) => state,               
    (state:IState, playerId:string) => playerId,         
    (state, playerId) =>                        
      state.players.find(ut => ut.id === playerId),
  )((unitTypes, playerId) => 'player_' + playerId) 
  
  public playerUnitTypes = createCachedSelector( 
    (state:IState) => state, 
    (state:IState, playerId: string) => playerId,
    (state, playerId) =>                        
      this.player(state, playerId).unitTypes.map(id => this.unitType(state, id)),
  )((state, unitTypeId) => 'playerUnitsTypes_' + unitTypeId)


  public iaPlayer = createSelector(
    players,
    players => players.find(p => p.isAI), 
  ) 
  public iaPlayers: (state:IState) => IPlayer[] = createSelector(
    players,
    players => players.filter(p => p.isAI), 
  ) 
  public humanPlayer: (state:IState) => IPlayer = createSelector(
    players,
    players => players.find(p => !p.isAI),
  )  
  public humanPlayers: (state:IState) => IPlayer[] = createSelector(
    players,
    players => players.filter(p => !p.isAI),
  ) 

  public unitType = createCachedSelector( 
    (state:IState) => state,               
    (state:IState, unitTypeId:string) => unitTypeId,         
    (state, unitTypeId) =>                      
      state.unitsTypes.find(ut => ut.id === unitTypeId),
  )((state, unitTypeId) => 'unitType_' + unitTypeId) 


  public unitBehavior = createCachedSelector( 
    (behavior: IBehavior) => behavior,               
    (behavior: IBehavior, behaviorId:string) => behaviorId,         
    (behavior, behaviorId) =>                      
      behavior.unitTypes.find(u => u.id === behaviorId),
  )((state, behaviorId) => 'unitBehavior_' + behaviorId) 


  public playerResource :  (state:IState, playerId: string, resourceId: string) => IResource
  = createCachedSelector( 
    (state:IState) => state,               
    (state:IState, playerId:string) => playerId,  
    (state:IState, playerId:string, resourceId:string) => resourceId,       
    (state, playerId, resourceId) =>                      
      this.player(state, playerId).resources.find(r => r.id === resourceId),
  )((state, stateId) => 'playerResource_' + stateId) 
  

  public box(state: IState, x: number, y: number): IBox {
    return state.board.boxes.find(b => b.x === x && b.y === y) // TODO
  }


  public playerControls: (state:IState, playerId: string) => IPlayerUIState = createCachedSelector( 
    (state:IState) => state,               
    (state:IState, playerId:string) => playerId,         
    (state, playerId) =>                      
      state.uiState.playerControls.find(pc => pc.playerId === playerId), 
  )((state, unitTypeId) => 'playerControls_' + unitTypeId) 

}





  // public unitsNear: (state: IState, box: IBox, radio: number) => {targetUnit: IUnit, targetBox: IBox}[] 
  // = createCachedSelector( 
  //   (state:IState) => state, 
  //   (state:IState, box: IBox) => box,
  //   (state:IState, box: IBox, radio: number) => radio,
  //   (state, box, radio) => {
  //     return getUnitsNearImplementation(state, box, radio)
  //   },
  // )((state, box) => 'unitsNear_' + '_' + box.x + '_' + box.y) 

  // public getAvailablePlacesFor = (createCachedSelector( 
  //   (state:IState) => state, 
  //   (state:IState, playerId: string) => playerId,
  //   getAvailablePlacesFor,
  // )((state, playerId) => 'getAvailablePlacesFor_' + playerId))

