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
export interface IBox extends IThing {
  x:number
  y: number
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
  type:string
  playerId: string
}
export interface IUnitType extends IThing {
  type: string
  unitTypeId:string
  image?: string
}



export interface IUIState {
  currentPlayer: string
  playerControls: IPlayerUIState[]
}
export interface IPlayerUIState{
  addUnitButtons: IPlayerStateAddUnitButtonState[]
  // addUnitButtonPressed: boolean
  playerId: string
}
export interface IPlayerStateAddUnitButtonState {
  pressed: boolean
  unitTypeId: string
}