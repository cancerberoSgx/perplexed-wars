export interface IThing {
  name?: string
  description?: string
  id?: string
  timestamp?: number
  /** so users can include additional information. They implement almost everything and probably can put more data for easy edition  */
  custom?: any
}

export interface IState extends IThing {
  board: IBoard
  players: IPlayer[]
  uiState?: IUIState
  unitsTypes: IUnitType[]
  game: IGame
}

export interface IGame extends IThing {
  interval: number
  allowDiagonal: boolean
  time: number
  realTime: boolean
  gameFinish: boolean
  winner: string
  paused: boolean
  showAIUnitsPanel: boolean
  showAIResourcesPanel?:boolean
}

export interface IBoard {
  boxes: IBox[]
  n: number
  m: number
}
export interface IBox extends IThing {
  x: number
  y: number
  terrain: string
  units: IUnit[]
  // traspasable?: boolean
}

export interface IPlayer extends IThing {
  isAI?: boolean
  unitTypes: string[]
  color: string
  resources: IResource[]
}

/**
 * A unit represent an object placed in the board. Refers both to units that move and to buildings (speed==0).
 */
export interface IUnit extends IThing {
  playerId: string
  type: IUnitType
  /** internal - marks if this unit has already moved in this turn */
  moved?: boolean
  /**
   * current unit state - based on unittype.properties multiplied by level and spells, etc
   */
  state: IUnitProperties
  killCount: number
  /** if implemetators want to show extra properties when user select units in the UnitSelection panel he ca add them here. The value is html string */
  extraDescriptionProperties?: {key: string, value: string}[]
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
/**
 * important. Each player must have its own unit type unit associated with him. Even if two players are same race, implementors need to duplicate unittypes for each of them
 */
export interface IUnitType extends IThing {
  image: string
  icon: string
  properties: IUnitProperties
  isBase?: boolean
  /** some concepts like technologies or spells could be represented as units. WHen clicking the button of normal units, the button will be "toggled" and clicking on the board will create that unit. In the case of units isNotAddableToBoard button wont be toggle, and the unit will be added virtually, with no relationship with the board and just a NEW_UNIT_ADDED event so implementors can react.  */
  isNotAddableToBoard?: boolean
  /** if implementors want to show extra properties when user select units in the UnitSelection panel he ca add them here. The value is html string */
  extraDescriptionProperties?: {key: string, value: string}[]
  /** if this value is set, then the unit wont be shown in the unit panel first level , but just wneh you click a parent unit. clicking a parent unit has different effect: it will show a second container with children unit buttons inside. */
  childOf?: string[]
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
  unitSelection: Array<IUnitSelectionInfo>
  unitAttacks: Array<{attacker: string, attacked: string, attackedBox: IBox, attackerBox: IBox}>
  unitDeads: Array<{attacker: string, attacked: string, attackedBox: string}>
  unitTypeSelection?: IUnitType
  boxesClientRects?: {[id:string]: {clientRect: {x:number, y:number, width: number, height: number}, boxId: string}}
  boardClientRect?: {x:number, y: number}
}
export interface IPlayerUIState {
  addUnitButtons: IPlayerStateAddUnitButtonState[]
  /** if user clicks button of a parent unit type then child ids go here */
  addUnitChildButtons?: string[]
  playerId: string
  availablePlaces?: IBox[] 
  message?: Log
  notificationTimeout?: number
}

export interface Log {
  message: string
  type?: 'internal' | 'warning' | 'error' | 'tip' | 'help' | 'internalError' | 'blocking'
}
export interface IPlayerStateAddUnitButtonState {
  pressed: boolean
  unitTypeId: string
  isPrimary: boolean
}
export interface IUnitSelectionInfo {
  unit: IUnit// : string,
  box: IBox// ?: string
}

export interface IUnitBox { 
  unit: IUnit
  box: IBox 
  oldBox?: IBox
}
