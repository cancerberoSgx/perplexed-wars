import { IState, IPoint } from "../state/interfaces";
import { State } from "../state/state";
import { Action } from "redux";
import { getAvailablePlacesFor } from "../util/util";

export const ACTION_ADD_UNIT:string = 'add-unit'
export const ACTION_ADD_UNIT_CLICK_BUTTON:string = 'add-unit-click-button'

export interface IAddUnitAction extends Action{
  unitId?:string 
  many:number
  x:number
  y: number
  playerId: string
}

export interface IClickAddUnitButtonAction extends Action{
  unitId:string
}

export function clickAddNewUnitButton(state:IState, action:IClickAddUnitButtonAction):IState{
  state = State.get() // TODO: for some reason state arg is not the last one that's why I need to reasign here
  if(action.type!==ACTION_ADD_UNIT_CLICK_BUTTON){
    return state
  }
  return State.modify(state, s=>{
    State.getCurrentPlayerUIState(s).addUnitButtons.forEach(b=>{
      b.pressed = b.unitTypeId===action.unitId
    })
  })
}

export function addNewUnit(state:IState, action:IAddUnitAction):IState {
  state = State.get() // TODO: for some reason state arg is not the last one that's why I need to reasign here
  if(action.type!==ACTION_ADD_UNIT){
    return state
  }
  const currentPlayer = State.getCurrentPlayerUIState(state)
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
      box.units.push(State.newUnit(state, action.unitId, currentPlayer.playerId))
    }
    else{
      console.log('Cannot add unit there - box is outiside territory')
    }
    State.getCurrentPlayerUIState(s).addUnitButtons.forEach(b=>b.pressed=false)
  })
}
