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
    return (
      <div className="UnitsPanel row">
      {this.state.players.map(player =>
        <div key={'player_div_' + player.id} className="col-6">
          {State.get().game.showAIResourcesPanel || !player.isAI ? <PlayerResources player={player}/> : ''}
          {State.get().game.showAIUnitsPanel || !player.isAI  ? <ul key={'player_ul_' + player.id}>{this.state.uiState.playerControls.filter(c => c.playerId === player.id).map(pc =>
            pc.addUnitButtons.filter(ub => ub.isPrimary).map((button, i) =>
            <li key={'player_' + player.id + '_button_' + i} className="row">
              <UnitTypeButton button={button} player={player}/>
            </li>,
            ),
          )}
          </ul> : ''}
        </div>,
      )
      }
      </div>
    )
  }
}
