import * as React from 'react'
import './App.css'
import { BaseComponent } from './BaseComponent'
import { Board } from './Board'
import { BarNav } from './NavBar'
import { NotificationPanel } from './NotificationPanel'
import { UnitChildrenPanel } from './UnitChildrenPanel'
import { UnitSelectionInfo } from './UnitSelectionInfo'
import { UnitsPanel } from './UnitsPanel'

export class App extends BaseComponent<{}> {
  constructor(props:{}) {
    super(props)
  }
  public render() {
    return (

      <div className="container-fluid App">
        <BarNav/>

        <div className="PanelContainer">
          <NotificationPanel playerUIState={this.state.uiState.playerControls.find(pc => pc.playerId === this.state.players.find(p => !p.isAI).id)}/>
          <UnitSelectionInfo unitSelection={this.state.uiState.unitSelection} unitTypeSelection={this.state.uiState.unitTypeSelection}/>
          <UnitChildrenPanel playerUIState={this.state.uiState.playerControls.find(pc => pc.playerId === this.state.players.find(p => !p.isAI).id)}/>
        </div>
        
        <UnitsPanel />

        <Board />
        
      </div>
    )
  }
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
