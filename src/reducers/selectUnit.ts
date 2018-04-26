import { Action } from "redux";
import { IState } from "../state/state-interfaces";
import { State } from "../state/state";
import { findUnit } from "../util/util";
import { Game } from "../state/game";

export const ACTION_SELECT_UNIT:string = 'select-unit'

export interface ISelectUnitAction extends Action{
  unitId:string
  union: boolean // user is pressing ctrl+click
}

export function selectUnit(state:IState, action:ISelectUnitAction):IState{
  state = state || State.get() 
  if(action.type!==ACTION_SELECT_UNIT){
    return state
  }
  return State.modify(state, s=>{
    Game.getInstance().emit('beforeUnitSelection', {selection: s.uiState.unitSelection, action})
    const results = findUnit(s, unit=>unit.id===action.unitId).map(r=>({unitId: r.unit.id, boxId: r.box.id}))
    const previousSelection = s.uiState.unitSelection
    s.uiState.unitSelection = action.union ? s.uiState.unitSelection.concat(results) : results
    Game.getInstance().emit('afterUnitSelection', {selection: s.uiState.unitSelection, previousSelection, action})
  })
}


