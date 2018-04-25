import { IPlayer, IBox, IState } from "./interfaces";

// // behavior - because all concepts defined in interface.ts cannot contain methods - are used only for state and data-only cloned we need to put behavior in other entities.



export interface IUnitTypeBehavior {

  unitTypeId: string

  /**
   * before automatically moving a unit, the framework ask its type if it's OK so unit type definition can customize how it moves. 
   * For allow the framework to automatically move the unit, return true (default)
   * For moving to a custom box return that box. Notice that implementers are responsible of respecting the game rules (for example cannot move to a non-traspasable box
   * For not moving at all, just return the same box argument. 
   */
  unitShouldMove?: ({unit:IUnit, box: IBox})=>IBox|true

  /**
   * same logic as [[unitShouldMove]] but for attacking
   */
  unitShouldAttack?: ({unit:IUnit, box: IBox})=>boolean

  /**
   * for example: player.resources.find(r=>r.name==='gold').value>50 && player=>player.resources.find(r=>r.name==='gold')
   */
  buildCondition?: (player:IPlayer)=>boolean//

  /**
   * Units are the only agent (besides the user when it buys) that can modify the [[IState]] instance. They can modify the [[IResource.thisTurnValue]] or even other units state. 
   * 
   * units / buildings can modify the state of the game, Examples: 
   * a "caravan" unit can generate +5 gold per turn. 
   * a fremen unit will produce +10 of "water" when killing an organic unit
   * a bank building will multiply by 50% all the gold produced in a turn. on(after-end-of-turn, count player.units.find(bank) )
   * a kamikaze unit will damage +40 units that are up to 3 boxes near him when it dies. on(after-unit-die, if (unit is .kanikaze) foePlayer.units.near(kamikaze).foreach.health-=40
   * a dock building will make destructors and battleships units 40% cheaper. (  on(before-unit-create, (if(player.buildings.find(docker)){fi unit created is battl or desc then - substract 40%})=>{}))
   * So stateModifiers for a particular event, will behave like "PluginContainer" in order respecting defined prioerities, 
   */
  stateModifiers?: IStateModifier[]

}



/**
 * affect the state somehow, at some moment (events?). events are defined byb the framework (implementors cannot define new events)
 */
export interface IStateModifier {
  priority: number
  eventName: string
  modifier: (state:IState)=>void
}
