import { IState } from "../model/interfaces";
import { State } from "../model/state";
import { Action } from "redux";

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
  const button = State.getCurrentPlayerUIState(state).addUnitButtons.find(b=>b.pressed)
  action.unitId = action.unitId||button.unitTypeId
  if(!button) {
    return state
  }
  return State.modify(state, s=>{
    const box = s.board.boxes.find(b=>b.x===action.x && b.y===action.y)
    if(box!==undefined){
      box.units.push(State.newUnit(action.unitId, s.uiState.currentPlayer))
    }
    State.getCurrentPlayerUIState(s).addUnitButtons.forEach(b=>b.pressed=false)
  })
}