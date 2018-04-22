import { createStore, Store, combineReducers } from 'redux';
import {addNewUnit, clickAddNewUnitButton} from './addNewUnit'
import {gameLoop} from './gameLoop'
import {selectUnit} from './selectUnit'
import {changeGameSettings} from './changeGameSettings'

export const allReducers = combineReducers({
  addNewUnit, clickAddNewUnitButton, gameLoop, selectUnit, changeGameSettings
})

export const store:Store = createStore(allReducers)