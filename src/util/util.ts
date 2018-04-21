import { IState, IPoint } from "../model/interfaces";

export function range(n:number):number[]{
  const a = new Array(n)
  for (let i = 0; i < a.length; i++) {
    a[i] = i  
  }
  return a
}

export function getAvailablePlacesFor(playerId: string, state:IState):IPoint[]{
  const points:IPoint[] = []
  state.board.boxes.forEach(box=>{
    box.units.forEach(u=>{
      if(u.state.territoryRadius>0){ // TODO: do it right!
        points.push(box)
        points.push({x: box.x+1, y: box.y})
        points.push({x: box.x-1,y: box.y})
        points.push({x: box.x, y:box.y+1})
        points.push({x: box.x, y:box.y-1})
      }
    })
  })
  return points
}

export function clone<T>(t:T):T{
  return JSON.parse(JSON.stringify(t)) as T
}