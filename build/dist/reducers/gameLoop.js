import { State } from "../state/state";
import { unitActionResolvers } from "../unitActionResolvers/unitActionResolvers";
import { iterateUnits } from "../util/util";
import { Game } from "../state/game";
export var ACTION_GAME_LOOP_INCREMENT_INTERVAL = 'game-loop-increment-interval';
export function gameLoop(state, action) {
    state = State.get();
    if (action.type !== ACTION_GAME_LOOP_INCREMENT_INTERVAL) {
        return state;
    }
    var winner = null;
    var gameFinish = true;
    state.uiState.unitAttacks = [];
    state.uiState.unitDeads = [];
    state.players.forEach(function (player) {
        gameFinish = true;
        iterateUnits(state, function (box, unit) {
            unitActionResolvers.forEach(function (resolver) { return resolver.resolve({ state: state, unit: unit, box: box, player: player }); });
            if (unit.type.isBase && unit.playerId === player.id) {
                gameFinish = false;
            }
        });
        if (gameFinish) {
            winner = state.players.find(function (p) { return p.id !== player.id; }).id;
        }
        // clean up moved flag from all units   
        iterateUnits(state, function (box, unit) {
            unit.moved = false;
        });
    });
    return State.modify(state, function (s) {
        if (winner) {
            s.game.gameFinish = true;
            s.game.winner = winner;
            Game.getInstance().emit('before-game-finish', { winner: winner });
        }
        s.game.time = s.game.time + s.game.interval;
    });
}
//# sourceMappingURL=gameLoop.js.map