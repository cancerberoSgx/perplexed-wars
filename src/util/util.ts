import { IState, IBox, IUnit, IPlayer } from '../state/state-interfaces'

export function range(n: number): number[] {
  const a = new Array(n)
  for (let i = 0; i < a.length; i++) {
    a[i] = i
  }
  return a
}

export function getAvailablePlacesFor(state: IState, playerId: string): IBox[] {
  let result: IBox[] = []
  iterateUnits(state, (box, u) => {
    if (u.state.territoryRadius > 0 && u.playerId === playerId) {
      result = result.concat(getBoxesNearImpl(state, box,u.state.territoryRadius))
      // TODO: remove duplicates
    }
  })
  return result
}

export function clone<T>(t: T): T {
  return JSON.parse(JSON.stringify(t)) as T
}

export function getPathMatrix(state: IState): number[][] {
  // TODO: make me faster and use a cache! also implement units.properties.transpasable
  const result = []

  for (let j = 0; j < state.board.m; j++) {
    const a = []
    for (let i = 0; i < state.board.n; i++) {
      a.push(state.board.boxes.find(b => b.x === i && b.y === j).units.filter(unit => !unit.type.isBase).length > 0)
    }
    result.push(a)
  }
  return result
}

export function findUnit(state: IState, predicate: (u: IUnit, box: IBox) => boolean): Array<{unit: IUnit, box: IBox}> {
  // TODO: make me faster!
  const found: Array<{unit: IUnit,box: IBox}> = []
  state.board.boxes.forEach(box => box.units.forEach(unit => {
    if (predicate(unit, box)) {
      found.push({ unit, box })
    }
  }))
  return found
}

export function getUnitsNearImplementation(state: IState, box: IBox, radio: number): Array<{targetUnit: IUnit, targetBox: IBox}> {
  const near = state.board.boxes.filter(b => Math.abs(b.x - box.x) <= radio && Math.abs(b.y - box.y) <= radio)
  const result: Array<{targetUnit: IUnit, targetBox: IBox}> = []
  near.forEach(b => {
    b.units.forEach(u => 
      result.push({ targetUnit: u, targetBox: b }),
    )
  })
  return result
}

export function getBoxesNearImpl(state: IState, box: IBox, radio: number): IBox[] {
  return state.board.boxes.filter(b => Math.abs(b.x - box.x) <= radio && Math.abs(b.y - box.y) <= radio)
}

export function iterateUnits(state: IState, iterator: (box: IBox, unit: IUnit) => void) {
  state.board.boxes.forEach(box => {
    box.units.forEach(unit => {
      iterator(box, unit)
    })
  })
}

let newUnitCounter: number = 0

export function newUnit(state: IState, typeId: string, playerId: string): IUnit {
  const type = state.unitsTypes.find(ut => ut.id === typeId)
  return {
    type,
    playerId,
    id: `unit-${playerId}-${newUnitCounter++}`,
    timestamp: Date.now(),
    state: clone(type.properties),
    killCount: 0,
  }
}

export const isDevelopment = location.host.startsWith('localhost')

function isTouchDeviceImpl() {
  return 'ontouchstart' in window        // works on most browsers 
      || !!navigator.maxTouchPoints       // works on IE10/11 and Surface
}
export const isTouchDevice:boolean = isTouchDeviceImpl()
