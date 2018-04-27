import { Behavior } from '../state/behavior'
import { IPlayer, IState } from '../state/state-interfaces'
import { getAvailablePlacesFor } from 'util/util'
import { PlayerResources } from 'components/PlayerResources'

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
    state.uiState.playerControls.find(pc => pc.playerId === player.id).availablePlaces = getAvailablePlacesFor(player.id, state)
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
