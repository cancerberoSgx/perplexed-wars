import { IBehavior } from './behavior-interfaces'
import { war2ImplementationBehavior } from '../implementations/war2/war2ImplementationBehavior'
import { Game } from './game'

const getDefaultBehavior = war2ImplementationBehavior
/**
 * like [[State]] is the home for getting the IState instance, I'm the home for the [[IBehavior]]
 * Responsible of registering [[IStateModifier]] provided by the implementations
 */
export class Behavior {
  private static instance: IBehavior

  private constructor () {}

  public static get (): IBehavior {
    if (!this.instance) {
      this.instance = getDefaultBehavior()
      this.registerBehaviors()
    }
    return this.instance
  }

  private static registerBehaviors (): void {
    this.instance.unitTypes.forEach(ut => {
      ut.stateModifiers.forEach(mod => {
        Game.getInstance().on(mod.eventName, mod.modifier)
      })
    })
    this.instance.players.forEach(p => {
      p.stateModifiers.forEach(mod => {
        Game.getInstance().on(mod.eventName, mod.modifier)
      })
    })

  }
}
