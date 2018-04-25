import { IUnitTypeBehavior, IBehavior } from "../../state/behavior-interfaces";
import { war2ImplementationInitialState } from "./war2ImplementationInitialState";

const unitCost = {
  footman: {gold: 600}, 

}
export function war2ImplementationBehavior():IBehavior {
  const initialState = war2ImplementationInitialState()
  const unitTypes:IUnitTypeBehavior[] = []
  
  initialState.unitsTypes.forEach(ut=>{
    const utb:IUnitTypeBehavior = {
      id: ut.id,
      unitShouldMove: ()=>true,
      unitShouldAttack: ()=>true,
      buildCondition: ()=>({canBuild: true}),
      stateModifiers: []
    };

    // unitTypes.find()
    unitTypes.push(utb)
  });

  const result:IBehavior = {
    unitTypes
  }
  return result;
}