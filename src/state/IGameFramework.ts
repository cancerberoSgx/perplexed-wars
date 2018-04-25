import { ISelectUnitAction } from "../reducers/selectUnit";
import { IAddUnitAction } from "../reducers/addNewUnit";
// import { IPlayerUIState, IBox } from "./interfaces";
import { EventEmitter } from "events";
import { IPlayerUIState, IBox, IUnit } from "./state-interfaces";

export interface IGameFramework extends EventEmitter{
  start():void
  stop():void
  nextTurn():void

  on(eventName: 'beforeUnitSelection', eventHandler: typeof beforeUnitSelection): this;  
  emit(eventName: 'beforeUnitSelection', data: BeforeUnitSelectionEvent): this;  

  on(eventName: 'afterUnitSelection', eventHandler: typeof afterUnitSelection): this;  
  emit(eventName: 'afterUnitSelection', data: AfterUnitSelectionEvent): boolean;  
  

  on(eventName: 'beforeAddUnitSuccess', eventHandler: typeof beforeAddUnitSuccess): this;  
  emit(eventName: 'beforeAddUnitSuccess', data: BeforeAddUnitSuccessEvent): boolean;  
   

  on(eventName: 'afterAddUnit', eventHandler: typeof afterAddUnit): this;  
  emit(eventName: 'afterAddUnit', data: AfterAddUnitEvent): boolean;  


  on(eventName: 'beforeGameFinish', eventHandler: typeof beforeGameFinish): this;  
  emit(eventName: 'beforeGameFinish', data: BeforeGameFinishEvent): boolean;  


}

/**
 * Triggered just before unit(s) are selected by the user
 * @asMemberOf IGameFramework
 * @event
 */
export declare function beforeUnitSelection(event: BeforeUnitSelectionEvent):void;


export interface BeforeUnitSelectionEvent {
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

export interface  AfterUnitSelectionEvent  {
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
export interface BeforeAddUnitSuccessEvent {
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
export interface AfterAddUnitEvent {
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
export interface BeforeGameFinishEvent {
  /** id of the winner player */
  winner: string
}


