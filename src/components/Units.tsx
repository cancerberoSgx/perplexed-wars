import * as React from 'react'
import { isTouchDevice } from 'util/util'
import { ACTION_SELECT_UNIT } from '../reducers/selectUnit'
import { store } from '../reducers/store'
import { IBox, IUnit } from '../state/state-interfaces'
import { BaseComponent } from './BaseComponent'
import './Units.css'

export class Units extends BaseComponent<{units:IUnit[], box:IBox}>  {
  constructor(props:{units:IUnit[], box:IBox}) {
    super(props)
  }
  public render() {
    return (
      <div key={this.props.box.id} className={this.buildClassName('Units', this.props.box.id)}> {
        this.props.units.map(unit => 
          <div key={unit.id}  className="unit-container">
          <img 
            data-unit-id={unit.id}
            src={unit.type.image}
            className={this.buildClassName('Unit', this.props.box.id, unit.id)}
            onClick={unitClicked}
          />
          <span className="unit-health">{unit.state.health}</span>
          </div>,
        )
      }
      </div>
    )
  }
  protected buildClassName(main:string, box:string, unit?:string): string {
    const classes = [main]
    if (main === 'Units' && this.state.uiState.unitSelection.find(s => s.box.id === this.props.box.id)) {
      classes.push('selected')
    }
    if (main === 'Unit' && this.state.uiState.unitAttacks.find(death => death.attacked === unit)) {
      classes.push('attacked')
    }
    if (main === 'Unit' && this.state.uiState.unitAttacks.find(death => death.attacker === unit)) {
      classes.push('attacker')
    }
    return classes.join(' ')
  }
}

function unitClicked(e:React.MouseEvent<HTMLElement>) {
  store().dispatch({
    type: ACTION_SELECT_UNIT,
    unitId: e.currentTarget.getAttribute('data-unit-id'),
    union: e.ctrlKey || isTouchDevice,
  })
}

