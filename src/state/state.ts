import { IState, IPlayerUIState, IUnit, IUnitProperties, IPlayer } from './state-interfaces'
import { clone } from '../util/util'
import { war2ImplementationInitialState } from '../implementations/war2/war2ImplementationInitialState'

const initialState = war2ImplementationInitialState

export class State {

  private stateInternal: IState
  private static instance: State

  private constructor () {
    this.stateInternal = initialState()
  }

  public static getInstance (): State {
    // debugger;
    if (!this.instance) {
      this.instance = new State()
    }
    return this.instance
  }

  public static get (): IState {
    return this.getInstance().stateInternal
  }

  public static clone (state: IState): IState {
    const s = clone<IState>(state)
    s.timestamp = Date.now()
    return s
  }

  public static modify (state: IState, modify: (state: IState) => void): IState {
    // cloning so we dont mutate!
    // const c = this.clone(state)
    // c.timestamp = Date.now()
    // modify(c)
    // this.getInstance().stateInternal = c
    // return c

    // without cloning!
    state.timestamp = Date.now()
    modify(state)
    this.getInstance().stateInternal = state
    return state
  }
}
