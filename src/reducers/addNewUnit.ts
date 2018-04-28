import { Action } from 'redux'
import { Events } from '../state/IGameFramework'
import { Game } from '../state/game'
import { State } from '../state/state'
import { IState, IUnit } from '../state/state-interfaces'
import { getAvailablePlacesFor, newUnit } from '../util/util'


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
    Game.getInstance().log({ message: 'No unit selected!, first click one of the add-unit buttons at the top and then the board' })
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
        Game.getInstance().log({ message:cancelledReason })
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
      Game.getInstance().log({ message: 'Cannot add unit there - box is outside territory' })
    }
  })
}
