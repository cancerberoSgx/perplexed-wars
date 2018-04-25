import { war2ImplementationInitialState } from "./war2ImplementationInitialState";
export function war2ImplementationBehavior() {
    var initialState = war2ImplementationInitialState();
    var result = {
        unitTypes: []
    };
    initialState.unitsTypes.forEach(function (ut) {
        result.unitTypes.push({
            unitTypeId: ut.id,
            unitShouldMove: function () { return true; },
            unitShouldAttack: function () { return true; },
            buildCondition: function () { return true; },
            stateModifiers: []
        });
    });
    return result;
}
//# sourceMappingURL=war2ImplementationBehavior.js.map