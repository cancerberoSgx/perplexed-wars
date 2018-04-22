import * as React from 'react';
import { store } from 'reducers/store';
import { ACTION_SELECT_UNIT } from '../reducers/selectUnit';
import { IBox, IUnit } from '../state/interfaces';
import { State } from '../state/state';
import { BaseComponent } from './BaseComponent';
import './Units.css';

export class Units extends BaseComponent<{units:IUnit[], box:IBox}>  {
  constructor(props:{units:IUnit[], box:IBox}){
    super(props)
  }
  public render() {
    return (
      <div key={this.props.box.id} className={State.get().uiState.unitSelection.find(s=>s.boxId===this.props.box.id) ? 'Units selected' : 'Units'}> {
      this.props.units.map(unit=> 
        <img 
          key={unit.id} 
          data-unit-id={unit.id}
          src={unit.type.image}
          className={State.get().uiState.unitSelection.find(s=>s.unitId===unit.id) ? 'Unit selected' : 'Unit'}
          onClick={unitClicked}/>
      )
      }
      </div>
    )
  }
  public getComponentName(): string {
    return 'Units'
  }
}

function unitClicked(e:React.MouseEvent<HTMLElement>){
  store.dispatch({
    type: ACTION_SELECT_UNIT,
    unitId: e.currentTarget.getAttribute('data-unit-id'),
    union: e.ctrlKey
  })
}

