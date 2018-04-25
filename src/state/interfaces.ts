export interface IThing{
  name?:string
  description?:string
  id?: string
  timestamp?: number
}

export interface IState extends IThing  {
  board: IBoard
  players: IPlayer[]
  uiState: IUIState
  unitsTypes: IUnitType[]
  game: IGame
}


export interface IGame extends IThing {
  interval: number
  allowDiagonal:boolean
  time: number
  realTime: boolean
  gameFinish: boolean
  winner: string
  paused: boolean
}



export interface IBoard {
  boxes: IBox[]
  n: number
  m: number
}
export interface IBox extends IThing {
  x:number
  y:number
  terrain: string
  units: IUnit[]
  // traspasable?: boolean   
}


export interface IPlayer extends IThing{
  isAI?:boolean
  unitTypes: string[]
  color:string
  resources: IResource[]
}

/**
 * A unit represent an object placed in the board. Refers both to units that move and to buildings (speed==0). 
 */
export interface IUnit extends IThing{
  playerId: string
  type: IUnitType
  moved?:boolean 
  /**
   * current unit state - based on unittype.properties multiplied by level and spells, etc
   */
  state: IUnitProperties
  killCount: number

 
}

/**
 * [[IPlayer]] is associated with resources. Each player can have different list of resource definitions
 * [[IUnit]] are associated with resources also since the predicate [[buildCondition]] is based on the resources the player has (in part). For example, I need 50 gold in order to build a soldier. [[IResource.value]]. 
 * 
 * [[IResource.value]] can only be modified at the following moments: 
 *   * when the turn ends : we sum all events that give net gold that happened in the turn (like enemy unit kills, gold per turn, etc),*  , and then multiply it with possible factors (like bank before)
 *   * when user build/buy something. we cannot wait til the end of the turn - we must subtract money in that exact moment when the unit/building is created. 
 */
export interface IResource extends IThing {
  /**
   * Current player's value - when he buy something the resources are extracted from this value
   */
  value: number

  /**
   * the cumulative resource value for this turn. When the turn ends, [[thisTurnValue]] is summed to [[value]] and reseted to 0
   */
  thisTurnValue: number
  icon: string
}

// // affect the state somehow, at some moment (events?). events are defined byb the framework (implementors cannot define new events)
// export interface IStateModifier {
//   priority: number
//   eventName: string
//   modifier: (state:IState)=>void
// }

export interface IUnitType extends IThing {
  image: string
  icon: string
  properties: IUnitProperties
  isBase: boolean

  // /**
  //  * before automatically moving a unit, the framework ask its type if it's OK so unit type definition can customize how it moves. 
  //  * For allow the framework to automatically move the unit, return true (default)
  //  * For moving to a custom box return that box. Notice that implementers are responsible of respecting the game rules (for example cannot move to a non-traspasable box
  //  * For not moving at all, just return the same box argument. 
  //  */
  // unitShouldMove?: ({unit:IUnit, box: IBox})=>IBox|true

  // /**
  //  * same logic as [[unitShouldMove]] but for attacking
  //  */
  // unitShouldAttack?: ({unit:IUnit, box: IBox})=>boolean

  // /**
  //  * for example: player.resources.find(r=>r.name==='gold').value>50 && player=>player.resources.find(r=>r.name==='gold')
  //  */
  // buildCondition?: (player:IPlayer)=>boolean//

  // /**
  //  * Units are the only agent (besides the user when it buys) that can modify the [[IState]] instance. They can modify the [[IResource.thisTurnValue]] or even other units state. 
  //  * 
  //  * units / buildings can modify the state of the game, Examples: 
  //  * a "caravan" unit can generate +5 gold per turn. 
  //  * a fremen unit will produce +10 of "water" when killing an organic unit
  //  * a bank building will multiply by 50% all the gold produced in a turn. on(after-end-of-turn, count player.units.find(bank) )
  //  * a kamikaze unit will damage +40 units that are up to 3 boxes near him when it dies. on(after-unit-die, if (unit is .kanikaze) foePlayer.units.near(kamikaze).foreach.health-=40
  //  * a dock building will make destructors and battleships units 40% cheaper. (  on(before-unit-create, (if(player.buildings.find(docker)){fi unit created is battl or desc then - substract 40%})=>{}))
  //  * So stateModifiers for a particular event, will behave like "PluginContainer" in order respecting defined prioerities, 
  //  */
  // stateModifiers?: IStateModifier[]

}
export interface IUnitProperties {
  damage: number
  speed: number
  range: number
  health: number,
  territoryRadius: number
}


export interface IUIState {
  currentPlayer: string
  playerControls: IPlayerUIState[]
  unitSelection: Array<{unitId:string, boxId: string}>
  unitAttacks: Array<{attacker: string, attacked: string, attackedBox: string}>
  unitDeads: Array<{attacker: string, attacked: string, attackedBox: string}>
}
export interface IPlayerUIState{
  addUnitButtons: IPlayerStateAddUnitButtonState[]
  playerId: string
}
export interface IPlayerStateAddUnitButtonState {
  pressed: boolean
  unitTypeId: string
}