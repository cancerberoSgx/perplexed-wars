import * as React from 'react'
import { BaseComponent } from '../BaseComponent'
import { IUnitType, IUnitSelectionInfo, IPlayerUIState } from 'state/state-interfaces'
import './UnitChildrenPanel.css'
import Draggable from 'react-draggable' 
import { State } from '../../state/state'
import { UnitTypeButton } from '../toolPanel/UnitTypeButton'
// import { cleanAllDialogs } from './DialogsContainer'

export class UnitChildrenPanel extends BaseComponent<{playerUIState: IPlayerUIState}> {
  parentUnit: IUnitSelectionInfo
  constructor(props:{playerUIState: IPlayerUIState}) {
    super(props)
  }
  public render() {
    const canRender = 
      this.props.playerUIState && 
      this.props.playerUIState.addUnitChildButtons && this.props.playerUIState.addUnitChildButtons.length 
    const childUnits = canRender && 
      this.state.unitsTypes.filter(ut => this.props.playerUIState.addUnitChildButtons.find(c => ut.id === c))
    const parentUnitType = canRender && this.state.unitsTypes.find(ut => !!childUnits[0].childOf.find(p => p === ut.id))
    this.parentUnit = canRender && this.state.uiState.unitSelection.find(s => s.unit.type.id === parentUnitType.id)

    return (
        <Draggable 
          handle=".UnitChildrenPanel" 
          defaultClassName={'UnitChildrenPanelDraggable ' + (canRender ? 'has-content' :'')}
          offsetParent={document.querySelector('.UnitsPanel')}
          defaultPosition={{ x:0, y: 0 }}
        >
          <div className="UnitChildrenPanel AppPanel">
          {/* {canRender ? '<<drag me>>' : ''} */}
          <ul>
            {canRender ? childUnits.map(unit => 
              <li key={unit.id}>
              <UnitTypeButton 
                button={this.state.uiState.playerControls
                  .find(pc => pc.playerId === this.props.playerUIState.playerId)
                  .addUnitButtons.find(ub => ub.unitTypeId === unit.id)} 
                player={this.state.players.find(p => p.id === this.props.playerUIState.playerId)}
              />
              </li>,
            ) : ''}
            
          </ul>
          </div>
        </Draggable >
    )
    
  }
  componentDidUpdate() {
    if (!this.parentUnit) {
      return 
    }
  
    const parentUnitEl = document.querySelector(`[data-x="${this.parentUnit.box.x}"][data-y="${this.parentUnit.box.y}"]`)
    console.log(parentUnitEl && parentUnitEl.getClientRects()[0])
  }
}
