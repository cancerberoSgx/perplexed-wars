import { createStore, Store, combineReducers } from 'redux';

import {addNewUnit, clickAddNewUnitButton} from './addNewUnit'
export const allReducers = combineReducers({
  addNewUnit, clickAddNewUnitButton
})

export const store:Store = createStore(allReducers)