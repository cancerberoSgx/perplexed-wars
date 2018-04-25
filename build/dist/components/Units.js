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
import { store } from '../reducers/store';
import { ACTION_SELECT_UNIT } from '../reducers/selectUnit';
import { BaseComponent } from './BaseComponent';
import './Units.css';
var Units = /** @class */ (function (_super) {
    __extends(Units, _super);
    function Units(props) {
        return _super.call(this, props) || this;
    }
    Units.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { key: this.props.box.id, className: this.buildClassName('Units', this.props.box.id) },
            " ",
            this.props.units.map(function (unit) {
                return React.createElement("img", { key: unit.id, "data-unit-id": unit.id, src: unit.type.image, className: _this.buildClassName('Unit', _this.props.box.id, unit.id), onClick: unitClicked });
            })));
    };
    Units.prototype.buildClassName = function (main, box, unit) {
        var _this = this;
        var classes = [main];
        if (main === 'Units' && this.state.uiState.unitSelection.find(function (s) { return s.boxId === _this.props.box.id; })) {
            classes.push('selected');
        }
        if (main === 'Unit' && this.state.uiState.unitAttacks.find(function (death) { return death.attacked === unit; })) {
            classes.push('attacked');
        }
        if (main === 'Unit' && this.state.uiState.unitAttacks.find(function (death) { return death.attacker === unit; })) {
            classes.push('attacker');
        }
        return classes.join(' ');
    };
    return Units;
}(BaseComponent));
export { Units };
function unitClicked(e) {
    store.dispatch({
        type: ACTION_SELECT_UNIT,
        unitId: e.currentTarget.getAttribute('data-unit-id'),
        union: e.ctrlKey
    });
}
//# sourceMappingURL=Units.js.map