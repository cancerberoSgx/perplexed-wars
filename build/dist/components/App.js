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
import * as React from 'react';
import * as logo from '../assets/logo.png';
import { Game } from '../state/game';
import './App.css';
import { BaseComponent } from './BaseComponent';
import { Board } from './Board';
import { UnitsPanel } from './UnitsPanel';
import { store } from '../reducers/store';
import { State } from '../state/state';
import { ACTION_CHANGE_GAME_SETTINGS } from '../reducers/changeGameSettings';
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        return _super.call(this, props) || this;
    }
    App.prototype.render = function () {
        return (React.createElement("div", { className: "container-fluid App" },
            React.createElement("header", { className: "App-header row" },
                React.createElement("div", { className: "col-4" },
                    React.createElement("img", { className: "App-logo", src: logo, alt: "perplexed wars" })),
                React.createElement("div", { className: "StatusPanel col-8" },
                    !this.state.game.realTime && React.createElement("span", null,
                        React.createElement("button", { onClick: Game.getInstance().nextTurn }, "Next Turn!")),
                    React.createElement("span", null,
                        React.createElement("input", { type: "checkbox", checked: this.state.game.realTime, onChange: realTimeChanged }),
                        " Real Time? "),
                    React.createElement("span", null,
                        React.createElement("input", { type: "checkbox", checked: this.state.game.allowDiagonal, onChange: allowDiagonalChanged }),
                        "Allow Diagonals"),
                    this.state.game.realTime && React.createElement("span", null,
                        React.createElement("input", { type: "checkbox", checked: this.state.game.paused, onChange: pauseClicked }),
                        " Paused  "),
                    this.state.game.realTime && React.createElement("span", null,
                        "Interval: ",
                        React.createElement("input", { type: "number", onChange: changeInterval, defaultValue: this.state.game.interval + '' })),
                    React.createElement("div", null,
                        "TIME: ",
                        this.state.game.time / 1000,
                        " "))),
            React.createElement(UnitsPanel, null),
            React.createElement(Board, null)));
    };
    return App;
}(BaseComponent));
export { App };
function changeInterval(e) {
    var interval = parseInt(e.currentTarget.value, 10);
    if (interval > 200) { // TODO: validation and throttle
        store.dispatch({
            type: ACTION_CHANGE_GAME_SETTINGS,
            interval: interval
        });
    }
}
function allowDiagonalChanged(e) {
    store.dispatch({
        type: ACTION_CHANGE_GAME_SETTINGS,
        allowDiagonal: !State.get().game.allowDiagonal
    });
}
function realTimeChanged(e) {
    store.dispatch({
        type: ACTION_CHANGE_GAME_SETTINGS,
        realTime: !!e.currentTarget.checked
    });
}
function pauseClicked(e) {
    store.dispatch({
        type: ACTION_CHANGE_GAME_SETTINGS,
        paused: !State.get().game.paused
    });
}
//# sourceMappingURL=App.js.map