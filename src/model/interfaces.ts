export interface IThing{
  name?:string
  description?:string
  id?: string
  timestamp?: number
}

export interface IState extends IThing  {
  board: IBoard
  players?: IPlayer[],
  uiState: IUIState
  unitsTypes: IUnitType[]
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
  // x:number
  // y: number
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
  typeId:string
  playerId: string
  /**
   * current unit state - based on unittype.properties multiplied by level and spells, etc
   */
  state?: IUnitProperties
}
export interface IUnitType extends IThing {
  // type: string
  // unitTypeId:string
  image?: string
  properties: IUnitProperties
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