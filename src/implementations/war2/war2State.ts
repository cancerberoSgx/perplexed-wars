import { IState, IBox } from '../../state/state-interfaces'
import { clone, isDevelopment, newUnit } from '../../util/util'
import { war2Units } from './war2Units'
import { war2resources, buildExtraDescriptionProperties } from './war2resources'

export enum RESOURCE_ID { 
  lumber = 'lumber', 
  gold = 'gold', 
  food = 'food', 
}

export interface War2UnitCost {
  resourceId: RESOURCE_ID,
  value: number
}

export interface War2PlayerCustom {
  cost: War2UnitCost[]
}

export function war2ImplementationInitialState(): IState {
  const state: IState = {
    game: {
      interval: 800,
      allowDiagonal: true,
      time: 0,
      realTime: !isDevelopment,
      winner: '',
      gameFinish: false,
      paused: false,
      showAIUnitsPanel: false,
      showAIResourcesPanel: false,
    },
    timestamp: Date.now(),

    // unit values were taking almost exactly as in https://wow.gamepedia.com/Warcraft_II_units#Footman_.2F_Grunt
    unitsTypes: war2Units(),
    board: {
      n: 9, m: 12,
      boxes: [],
    },
    players: [
      {
        id: 'player1',
        name: 'Seba',
        isAI: false,
        color: 'blue',
        unitTypes: ['human-base', 'humanGoldMine', 'humanFarm', 'humanLumbermill', 'humanBlacksmith', 'humanBlacksmithDamageUpgrade1', 'humanTower1', 'footman', 'elven-archer'],
        resources: clone(war2resources()),
      },
      {
        id: 'data_simple_1',
        name: 'Data',
        color: 'red',
        isAI: true,
        unitTypes: ['orc-base', 'orcGoldMine', 'orcFarm', 'orcLumbermill', 'orcTower1', /*'orcBlacksmith',*/ 'grunt', 'troll'],
        resources: clone(war2resources()),
      },
    ],
  }

  buildExtraDescriptionProperties(state)

  return state
}



export function createBoxes(state: IState) {
  const boxes = state.board.boxes = []
  const n = state.board.n
  const m = state.board.m
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      boxes.push({
        x: i,
        y: j,
        terrain: 'grey',
        units: [],
        id: `box-${i}-${j}`,
      })
    }
  }
  return boxes
}

export function createMainBases(state: IState) {
  let base = state.unitsTypes.find(ut => !!state.players[0].unitTypes.find(put => ut.id === put && ut.isBase))
  state.board.boxes[0].units.push(newUnit(state, base.id, state.players[0].id))
  base = state.unitsTypes.find(ut => !!state.players[1].unitTypes.find(put => ut.id === put && ut.isBase))
  state.board.boxes[state.board.n * state.board.m - 1].units.push(newUnit(state, base.id, state.players[1].id))
}

