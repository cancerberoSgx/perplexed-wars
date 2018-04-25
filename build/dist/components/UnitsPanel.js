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
import { ACTION_ADD_UNIT_CLICK_BUTTON } from '../reducers/addNewUnit';
import { store } from '../reducers/store';
import { State } from '../state/state';
import { BaseComponent } from './BaseComponent';
import './UnitsPanel.css';
var UnitsPanel = /** @class */ (function (_super) {
    __extends(UnitsPanel, _super);
    function UnitsPanel(props) {
        return _super.call(this, props) || this;
    }
    UnitsPanel.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "UnitsPanel row" }, State.get().players.map(function (player) {
            return React.createElement("ul", { className: "col-6", key: 'player_' + player.id }, State.get().uiState.playerControls.filter(function (c) { return c.playerId === player.id; }).map(function (pc) {
                return pc.addUnitButtons.map(function (button, i) {
                    return React.createElement("li", { key: 'player_' + player.id + '_button_' + i },
                        React.createElement("button", { key: i, "data-toggle": "button", onClick: addUnitButtonClicked, className: _this.buildClassName(button), "data-unit": button.unitTypeId, "data-player": player.id },
                            React.createElement("img", { className: "icon", src: getUnit(button.unitTypeId).icon }),
                            getUnit(button.unitTypeId).name));
                });
            }));
        })));
    };
    UnitsPanel.prototype.buildClassName = function (button) {
        var classes = ['btn', 'add-unit', button.unitTypeId];
        if (button.pressed) {
            classes.push('pressed');
        }
        return classes.join(' ');
    };
    return UnitsPanel;
}(BaseComponent));
export { UnitsPanel };
function getUnit(id) {
    return State.get().unitsTypes.find(function (ut) { return ut.id === id; });
}
function addUnitButtonClicked(e) {
    store.dispatch({
        type: ACTION_ADD_UNIT_CLICK_BUTTON,
        unitId: e.currentTarget.getAttribute('data-unit'),
        playerId: e.currentTarget.getAttribute('data-player')
    });
}
//# sourceMappingURL=UnitsPanel.js.map