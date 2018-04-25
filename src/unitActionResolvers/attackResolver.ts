import { IBox, IPlayer, IState, IUnit } from "../state/state-interfaces";
import { IResolver } from "./unitActionResolvers";
import { getUnitsNear } from "../util/util";


export class AttackResolver implements IResolver {
  public resolve({state, unit, box, player}:{state:IState,unit:IUnit, box:IBox, player:IPlayer}):void {
    if(!unit.moved && unit.playerId===player.id){
      const unitsNear = getUnitsNear({state, unit, box, radio: unit.state.range, predicate:u=>u.playerId!==player.id})
      if(unitsNear && unitsNear.length){
        const {targetUnit, targetBox} = unitsNear[0]
        targetUnit.state.health = targetUnit.state.health - unit.state.damage
        state.uiState.unitAttacks.push({attacked: targetUnit.id, attacker: unit.id, attackedBox: targetBox.id})
        if(targetUnit.state.health<=0) { 
          targetBox.units = targetBox.units.filter(u=>u.id!==targetUnit.id)
          state.uiState.unitDeads.push({attacked: targetUnit.id, attacker: unit.id, attackedBox: targetBox.id})
        }
        unit.moved=true
      }
    }    
  }
}

