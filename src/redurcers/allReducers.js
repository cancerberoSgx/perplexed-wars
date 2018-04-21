import { combineReducers } from "redux";
import {addNewUnit, clickAddNewUnitButton} from './addNewUnit'
export const allReducers = combineReducers({
  addNewUnit, clickAddNewUnitButton
})