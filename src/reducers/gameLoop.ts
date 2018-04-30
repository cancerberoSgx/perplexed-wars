import { Action } from 'redux'
import { playerEndOfTurnResolvers } from '../resolvers/playerEndOfTurnResolvers'
import { unitActionResolvers } from '../resolvers/unitActionResolvers'
import { Game } from '../state/game'
import { State } from '../state/state'
import { IBox, IState, IUnit } from '../state/state-interfaces'
import { iterateUnits } from '../util/util'
import { Events, BeforeTurnEndEvent } from '../state/IGameFramework'

export const ACTION_GAME_LOOP_INCREMENT_INTERVAL: 'game-loop-increment-interval' = 'game-loop-increment-interval'

export interface ITurnEndAction {
  type: 'game-loop-increment-interval'
}
/**
 * This is the most important reducer, actionated fromm the game loop (setinterval that is on [[Game]]).
 * It's responsible of incrementing the game.time but before that it will call each unintActionResolvers (responsible of unit movement / attack) and game-level and player-level resolvers like the resourceResolver in charge of sum each player's [[IResource.thisTurnValue]] to the total value.
 *
 * @param state
 * @param action
 */
export function gameLoop(state: IState, action: Action): IState {
  state = state || State.get()
  if (action.type !== ACTION_GAME_LOOP_INCREMENT_INTERVAL) {
    return state
  }

  Game.getInstance().emit(Events.EVENT_BEFORE_TURN_END, { state, action } as BeforeTurnEndEvent)
  // console.time('gameLoop')
  let winner: string = null
  let gameFinish = true
  state.uiState.unitAttacks = []
  state.uiState.unitDeads = []
  state.players.forEach(player => {
    gameFinish = true
    iterateUnits(state, (box: IBox, unit: IUnit) => {
      unitActionResolvers.forEach(resolver => resolver.resolve({ state, unit, box, player }))
      if (unit.type.isBase && unit.playerId === player.id) {
        gameFinish = false
      }
    })
    if (gameFinish) {
      winner = state.players.find(p => p.id !== player.id).id
    }
    // clean up moved flag from all units
    iterateUnits(state, (box: IBox, unit: IUnit) => {
      unit.moved = false
    })

    playerEndOfTurnResolvers.forEach(resolver => {
      resolver.resolve(({ player, state }))
    })
  })

  return State.modify(state, s => {
    if (winner) {
      Game.getInstance().emit(Events.EVENT_BEFORE_GAME_FINISH, { winner, state })
      s.game.gameFinish = true
      s.game.winner = winner
    } else {
      s.game.time = s.game.time + s.game.interval
      Game.getInstance().emit(Events.EVENT_AFTER_TURN_END, { action, state })
    }
  })
  // console.timeEnd('gameLoop')
  // return s
}
