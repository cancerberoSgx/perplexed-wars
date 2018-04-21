import * as React from 'react';
import logo from '../logo.svg';
import './App.css';
import { Board } from './Board';
import { store } from '../redurcers/store';
import { IClickAddUnitButtonAction, ACTION_ADD_UNIT_CLICK_BUTTON } from '../redurcers/addNewUnit';
import { BaseComponent } from './BaseComponent';

export class App extends BaseComponent<{}> {
  
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
    const action:IClickAddUnitButtonAction = {
      type: ACTION_ADD_UNIT_CLICK_BUTTON, 
      unitId: this.state.unitsTypes[0].type,
      playerId: this.state.uiState.currentPlayer
    }
    store.dispatch(action)
  }
}
