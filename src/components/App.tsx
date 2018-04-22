import * as React from 'react';
import './App.css';
import { BaseComponent } from './BaseComponent';
import { Board } from './Board';
import { UnitsPanel } from './UnitsPanel';
import { Game } from '../game/game';

export class App extends BaseComponent<{}> {
  constructor(props:{}){
    super(props)
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Perplexed Wars</h1>
          <p>
          {!this.state.game.realTime && <button onClick={Game.nextTurn}>Next Turn!</button>}
          TIME: {this.state.game.time/1000}
          </p>
        </header>
        <Board />
        <UnitsPanel />
      </div>
    );
  }
  public getComponentName(): string {
    return 'App'
  }
}
