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
  traspasable?: boolean   
}


export interface IPlayer extends IThing{
  isAI?:boolean
  unitTypes: string[]
  color:string
  resources: IResource[]
}

export interface IUnit extends IThing{
  playerId: string
  type: IUnitType
  moved?:boolean 
  /**
   * current unit state - based on unittype.properties multiplied by level and spells, etc
   */
  state: IUnitProperties
  killCount: number

  buildCondition: (player:IPlayer, state:IState)=>boolean//player.resources.find(r=>r.name==='gold').value>50 && player=>player.resources.find(r=>r.name==='gold')

  // units / buildings can modify the state of the game, Examples: 
  // a "caravan" unit can generate -5 gold per turn. 
  // a fremen unit will produce +10 of "water" when killing an organic unit
  // a bank building will multiply by 50% all the gold produced in a turn. on(after-end-of-turn, count player.units.find(bank) )
  // a kamikaze unit will damage +40 units that are up to 3 boxes near him when it dies. on(after-unit-die, if (unit is .kanikaze) foePlayer.units.near(kamikaze).foreach.health-=40
  // a dock building will make destructors and battleships units 40% cheaper. (  on(before-unit-create, (if(player.buildings.find(docker)){fi unit created is battl or desc then - substract 40%})=>{}))

  // So stateModifiers for a particular event, will behave like "PluginContainer" in order respecting defined prioerities, 
  stateModifiers: IStateModifier[]
 
}

export interface IResource extends IThing {
  /**
   * Current player's value - he can waste this
   */
  value: number

  thisTurnValue: number
  icon: string
}

// affect the state somehow, at some moment (events?). events are defined byb the framework (implementors cannot define new events)
export interface IStateModifier {
  priority: number
  eventName: string
  modifier: (state:IState)=>void
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