import { IState, IThing } from "../state/state-interfaces";

export interface IA extends IThing {
  
  /**
   * turn just begun decide which units to build in this turn
   */
  yourTurn(state: IState)

}