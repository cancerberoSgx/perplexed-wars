import { Action } from 'redux'
import { GameUIStateHelper } from '../state/GameUIStateHelper'
import { StateAccessHelper } from '../state/StateAccessHelper'
import { State } from '../state/state'
import { IState } from '../state/state-interfaces'
import { store } from './store'
import { ACTION_ADD_UNIT, IAddUnitAction, addNewUnitImpl } from './addNewUnit'

export const ACTION_ADD_UNIT_CLICK_BUTTON: string = 'add-unit-click-button'

export interface IClickAddUnitButtonAction extends Action {
  unitId: string,
  playerId: string
}

export function clickAddNewUnitButton(state: IState, action: IClickAddUnitButtonAction): IState {
  state = state || State.get()
  if (action.type !== ACTION_ADD_UNIT_CLICK_BUTTON) {
    return state
  }

  if (state.unitsTypes.find(ut => ut.id === action.unitId).isNotAddableToBoard) {
    const addUnitAction:IAddUnitAction = {
      many: 1, 
      type: ACTION_ADD_UNIT,  
      x: 0,
      y: 0,
      ctrlKey: false,
      unitId: action.unitId,
      playerId: action.playerId,
    }
    return addNewUnitImpl(state, addUnitAction)
  }

  return State.modify(state, s => {
    // reset current selection first (excluding the target button)
    s.uiState.playerControls.forEach(pc => pc.addUnitButtons.forEach(b => !b.pressed && (b.pressed = false)))
    s.uiState.unitSelection = []
    if (state.players.find(p => p.id === action.playerId).isAI) { // human can't toggle ia unit buttons
      return
    }

    const addUnitButtons = s.uiState.playerControls.find(pc => pc.playerId === action.playerId).addUnitButtons
    addUnitButtons.forEach(b => {
      b.pressed = b.unitTypeId === action.unitId && !b.pressed // will toggle matched button
    })

    s.uiState.unitTypeSelection = s.unitsTypes.find(u => u.id === action.unitId && !!addUnitButtons.find(b => b.pressed && b.unitTypeId === action.unitId))
    
    // TODO: trigger event afterUnitTypeSelected
  

  })
}
