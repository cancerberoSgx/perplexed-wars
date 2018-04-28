import { createStore, Store, combineReducers, AnyAction } from 'redux'
import { addNewUnit } from './addNewUnit'
import { clickAddNewUnitButton } from './clickAddNewUnitButton'
import { gameLoop } from './gameLoop'
import { selectUnit } from './selectUnit'
import { changeGameSettings } from './changeGameSettings'
import { IState } from '../state/state-interfaces'

let storeInternal
export function store() {
  if (!storeInternal) {

    const allReducers = combineReducers({
      addNewUnit, clickAddNewUnitButton, gameLoop, selectUnit, changeGameSettings,
    })
    storeInternal = createStore(allReducers)
  }
  return storeInternal
}
// export const store: () => Store = () => {
//   const allReducers = combineReducers({
//     addNewUnit, clickAddNewUnitButton, gameLoop, selectUnit, changeGameSettings
//   })
//   const store2: Store = createStore(allReducers)
//   return store2
// }
