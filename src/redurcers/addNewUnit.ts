import { IState } from "../model/interfaces";
import { State } from "../model/State";
import { Action } from "redux";

export const ACTION_ADD_UNIT:string = 'add-unit'
export const ACTION_ADD_UNIT_CLICK_BUTTON:string = 'add-unit-click-button'

export interface IAddUnitAction extends Action{
  unitId:string 
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
    State.getCurrentPlayerUIState(s).addUnitButtonPressed = true
  })
}

export function addNewUnit(state:IState, action:IAddUnitAction):IState {
  state = State.get() // TODO: for some reason state arg is not the last one that's why I need to reasign here
  if(action.type!==ACTION_ADD_UNIT||!State.getCurrentPlayerUIState(state).addUnitButtonPressed) {
    return state
  }
  return State.modify(state, s=>{
    const box = s.board.boxes.find(b=>b.x===action.x && b.y===action.y)
    if(box!==undefined){
      box.units.push(State.newUnit(action.unitId, s.uiState.currentPlayer))
    }
    State.getCurrentPlayerUIState(s).addUnitButtonPressed = false
  })
}