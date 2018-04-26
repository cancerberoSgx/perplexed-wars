import { IState, IUnit } from "../state/state-interfaces";
import { State } from "../state/state";
import { Action } from "redux";
import { getAvailablePlacesFor, newUnit } from "../util/util";
import { Game } from "../state/game";
import { Behavior } from "../state/behavior";
import { Events } from "../state/IGameFramework";

export const ACTION_ADD_UNIT:string = 'add-unit'
export const ACTION_ADD_UNIT_CLICK_BUTTON:string = 'add-unit-click-button'

export interface IAddUnitAction extends Action{
  unitId:string 
  many:number
  x:number
  y: number
  /** means user ctrl-click for adding the unit - in that case we wont turn off the add-unit-buttons */
  ctrlKey:boolean
}

export interface IClickAddUnitButtonAction extends Action{
  unitId:string,
  playerId: string
}

export function clickAddNewUnitButton(state:IState, action:IClickAddUnitButtonAction):IState{
  state = state || State.get() 
  if(action.type!==ACTION_ADD_UNIT_CLICK_BUTTON){
    return state
  }
  const buildCondition = Behavior.get().unitTypes.find(ut=>ut.id===action.unitId).buildCondition(state.players.find(p=>p.id===action.playerId))
  if(!buildCondition.canBuild){
    alert('Cannot build unit, reason: '+buildCondition.whyNot)
    return state
  }
  return State.modify(state, s=>{
    // turn all buttons off
    s.uiState.playerControls.forEach(pc=>pc.addUnitButtons.forEach(b=>b.pressed=false))

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
  const playerUi = state.uiState.playerControls.find(pc=>
    !!pc.addUnitButtons.find(but=>but.pressed)
  )

  if(!playerUi){ // this probably means that user is selecting a unit in the board (didn't previously clicked add-unit button)
    return state  
  }
  
  const button = playerUi.addUnitButtons.find(b=>b.pressed)
  if(!button) {
    alert('No unit selected!, first click one of the add-unit buttons at the top and then the board')
    return state
  }
  action.unitId = action.unitId||button.unitTypeId

  // const unitBuildBehavior = Behavior.get().unitTypes.find(ut=>ut.id===action.unitId) // not neccesary to check biuld condition here since we are already checking it on press button
  // if(!unitBuildBehavior.buildCondition(State.get().players.find(p=>p.id===action.unitId))){
  //   alert('Cannot build this unit, not allowed in the rules of this game')
  // }
  
  return State.modify(state, s=>{
    const box = s.board.boxes.find(b=>b.x===action.x && b.y===action.y)
    const availablePlaces = getAvailablePlacesFor(playerUi.playerId, state)
    if(box!==undefined && availablePlaces.find(p=>p.x===action.x&& p.y===action.y)) {
      let cancelledReason:string
        Game.getInstance().emit(Events.EVENT_BEFORE_ADD_UNIT_SUCCESS, {action, player: playerUi, box, state, cancelCallback: (reason:string)=>{
          cancelledReason = reason
          }
        })
      if(cancelledReason) {
        alert('Cannot comply: '+ cancelledReason)
        return s
      }
      const unit:IUnit = newUnit(state, action.unitId, playerUi.playerId)
      
      box.units.push(unit)
      if(!action.ctrlKey){
        s.uiState.playerControls.forEach(pc=>pc.addUnitButtons.forEach(b=>b.pressed=false))
      }
      Game.getInstance().emit(Events.EVENT_AFTER_ADD_UNIT, {newUnit: unit, action, player: playerUi, box, state})
      return s
    }
    else {
      alert('Cannot add unit there - box is outside territory')
      return s
    }
  })
}
