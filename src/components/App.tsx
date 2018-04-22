import * as React from 'react';
import * as logo from '../assets/logo.png';
import { Game } from '../state/game';
import './App.css';
import { BaseComponent } from './BaseComponent';
import { Board } from './Board';
import { UnitsPanel } from './UnitsPanel';

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
        {!this.state.game.realTime && <button onClick={Game.nextTurn}>Next Turn!</button>} 
        TIME: {this.state.game.time/1000}
        GOLD: {this.state.game.time/1000}
        </div>
        <UnitsPanel />
        <Board />
      </div>
    );
  }
}
