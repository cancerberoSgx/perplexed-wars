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
import { ACTION_ADD_UNIT } from '../reducers/addNewUnit';
import { store } from '../reducers/store';
import { BaseComponent } from './BaseComponent';
import './BoardRow.css';
import { Units } from './Units';
var BoardRow = /** @class */ (function (_super) {
    __extends(BoardRow, _super);
    function BoardRow(props) {
        return _super.call(this, props) || this;
    }
    BoardRow.prototype.render = function () {
        var _this = this;
        return (React.createElement("tr", { className: "BoardRow" }, this.state.board.boxes.filter(function (b) { return b.y === _this.props.n; }).map(function (b) {
            return React.createElement("td", { key: b.x + '_' + b.y, className: _this.buildClassName(b), onClick: boxClicked, "data-x": b.x, "data-y": b.y },
                React.createElement(Units, { units: b.units, box: b }));
        })));
    };
    BoardRow.prototype.buildClassName = function (b) {
        var classes = ['BoardBox'];
        if (this.state.uiState.unitSelection.find(function (s) { return s.boxId === b.id; })) {
            classes.push('selected');
        }
        if (this.state.uiState.unitDeads.find(function (death) { return death.attackedBox === b.id; })) {
            classes.push('death');
        }
        return classes.join(' ');
    };
    return BoardRow;
}(BaseComponent));
export { BoardRow };
function boxClicked(e) {
    store.dispatch({
        many: 1,
        type: ACTION_ADD_UNIT,
        x: parseInt(e.currentTarget.getAttribute('data-x') || '0', 10),
        y: parseInt(e.currentTarget.getAttribute('data-y') || '0', 10)
    });
}
//# sourceMappingURL=BoardRow.js.map