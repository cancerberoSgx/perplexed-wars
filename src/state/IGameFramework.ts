import { ISelectUnitAction } from '../reducers/selectUnit'
import { IAddUnitAction } from '../reducers/addNewUnit'
import { EventEmitter } from 'events'
import { IPlayerUIState, IBox, IUnit, IState, IPlayer, IUnitSelectionInfo, Log } from './state-interfaces'
import { IA } from '../ia/ia-interfaces'
import { ITurnEndAction } from 'reducers/gameLoop'
import { IUnitActionResolverData } from 'resolvers/unitActionResolvers'

export enum Events {
  EVENT_BEFORE_UNIT_SELECTION = 'beforeUnitSelection',
  EVENT_AFTER_UNIT_SELECTION = 'afterUnitSelection',
  EVENT_BEFORE_ADD_UNIT_SUCCESS = 'beforeAddUnitSuccess',
  EVENT_AFTER_ADD_UNIT = 'afterAddUnit',
  EVENT_BEFORE_GAME_FINISH = 'beforeGameFinish',
  EVENT_BEFORE_TURN_END = 'beforeTurnEnd',
  EVENT_AFTER_TURN_END = 'afterTurnEnd',
  EVENT_BEFORE_GAME_STARTS = 'beforeGameStarts',
  EVENT_AFTER_GAME_STARTS = 'afterGameStart',
  EVENT_AFTER_UNIT_DIE = 'afterUnitDie',

}

export interface IGameFramework extends EventEmitter {

  /** starts the game */
  start (): void

  stop (): void
  
  resume(): void
  /** implements next turn (setInterval / setTimeout)  accordingly to [[IGame.isRealTime]] and [[IGame.interval]] */
  nextTurn (): void

  log (log:Log): void

  on (eventName: Events.EVENT_BEFORE_UNIT_SELECTION, eventHandler: typeof beforeUnitSelection): this
  emit (eventName: Events.EVENT_BEFORE_UNIT_SELECTION, data: BeforeUnitSelectionEvent): boolean

  on (eventName: Events.EVENT_AFTER_UNIT_SELECTION, eventHandler: typeof afterUnitSelection): this
  emit (eventName: Events.EVENT_AFTER_UNIT_SELECTION, data: AfterUnitSelectionEvent): boolean

  on (eventName: Events.EVENT_BEFORE_ADD_UNIT_SUCCESS, eventHandler: typeof beforeAddUnitSuccess): this
  emit (eventName: Events.EVENT_BEFORE_ADD_UNIT_SUCCESS, data: BeforeAddUnitSuccessEvent): boolean

  on (eventName: Events.EVENT_AFTER_ADD_UNIT, eventHandler: typeof afterAddUnit): this
  emit (eventName: Events.EVENT_AFTER_ADD_UNIT, data: AfterAddUnitEvent): boolean

  on (eventName: Events.EVENT_BEFORE_GAME_FINISH, eventHandler: typeof beforeGameFinish): this
  emit (eventName: Events.EVENT_BEFORE_GAME_FINISH, data: BeforeGameFinishEvent): boolean

  on (eventName: Events.EVENT_BEFORE_TURN_END, eventHandler: typeof beforeTurnEnd): this
  emit (eventName: Events.EVENT_BEFORE_TURN_END, data: BeforeTurnEndEvent): boolean

  on (eventName: Events.EVENT_AFTER_TURN_END, eventHandler: typeof afterTurnEnd): this
  emit (eventName: Events.EVENT_AFTER_TURN_END, data: AfterTurnEndEvent): boolean

  on (eventName: Events.EVENT_BEFORE_GAME_STARTS, eventHandler: typeof beforeGameStarts): this
  emit (eventName: Events.EVENT_BEFORE_GAME_STARTS, data: BeforeGameStartsEvent): boolean

  on (eventName: Events.EVENT_AFTER_GAME_STARTS, eventHandler: typeof afterGameStarts): this
  emit (eventName: Events.EVENT_AFTER_GAME_STARTS, data: AfterGameStartsEvent): boolean

  on (eventName: Events.EVENT_AFTER_UNIT_DIE, eventHandler: typeof afterUnitDie): this
  emit (eventName: Events.EVENT_AFTER_UNIT_DIE, data: AfterUnitDieEvent): boolean
  

  
}

