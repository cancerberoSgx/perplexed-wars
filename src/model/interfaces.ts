export interface IState extends IThing  {
  board: IBoard
  players?: IPlayer[],
  uiState: IUIState
  unitsTypes: IUnitType[]
}

export interface IUnitType extends IThing {
  type:string

}
export interface IThing{
  name?:string
  description?:string
  key?: number
  id?: string
  timestamp?: number
}

export interface IPlayer extends IThing{
  isAI?:boolean
}

export interface IBoard {
  boxes: IBox[]
  n: number
  m: number
}

export interface IBox extends IThing {
  x:number
  y: number
  terrain: string
  units: IUnit[]
  traspasable?: boolean   
}

export interface IUnit extends IThing{
  type:string
  playerId: string
}

export interface IUIState {
  currentPlayer: string
  playerControls: IPlayerUIState[]
  // getCurrentPlayerUIState():IPlayerUIState
}

export interface IPlayerUIState{
  addUnitButtonPressed: boolean
  playerId: string
}
