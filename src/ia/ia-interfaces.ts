import { IState, IThing } from '../state/state-interfaces'

export interface IA extends IThing {

  setInformation(info: IAInformation)
  /**
   * turn just begun decide which units to build in this turn
   */
  yourTurn (state: IState)

}

/**
 * Data that agnostic IA must have in order to know how to play in a concrete implementatino
 */
export interface IAInformation {
  /**For agnostic IA, when it can build unit because a resource is missing, the implementors need to tell it what unit must build in order to increase the resource */
  unitResourceGiver: Array<{resource: string, unit: string}>
}
