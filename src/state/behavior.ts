import { IBehavior } from "./behavior-interfaces";
import { war2ImplementationBehavior } from "../implementations/war2/war2ImplementationBehavior";

const getDefaultBehavior = war2ImplementationBehavior
/**
 * like [[State]] is the home for getting the IState instance, I'm the home for the [[IBehavior]]
 */
export class Behavior {
  private static instance:IBehavior

  private constructor(){}

  public static get():IBehavior{
    if(!this.instance){
      this.instance = getDefaultBehavior()
    }
    return this.instance
  }
}