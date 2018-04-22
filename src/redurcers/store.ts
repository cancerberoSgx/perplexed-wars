import { createStore, Store, combineReducers } from 'redux';
import {addNewUnit, clickAddNewUnitButton} from './addNewUnit'
import {gameLoop} from './gameLoop'

export const allReducers = combineReducers({
  addNewUnit, clickAddNewUnitButton, gameLoop
})

export const store:Store = createStore(allReducers)