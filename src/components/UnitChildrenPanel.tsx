import * as React from 'react'
import { BaseComponent } from './BaseComponent'
import { IUnitType, IUnitSelectionInfo, IPlayerUIState } from 'state/state-interfaces'
import './UnitChildrenPanel.css'
import Draggable from 'react-draggable' 
import { State } from '../state/state'
import { UnitTypeButton } from './UnitTypeButton'


export class UnitChildrenPanel extends BaseComponent<{playerUIState: IPlayerUIState}> {
  constructor(props:{playerUIState: IPlayerUIState}) {
    super(props)
  }
  public render() {
    const canRender = 
      this.props.playerUIState && 
      this.props.playerUIState.addUnitChildButtons && this.props.playerUIState.addUnitChildButtons.length 
      // && 
      // this.props.playerUIState.addUnitButtons.find(c => c.pressed) 
    const childUnits = 
      canRender && 
      this.state.unitsTypes.filter(ut => this.props.playerUIState.addUnitChildButtons.find(c => ut.id === c))
    return (
        <Draggable 
          handle=".UnitChildrenPanel" 
          defaultClassName={'UnitChildrenPanelDraggable ' + (canRender ? 'has-content' :'')}
          offsetParent={document.querySelector('.UnitsPanel')}
          defaultPosition={{ x:0, y: 0 }}
        >
          <div className="UnitChildrenPanel AppPanel">
          {canRender ? '<<drag me>>' : ''}
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

}
//  {/* {childUnits.map(ut=>)} */}
//  hola!
