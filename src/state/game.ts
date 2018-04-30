import { EventEmitter } from 'events'
import { ACTION_GAME_LOOP_INCREMENT_INTERVAL, ITurnEndAction } from '../reducers/gameLoop'
import { store } from '../reducers/store'
import { GameUIStateHelper } from './GameUIStateHelper'
import { Events, IGameFramework } from './IGameFramework'
import { Behavior } from './behavior'
import { State } from './state'
import { Log } from './state-interfaces'

/**
 * responsible of the game life cycle mostly about turn and dispatching action [[ACTION_GAME_LOOP_INCREMENT_INTERVAL]]
 *  It dialogues with implementor on start to let him modify the state and then instantiate this UI related elements in IState
 * usage: `Game.getInstance()` which returns [[IGameFramework]] - for this is supported by [[UIStatePlayerControls]]
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
      GameUIStateHelper.initializeUIState(state)
      this.emit(Events.EVENT_BEFORE_GAME_STARTS, {state, ready: () => {
        GameUIStateHelper.setupPlayerControls(state)
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
      State.modify(State.get(), (state) => {
        state.uiState.playerControls.find(p => !!state.players.find(p => !p.isAI)).message = { message:'Game finish, winner is ' + state.game.winner + '. Bye.' , type: 'blocking' }
      })
      store().dispatch({ type: ACTION_GAME_LOOP_INCREMENT_INTERVAL })
      this.stop()
      return
    }
    if (!State.get().game.paused) {
      console.time('gamenextTurn')
      const action: ITurnEndAction = {
        type: ACTION_GAME_LOOP_INCREMENT_INTERVAL,
      }
      store().dispatch(action)
      Behavior.get().players.forEach(p => p.ia && p.ia.yourTurn(State.get()))
      console.timeEnd('gamenextTurn')
    }
  }

  public log (log: Log, player:string= State.get().players.find(p => !p.isAI).id): void {
    const humanControls = State.get().uiState.playerControls.find(c => c.playerId === player)
    State.modify(State.get(), (s) => {
      humanControls.message = log
    })
    setTimeout(() => {
      State.modify(State.get(), (s) => {
        humanControls.message = null
      })
    }, humanControls.notificationTimeout || 2000)
  }
}
