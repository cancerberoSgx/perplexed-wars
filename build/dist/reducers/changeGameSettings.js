import { State } from "../state/state";
import { Game } from "../state/game";
export var ACTION_CHANGE_GAME_SETTINGS = 'change-game-settings';
export function changeGameSettings(state, action) {
    state = State.get();
    if (action.type !== ACTION_CHANGE_GAME_SETTINGS) {
        return state;
    }
    return State.modify(state, function (s) {
        s.game.paused = action.paused !== undefined ? action.paused : s.game.paused;
        s.game.realTime = action.realTime !== undefined ? action.realTime : s.game.realTime;
        s.game.interval = action.interval !== undefined ? action.interval : s.game.interval;
        s.game.allowDiagonal = action.allowDiagonal !== undefined ? action.allowDiagonal : s.game.allowDiagonal;
        if (action.realTime !== undefined || action.interval !== undefined) {
            setTimeout(function () {
                Game.getInstance().stop();
                Game.getInstance().start();
            }, 100);
        }
    });
}
//# sourceMappingURL=changeGameSettings.js.map