import { IBox, IPlayer, IState, IUnit } from "../state/state-interfaces";
import { IUnitActionResolver } from "./unitActionResolvers";
import { getUnitsNear } from "../util/util";


export class PlayerEndOfTurnResourceResolver implements PlayerEndOfTurnResolver {
  public resolve({state, player}:{state:IState, player:IPlayer}):void {
    // at this moment, all player [[IStateModifier]] should have been already executed, so [[thisTurnValue]] is the final one. We just sum and reset
    player.resources.forEach(resource=>{

    console.log('resource +' +resource.name + ' player '+player.name + resource.thisTurnValue)
      resource.value+=resource.thisTurnValue
      // we start the new turn with the default value per turn
      resource.thisTurnValue = resource.defaultValuePerTurn
    })
  }
}

export interface PlayerEndOfTurnResolver{
  resolve({state, player}:PlayerEndOfTurnResolverData):void 
}
export interface PlayerEndOfTurnResolverData{
  state:IState, player:IPlayer
}
export const playerEndOfTurnResolvers: PlayerEndOfTurnResolver[] = [
  new PlayerEndOfTurnResourceResolver()
]