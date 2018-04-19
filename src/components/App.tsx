import * as React from 'react';
import logo from '../logo.svg';
import {initialState} from '../model/initialState'
import { IState } from '../model/interfaces';
import './App.css';
import {Board} from './Board';

export class App extends React.Component<{}, IState> {
  constructor() {
    super({});
    this.state = initialState()
  }
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
        <Board board={this.state.board} key={123} />
        <button onClick={()=>{
          this.state.board.boxes[1].units.push({
            type: 'tower', 
            playerId: 'player2'
          })
          this.setState(this.state)
        }} >addunit</button>
        
      </div>
    );
  }
}