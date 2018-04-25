// import { clone } from "../util/util";
import { State } from "./state";
import { war2ImplementationInitialState } from "../implementations/war2/war2ImplementationInitialState";
export var initialState = war2ImplementationInitialState;
export function buildUIStatePlayerControls(state) {
    state.players.forEach(function (p) {
        var playerControl = { playerId: p.id, addUnitButtons: [] };
        p.unitTypes.forEach(function (unitType) {
            playerControl.addUnitButtons.push({ unitTypeId: unitType, pressed: false });
        });
        state.uiState.playerControls.push(playerControl);
    });
}
export function createBoxes(state, n, m, player0BaseId, player1BaseId) {
    var boxes = state.board.boxes = [];
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
            var box = {
                x: i,
                y: j,
                terrain: 'grey',
                units: [],
                id: "box-" + i + "-" + j
            };
            if (i === 0 && j === 0) {
                box.units.push(State.newUnit(state, player0BaseId, state.players[0].id));
            }
            if (i === n - 1 && j === m - 1) {
                box.units.push(State.newUnit(state, player1BaseId, state.players[1].id));
            }
            boxes.push(box);
        }
    }
    return boxes;
}
//# sourceMappingURL=initialState.js.map