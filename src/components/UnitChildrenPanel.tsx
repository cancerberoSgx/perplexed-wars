import * as React from 'react'
import { BaseComponent } from './BaseComponent'
import { IUnitType, IUnitSelectionInfo, IPlayerUIState } from 'state/state-interfaces'
import './UnitChildrenPanel.css'
import Draggable from 'react-draggable' 
import { State } from 'state/state'
import { UnitTypeButton } from './UnitTypeButton'


export class UnitChildrenPanel extends BaseComponent<{playerUIState: IPlayerUIState}> {
  constructor(props:{playerUIState: IPlayerUIState}) {
    super(props)
  }
  public render() {
    if (!(this.props.playerUIState && this.props.playerUIState.addUnitChildButtons && this.props.playerUIState.addUnitChildButtons.length)) {
      return (
        <div className="UnitChildrenPanel" >
        </div>
      )
      
    }
    const childUnits = State.get().unitsTypes.filter(ut => this.props.playerUIState.addUnitChildButtons.find(c => ut.id === c))
    return (
        // <Draggable handle=".UnitChildrenPanel">
        <div className="UnitChildrenPanel" >
        {'<<drag me>>'}<br/>
        <ul>
          {childUnits.map(unit => 
            <li key={unit.id}>
            <UnitTypeButton 
              button={State.get().uiState.playerControls
                .find(pc => pc.playerId === this.props.playerUIState.playerId)
                .addUnitButtons.find(ub => ub.unitTypeId === unit.id)} 
              player={State.get().players.find(p => p.id === this.props.playerUIState.playerId)}
            />
            </li>,
          )}
         
        </ul>
        </div>
        // </Draggable>
    )
    
  }

}
//  {/* {childUnits.map(ut=>)} */}
//  hola!
