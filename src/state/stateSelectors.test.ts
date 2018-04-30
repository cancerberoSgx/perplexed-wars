import { humanPlayer, unitType, player, playerUnitTypes } from './stateSelectors'
import { State } from './state'

describe('stateSelectors', () => {
  let state
  beforeEach(() => {
    state = State.get() 
  })
  it('humanPlayer', () => {
    const human = humanPlayer(state)
    expect(human.isAI).toBeFalsy()
  })

  it('unitType', () => {
    const ut = unitType(state, 'humanGoldMine')
    expect(ut.name).toBe('Gold Mine')
  })


  it('player', () => {
    const p = player(state, 'player1')
    expect(p.name).toBe('Seba')
  })

  it('playerUnitTypes', () => {
    const p = playerUnitTypes(state, 'player1')
    // console.log(p.length)
    expect(p.find(u => u.id === 'humanGoldMine')).toBeTruthy()
  })

  
})
