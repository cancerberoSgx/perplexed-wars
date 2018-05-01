import { State } from '../state'
import { StateAccessReSelectImpl } from './stateSelectors'

describe('stateSelectors', () => {
  let state
  const helper = new StateAccessReSelectImpl()
  beforeEach(() => {
    state = State.get() 
  })
  it('humanPlayer', () => {
    const human = helper.humanPlayer(state)
    expect(human.isAI).toBeFalsy()
  })

  it('unitType', () => {
    const ut = helper.unitType(state, 'humanGoldMine')
    expect(ut.name).toBe('Gold Mine')
  })


  it('player', () => {
    const p = helper.player(state, 'player1')
    expect(p.name).toBe('Seba')
  })

  it('playerUnitTypes', () => {
    const p = helper.playerUnitTypes(state, 'player1')
    expect(p.find(u => u.id === 'humanGoldMine')).toBeTruthy()
  })

  it('should not create a copy', () => {
    const res = helper.playerResource(state, 'player1', 'gold') 
    const previousValue = res.value
    res.value += 100
    expect(res.value).toBe(previousValue + 100)
  })
  
})
