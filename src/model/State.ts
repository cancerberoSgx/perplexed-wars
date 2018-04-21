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
  
  public get state() : IState {
    return this.stateInternal 
  }

  public static get():IState{
    return this.getInstance().state
  }
  

  public static getCurrentPlayerUIState(s:IState=this.getInstance().stateInternal):IPlayerUIState{
    return s.uiState.playerControls.find(c=>c.playerId===s.uiState.currentPlayer) || s.uiState.playerControls[0]
  }
  
  public static clone(state:IState=this.getInstance().stateInternal):IState{
    const s = JSON.parse(JSON.stringify(state)) as IState
    s.timestamp = Date.now()
    return s
  }

  public static modify( modify:(state:IState)=>void=(r)=>{return}, state:IState=this.getInstance().stateInternal):void{
    const c = this.clone()
    c.timestamp = Date.now()
    modify(c)
    this.getInstance().stateInternal = c
  }

  public static newUnit(type: string, playerId: string): IUnit {
    return {
      type,
      playerId,
      timestamp: Date.now()
    }
  }


}