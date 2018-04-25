import { State } from "../state/state";
import { getAvailablePlacesFor } from "../util/util";
import { Game } from "../state/game";
export var ACTION_ADD_UNIT = 'add-unit';
export var ACTION_ADD_UNIT_CLICK_BUTTON = 'add-unit-click-button';
export function clickAddNewUnitButton(state, action) {
    state = State.get();
    if (action.type !== ACTION_ADD_UNIT_CLICK_BUTTON) {
        return state;
    }
    return State.modify(state, function (s) {
        s.uiState.playerControls.find(function (pc) { return pc.playerId === action.playerId; }).addUnitButtons.forEach(function (b) {
            b.pressed = b.unitTypeId === action.unitId;
        });
    });
}
export function addNewUnit(state, action) {
    state = State.get();
    if (action.type !== ACTION_ADD_UNIT) {
        return state;
    }
    var currentPlayer = state.uiState.playerControls.find(function (pc) {
        return !!pc.addUnitButtons.find(function (but) { return but.pressed; });
    });
    if (!currentPlayer) { // this probably means that user is selecting a unit in the board (didn't previously clicked add-unit button)
        return state;
    }
    var button = currentPlayer.addUnitButtons.find(function (b) { return b.pressed; });
    if (!button) {
        console.log('No unit selected!');
        return state;
    }
    action.unitId = action.unitId || button.unitTypeId;
    return State.modify(state, function (s) {
        var box = s.board.boxes.find(function (b) { return b.x === action.x && b.y === action.y; });
        var availablePlaces = getAvailablePlacesFor(currentPlayer.playerId, state);
        if (box !== undefined && availablePlaces.find(function (p) { return p.x === action.x && p.y === action.y; })) {
            Game.getInstance().emit('before-add-unit-successfully', { action: action, player: currentPlayer, box: box });
            var newUnit = State.newUnit(state, action.unitId, currentPlayer.playerId);
            box.units.push(newUnit);
            Game.getInstance().emit('after-add-unit', { newUnit: newUnit, action: action, player: currentPlayer, box: box });
        }
        else {
            console.log('Cannot add unit there - box is outiside territory');
        }
        s.uiState.playerControls.forEach(function (pc) { return pc.addUnitButtons.forEach(function (b) { return b.pressed = false; }); });
    });
}
//# sourceMappingURL=addNewUnit.js.map