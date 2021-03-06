import { IPlayer, IState } from '../state/state-interfaces'
import { State } from '../state/state'

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

export class PlayerEndOfTurnAvailablePlacesResolver implements PlayerEndOfTurnResolver {
  public resolve ({ state, player }: { state: IState, player: IPlayer }): void {
    State.getHelper().playerControls(state, player.id).availablePlaces = State.getHelper().getAvailablePlacesFor(state, player.id)
  }
}

export interface PlayerEndOfTurnResolver {
  resolve ({ state, player }: PlayerEndOfTurnResolverData): void
}
export interface PlayerEndOfTurnResolverData {
  state: IState, player: IPlayer
}
export const playerEndOfTurnResolvers: PlayerEndOfTurnResolver[] = [
  new PlayerEndOfTurnResourceResolver(), new PlayerEndOfTurnAvailablePlacesResolver(),
]
