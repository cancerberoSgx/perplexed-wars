import * as React from 'react';
import { ACTION_ADD_UNIT_CLICK_BUTTON } from '../reducers/addNewUnit';
import { store } from '../reducers/store';
import { State } from '../state/state';
import { BaseComponent } from './BaseComponent';
import './UnitsPanel.css';

          // <span key={'UnitsPanelPlayer'+player.id} className="UnitsPanelPlayer">
export class UnitsPanel extends BaseComponent<{}> {
  constructor(props:{}){
    super(props)
  }
  public render() {
    return (
      <div className="UnitsPanel">
      {
        State.get().players.map(player=>
          State.get().uiState.playerControls.filter(c=>c.playerId===player.id).map(pc=>
            pc.addUnitButtons.map((button, i)=>
              <button key={i} 
                onClick={addUnitButtonClicked} 
                className={button.pressed ? `add-unit ${button.unitTypeId} pressed` : `add-unit ${button.unitTypeId}`} 
                data-unit={button.unitTypeId}
                data-player={player.id}>{button.unitTypeId}</button>
            )
          )
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
    unitId: e.currentTarget.getAttribute('data-unit'),
    playerId: e.currentTarget.getAttribute('data-player')
  })
}