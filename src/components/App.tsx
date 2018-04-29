import * as React from 'react'
import { ACTION_VOID, store } from '../reducers/store'
import { State } from '../state/state'
import './App.css'
import { BaseComponent } from './BaseComponent'
import { BarNav } from './NavBar'
import { Board } from './board/Board'
import { NotificationPanel } from './dialogs/NotificationPanel'
import { UnitChildrenPanel } from './dialogs/UnitChildrenPanel'
import { UnitSelectionInfo } from './dialogs/UnitSelectionInfo'
import { UnitsPanel } from './toolPanel/UnitsPanel'

export class App extends BaseComponent<{}> {
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
      <div className="container-fluid App">
        <BarNav/>

        <div className={'PanelContainer' + (panelContainerEmpty ? ' empty' : '')} onClick={panelClicked}>
          <NotificationPanel playerUIState={playerControls}/>
          <UnitSelectionInfo unitSelection={this.state.uiState.unitSelection} unitTypeSelection={this.state.uiState.unitTypeSelection}/>
          <UnitChildrenPanel playerUIState={playerControls}/>
        </div>
        
        <UnitsPanel />

        <Board />
        
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



// line example

// import { LineCss } from '../implementations/war2/LineCss';
// function lineStyle():any{
//   const styles = (LineCss as any).forPointsWithStroke({x: 50, y: 50}, {x: 120, y: 223}, 4)
//   const result = {width: styles.width, height: styles.height,  top: styles.top, left: styles.left, transform: `rotate(${styles.degrees}deg)`, border: 'solid'}
//   // console.log(styles , result)  
//   return result;
// }
// { <div className="line" style={lineStyle()} /> }
