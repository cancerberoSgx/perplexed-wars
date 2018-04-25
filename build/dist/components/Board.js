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
import { range } from '../util/util';
import { BaseComponent } from './BaseComponent';
import { BoardRow } from './BoardRow';
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board(props) {
        return _super.call(this, props) || this;
    }
    Board.prototype.render = function () {
        return (React.createElement("table", { className: "Board" },
            React.createElement("tbody", null, range(this.state.board.m).map(function (n) {
                return React.createElement(BoardRow, { key: n, n: n });
            }))));
    };
    return Board;
}(BaseComponent));
export { Board };
//# sourceMappingURL=Board.js.map