import { Action } from 'redux'
import { Events } from '../state/IGameFramework'
import { Game } from '../state/game'
import { State } from '../state/state'
import { IState, IUnit } from '../state/state-interfaces'
import { getAvailablePlacesFor, newUnit } from '../util/util'

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

  return State.modify(state, s => {
    // reset current selection first (excluding the target button)
    s.uiState.playerControls.forEach(pc => pc.addUnitButtons.forEach(b => !b.pressed && (b.pressed = false)))
    s.uiState.unitSelection = []

    if (s.players.find(p => p.id === action.playerId).isAI) { // human toggle ia unit buttons
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

export const ACTION_ADD_UNIT: string = 'add-unit'
export interface IAddUnitAction extends Action {
  unitId: string
  many: number
  x: number
  y: number
  /**if player is human doesn't matter who is it because we know he has to have a button pressed */
  playerId?: string 
  /** means user ctrl-click for adding the unit - in that case we wont turn off the add-unit-buttons */
  ctrlKey?: boolean
}

export function addNewUnit(state: IState, action: IAddUnitAction): IState {

  state = State.get()

  if (action.type !== ACTION_ADD_UNIT) {
    return state
  }
  const playerIsHuman = !action.playerId

  const playerUi = state.uiState.playerControls.find(pc => (!playerIsHuman ? (pc.playerId === action.playerId) : !!pc.addUnitButtons.find(but => but.pressed)),
  )

  if (!playerUi) { // this probably means that user is selecting a unit in the board (didn't previously clicked add-unit button)
    return state
  }

  const button = playerUi.addUnitButtons.find(b => b.pressed)
  if (!button && playerIsHuman) {
    alert('No unit selected!, first click one of the add-unit buttons at the top and then the board')
    return state
  }
  action.unitId = action.unitId || button.unitTypeId

  return State.modify(state, s => {
    const box = s.board.boxes.find(b => b.x === action.x && b.y === action.y)
    const availablePlaces = getAvailablePlacesFor(playerUi.playerId, state)
    if (box !== undefined && availablePlaces.find(p => p.x === action.x && p.y === action.y)) {
      let cancelledReason: string
      Game.getInstance().emit(Events.EVENT_BEFORE_ADD_UNIT_SUCCESS, {
        action, player: playerUi, box, state, cancelCallback: (reason: string) => {
          cancelledReason = reason
        },
      })
      if (cancelledReason && playerIsHuman) {
        alert(cancelledReason)
        return s
      }
      const unit: IUnit = newUnit(state, action.unitId, playerUi.playerId)

      box.units.push(unit)
      // reset all add-unit-buttons
      if (!action.ctrlKey && playerIsHuman) { 
        s.uiState.playerControls.forEach(pc => pc.addUnitButtons.forEach(b => b.pressed = false))
      }
      Game.getInstance().emit(Events.EVENT_AFTER_ADD_UNIT, { newUnit: unit, action, player: playerUi, box, state })
    } else if (playerIsHuman) {
      alert('Cannot add unit there - box is outside territory')
    }
  })
}
