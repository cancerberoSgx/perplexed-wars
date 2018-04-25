import { createStore, Store, combineReducers, AnyAction } from 'redux';
import {addNewUnit, clickAddNewUnitButton} from './addNewUnit'
import {gameLoop} from './gameLoop'
import {selectUnit} from './selectUnit'
import {changeGameSettings} from './changeGameSettings'
import {IState} from '../state/state-interfaces'

export const allReducers = combineReducers({
  addNewUnit, clickAddNewUnitButton, gameLoop, selectUnit, changeGameSettings
})

export const store:Store = createStore(allReducers)