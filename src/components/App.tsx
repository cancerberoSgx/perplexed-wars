import * as React from 'react';
import logo from '../logo.svg';
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
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Perplexed Wars</h1>
          <p>TIME: {this.state.time/1000}</p>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload. Hello
        </p>
        <Board />
        <UnitsPanel />
      </div>
    );
  }
  public getComponentName(): string {
    return 'App'
  }
}
