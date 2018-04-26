import { IUnitTypeBehavior, IBehavior, IPlayerBehavior, IStateModifierAfterAddUnit } from "../../state/behavior-interfaces";
import { war2ImplementationInitialState, War2PlayerCustom } from "./war2ImplementationInitialState";
import { Events, afterAddUnit, AfterUnitSelectionEvent, AfterAddUnitEvent } from "../../state/IGameFramework";
import { IState } from "../../state/state-interfaces";

export function war2ImplementationBehavior():IBehavior {
  const initialState = war2ImplementationInitialState() // heads up! this is just the initial state, you cannot use it in modifiers since will be obsolete, use event.state instead for modifying it!

  const unitTypes:IUnitTypeBehavior[] = []
  
  initialState.unitsTypes.forEach(unitType=>{
    // same as before this player is obsolete! we use its id to query the real object from event.state
    const chargeUnitModifier:IStateModifierAfterAddUnit = {
      eventName: Events.EVENT_AFTER_ADD_UNIT,
      modifier: (event: AfterAddUnitEvent)=>{
        if(unitType.id!==event.newUnit.type.id){
          return
        }
        // // TODO: check like this if there are sufficient resources but on BEFOREADDUNIT not after !!!
        // if(resourceCost.find(cost=> player.resources.find(r=>r.id===cost.resourceId).value - cost.value < 0)){
        //   alert('Not enough money')
        //   return 
        // }
        const resourceCost = event.newUnit.type.custom && (event.newUnit.type.custom as War2PlayerCustom).cost
        if(!resourceCost) {return }
        const player = event.state.players.find(p=>p.id===event.player.playerId)
        resourceCost.forEach(cost=>{
          const playerResource = player.resources.find(r=>r.id===cost.resourceId)
          if(playerResource && playerResource.value) {
            console.log(player.name, playerResource, event.newUnit.type.id)
            playerResource.value -= cost.value
          }
        })
      }
    }
    const utb:IUnitTypeBehavior = {
      id: unitType.id,
      unitShouldMove: ()=>true,
      unitShouldAttack: ()=>true,
      buildCondition: ()=>{
        if(unitType.isBase){
            return {canBuild: false, whyNot: `Only one base allowed in this game`}
        }
        // else if(){} TODO: do I have sufficient resources ?
        else{ 
          return  {canBuild: true}
        }
      },
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