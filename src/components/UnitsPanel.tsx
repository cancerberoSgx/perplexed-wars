import * as React from 'react';
import { State } from '../model/state';
import { ACTION_ADD_UNIT_CLICK_BUTTON } from '../reducers/addNewUnit';
import { store } from '../reducers/store';
import './App.css';
import { BaseComponent } from './BaseComponent';

export class UnitsPanel extends BaseComponent<{}> {
  constructor(props:{}){
    super(props)
  }
  public render() {
    return (
      <div className="UnitsPanel">
      {
        State.getCurrentPlayerUIState(this.state).addUnitButtons.map((button, i)=>
          <button key={i} 
            onClick={addUnitButtonClicked} 
            className={button.pressed ? `add-unit ${button.unitTypeId} pressed` : `add-unit ${button.unitTypeId}`} 
            data-unit={button.unitTypeId}>add {button.unitTypeId}</button>
        )
      }        
      </div>
    );
  }
  public getComponentName(): string {
    return 'UnitsPanel'
  }
}

function addUnitButtonClicked(e:React.MouseEvent<HTMLElement>) {
  store.dispatch({
    type: ACTION_ADD_UNIT_CLICK_BUTTON, 
    unitId: e.currentTarget.getAttribute('data-unit')
  })
}