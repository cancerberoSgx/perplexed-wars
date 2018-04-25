import { IState, IUnit } from "../state/state-interfaces";
import { State } from "../state/state";
import { Action } from "redux";
import { getAvailablePlacesFor, newUnit as makeUnit } from "../util/util";
import { Game } from "../state/game";
import { Behavior } from "../state/behavior";

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
  const buildCondition = Behavior.get().unitTypes.find(ut=>ut.id===action.unitId).buildCondition(state.players.find(p=>p.id===action.playerId))
  if(!buildCondition.canBuild){
    alert('Cannot build unit, reason: '+buildCondition.whyNot)
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
    alert('No unit selected!')
    return state
  }
  action.unitId = action.unitId||button.unitTypeId
  return State.modify(state, s=>{
    const box = s.board.boxes.find(b=>b.x===action.x && b.y===action.y)
    const availablePlaces = getAvailablePlacesFor(currentPlayer.playerId, state)
    if(box!==undefined && availablePlaces.find(p=>p.x===action.x&& p.y===action.y)) {
      Game.getInstance().emit('beforeAddUnitSuccess', {action, player: currentPlayer, box})
      const newUnit:IUnit = makeUnit(state, action.unitId, currentPlayer.playerId)
      box.units.push(newUnit)
      Game.getInstance().emit('afterAddUnit', {newUnit, action, player: currentPlayer, box})
    }
    else{
      alert('Cannot add unit there - box is outside territory')
    }
    s.uiState.playerControls.forEach(pc=>pc.addUnitButtons.forEach(b=>b.pressed=false))
  })
}
