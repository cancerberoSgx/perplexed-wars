var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ACTION_GAME_LOOP_INCREMENT_INTERVAL } from "../reducers/gameLoop";
import { store } from "../reducers/store";
import registerServiceWorker from '../registerServiceWorker';
import { State } from "./state";
import { EventEmitter } from "events";
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        return _super.call(this) || this;
    }
    Game.getInstance = function () {
        if (!this.instance) {
            this.instance = new Game();
        }
        return this.instance;
    };
    Game.prototype.start = function () {
        var _this = this;
        this.nextTurn();
        if (State.get().game.realTime) {
            this.intervalId = setInterval(function () {
                _this.nextTurn();
            }, State.get().game.interval);
        }
        registerServiceWorker();
    };
    Game.prototype.stop = function () {
        clearInterval(this.intervalId);
    };
    Game.prototype.nextTurn = function () {
        if (State.get().game.gameFinish) {
            alert('Game finish, winner is ' + State.get().game.winner + '. Bye.');
            this.stop();
            return;
        }
        if (!State.get().game.paused) {
            store.dispatch({
                type: ACTION_GAME_LOOP_INCREMENT_INTERVAL
            });
        }
    };
    return Game;
}(EventEmitter));
export { Game };
//# sourceMappingURL=game.js.map