import { initialState } from "./initialState";
import { IState } from "./interfaces";

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
  
}