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
      <div className="App">
        <header className="App-header">
          <img className="App-title" src={logo} alt="perplexed wars" />
        </header>
        <div className="StatusPanel">

        TIME: {this.state.game.time/1000} &nbsp;
        {/* GOLD: {this.state.game.time/1000} &nbsp; */}

        {!this.state.game.realTime && <button onClick={Game.getInstance().nextTurn}>Next Turn!</button>}  &nbsp
        
        <input type="checkbox" {...this.state.game.realTime?'checked':''} onChange={realTimeChanged}/> Real Time? &nbsp;

        <input type="checkbox" {...this.state.game.allowDiagonal?'checked':''} onChange={allowDiagonalChanged}/>Allow Diagonals &nbsp;

        <input type="checkbox" {...this.state.game.paused?'checked' : ''} onChange={pauseClicked} /> Paused  &nbsp;
        
        {<span>Interval: <input type="number" onChange={changeInterval} defaultValue={this.state.game.interval+''}/></span>}

        </div>
        <UnitsPanel />
        <Board />
      </div>
    );
  }
}


function changeInterval(e:React.ChangeEvent<HTMLInputElement>){
  const interval = parseInt(e.currentTarget.value, 10)
  if(interval>200) {
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