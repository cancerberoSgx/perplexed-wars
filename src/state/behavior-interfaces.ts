import { IPlayer, IBox, IState, IThing } from "./state-interfaces";
import { Events, BeforeUnitSelectionEvent, AfterUnitSelectionEvent, beforeUnitSelection, afterAddUnit, GameFrameworkEvent, beforeAddUnitSuccess, afterUnitSelection } from "./IGameFramework";
import { IA } from "ia/ia-interfaces";

// // behavior - because all concepts defined in interface.ts cannot contain methods - are used only for state and data-only cloned we need to put behavior in other entities.

/**
 * This is like IState but for behaviors, the root node
 */
export interface IBehavior{
  /**
   * state modifiers and behavior definers at the unit level
   */
  unitTypes: IUnitTypeBehavior[],
  /**
   * state modifiers and behavior definers at the unit level
   */
  players: IPlayerBehavior[]
}


/** define behavior at the player level. For example global conditions for victory... some things that can be done with IUnitBehavior also can be done with IPlayerBehavior and makes more sense because of preformance. ie. instead of many listeners - just one listener that iterates. example: if a unit can be bougth */
export interface IPlayerBehavior extends IStateModifierBehavior{
  stateModifiers: IStateModifier[]
  ia?:IA
}

/**
 * Units and Players can modify the [[IState]] instance. They can modify the [[IResource.thisTurnValue]] , board, and other units. 
 * 
 * units / buildings can modify the state of the game, Examples: 
 * a "caravan" unit can generate +5 gold per turn. 
 * a fremen unit will produce +10 of "water" when killing an organic unit
 * a bank building will multiply by 50% all the gold produced in a turn. on(after-end-of-turn, count player.units.find(bank) )
 * a kamikaze unit will damage +40 units that are up to 3 boxes near him when it dies. on(after-unit-die, if (unit is .kanikaze) foePlayer.units.near(kamikaze).foreach.health-=40
 * a dock building will make destructors and battleships units 40% cheaper. (  on(before-unit-create, (if(player.buildings.find(docker)){fi unit created is battl or desc then - substract 40%})=>{}))
 * So stateModifiers for a particular event, will behave like "PluginContainer" in order respecting defined prioerities, 
 */
export interface IStateModifierBehavior {
  /** the id of the referenced unit type or Player or whatever ([[IUnit]]) */
  id: string
  /**
   * each of this modifiers will end up in a subscription in the game and notified when requested event happen so they have the chance to modify the state somehow
   */
  stateModifiers: IStateModifier[]
}

/**
 * Define some behavior at the unit level type and unit instance level. For example, can a player buy a unit, should the unit move or attack etc
 */
export interface IUnitTypeBehavior extends IStateModifierBehavior{


  /**
   * before automatically moving a unit, the framework ask its type if it's OK so unit type definition can customize how it moves. 
   * For allow the framework to automatically move the unit, return true (default)
   * For moving to a custom box return that box. Notice that implementers are responsible of respecting the game rules (for example cannot move to a non-traspasable box
   * For not moving at all, just return the same box argument. 
   * 
   * Note: this is not about IA, this is about unit movement policy. Remember units movement and attack arer automatically users, including IA cannot decide anything about it. 
   */
  unitShouldMove: ({unit:IUnit, box: IBox})=>IBox|true

  /**
   * same logic as [[unitShouldMove]] but for attacking
   */
  unitShouldAttack: ({unit:IUnit, box: IBox})=>boolean

  /**
   * can the player build this unit at this moment ? (ie has sufficiente resources ? )
   * for example: player.resources.find(r=>r.name==='gold').value>50 && player=>player.resources.find(r=>r.name==='gold')
   */
  buildCondition: (player:IPlayer)=>BuildConditionResult

}

export interface BuildConditionResult {
  canBuild: boolean
  whyNot?: string
}

export interface IStateModifier extends IThing {
  priority?: number
  eventName: any
  modifier(event: GameFrameworkEvent):void
}
export interface IStateModifierAfterAddUnit extends IStateModifier {
  eventName: Events.EVENT_AFTER_ADD_UNIT
  modifier: typeof afterAddUnit
}
export interface IStateModifierBeforeAddUnitSuccess extends IStateModifier {
  eventName: Events.EVENT_BEFORE_ADD_UNIT_SUCCESS
  modifier: typeof beforeAddUnitSuccess
}

export interface IStateModifierBeforeUnitSelection extends IStateModifier {
  eventName: Events.EVENT_BEFORE_UNIT_SELECTION
  modifier: typeof beforeUnitSelection
}
export interface IStateModifierAfterUnitSelection extends IStateModifier {
  eventName: Events.EVENT_AFTER_UNIT_SELECTION
  modifier: typeof afterUnitSelection
}