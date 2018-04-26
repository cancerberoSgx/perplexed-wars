import { ISelectUnitAction } from "../reducers/selectUnit";
import { IAddUnitAction } from "../reducers/addNewUnit";
import { EventEmitter } from "events";
import { IPlayerUIState, IBox, IUnit, IState } from "./state-interfaces";

export enum Events {
  EVENT_BEFORE_UNIT_SELECTION = 'beforeUnitSelection',
  EVENT_AFTER_UNIT_SELECTION = 'afterUnitSelection',
  EVENT_BEFORE_ADD_UNIT_SUCCESS = 'beforeAddUnitSuccess',
  EVENT_AFTER_ADD_UNIT = 'afterAddUnit',
  EVENT_BEFORE_GAME_FINISH = 'beforeGameFinish',
  
}

export interface IGameFramework extends EventEmitter{
  start():void
  stop():void
  nextTurn():void

  on(eventName: Events.EVENT_BEFORE_UNIT_SELECTION, eventHandler: typeof beforeUnitSelection): this;  
  emit(eventName: Events.EVENT_BEFORE_UNIT_SELECTION, data: BeforeUnitSelectionEvent): this;  

  on(eventName: Events.EVENT_AFTER_UNIT_SELECTION, eventHandler: typeof afterUnitSelection): this;  
  emit(eventName: Events.EVENT_AFTER_UNIT_SELECTION, data: AfterUnitSelectionEvent): boolean;  
  

  on(eventName: Events.EVENT_BEFORE_ADD_UNIT_SUCCESS, eventHandler: typeof beforeAddUnitSuccess): this;  
  emit(eventName: Events.EVENT_BEFORE_ADD_UNIT_SUCCESS, data: BeforeAddUnitSuccessEvent): boolean;  
   

  on(eventName: Events.EVENT_AFTER_ADD_UNIT, eventHandler: typeof afterAddUnit): this;  
  emit(eventName: Events.EVENT_AFTER_ADD_UNIT, data: AfterAddUnitEvent): boolean;  


  on(eventName: Events.EVENT_BEFORE_GAME_FINISH, eventHandler: typeof beforeGameFinish): this;  
  emit(eventName: Events.EVENT_BEFORE_GAME_FINISH, data: BeforeGameFinishEvent): boolean;  
}

/**
 * Triggered just before unit(s) are selected by the user
 * @asMemberOf IGameFramework
 * @event
 */
export declare function beforeUnitSelection(event: BeforeUnitSelectionEvent):void;

export interface GameFrameworkEvent {
  state:IState // this is more for the user that is using our own handlers and its StateModifiers need access to the whole thing 
}
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
export interface BeforeAddUnitSuccessEvent extends GameFrameworkEvent  {
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


