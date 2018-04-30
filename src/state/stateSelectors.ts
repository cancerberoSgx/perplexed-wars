import createCachedSelector from 're-reselect'
import { createSelector } from 'reselect'
import { getAvailablePlacesFor, getUnitsNearImplementation } from '../util/util'
import { IBehavior, IUnitTypeBehavior } from './behavior-interfaces'
import { StateAccess } from './state'
import { IBox, IState, IUnit, IPlayer, IUnitType ,IResource } from './state-interfaces'

const unitTypes = (state:IState) => state.unitsTypes
const players = (state:IState) => state.players

export class StateAccessReSelectImpl implements StateAccess {

  public unitsNear: (state: IState, box: IBox, radio: number) => {targetUnit: IUnit, targetBox: IBox}[] 
  = createCachedSelector( 
    (state:IState) => state, 
    (state:IState, box: IBox) => box,
    (state:IState, box: IBox, radio: number) => radio,
    (state, box, radio) => {
      return getUnitsNearImplementation(state, box, radio)
    },
  )((state, playerId) => 'unitsNear_' + playerId) 

  public getAvailablePlacesFor = (createCachedSelector( 
    (state:IState) => state, 
    (state:IState, playerId: string) => playerId,
    getAvailablePlacesFor,
  )((state, playerId) => 'getAvailablePlacesFor_' + playerId))as any 


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
  )((state, unitTypeId) => 'playerUnitsTypes_' + unitTypeId) as any


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
    (state:IState, resourceId:string) => resourceId,       
    (state, playerId, resourceId) =>                      
      this.player(state, playerId).resources.find(r => r.id === resourceId),
  )((state, stateId) => 'playerResource_' + stateId) 
  
  
}




// export const unitType = (state:IState, unitTypeId: string) => unitType2(state.unitsTypes, unitTypeId)

// export const unitType2 = createCachedSelector( 
//   (state:IState) => state,               
//   (state:IState, unitTypeId:string) => unitTypeId,         
//   (state, unitTypeId) =>                      
//     state.unitsTypes.find(ut => ut.id === unitTypeId),
// )((state, unitTypeId) => 'unitType_' + unitTypeId) 

// export const player = (state:IState, playerId: string) => player2(state.players, playerId)
// export const player = createCachedSelector( 
//   (state:IState) => state,               
//   (state:IState, playerId:string) => playerId,         
//   (state, playerId) =>                        
//     state.players.find(ut => ut.id === playerId),
// )((unitTypes, playerId) => 'player_' + playerId) 

// export const playerUnitTypes = createCachedSelector( 
//   (state:IState) => state, 
//   (state:IState, playerId: string) => playerId,
//   (state, playerId) =>                        
//     player(state, playerId).unitTypes.map(id => unitType(state, id)),
// )((state, unitTypeId) => 'playerUnitsTypes_' + unitTypeId) 


// export const getAvailablePlacesFor = createCachedSelector( 
//   (state:IState) => state, 
//   (state:IState, playerId: string) => playerId,
//   (state, playerId) => {
//     let result: IBox[] = []
//     iterateUnits(state, (box, u) => {
//       if (u.state.territoryRadius > 0 && u.playerId === playerId) {
//         result = result.concat(getBoxesNearImpl(state, box, u.state.territoryRadius))
//         // TODO: remove duplicates
//       }
//     })
//     return result
//   },
// )((state, playerId) => 'getAvailablePlacesFor_' + playerId) 


// export const unitsNear = createCachedSelector( 
//   (state:IState) => state, 
//   (state:IState, box: IBox) => box,
//   (state:IState, box: IBox, radio: number) => radio,
//   (state, box, radio) => {
//     return getUnitsNearImplementation(state, box, radio)
//   },
// )((state, playerId) => 'unitsNear_' + playerId) 


