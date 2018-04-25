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
  /** by default a resource will increase something per turn without having to happen anything... */
  defaultValuePerTurn: number
  icon: string
}

export interface IUnitType extends IThing {
  image: string
  icon: string
  properties: IUnitProperties
  isBase: boolean


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