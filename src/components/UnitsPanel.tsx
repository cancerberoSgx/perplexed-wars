import * as React from 'react';
import { ACTION_ADD_UNIT_CLICK_BUTTON } from '../reducers/addNewUnit';
import { store } from '../reducers/store';
import { State } from '../state/state';
import { BaseComponent } from './BaseComponent';
import './UnitsPanel.css';
import { PlayerResources } from './PlayerResources';

export class UnitsPanel extends BaseComponent<{}> {
  constructor(props:{}){
    super(props)
  }
  public render() {
    return (
      <div className="UnitsPanel row">
      {
        this.state.players.map(player=>
          <div key={'player_div_'+player.id} className="col-6">
            <PlayerResources player={player}/>
            <ul key={'player_ul_'+player.id}>{this.state.uiState.playerControls.filter(c=>c.playerId===player.id).map(pc=>
              pc.addUnitButtons.map((button, i)=>
                <li key={'player_'+player.id+'_button_'+i}>
                <button key={i}
                  data-toggle="button" 
                  onClick={addUnitButtonClicked} 
                  className={this.buildClassName(button)} 
                  data-unit={button.unitTypeId}
                  data-player={player.id}>
                  <img className="icon" src={getUnit(button.unitTypeId, this.state).icon} />
                  {getUnit(button.unitTypeId, this.state).name}
                </button>
              </li>
              )
            )}
            </ul> 
          </div>
        )
      }
      </div>
    );
  }
  protected buildClassName(button): string {
    const classes = ['btn', 'add-unit', button.unitTypeId]
    if(button.pressed){
      classes.push('pressed')
    }
    return classes.join(' ')
  }
}

function getUnit(id, state){
return state.unitsTypes.find(ut=>ut.id===id)
}
function addUnitButtonClicked(e:React.MouseEvent<HTMLElement>) {
  store.dispatch({
    type: ACTION_ADD_UNIT_CLICK_BUTTON, 
    unitId: e.currentTarget.getAttribute('data-unit'),
    playerId: e.currentTarget.getAttribute('data-player')
  })
}