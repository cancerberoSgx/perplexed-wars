import { IState, IBox, IUnit, IPlayer } from '../state/state-interfaces'

export function range(n: number): number[] {
  const a = new Array(n)
  for (let i = 0; i < a.length; i++) {
    a[i] = i
  }
  return a
}

export function getAvailablePlacesFor(playerId: string, state: IState): IBox[] {
  let result: IBox[] = []
  iterateUnits(state, (box, u) => {
    if (u.state.territoryRadius > 0 && u.playerId === playerId) {
      result = result.concat(getBoxesNear({ state, box, radio: u.state.territoryRadius, predicate: (b => true) }))
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

export function findUnit(state: IState, predicate: (u: IUnit, box: IBox) => boolean): Array<{unit: IUnit,box?: IBox}> {
  // TODO: make me faster!
  const found: Array<{unit: IUnit,box: IBox}> = []
  state.board.boxes.forEach(box => box.units.forEach(unit => {
    if (predicate(unit, box)) {
      found.push({ unit, box })
    }
  }))
  return found
}

export function getUnitsNear({ state, unit, box, radio, predicate }: {state: IState, unit: IUnit, box: IBox, radio: number, predicate?: (u: IUnit) => boolean}): Array<{targetUnit: IUnit, targetBox: IBox}> {
  const near = state.board.boxes.filter(b => Math.abs(b.x - box.x) <= radio && Math.abs(b.y - box.y) <= radio)
  const result: Array<{targetUnit: IUnit, targetBox: IBox}> = []
  near.forEach(b =>
    b.units.forEach(u => {
      if (!predicate || predicate(u)) {
        result.push({ targetUnit: u, targetBox: b })
      }
    }),
  )
  return result
}

export function getBoxesNear({ state, box, radio, predicate }: {state: IState, box: IBox, radio: number, predicate?: (b: IBox) => boolean}): IBox[] {
  predicate = predicate || (b => true)
  return state.board.boxes.filter(b => Math.abs(b.x - box.x) <= radio && Math.abs(b.y - box.y) <= radio && predicate(b))
}

export function iterateUnits(state: IState, iterator: (box: IBox, unit: IUnit) => void) {
  state.board.boxes.forEach(box => {
    box.units.forEach(unit => {
      iterator(box, unit)
    })
  })
}

// export function sanitizeState(state:IState){
//   // console.log(sanitizeState)
//   state.unitsTypes.forEach(ut=>{
//     ut.unitShouldAttack=(info=>true)
//     ut.unitShouldMove=(info=>true)
//     ut.stateModifiers = []
//     ut.buildCondition = (player=>true)
//   })
// }

// utilities for poblate the initial state data:
export function buildUIStatePlayerControls(state: IState) {
  state.players.forEach(p => {
    const playerControl = { playerId: p.id, addUnitButtons: [] }
    p.unitTypes.forEach(unitType => {
      playerControl.addUnitButtons.push({ unitTypeId: unitType, pressed: false })
    })
    state.uiState.playerControls.push(playerControl)
  })
}
export function createBoxes(state: IState, n: number, m: number, player0BaseId: string, player1BaseId: string) {
  const boxes = state.board.boxes = []
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      const box: IBox = {
        x: i,
        y: j,
        terrain: 'grey',
        units: [],
        id: `box-${i}-${j}`,
      }
      if (i === 0 && j === 0) {
        box.units.push(newUnit(state, player0BaseId, state.players[0].id))
      }
      if (i === n - 1 && j === m - 1) {
        box.units.push(newUnit(state, player1BaseId, state.players[1].id))
      }
      boxes.push(box)
    }
  }
  return boxes
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
