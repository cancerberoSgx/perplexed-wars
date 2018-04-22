import * as React from 'react';
import * as logo from '../assets/logo.png';
import { Game } from '../state/game';
import './App.css';
import { BaseComponent } from './BaseComponent';
import { Board } from './Board';
import { UnitsPanel } from './UnitsPanel';
import { store } from '../reducers/store';
import { State } from '../state/state';
import { ACTION_CHANGE_GAME_SETTINGS, IChangeGameSettingsAction } from '../reducers/changeGameSettings';

export class App extends BaseComponent<{}> {
  constructor(props:{}){
    super(props)
  }
  public render() {
    return (

      <div className="container-fluid App">
        <header className="App-header row">

          <div className="col-4">
            <img className="App-logo" src={logo} alt="perplexed wars" />
          </div>

          <div className="StatusPanel col-8">
            {!this.state.game.realTime && <span><button onClick={Game.getInstance().nextTurn}>Next Turn!</button></span>}

            <span><input type="checkbox" checked={this.state.game.realTime} onChange={realTimeChanged}/> Real Time? </span>

            <span><input type="checkbox" checked={this.state.game.allowDiagonal} onChange={allowDiagonalChanged}/>Allow Diagonals</span>

            {this.state.game.realTime && <span><input type="checkbox" checked={this.state.game.paused} onChange={pauseClicked} /> Paused  </span>}

            {this.state.game.realTime && <span>Interval: <input type="number" onChange={changeInterval} defaultValue={this.state.game.interval+''}/></span>}


            <div>TIME: {this.state.game.time/1000} </div>
          </div>  
        
        </header>
        <UnitsPanel />
        <Board />
      {/* </div> */}

</div>
    );
  }
}


function changeInterval(e:React.ChangeEvent<HTMLInputElement>){
  const interval = parseInt(e.currentTarget.value, 10)
  if(interval>200) { // TODO: validation and throttle
    store.dispatch({
      type: ACTION_CHANGE_GAME_SETTINGS,
      interval
    }as IChangeGameSettingsAction)
  }
}
function allowDiagonalChanged(e:React.ChangeEvent<HTMLInputElement>){
  store.dispatch({
    type: ACTION_CHANGE_GAME_SETTINGS,
    allowDiagonal: !State.get().game.allowDiagonal
  }as IChangeGameSettingsAction)
}
function realTimeChanged(e:React.ChangeEvent<HTMLInputElement>){
  store.dispatch({
    type: ACTION_CHANGE_GAME_SETTINGS,
    realTime: !!e.currentTarget.checked
  }as IChangeGameSettingsAction)
}
function pauseClicked(e:React.ChangeEvent<HTMLInputElement>){
  store.dispatch({
    type: ACTION_CHANGE_GAME_SETTINGS,
    paused: !State.get().game.paused
  }as IChangeGameSettingsAction)
}