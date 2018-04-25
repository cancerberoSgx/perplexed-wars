import { createStore, combineReducers } from 'redux';
import { addNewUnit, clickAddNewUnitButton } from './addNewUnit';
import { gameLoop } from './gameLoop';
import { selectUnit } from './selectUnit';
import { changeGameSettings } from './changeGameSettings';
export var allReducers = combineReducers({
    addNewUnit: addNewUnit, clickAddNewUnitButton: clickAddNewUnitButton, gameLoop: gameLoop, selectUnit: selectUnit, changeGameSettings: changeGameSettings
});
export var store = createStore(allReducers);
//# sourceMappingURL=store.js.map