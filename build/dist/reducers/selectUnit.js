import { State } from "../state/state";
import { findUnit } from "../util/util";
import { Game } from "../state/game";
export var ACTION_SELECT_UNIT = 'select-unit';
export function selectUnit(state, action) {
    state = State.get();
    if (action.type !== ACTION_SELECT_UNIT) {
        return state;
    }
    return State.modify(state, function (s) {
        Game.getInstance().emit('before-unit-selected', { selection: s.uiState.unitSelection, action: action });
        var results = findUnit(s, function (unit) { return unit.id === action.unitId; }).map(function (r) { return ({ unitId: r.unit.id, boxId: r.box.id }); });
        var previousSelection = s.uiState.unitSelection;
        s.uiState.unitSelection = action.union ? s.uiState.unitSelection.concat(results) : results;
        Game.getInstance().emit('after-unit-selected', { selection: s.uiState.unitSelection, previousSelection: previousSelection, action: action });
    });
}
//# sourceMappingURL=selectUnit.js.map