export interface IThing{
  name?:string
  description?:string
  id?: string
  timestamp?: number
}

export interface IState extends IThing  {
  board: IBoard
  players?: IPlayer[]
  uiState: IUIState
  unitsTypes: IUnitType[]
  game: IGame
}


export interface IGame extends IThing {
  interval: number,
  allowDiagonal:boolean,
  time: number,
}



export interface IBoard {
  boxes: IBox[]
  n: number
  m: number
}
export interface IPoint {
  x:number
  y:number
}
export interface IBox extends IThing, IPoint {
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
  state?: IUnitProperties
}
export interface IUnitType extends IThing {
  image?: string
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
}
export interface IPlayerUIState{
  addUnitButtons: IPlayerStateAddUnitButtonState[]
  playerId: string
}
export interface IPlayerStateAddUnitButtonState {
  pressed: boolean
  unitTypeId: string
}