/**
 * Triggered just before turn is about to end (units didn't moved yet)
 * @asMemberOf IGameFramework
 * @event
 */
export declare function afterTurnEnd(event: AfterTurnEndEvent): void
/** triggered just before turn ends (units didn't moved yet) */
export interface AfterTurnEndEvent extends GameFrameworkEvent {
  action: ITurnEndAction
}



/**
 * Triggered after a unit die and is removed from the board
 * @asMemberOf IGameFramework
 * @event
 */
export declare function afterUnitDie(event: AfterUnitDieEvent): void
/** Triggered after a unit die and is removed from the board */
export interface AfterUnitDieEvent extends GameFrameworkEvent {
  attacked: IUnit, attackedBox: IBox, attacker: IUnit, 
  attackerBox: IBox, attackerPlayer: IPlayer
}


/**
 * Triggered just before turn is about to end (units didn't moved yet)
 * @asMemberOf IGameFramework
 * @event
 */
export declare function afterGameStarts(event: GameFrameworkEvent): void
export interface AfterGameStartsEvent extends GameFrameworkEvent {
}



/**
 * Triggered just before the game starts (no turns passed yet, nothing was drawn yet)
 * @asMemberOf IGameFramework
 * @event
 */
export declare function beforeGameStarts(event: BeforeGameStartsEvent): void

/** triggered just before turn ends (units didn't moved yet). IMPORTANT: is mandatory that the [[ready]] callback is called if not the game won't start */
export interface BeforeGameStartsEvent extends GameFrameworkEvent {
  /**this callback must be called if not the game won't start */
  ready()
}

/**
 * Triggered just before turn is about to end (units didn't moved yet)
 * @asMemberOf IGameFramework
 * @event
 */
export declare function beforeTurnEnd(event: BeforeTurnEndEvent): void

/** triggered just before turn ends (units didn't moved yet) */
export interface BeforeTurnEndEvent extends GameFrameworkCancelableEvent {
  action: ITurnEndAction
}

export interface GameFrameworkEvent {
  state: IState // this is more for the user that is using our own handlers and its StateModifiers need access to the whole thing
}
export interface GameFrameworkCancelableEvent extends GameFrameworkEvent {
  /** the agent triggering the event can pass a callback function and if any listener cancel it (synchronously) emitter can decide to cancel the whole action. This is only for BEFORE_* events */
  cancelCallback: (reason: string) => void
}

/**
 * Triggered just before unit(s) are selected by the user
 * @asMemberOf IGameFramework
 * @event
 */
export declare function beforeUnitSelection(event: BeforeUnitSelectionEvent): void

/** triggered just before user select a unit */
export interface BeforeUnitSelectionEvent extends GameFrameworkEvent {
  // tslint:disable-next-line:prefer-array-literal
  selection: Array<IUnitSelectionInfo>
  action: ISelectUnitAction
}

/**
 * Triggered after unit(s) were selected by the user
 * @asMemberOf IGameFramework
 * @event
 */
export declare function afterUnitSelection(event: AfterUnitSelectionEvent): void

/** triggered after user selected a unit */
export interface AfterUnitSelectionEvent extends GameFrameworkEvent {
  selection: Array<IUnitSelectionInfo>
  action: ISelectUnitAction
  previousSelection: Array<IUnitSelectionInfo>
}

/**
 * Triggered just before units are going to be added successfully to the board
 * @asMemberOf IGameFramework
 * @event
 */
export declare function beforeAddUnitSuccess(event: BeforeAddUnitSuccessEvent): void
export interface BeforeAddUnitSuccessEvent extends GameFrameworkCancelableEvent {
  action: IAddUnitAction
  player: IPlayerUIState
  box: IBox
}
/**
 * Triggered after a unit was successfully added in the board
 * @asMemberOf IGameFramework
 * @event
 */
export declare function afterAddUnit(event: AfterAddUnitEvent): void
export interface AfterAddUnitEvent extends GameFrameworkEvent {
  action: IAddUnitAction
  newUnit: IUnit
  player: IPlayerUIState
  box: IBox
}

/**
 * Triggered just before units are going to be added successfully to the board
 * @asMemberOf IGameFramework
 * @event
 */
export declare function beforeGameFinish(event: BeforeGameFinishEvent): void
export interface BeforeGameFinishEvent extends GameFrameworkEvent {
  /** id of the winner player */
  winner: string
}

