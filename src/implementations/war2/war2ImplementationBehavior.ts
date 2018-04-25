import { IUnitTypeBehavior, IBehavior } from "../../state/behavior-interfaces";
import { war2ImplementationInitialState } from "./war2ImplementationInitialState";

export function war2ImplementationBehavior():IBehavior {
  const initialState = war2ImplementationInitialState()
  const result:IBehavior = {
    unitTypes: [
    ]
  }
  initialState.unitsTypes.forEach((ut)=>{
    result.unitTypes.push({
      unitTypeId: ut.id,
      unitShouldMove: ()=>true,
      unitShouldAttack: ()=>true,
      buildCondition: ()=>true,
      stateModifiers: []
    })
  })
  return result;
}