import { IUnitTypeBehavior, IBehavior } from "../../state/behavior-interfaces";
import { war2ImplementationInitialState } from "./war2ImplementationInitialState";

export function war2ImplementationBehavior():IBehavior {
  const initialState = war2ImplementationInitialState()
  const result:IBehavior = {
    unitTypes: initialState.unitsTypes.map<IUnitTypeBehavior>(ut=>({
      id: ut.id,
      unitShouldMove: ()=>true,
      unitShouldAttack: ()=>true,
      buildCondition: ()=>({canBuild: true}),
      stateModifiers: []
    }))
  }
  return result;
}