import { initialState } from "../model/initialState";
import { IState } from "../model/interfaces";
import { State } from "../model/State";
import { Action } from "redux";

export const ACTION_ADD_UNIT:string = 'add-unit'
export const ACTION_ADD_UNIT_CLICK_BUTTON:string = 'add-unit'


// export class AbstractAction implements Action{
//   public type: string;
//   constructor(type:string){
//     this.type=type
//   }
// }


export interface IAddUnitAction extends Action{
  unitId:string 
  many:number
  x:number
  y: number
  playerId: string
}

// export class AddUnitAction extends AbstractAction implements IAddUnitAction {
//   public unitId: string;
//   public many: number;
//   public x: number;
//   public y: number;
//   public playerId: string;
//   constructor(unitId:string, playerId: string, many: number=1, x: number, y: number){
//     super(ACTION_ADD_UNIT)
//     this.unitId = unitId
//     this.many = many
//     this.x = x
//     this.y = y
//     this.playerId = playerId
//   }
// }

export interface IClickAddUnitButtonAction extends Action{
  unitId:string 
  playerId: string
}
// export class ClickAddUnitButtonAction extends AbstractAction implements IClickAddUnitButtonAction{
//   public playerId: string;
//   public unitId: string;
//   constructor(unitId:string, playerId:string){
//     super(ACTION_ADD_UNIT_CLICK_BUTTON)
//     this.unitId=unitId
//     this.playerId=playerId
//   }
// }

export function clickAddNewUnitButton(state:IState=initialState(), action:IClickAddUnitButtonAction):IState{
  if(action.type!==ACTION_ADD_UNIT){
    return state
  }
  if(!action.unitId){
    State.modify((s)=>{ // means user just clicked add unit button
      const playerUIState = s.uiState.playerControls.find(p=>p.playerId===action.playerId)
      if(playerUIState!==undefined){
        playerUIState.addUnitButtonPressed = !State.getCurrentPlayerUIState(s).addUnitButtonPressed
      }
    })
  }
  return State.get()
}

export function addNewUnit(state:IState=initialState(), action:IAddUnitAction):IState{
  // debugger;
  if(action.type!==ACTION_ADD_UNIT){
    return state
  }
  // if(action.unitId && action.x && action.y && action.playerId){ // means user select a new unit to add in some part of the board.
    State.modify((s)=>{ // means user just clicked add unit button
      const box = s.board.boxes.find(b=>b.x===action.x && b.y===action.y)
      if(box!==undefined){
        // debugger
        box.units.push(State.newUnit(action.unitId, action.playerId))
      }
      State.getCurrentPlayerUIState(s).addUnitButtonPressed = false// !State.getCurrentPlayerUIState(s).addUnitButtonPressed
    })
  // }
  
  return State.get()
}