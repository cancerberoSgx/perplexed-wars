import { IBox, IPlayer, IState, IUnit } from "../state/interfaces";
import { IResolver } from "./unitActionResolvers";



function getUnitsNear({state, unit, box, radio, predicate}:{state:IState, unit:IUnit, box:IBox, radio:number, predicate:(u:IUnit)=>boolean}):Array<{targetUnit:IUnit, targetBox:IBox}> {
  const near = state.board.boxes.filter(b=>Math.abs(b.x-box.x)<=radio && Math.abs(b.y-box.y)<=radio)
  console.log('FIGHT, near: ', near.length)
  const result:Array<{targetUnit:IUnit, targetBox:IBox}> = []
  near.forEach(b=>b.units.forEach(u=>{
    if(predicate(u)){
      result.push({targetUnit: u, targetBox: b})
    }
  }))
  return result;
}


export class AttackResolver implements IResolver {
  public resolve({state, unit, box, player}:{state:IState,unit:IUnit, box:IBox, player:IPlayer}):void {
    if(!unit.type.isBase && !unit.moved && unit.playerId===player.id){
      const unitsNear = getUnitsNear({state, unit, box, radio: unit.state.range, predicate:u=>u.playerId!==player.id})
      // TODO: attack the just one that's near and action points ==1
      if(unitsNear && unitsNear.length){
        const {targetUnit, targetBox} = unitsNear[0]
        targetUnit.state.health = targetUnit.state.health - unit.state.damage
        if(targetUnit.state.health<=0) { 
          targetBox.units = targetBox.units.filter(u=>u.id!==targetUnit.id)
        }
        unit.moved=true
      }
    }    
  }
}

