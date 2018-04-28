import * as React from 'react'
import { ACTION_ADD_UNIT_CLICK_BUTTON } from '../reducers/clickAddNewUnitButton'
import { IPlayer, IPlayerStateAddUnitButtonState } from '../state/state-interfaces'
import { store } from '../reducers/store'
import { BaseComponent } from './BaseComponent'
import './UnitTypeButton.css'

export class UnitTypeButton extends BaseComponent<{button:IPlayerStateAddUnitButtonState, player: IPlayer}> {
  constructor(props: { button:IPlayerStateAddUnitButtonState, player: IPlayer }) {
    super(props)
  }
  public render() {
    return (
      <div className="UnitTypeButton">
      {
        <button
          data-toggle="button" 
          onClick={addUnitButtonClicked} 
          className={this.buildClassName(this.props.button)} 
          data-unit={this.props.button.unitTypeId}
          data-player={this.props.player.id}
        >
          <img className="icon" src={getUnit(this.props.button.unitTypeId, this.state).icon} />
          {getUnit(this.props.button.unitTypeId, this.state).name}
        </button>
      }
      </div>
    )
  }
  protected buildClassName(button): string {
    const classes = ['btn', 'add-unit', button.unitTypeId]
    if (button.pressed) {
      classes.push('pressed')
    }
    return classes.join(' ')
  }
}

function getUnit(id, state) {
  return state.unitsTypes.find(ut => ut.id === id)
}

function addUnitButtonClicked(e:React.MouseEvent<HTMLElement>) {
  store().dispatch({
    type: ACTION_ADD_UNIT_CLICK_BUTTON, 
    unitId: e.currentTarget.getAttribute('data-unit'),
    playerId: e.currentTarget.getAttribute('data-player'),
  })
}
