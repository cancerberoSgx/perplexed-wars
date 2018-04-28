import * as React from 'react'
import * as logo from '../assets/logo.png'
import { ACTION_CHANGE_GAME_SETTINGS, IChangeGameSettingsAction } from '../reducers/changeGameSettings'
import { store } from '../reducers/store'
import { Game } from '../state/game'
import { State } from '../state/state'
import './App.css'
import { BaseComponent } from './BaseComponent'
import { Board } from './Board'
import { UnitSelectionInfo } from './UnitSelectionInfo'
import { UnitsPanel } from './UnitsPanel'
import { IPlayer } from '../state/state-interfaces'
import { UnitChildrenPanel } from './UnitChildrenPanel'
import { NotificationPanel } from './NotificationPanel'

export class App extends BaseComponent<{}> {
  // humanPlayer: IPlayer
  constructor(props:{}) {
    super(props)
  }
  public render() {
    // this.humanPlayer = this.state.players.find(p => !p.isAI)
    return (
      <div className="container-fluid App">
        <header className="App-header row">
          <div className="col-4">
            <img className="App-logo" src={logo} alt="perplexed wars" />
          </div>
          <div className="StatusPanel col-8">
            <p><a href="https://github.com/cancerberoSgx/perplexed-wars">Project home</a></p>
            {!this.state.game.realTime && <span><button onClick={Game.getInstance().nextTurn}>Next Turn!</button></span>}

            <span><input type="checkbox" checked={this.state.game.realTime} onChange={realTimeChanged}/> Real Time? </span>

            <span><input type="checkbox" checked={this.state.game.allowDiagonal} onChange={allowDiagonalChanged}/>Allow Diagonals</span>

            {this.state.game.realTime && <span><input type="checkbox" checked={this.state.game.paused} onChange={pauseClicked} /> Paused  </span>}

            {this.state.game.realTime && <span>Interval: <input type="number" onChange={changeInterval} defaultValue={this.state.game.interval + ''}/></span>}
            
            <div>TIME: {this.state.game.time / 1000}</div>
          </div>  
        
        </header>

        <UnitSelectionInfo unitSelection={this.state.uiState.unitSelection} unitTypeSelection={this.state.uiState.unitTypeSelection}/>
        <UnitChildrenPanel playerUIState={this.state.uiState.playerControls.find(pc => pc.playerId === this.state.players.find(p => !p.isAI).id)}/>
        <NotificationPanel playerUIState={this.state.uiState.playerControls.find(pc => pc.playerId === this.state.players.find(p => !p.isAI).id)}/>
        
        <UnitsPanel />

        <Board />
        
      {/* <div className="line" style={lineStyle()} /> */}
      </div>
    )
  }
}

// import { LineCss } from '../implementations/war2/LineCss';
// function lineStyle():any{
//   const styles = (LineCss as any).forPointsWithStroke({x: 50, y: 50}, {x: 120, y: 223}, 4)
//   const result = {width: styles.width, height: styles.height,  top: styles.top, left: styles.left, transform: `rotate(${styles.degrees}deg)`, border: 'solid'}
//   // console.log(styles , result)  
//   return result;
// }

function changeInterval(e:React.ChangeEvent<HTMLInputElement>) {
  const interval = parseInt(e.currentTarget.value, 10)
  if (interval > 200) { // TODO: validation and throttle
    store().dispatch({
      type: ACTION_CHANGE_GAME_SETTINGS,
      interval,
    }as IChangeGameSettingsAction)
  }
}
function allowDiagonalChanged(e:React.ChangeEvent<HTMLInputElement>) {
  store().dispatch({
    type: ACTION_CHANGE_GAME_SETTINGS,
    allowDiagonal: !State.get().game.allowDiagonal,
  }as IChangeGameSettingsAction)
}
function realTimeChanged(e:React.ChangeEvent<HTMLInputElement>) {
  store().dispatch({
    type: ACTION_CHANGE_GAME_SETTINGS,
    realTime: !!e.currentTarget.checked,
  }as IChangeGameSettingsAction)
}
function pauseClicked(e:React.ChangeEvent<HTMLInputElement>) {
  store().dispatch({
    type: ACTION_CHANGE_GAME_SETTINGS,
    paused: !State.get().game.paused,
  }as IChangeGameSettingsAction)
}
