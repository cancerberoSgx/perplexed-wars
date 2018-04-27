import { Behavior } from '../state/behavior'
import { IPlayer, IState } from '../state/state-interfaces'

export class PlayerEndOfTurnResourceResolver implements PlayerEndOfTurnResolver {
  public resolve ({ state, player }: { state: IState, player: IPlayer }): void {
    // at this moment, all player [[IStateModifier]] should have been already executed, so [[thisTurnValue]] is the final one. We just sum and reset
    player.resources.forEach(resource => {
      resource.value += resource.thisTurnValue
      // we start the new turn with the default value per turn
      resource.thisTurnValue = resource.defaultValuePerTurn
    })
  }
}

// export class IaEndOfTurnResolver implements PlayerEndOfTurnResolver {
//   public resolve({ state, player }: { state: IState, player: IPlayer }): void {
//     Behavior.get().players.forEach(p => p.ia && p.ia.yourTurn(state))
//   }
// }

export interface PlayerEndOfTurnResolver {
  resolve ({ state, player }: PlayerEndOfTurnResolverData): void
}
export interface PlayerEndOfTurnResolverData {
  state: IState, player: IPlayer
}
export const playerEndOfTurnResolvers: PlayerEndOfTurnResolver[] = [
  // new IaEndOfTurnResolver(),
  new PlayerEndOfTurnResourceResolver()
]
