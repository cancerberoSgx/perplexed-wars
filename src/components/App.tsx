import * as React from 'react';
import logo from '../logo.svg';
import { IState } from '../model/interfaces';
import { State } from '../model/State';
import './App.css';
import { Board } from './Board';

export class App extends React.Component<{}, IState> {
  
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload. Hello
        </p>
        <Board key={123} />
        <button onClick={()=>this.clickAddUnitHandler} >addunit</button>
      </div>
    );
  }

  protected clickAddUnitHandler() {
    const state = State.get()
    const playerControls = state.uiState.playerControls.find(pc=>pc.playerId===state.uiState.currentPlayer)||{}as any
    playerControls.addUnitButtonPressed = !playerControls.addUnitButtonPressed
    state.board.boxes[1].units.push({
      type: 'tower', 
      playerId: 'player2'
    })
    this.setState(state)
  }
}
