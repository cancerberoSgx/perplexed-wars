import * as React from 'react'
import { ACTION_VOID, store } from '../reducers/store'
import { State } from '../state/state'
import './DialogsContainer.css'
import { BaseComponent } from './BaseComponent'
import { NotificationPanel } from './dialogs/NotificationPanel'
import { UnitChildrenPanel } from './dialogs/UnitChildrenPanel'
import { UnitSelectionInfo } from './dialogs/UnitSelectionInfo'

export class DialogsContainer extends BaseComponent<{}> {
  constructor(props:{}) {
    super(props)
  }
  public render() {
    const playerControls = this.state.uiState.playerControls.find(pc => pc.playerId === this.state.players.find(p => !p.isAI).id)
    const panelContainerEmpty = !playerControls.addUnitButtons.find(b => b.pressed) && 
      (!playerControls.addUnitChildButtons || !playerControls.addUnitChildButtons.length) && 
      (!this.state.uiState.unitSelection || !this.state.uiState.unitSelection.length) && 
      !this.state.uiState.unitTypeSelection
    return (
      <div className={'PanelContainer' + (panelContainerEmpty ? ' empty' : '')} onClick={panelClicked}>
        <NotificationPanel playerUIState={playerControls}/>
        <UnitSelectionInfo unitSelection={this.state.uiState.unitSelection} unitTypeSelection={this.state.uiState.unitTypeSelection}/>
        <UnitChildrenPanel playerUIState={playerControls}/>
      </div>
    )
  }
}
     

function panelClicked() {
  State.modify(State.get(), (s) => { 
    s.uiState.unitSelection = []
    s.uiState.unitTypeSelection = null
    s.uiState.playerControls.forEach(pc => pc.addUnitButtons.forEach(aub => {aub.pressed = false}))
  })
  store().dispatch({ type: ACTION_VOID })
}

