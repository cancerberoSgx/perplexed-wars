import * as React from 'react'
import { ACTION_ADD_UNIT_CLICK_BUTTON } from '../reducers/clickAddNewUnitButton'
import { store } from '../reducers/store'
import { State } from '../state/state'
import { BaseComponent } from './BaseComponent'
import './UnitsPanel.css'
import { PlayerResources } from './PlayerResources'
import { UnitChildrenPanel } from './UnitChildrenPanel'
import { UnitTypeButton } from './UnitTypeButton'

export class UnitsPanel extends BaseComponent<{}> {
  constructor(props:{}) {
    super(props)
  }
  public render() {
    // const showResources = State.get().game.showAIResourcesPanel &&
    const playersForResources = this.state.players.filter(p => State.get().game.showAIResourcesPanel || !p.isAI)
    const playersForUnits = this.state.players.filter(p => State.get().game.showAIUnitsPanel || !p.isAI)
    return (
      <div className="PlayerUnitsAndResourcesPanel container-fluid">
        <div className="PlayerResourcesPanel row">
          {playersForResources.map(player =>
          <div key={'player_resource_div_' + player.id} className={playersForResources.length === 1 ? 'PlayerResourcesRow cols-12' : 'PlayerResourcesRow cols-6'}>
            <PlayerResources player={player}/>
          </div>,
          )}
        </div>
        <div className="PlayerUnitsPanel row">
          {playersForUnits.map(player =>
          <div key={'player_unit_div_' + player.id} className={playersForUnits.length === 1 ? 'cols-12' : 'cols-6'}>
            <ul key={'player_ul_' + player.id}>
            {this.state.uiState.playerControls.filter(c => c.playerId === player.id).map(pc =>
              pc.addUnitButtons.filter(ub => ub.isPrimary).map((button, i) =>
              <li key={'player_' + player.id + '_button_' + i} className="row">
                <UnitTypeButton button={button} player={player}/>
              </li>,
              ),
            )}
            </ul>
          </div>,
          )}
        </div>
      </div>
    )
  }
}
    
