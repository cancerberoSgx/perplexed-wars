import { EventEmitter } from 'events'
import { ACTION_GAME_LOOP_INCREMENT_INTERVAL, ITurnEndAction } from '../reducers/gameLoop'
import { store } from '../reducers/store'
import { State } from './state'
import { IGameFramework, Events, BeforeUnitSelectionEvent, AfterUnitSelectionEvent, AfterAddUnitEvent, BeforeGameFinishEvent, BeforeAddUnitSuccessEvent, Log } from './IGameFramework'
import { IA } from '../ia/ia-interfaces'
import { StateAccessHelper } from './StateAccessHelper'
import { IPlayer } from './state-interfaces'
import { Behavior } from './behavior'

/**
 * responsible of the game life cycle mostly about turn and dispatching action [[ACTION_GAME_LOOP_INCREMENT_INTERVAL]]
 *
 * usage: `Game.getInstance()` which returns [[IGameFramework]]
 */
export class Game extends EventEmitter implements IGameFramework {
  private static instance
  private intervalId: NodeJS.Timer
  private alreadyStarted:boolean = false

  private constructor () {
    super()
    this.setMaxListeners(100)
  }
  public static getInstance (): IGameFramework {
    if (!this.instance) {
      this.instance = new Game()
    }
    return this.instance
  }

  public start () {
    if (!this.alreadyStarted) {
      const state = State.get()
      if (!Behavior.get().gameBehaviors || !Behavior.get().gameBehaviors.length) {
        this.on(Events.EVENT_BEFORE_GAME_STARTS, (e) => {e.ready()})
      }
      state.uiState = state.uiState ||  { 
        currentPlayer: state.players.find(p => !p.isAI).id,
        playerControls: [],
        unitSelection: [],
        unitAttacks: [],
        unitDeads: [],
      }
      this.emit(Events.EVENT_BEFORE_GAME_STARTS, {state, ready: () => {
        state.players.forEach(p => {
          const playerControl = { playerId: p.id, addUnitButtons: [] }
          p.unitTypes.forEach(unitType => {
            playerControl.addUnitButtons.push({ unitTypeId: unitType, pressed: false })
          })
          state.uiState.playerControls.push(playerControl)
        })
        this.emit(Events.EVENT_AFTER_GAME_STARTS, { state })
        this.resume()
      }})
      
      this.alreadyStarted = true
    } else {
      this.resume()
    }
  }
  public resume() {
    clearInterval(this.intervalId)
    this.nextTurn()
    if (State.get().game.realTime) {
      this.intervalId = setInterval(() => {
        this.nextTurn()
      }, State.get().game.interval)
    }
  }

  public stop (): any {
    clearInterval(this.intervalId)
    // TODO: trigger event game stopped
  }

  public nextTurn (): void {
    if (State.get().game.gameFinish) {
      alert('Game finish, winner is ' + State.get().game.winner + '. Bye.')
      this.stop()
      return
    }
    if (!State.get().game.paused) {
      const action: ITurnEndAction = {
        type: ACTION_GAME_LOOP_INCREMENT_INTERVAL,
      }
      store().dispatch(action)
      Behavior.get().players.forEach(p => p.ia && p.ia.yourTurn(State.get()))

    }
  }

  public log (log: Log): void {
    console.log(log.message)
  }
}
