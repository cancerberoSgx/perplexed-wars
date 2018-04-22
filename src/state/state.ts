import { initialState } from "./initialState";
import { IState, IPlayerUIState, IUnit, IUnitProperties } from "./interfaces";
import { clone } from "util/util";

export class State {

  private static counter: number = 0;
  private stateInternal: IState;
  private static instance: State;

  private constructor(){
    this.stateInternal = initialState()
  } 
  
  public static getInstance():State {
    if(!this.instance){
      this.instance = new State()
    }
    return this.instance
  }

  public static get(): IState{
    return this.getInstance().stateInternal
  }
  
  // public static getCurrentPlayerUIState(s:IState=this.getInstance().stateInternal):IPlayerUIState{
  //   return s.uiState.playerControls.find(c=>c.playerId===s.uiState.currentPlayer) || s.uiState.playerControls[0]
  // }
  // public static getFoePlayerUIState(s:IState=this.getInstance().stateInternal):IPlayerUIState{
  //   return s.uiState.playerControls.find(c=>c.playerId!==s.uiState.currentPlayer) || s.uiState.playerControls[0]
  // }
  
  public static clone(state:IState):IState{
    const s = clone<IState>(state)
    s.timestamp = Date.now()
    return s
  }

  public static modify( state:IState, modify:(state:IState)=>void):IState{
    const c = this.clone(state)
    c.timestamp = Date.now()
    modify(c)
    this.getInstance().stateInternal = c
    return c
  }

  public static newUnit(state:IState, typeId: string, playerId: string): IUnit {
    const type = state.unitsTypes.find(ut=>ut.id===typeId)
    return {
      type,
      playerId,
      id: `unit-${playerId}-${this.counter++}`,
      timestamp: Date.now(),
      state: clone(type.properties)
    }
  }

}