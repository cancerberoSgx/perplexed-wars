export function range(n) {
    var a = new Array(n);
    for (var i = 0; i < a.length; i++) {
        a[i] = i;
    }
    return a;
}
export function getAvailablePlacesFor(playerId, state) {
    var result = [];
    iterateUnits(state, function (box, u) {
        if (u.state.territoryRadius > 0 && u.playerId === playerId) {
            result = result.concat(getBoxesNear({ state: state, box: box, radio: u.state.territoryRadius, predicate: (function (b) { return true; }) }));
            // TODO: remove duplicates
        }
    });
    return result;
}
export function clone(t) {
    return JSON.parse(JSON.stringify(t));
}
export function getPathMatrix(state) {
    // TODO: make me faster and use a cache! also implement units.properties.transpasable
    var result = [];
    var _loop_1 = function (j) {
        var a = [];
        var _loop_2 = function (i) {
            a.push(state.board.boxes.find(function (b) { return b.x === i && b.y === j; }).units.filter(function (unit) { return !unit.type.isBase; }).length > 0);
        };
        for (var i = 0; i < state.board.n; i++) {
            _loop_2(i);
        }
        result.push(a);
    };
    for (var j = 0; j < state.board.m; j++) {
        _loop_1(j);
    }
    return result;
}
export function findUnit(state, predicate) {
    //TODO: make me faster!
    var found = [];
    state.board.boxes.forEach(function (box) { return box.units.forEach(function (unit) {
        if (predicate(unit, box)) {
            found.push({ unit: unit, box: box });
        }
    }); });
    return found;
}
export function getUnitsNear(_a) {
    var state = _a.state, unit = _a.unit, box = _a.box, radio = _a.radio, predicate = _a.predicate;
    var near = state.board.boxes.filter(function (b) { return Math.abs(b.x - box.x) <= radio && Math.abs(b.y - box.y) <= radio; });
    var result = [];
    near.forEach(function (b) {
        return b.units.forEach(function (u) {
            if (!predicate || predicate(u)) {
                result.push({ targetUnit: u, targetBox: b });
            }
        });
    });
    return result;
}
export function getBoxesNear(_a) {
    var state = _a.state, box = _a.box, radio = _a.radio, predicate = _a.predicate;
    predicate = predicate || (function (b) { return true; });
    return state.board.boxes.filter(function (b) { return Math.abs(b.x - box.x) <= radio && Math.abs(b.y - box.y) <= radio && predicate(b); });
}
export function iterateUnits(state, iterator) {
    state.board.boxes.forEach(function (box) {
        box.units.forEach(function (unit) {
            iterator(box, unit);
        });
    });
}
// export function sanitizeState(state:IState){
//   // console.log(sanitizeState)
//   state.unitsTypes.forEach(ut=>{
//     ut.unitShouldAttack=(info=>true)
//     ut.unitShouldMove=(info=>true)
//     ut.stateModifiers = []
//     ut.buildCondition = (player=>true)
//   })
// }
//# sourceMappingURL=util.js.map