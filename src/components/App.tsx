import * as React from 'react';
import logo from '../logo.svg';
import './App.css';
import { Board } from './Board';
import { store } from '../redurcers/store';
import { ACTION_ADD_UNIT_CLICK_BUTTON } from '../redurcers/addNewUnit';
import { BaseComponent, IBaseComponent } from './BaseComponent';
import { State } from '../model/state';

export class App extends BaseComponent<{}> {
  constructor(props:{}){
    super(props)
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
        <Board />
        {
          State.getCurrentPlayerUIState(this.state).addUnitButtons.map((button,i)=>
            <button key={i} onClick={addUnitButtonClicked} 
              className={button.pressed ? 'add-unit add-unit-button-pressed' : 'add-unit'} 
              data-unit={button.unitTypeId}>add {button.unitTypeId}</button>
          )
        }        
      </div>
    );
  }
  public getComponentName(): string {
    return 'App'
  }
}

function addUnitButtonClicked(e:React.MouseEvent<HTMLElement>) {
  store.dispatch({
    type: ACTION_ADD_UNIT_CLICK_BUTTON, 
    unitId: e.currentTarget.getAttribute('data-unit')
  })
}