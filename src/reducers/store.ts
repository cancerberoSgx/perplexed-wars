import { createStore, Store, combineReducers } from 'redux';
import {addNewUnit, clickAddNewUnitButton} from './addNewUnit'
import {gameLoop} from './gameLoop'
import {selectUnit} from './selectUnit'

export const allReducers = combineReducers({
  addNewUnit, clickAddNewUnitButton, gameLoop, selectUnit
})

export const store:Store = createStore(allReducers)