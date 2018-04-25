import { initialState } from "./initialState";
import { clone } from "../util/util";
var State = /** @class */ (function () {
    function State() {
        this.stateInternal = initialState();
    }
    State.getInstance = function () {
        if (!this.instance) {
            this.instance = new State();
        }
        return this.instance;
    };
    State.get = function () {
        return this.getInstance().stateInternal;
    };
    State.clone = function (state) {
        var s = clone(state);
        s.timestamp = Date.now();
        return s;
    };
    State.modify = function (state, modify) {
        var c = this.clone(state);
        c.timestamp = Date.now();
        modify(c);
        this.getInstance().stateInternal = c;
        return c;
    };
    State.newUnit = function (state, typeId, playerId) {
        var type = state.unitsTypes.find(function (ut) { return ut.id === typeId; });
        debugger;
        return {
            type: type,
            playerId: playerId,
            id: "unit-" + playerId + "-" + this.counter++,
            timestamp: Date.now(),
            state: clone(type.properties),
            killCount: 0,
        };
    };
    State.counter = 0;
    return State;
}());
export { State };
//# sourceMappingURL=state.js.map