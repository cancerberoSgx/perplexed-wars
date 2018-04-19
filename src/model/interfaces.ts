export interface IState {
  board: IBoard
  players?: IPlayer[]
}
export interface IThing{
  name?:string
  description?:string
  key?: number
  id?: string
}
export interface IPlayer extends IThing{
  isAI?:boolean
}
export interface IBoard {
  boxes: IBox[]
  n: number
  m: number
  traspasable: false
}
export interface IBox extends IThing {
  x:number
  y: number
  terrain: string
  units: IUnit[]
}
export interface IUnit extends IThing{
  type:string
  playerId: string
}