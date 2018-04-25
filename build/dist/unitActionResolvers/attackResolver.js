import { getUnitsNear } from "../util/util";
var AttackResolver = /** @class */ (function () {
    function AttackResolver() {
    }
    AttackResolver.prototype.resolve = function (_a) {
        var state = _a.state, unit = _a.unit, box = _a.box, player = _a.player;
        if (!unit.moved && unit.playerId === player.id) {
            var unitsNear = getUnitsNear({ state: state, unit: unit, box: box, radio: unit.state.range, predicate: function (u) { return u.playerId !== player.id; } });
            if (unitsNear && unitsNear.length) {
                var _b = unitsNear[0], targetUnit_1 = _b.targetUnit, targetBox = _b.targetBox;
                targetUnit_1.state.health = targetUnit_1.state.health - unit.state.damage;
                state.uiState.unitAttacks.push({ attacked: targetUnit_1.id, attacker: unit.id, attackedBox: targetBox.id });
                if (targetUnit_1.state.health <= 0) {
                    targetBox.units = targetBox.units.filter(function (u) { return u.id !== targetUnit_1.id; });
                    state.uiState.unitDeads.push({ attacked: targetUnit_1.id, attacker: unit.id, attackedBox: targetBox.id });
                }
                unit.moved = true;
            }
        }
    };
    return AttackResolver;
}());
export { AttackResolver };
//# sourceMappingURL=attackResolver.js.map