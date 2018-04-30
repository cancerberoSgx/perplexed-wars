import { IState, IUnitType, IPlayer } from './state-interfaces'
import { createSelector } from 'reselect'
import createCachedSelector from 're-reselect'

export const unitTypes = (state:IState) => state.unitsTypes
export const players = (state:IState) => state.players

export const iaPlayer = createSelector(
  players,
  players => players.find(p => p.isAI), 
) 
export const humanPlayer = createSelector(
  players,
  players => players.find(p => !p.isAI),
) 
export const unitType = (state:IState, unitTypeId: string) => unitType2(state.unitsTypes, unitTypeId)

export const unitType2 = createCachedSelector( 
  (unitTypes:IUnitType[]) => unitTypes,               // S -> R1
  (unitTypes:IUnitType[], unitTypeId:string) => unitTypeId,         // S -> R2
  (unitTypes, unitTypeId) =>                      // R1, R2 => REAL_RESULT
    unitTypes.find(ut => ut.id === unitTypeId),
)((unitTypes, unitTypeId) => 'unitType_' + unitTypeId)  // S, R2 => cache key

export const player = (state:IState, playerId: string) => player2(state.players, playerId)
export const player2 = createCachedSelector( 
  (players:IPlayer[]) => players,               // S -> R1
  (players:IPlayer[], playerId:string) => playerId,         // S -> R2
  (players, playerId) =>                        // R1, R2 => REAL_RESULT
    players.find(ut => ut.id === playerId),
)((unitTypes, playerId) => 'player_' + playerId)  // S, R2 => cache key

export const playerUnitTypes = createCachedSelector( 
  (state:IState) => state, 
  (state:IState, playerId: string) => playerId,
  (state, playerId) =>                        
    player(state, playerId).unitTypes.map(id => unitType(state, id)),
)((state, unitTypeId) => 'playerUnitsTypes' + unitTypeId) 



// export const playerUnitType = (state:IState, playerId, unitTypeId) => unitType2(player(state, unitTypeId), unitTypeId)
// export const player = createCachedSelector( 
//   (state:IState) => state.players,               // S -> R1
//   (state:IState, playerId:string) => playerId,         // S -> R2
//   (players, playerId) =>                        // R1, R2 => REAL_RESULT
//     players.find(ut => ut.id === playerId),
// )((state, playerId) => 'player_' + playerId)  // S, R2 => cache key



// export const unitType = createCachedSelector( 
//   (state:IState) => state.unitsTypes,               // S -> R1
//   (state:IState, unitTypeId:string) => unitTypeId,         // S -> R2
//   (unitTypes, unitTypeId) =>                        // R1, R2 => REAL_RESULT
//     unitTypes.find(ut => ut.id === unitTypeId),
// )((state, unitTypeId) => 'unitType_' + unitTypeId)  // S, R2 => cache key
