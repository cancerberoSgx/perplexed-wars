import { IUnitTypeBehavior, IBehavior, IPlayerBehavior, IStateModifierAfterAddUnit } from "../../state/behavior-interfaces";
import { war2ImplementationInitialState } from "./war2ImplementationInitialState";
import { Events, afterAddUnit, AfterUnitSelectionEvent, AfterAddUnitEvent } from "../../state/IGameFramework";
import { IState } from "../../state/state-interfaces";

const unitCost = [
  {unitId: 'footman', resourceCost: [{resourceId: 'gold', value: 600}]}
]
export function war2ImplementationBehavior():IBehavior {
  const initialState = war2ImplementationInitialState() // heads up! this is just the initial state, you cannot use it in modifiers since will be obsolete, use event.state instead for modifying it!

  const unitTypes:IUnitTypeBehavior[] = []
  
  initialState.unitsTypes.forEach(unitType=>{
    // same as before this player is obsolete! we use its id to query the real object from event.state
    const chargeUnitModifier:IStateModifierAfterAddUnit = {
      eventName: Events.EVENT_AFTER_ADD_UNIT,
      modifier: (event: AfterAddUnitEvent)=>{
        const player = event.state.players.find(p=>!!p.unitTypes.find(utid=>utid===event.newUnit.type.id))
        const cost2 = unitCost.find(u=>u.unitId===unitType.id)
        if(!cost2) {return }
        cost2.resourceCost.forEach(cost=>{
          player.resources.find(r=>r.id===cost.resourceId).value -= cost.value
        })
      }
    }
    const utb:IUnitTypeBehavior = {
      id: unitType.id,
      unitShouldMove: ()=>true,
      unitShouldAttack: ()=>true,
      buildCondition: ()=>({canBuild: !unitType.isBase, whyNot: `Only one base allowed in this game` }), // bases cannot be built!
      stateModifiers: [
        chargeUnitModifier
      ]
    };

    unitTypes.push(utb)
  });

  const result:IBehavior = {
    unitTypes, 
    players: initialState.players.map<IPlayerBehavior>(p=>({id: p.id, stateModifiers: []}))
  }
  return result;
}