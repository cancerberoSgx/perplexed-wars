import { ISelectUnitAction } from "../reducers/selectUnit";
import { IAddUnitAction } from "../reducers/addNewUnit";
import { IPlayerUIState, IBox } from "./interfaces";

export interface IGameFramework {
  start():void
  stop():void
  nextTurn():void

  /**
   * Adds a listener that will be notified just before a unit selection in the board by the user occurs
   * @param event The name of the event.
   * @param listener The callback function.
   */
  on(event: 'before-unit-selected', listener: (data: BeforeUnitSelectedData) => void): void;

  /**
   * Adds a listener that will be notified just after a unit selection in the board by the user occurs
   * @param event The name of the event.
   * @param listener The callback function.
   */
  on(event: 'after-unit-selected', listener: (data: AfterUnitSelectEventData) => void): void;

  /**
   * Adds a listener that will be notified just before a unit is about to be added successfully in the board. The difference with [[before-add-unit]] is that in the later, the action could still fail (ie: the user might be trying to add the unit in an invalid box). Notice that other listeners may still cancel this actoin 
   * @param event The name of the event.
   * @param listener The callback function.
   */
  on(event: 'before-add-unit-successfully', listener: (data: BeforeAddUnitSuccessFullyData) => void): void;

}
export interface BeforeUnitSelectedData {
  selection: Array<{
      unitId: string;
      boxId: string;
  }>;
  action: ISelectUnitAction;
}

export interface  AfterUnitSelectEventData  {
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

export interface BeforeAddUnitSuccessFullyData {
  action: IAddUnitAction;
  player: IPlayerUIState;
  box: IBox;
}