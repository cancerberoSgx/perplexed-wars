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
import './App.css';
import { store } from '../reducers/store';
import { State } from '../state/state';
var BaseComponent = /** @class */ (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = State.get();
        _this.storeUsubscribe = store.subscribe(function () {
            _this.setState(State.get());
        });
        return _this;
    }
    BaseComponent.prototype.componentWillUnmount = function () {
        if (_super.prototype.componentWillUnmount !== undefined) {
            _super.prototype.componentWillUnmount.call(this);
        }
        this.storeUsubscribe();
    };
    return BaseComponent;
}(React.Component));
export { BaseComponent };
//# sourceMappingURL=BaseComponent.js.map