import { findUnit, getPathMatrix } from "../util/util";
import * as PF from 'pathfinding';
var MoveResolver = /** @class */ (function () {
    function MoveResolver() {
    }
    MoveResolver.prototype.resolve = function (_a) {
        var state = _a.state, unit = _a.unit, box = _a.box, player = _a.player;
        if (!this.finder) {
            this.finder = new PF.AStarFinder({ allowDiagonal: state.game.allowDiagonal });
        }
        var foeBases = findUnit(state, function (u) { return u.playerId !== player.id && u.type.isBase; });
        if (!foeBases || !foeBases.length) { // this probably means game is over
            return;
        }
        var foeBaseUnit = foeBases[0].unit;
        var foeBaseBox = foeBases[0].box;
        if (!unit.type.isBase && unit.state.speed !== 0 && !unit.moved && unit.playerId === player.id /* &&
        unit.type.unitShouldMove({unit, box})*/) {
            var matrix = getPathMatrix(state);
            var grid = new PF.Grid(matrix);
            var path_1 = this.finder.findPath(box.x, box.y, foeBaseBox.x, foeBaseBox.y, grid);
            if (path_1 && path_1.length > 1) { // move the unit now! - matrix will be recalculated for each unit
                var newBox = state.board.boxes.find(function (b) { return b.x === path_1[1][0] && b.y === path_1[1][1]; });
                if (newBox && !newBox.units.find(function (u) { return u.type.isBase; })) {
                    box.units = box.units.filter(function (u) { return u.id !== unit.id; }); // remove f|rom old box
                    newBox.units.push(unit); // add to new box
                    unit.moved = true;
                }
            }
            else {
                // TODO: if there is no path, we should still try to move the unit. Issue. if I block the two base - no unit moves no matter that all lthe board is free
            }
        }
    };
    return MoveResolver;
}());
export { MoveResolver };
//# sourceMappingURL=moveResolver.js.map