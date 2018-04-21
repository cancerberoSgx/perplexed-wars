import { initialState } from "./initialState";
import { IState, IPlayerUIState, IUnit } from "./interfaces";

export class State {

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
  
  public static getCurrentPlayerUIState(s:IState=this.getInstance().stateInternal):IPlayerUIState{
    return s.uiState.playerControls.find(c=>c.playerId===s.uiState.currentPlayer) || s.uiState.playerControls[0]
  }
  
  public static clone(state:IState):IState{
    const s = JSON.parse(JSON.stringify(state)) as IState
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

  public static newUnit(type: string, playerId: string): IUnit {
    return {
      type,
      playerId,
      timestamp: Date.now()
    }
  }

}