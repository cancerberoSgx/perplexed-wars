import { IResolver} from "./unitActionResolvers";
import { IBox, IUnit , IState , IPlayer} from "../state/interfaces";
import { findUnit, getPathMatrix } from "../util/util";
import * as PF from 'pathfinding'

export class AttackResolver implements IResolver {
  public resolve({state, unit, box, player}:{state:IState,unit:IUnit, box:IBox, player:IPlayer}):void {
    
  }
}