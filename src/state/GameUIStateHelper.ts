import { IState, IPlayerStateAddUnitButtonState } from './state-interfaces'
import { StateAccessHelper } from './StateAccessHelper'
import { addNewUnit } from 'reducers/addNewUnit'

/** helpers of Game to maintain the state of  [[IState.UIState.]] and [[IState.UIState.playerControls]]. */
export class GameUIStateHelper {
  public static initializeUIState(state:IState) {
    state.uiState = state.uiState ||  { 
      currentPlayer: state.players.find(p => !p.isAI).id,
      playerControls: [],
      unitSelection: [],
      unitAttacks: [],
      unitDeads: [],
    }
  }
  public static setupPlayerControls(state:IState) {
    const H = StateAccessHelper.get(state)
    state.players.forEach(p => {
      const playerControl:{playerId:string,addUnitButtons:IPlayerStateAddUnitButtonState[]} = { playerId: p.id, addUnitButtons: [] }
      p.unitTypes.forEach(utId => {
        const unitType = H.unitType(utId)
        // if (!unitType.childOf || !unitType.childOf.length) {
        playerControl.addUnitButtons.push({ 
          unitTypeId: utId, 
          pressed: false, 
          isPrimary: !unitType.childOf || !unitType.childOf.length, 
        })
        // } 
      })
      state.uiState.playerControls.push(playerControl)
    })
  }
  public static setAddUnitChildButtons(state:IState) {
    const parent = state.uiState.unitTypeSelection
    if (!parent) {
      return
    }
    state.players.filter(p => !p.isAI).forEach(player => {
      // debugger
      const children = state.unitsTypes.filter(ut => ut.childOf && ut.childOf.find(p => p === parent.id)).map(u => u.id)
      
      // const children2 = children.map(u => u.id).filter(c => player.unitTypes.find(ut => ut === c)) // these are the unit types of the player that are child
      state.uiState.playerControls.filter(pc => pc.playerId === player.id).forEach(pc => {
        pc.addUnitChildButtons = children
      })
    })
  }
}
