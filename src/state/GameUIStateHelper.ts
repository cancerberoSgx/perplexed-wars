import { Behavior } from './behavior'
import { State } from './state'
import { IPlayerStateAddUnitButtonState, IState } from './state-interfaces'

/** helpers of Game to maintain the state of  [[IState.UIState.]] and [[IState.UIState.playerControls]]. */
export class GameUIStateHelper {
  // static helper = State.getHelper()

  public static initializeUIState(state:IState) {
    state.uiState = state.uiState ||  { 
      currentPlayer: state.players.find(p => !p.isAI).id,
      playerControls: [],
      unitSelection: [],
      unitAttacks: [],
      unitDeads: [],
    }
  }
  public static setupPlayerControls(state:IState) {
    state.players.forEach(p => {
      const playerControl:{playerId:string,addUnitButtons:IPlayerStateAddUnitButtonState[]} = { playerId: p.id, addUnitButtons: [] }
      p.unitTypes.forEach(utId => {
        const unitType = State.getHelper().unitType(state, utId)
        playerControl.addUnitButtons.push({ 
          unitTypeId: utId, 
          pressed: false, 
          isPrimary: !unitType.childOf || !unitType.childOf.length, 
        })
      })
      state.uiState.playerControls.push(playerControl)
    })
    Behavior.get().boardBehavior.createBoxes(state)
    Behavior.get().boardBehavior.createMainBases(state)
  }

  public static setAddUnitChildButtons(state:IState) {
    const parent = state.uiState.unitSelection
    if (!parent) {
      return
    }
    State.getHelper().humanPlayers(state).forEach(player => {
      const children = state.unitsTypes.filter(ut => ut.childOf && ut.childOf.find(p => !!parent.find(ps => ps.unit.type.id === p))).map(u => u.id)
      state.uiState.playerControls.filter(pc => pc.playerId === player.id).forEach(pc => {
        pc.addUnitChildButtons = children
      })
    })
  }
}
