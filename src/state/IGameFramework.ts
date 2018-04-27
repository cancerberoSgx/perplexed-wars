import { ISelectUnitAction } from "../reducers/selectUnit";
import { IAddUnitAction } from "../reducers/addNewUnit";
import { EventEmitter } from "events";
import { IPlayerUIState, IBox, IUnit, IState, IPlayer } from "./state-interfaces";
import { IA } from "../ia/ia-interfaces";
import { ITurnEndAction } from "reducers/gameLoop";

export enum Events {
  EVENT_BEFORE_UNIT_SELECTION = 'beforeUnitSelection',
  EVENT_AFTER_UNIT_SELECTION = 'afterUnitSelection',
  EVENT_BEFORE_ADD_UNIT_SUCCESS = 'beforeAddUnitSuccess',
  EVENT_AFTER_ADD_UNIT = 'afterAddUnit',
  EVENT_BEFORE_GAME_FINISH = 'beforeGameFinish',
  EVENT_BEFORE_TURN_END = 'beforeTurnEnd',
  EVENT_AFTER_TURN_END = 'afterTurnEnd'
  
}

export interface IGameFramework extends EventEmitter{

  /** starts the game */
  start():void

  stop():void

  /** implements next turn (setInterval / setTimeout)  accordingly to [[IGame.isRealTime]] and [[IGame.interval]] */
  nextTurn(): void
  
  log(log):void


  

  on(eventName: Events.EVENT_BEFORE_UNIT_SELECTION, eventHandler: typeof beforeUnitSelection): this;  
  emit(eventName: Events.EVENT_BEFORE_UNIT_SELECTION, data: BeforeUnitSelectionEvent): boolean;  

  on(eventName: Events.EVENT_AFTER_UNIT_SELECTION, eventHandler: typeof afterUnitSelection): this;  
  emit(eventName: Events.EVENT_AFTER_UNIT_SELECTION, data: AfterUnitSelectionEvent): boolean;  
  

  on(eventName: Events.EVENT_BEFORE_ADD_UNIT_SUCCESS, eventHandler: typeof beforeAddUnitSuccess): this;  
  emit(eventName: Events.EVENT_BEFORE_ADD_UNIT_SUCCESS, data: BeforeAddUnitSuccessEvent): boolean;  
   

  on(eventName: Events.EVENT_AFTER_ADD_UNIT, eventHandler: typeof afterAddUnit): this;  
  emit(eventName: Events.EVENT_AFTER_ADD_UNIT, data: AfterAddUnitEvent): boolean;  


  on(eventName: Events.EVENT_BEFORE_GAME_FINISH, eventHandler: typeof beforeGameFinish): this;  
  emit(eventName: Events.EVENT_BEFORE_GAME_FINISH, data: BeforeGameFinishEvent): boolean;  

  on(eventName: Events.EVENT_BEFORE_TURN_END, eventHandler: typeof beforeTurnEnd): this;  
  emit(eventName: Events.EVENT_BEFORE_TURN_END, data: BeforeTurnEndEvent): boolean;  

  on(eventName: Events.EVENT_AFTER_TURN_END, eventHandler: typeof afterTurnEnd): this;  
  emit(eventName: Events.EVENT_AFTER_TURN_END, data: AfterTurnEndEvent): boolean;  

}



/**
 * Triggered just before turn is about to end (units didn't moved yet)
 * @asMemberOf IGameFramework
 * @event
 */
export declare function afterTurnEnd(event: AfterTurnEndEvent):void;

/** triggered just before turn ends (units didn't moved yet) */
export interface AfterTurnEndEvent extends GameFrameworkEvent {
  action: ITurnEndAction
}

/**
 * Triggered just before turn is about to end (units didn't moved yet)
 * @asMemberOf IGameFramework
 * @event
 */
export declare function beforeTurnEnd(event: BeforeTurnEndEvent):void;

/** triggered just before turn ends (units didn't moved yet) */
export interface BeforeTurnEndEvent extends GameFrameworkCancelableEvent {
  action: ITurnEndAction
}


export interface GameFrameworkEvent {
  state:IState // this is more for the user that is using our own handlers and its StateModifiers need access to the whole thing 
}
export interface GameFrameworkCancelableEvent extends GameFrameworkEvent {
  /** the agent triggering the event can pass a callback funcion and if any listener cancel it (synchronously) emitter can decide to cancel the whole action. This is only for BEFORE_* events */
  cancelCallback: (reason:string)=>void
}

/**
 * Triggered just before unit(s) are selected by the user
 * @asMemberOf IGameFramework
 * @event
 */
export declare function beforeUnitSelection(event: BeforeUnitSelectionEvent):void;

/** triggered just before user select a unit */
export interface BeforeUnitSelectionEvent extends GameFrameworkEvent {
  selection: Array<{
      unitId: string;
      boxId: string;
  }>;
  action: ISelectUnitAction;
}

/**
 * Triggered after unit(s) were selected by the user
 * @asMemberOf IGameFramework
 * @event
 */
export declare function afterUnitSelection(event: AfterUnitSelectionEvent):void;

/** triggered after user selected a unit */
export interface  AfterUnitSelectionEvent  extends GameFrameworkEvent  {
  selection: Array<{
      unitId: string;
      boxId: string;
  }>
  action: ISelectUnitAction
  previousSelection: Array<{
    unitId: string;
    boxId: string;
  }>
}

/**
 * Triggered just before units are going to be added successfully to the board
 * @asMemberOf IGameFramework
 * @event
 */
export declare function beforeAddUnitSuccess(event: BeforeAddUnitSuccessEvent):void;
export interface BeforeAddUnitSuccessEvent extends GameFrameworkCancelableEvent  {
  action: IAddUnitAction;
  player: IPlayerUIState;
  box: IBox;
}
/**
 * Triggered after a unit was successfully added in the board
 * @asMemberOf IGameFramework
 * @event
 */
export declare function afterAddUnit(event: AfterAddUnitEvent):void;
export interface AfterAddUnitEvent extends GameFrameworkEvent  {
  action: IAddUnitAction;
  newUnit: IUnit
  player: IPlayerUIState;
  box: IBox;
}




/**
 * Triggered just before units are going to be added successfully to the board
 * @asMemberOf IGameFramework
 * @event
 */
export declare function beforeGameFinish(event: BeforeGameFinishEvent):void;
export interface BeforeGameFinishEvent extends GameFrameworkEvent  {
  /** id of the winner player */
  winner: string
}



export interface Log { 
  message: string
  type: 'internal'|'warning'|'error'|'tip'|'help'|'internalerror'
}