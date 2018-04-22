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