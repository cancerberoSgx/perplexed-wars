import * as React from 'react'
import { BaseComponent } from '../BaseComponent'
import { IUnitType, IUnitSelectionInfo, IPlayerUIState } from 'state/state-interfaces'
import './NotificationPanel.css'
import Draggable from 'react-draggable' 
import { State } from '../../state/state'
import { UnitTypeButton } from '../toolPanel/UnitTypeButton'
// import { cleanAllDialogs } from './DialogsContainer'


export class NotificationPanel extends BaseComponent<{playerUIState: IPlayerUIState}> {
  constructor(props:{playerUIState: IPlayerUIState}) {
    super(props)
  }
  public render() {
    const canRender = 
      this.props.playerUIState && 
      this.props.playerUIState.message
    return (
      <Draggable 
        handle=".NotificationPanel" 
        defaultClassName={canRender ? 'can-render' :''}
      >
        <div className="NotificationPanel AppPanel"> 
        <p className="message">{canRender ? this.props.playerUIState.message.message :''}</p>
        </div>
      </Draggable>
    )    
  }
}
