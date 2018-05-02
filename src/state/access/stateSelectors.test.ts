import { State } from '../state'
import { StateAccessReSelectImpl } from './stateSelectors'
import { Behavior } from '../behavior'

describe('stateSelectors', () => {
  let state
  const helper = new StateAccessReSelectImpl()
  
  beforeEach(() => {
    state = State.get() 
    Behavior.get().boardBehavior.createBoxes(state)
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
  
  it('unit', () => {
    state.board.boxes[0].units.push({ id: 'u1', name: 'mark' })
    const result = helper.unit(state, 'u1')
    expect(result.unit.name).toBe('mark')
    expect(result.box.x).toBe(0)
  })

})
