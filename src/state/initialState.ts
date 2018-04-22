import { IState, IBox} from "./interfaces";
import { clone } from "../util/util";
import { State } from "./state";
import { war2ImplementationInitialState } from "../implementations/war2/war2ImplementationInitialState";

export const initialState = war2ImplementationInitialState;

export function buildUIStatePlayerControls(state:IState){
  state.players.forEach(p=>{
    const playerControl = {playerId: p.id, addUnitButtons: []}
    p.unitTypes.forEach(unitType=>{
      playerControl.addUnitButtons.push({unitTypeId: unitType, pressed: false})
    })
    state.uiState.playerControls.push(playerControl)
  })
}

export function createBoxes(state:IState, n:number, m:number, player0BaseId:string, player1BaseId:string){
  const boxes = state.board.boxes = []
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const box:IBox = {
        x: i, 
        y: j, 
        terrain: 'grey', 
        units: [],
        id: `box-${i}-${j}`
      }
      if(i===0&&j===0) {
        box.units.push(State.newUnit(state, player0BaseId, state.players[0].id))
      }
      if(i===n-1&&j===m-1) {
        box.units.push(State.newUnit(state, player1BaseId, state.players[1].id))  
      }
      boxes.push(box)
    }
  }
  return boxes
}