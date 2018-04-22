import { IState, IPoint, IBox, IUnit } from "../state/interfaces";

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
      if(u.state.territoryRadius>0 && u.playerId===playerId){ // TODO: do it right!
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

export function getPathMatrix(state:IState):number[][]{
  // TODO: make me faster and use a cache! also implement units.properties.transpasable
  const result = []

  for (let j = 0; j < state.board.m; j++) {
    const a = []
    for (let i = 0; i < state.board.n; i++) {
      a.push(state.board.boxes.find(b=>b.x===i && b.y===j).units.filter(unit=>!unit.type.isBase).length>0)
    }
    result.push(a)
  }
  return result
}

export function findUnit(state:IState, predicate:(u:IUnit)=>boolean):Array<{unit:IUnit,box:IBox}> {
  //TODO: make me faster!
  const found:Array<{unit:IUnit,box:IBox}> = []
  state.board.boxes.forEach(box=>box.units.forEach(unit=>{
    if(predicate(unit)){
      found.push({unit, box})
    }
  }))
  return found
}



export function iterateUnits(state:IState, iterator:(box:IBox, unit:IUnit)=>void){
  state.board.boxes.forEach(box=>{
    box.units.forEach(unit=>{
      iterator(box, unit)
    })
  })
}

// declare function copy(s:string):void
export function copy(s){
  return (navigator as any).clipboard.writeText(s)
}