import { IState, IUnit } from "../state/interfaces";
import { State } from "../state/state";
import { Action } from "redux";
import { getAvailablePlacesFor } from "../util/util";
import { Game } from "../state/game";

export const ACTION_ADD_UNIT:string = 'add-unit'
export const ACTION_ADD_UNIT_CLICK_BUTTON:string = 'add-unit-click-button'

export interface IAddUnitAction extends Action{
  unitId:string 
  many:number
  x:number
  y: number
}

export interface IClickAddUnitButtonAction extends Action{
  unitId:string,
  playerId: string
}

export function clickAddNewUnitButton(state:IState, action:IClickAddUnitButtonAction):IState{
  state = State.get() 
  if(action.type!==ACTION_ADD_UNIT_CLICK_BUTTON){
    return state
  }
  return State.modify(state, s=>{
    s.uiState.playerControls.find(pc=>pc.playerId===action.playerId).addUnitButtons.forEach(b=>{
      b.pressed = b.unitTypeId===action.unitId
    })
  })
}

export function addNewUnit(state:IState, action:IAddUnitAction):IState {
  state = State.get() 
  if(action.type!==ACTION_ADD_UNIT){
    return state
  }
  const currentPlayer = state.uiState.playerControls.find(pc=>
    !!pc.addUnitButtons.find(but=>but.pressed)
  )

  if(!currentPlayer){ // this probably means that user is selecting a unit in the board (didn't previously clicked add-unit button)
    return state  
  }
  
  const button = currentPlayer.addUnitButtons.find(b=>b.pressed)
  if(!button) {
    console.log('No unit selected!')
    return state
  }
  action.unitId = action.unitId||button.unitTypeId
  return State.modify(state, s=>{
    const box = s.board.boxes.find(b=>b.x===action.x && b.y===action.y)
    const availablePlaces = getAvailablePlacesFor(currentPlayer.playerId, state)
    if(box!==undefined && availablePlaces.find(p=>p.x===action.x&& p.y===action.y)) {
      Game.getInstance().emit('before-add-unit-successfully', {action, player: currentPlayer, box})
      const newUnit:IUnit = State.newUnit(state, action.unitId, currentPlayer.playerId)
      box.units.push(newUnit)
      Game.getInstance().emit('after-add-unit', {newUnit, action, player: currentPlayer, box})
    }
    else{
      console.log('Cannot add unit there - box is outiside territory')
    }
    s.uiState.playerControls.forEach(pc=>pc.addUnitButtons.forEach(b=>b.pressed=false))
  })
}
