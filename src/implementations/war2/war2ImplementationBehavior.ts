import { IUnitTypeBehavior, IBehavior, IPlayerBehavior, IStateModifierAfterAddUnit, IStateModifierBeforeAddUnitSuccess } from "../../state/behavior-interfaces";
import { war2ImplementationInitialState, War2PlayerCustom } from "./war2ImplementationInitialState";
import { Events, afterAddUnit, AfterUnitSelectionEvent, AfterAddUnitEvent, BeforeAddUnitSuccessEvent } from "../../state/IGameFramework";
import { IState } from "../../state/state-interfaces";

/** build all the behavior (state modifiers) if war2 impl */
export function war2ImplementationBehavior():IBehavior {
  return {
    unitTypes: buildUnitBehaviors(),  
    players: buildPlayerBehaviors()
  };
}

function buildPlayerBehaviors(){

  // heads up! this variable is the initial state and obsolete - we only read unit types ids that we know doesn't change
  const initialState = war2ImplementationInitialState()
  const playerBehaviors = initialState.players.map<IPlayerBehavior>(p=>({id: p.id, stateModifiers: []}))

  playerBehaviors.forEach(playerBehavior=>{
    const checkEnoughMoney:IStateModifierBeforeAddUnitSuccess = {
      eventName: Events.EVENT_BEFORE_ADD_UNIT_SUCCESS, 
      modifier: (event: BeforeAddUnitSuccessEvent)=>{
        if(event.player.playerId !== playerBehavior.id){
          return
        }
        const unitType = event.state.unitsTypes.find(ut=>ut.id===event.action.unitId)
        const player = event.state.players.find(p=>p.id===playerBehavior.id)
        const resourceCost = unitType.custom && (unitType.custom as War2PlayerCustom).cost

        const notEnough = resourceCost.find(cost=>{
          const playerResource = player.resources.find(r=>r.id===cost.resourceId)
          return playerResource && playerResource.value < cost.value
        })

        if(notEnough){
          event.cancelCallback('Impossible to train unit, you don\'t have enough resources') // TODO: say whay's missing
          // TODO: unfortunately we cannot cancel events using eventEmitter
        }
      }
    }
    playerBehavior.stateModifiers.push(checkEnoughMoney)
  })
  return playerBehaviors
}
function buildUnitBehaviors() {
  // heads up! this variable is the initial state and obsolete - we only read unit types ids that we know doesn't change
  const initialState = war2ImplementationInitialState()

  const unitBehaviors: IUnitTypeBehavior[] = []
  
  // Note: we are adding a listener for each unit type - we could do differently and add only one listener to the user and check every unit type there. 
  initialState.unitsTypes.forEach(unitBehavior => {
    
    const chargeNewUnitModifier: IStateModifierAfterAddUnit = {
      eventName: Events.EVENT_AFTER_ADD_UNIT,
      modifier: (event: AfterAddUnitEvent)=>{
        if(unitBehavior.id!==event.newUnit.type.id){
          return
        }
        const resourceCost = event.newUnit.type.custom && (event.newUnit.type.custom as War2PlayerCustom).cost
        if(!resourceCost) {return }
        const player = event.state.players.find(p=>p.id===event.player.playerId)
        resourceCost.forEach(cost=>{
          const playerResource = player.resources.find(r=>r.id===cost.resourceId)
          if(playerResource && playerResource.value) {
            // console.log(player.name, playerResource, event.newUnit.type.id)
            playerResource.value -= cost.value
          }
        })
      }
    }
    const utb: IUnitTypeBehavior = {
      id: unitBehavior.id,
      unitShouldMove: ()=>true,
      unitShouldAttack: ()=>true,
      buildCondition: ()=>{
        if(unitBehavior.isBase){
            return {canBuild: false, whyNot: `Only one base allowed in this game`}
        }
        // else if(){} TODO: do I have sufficient resources ?
        else{ 
          return  {canBuild: true}
        }
      },
      stateModifiers: [
        chargeNewUnitModifier
      ]
    };

    unitBehaviors.push(utb)
  });
  return unitBehaviors
}