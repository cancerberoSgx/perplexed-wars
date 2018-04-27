import { IState, IUnit, IBox, IPlayer } from '../state/state-interfaces'
import { MoveResolver } from './moveResolver'
import { AttackResolver } from './attackResolver'

export interface IUnitActionResolver {
  /**
   * will resolve some aspect of given unit's actions, like movement or attack. for each unit, resolvers will be executed in order defined in [[unitActionResolvers]] array and if in some resolver the unit consume all its "movement points" then the resolver should mark it using unit.moved=true so the next resolvers don't act. For example, attack resolver will consume unit action points by attacking units in range, and because arrayResolver is before in the array, in case a unit attack it will consume all its points attacking and wont move. s
   *
   */
  resolve (data: IUnitActionResolverData): void
}
export interface IUnitActionResolverData {
  state: IState,unit: IUnit, box: IBox, player: IPlayer
}
export const unitActionResolvers: IUnitActionResolver[] = [
  new AttackResolver(),
  new MoveResolver()
]
