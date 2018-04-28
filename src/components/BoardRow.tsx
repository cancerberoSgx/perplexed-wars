import * as React from 'react'
import { ACTION_ADD_UNIT } from '../reducers/addNewUnit'
import { store } from '../reducers/store'
import { IBox, IPlayer, IPlayerUIState } from '../state/state-interfaces'
import { BaseComponent } from './BaseComponent'
import './BoardRow.css'
import { Units } from './Units'
import { State } from 'state/state'

export class BoardRow extends BaseComponent<{n:number}>  {
  private playerControl: IPlayerUIState
  constructor(props:{n:number}) {
    super(props)
  }
  public render() {
    this.playerControl = this.state.uiState.playerControls.find(pc => pc.playerId === this.state.players.find(p => !p.isAI).id)
    return (
      <tr className="BoardRow">
      {
        this.state.board.boxes.filter(b => b.y === this.props.n).map(b =>
          <td 
            key={b.x + '_' + b.y}
            className={this.buildClassName(b)}
            onClick={boxClicked} 
            data-x={b.x} 
            data-y={b.y}
          >
              <Units 
                units={b.units} 
                box={b} 
              />
          </td>,
        )
      }  
      </tr> 
    )
  }
  protected buildClassName(b:IBox):string {
    const boxIsAvailable = this.playerControl && this.playerControl.availablePlaces && this.playerControl.availablePlaces.find(ap => ap.x === b.x && ap.y === b.y) && this.playerControl.addUnitButtons.find(b => b.pressed)    
    const classes = ['BoardBox']
    if (boxIsAvailable) {
      classes.push('available-for-move')
    }
    if (this.state.uiState.unitSelection.find(s => s.box.id === b.id)) {
      classes.push('selected')
    }
    if (this.state.uiState.unitDeads.find(death => death.attackedBox === b.id)) {
      classes.push('death')
    }
    return classes.join(' ')
  }
}

function boxClicked(e:React.MouseEvent<HTMLElement>) {
  store().dispatch({
    many: 1, 
    type: ACTION_ADD_UNIT,  
    x: parseInt(e.currentTarget.getAttribute('data-x') || '0', 10), 
    y: parseInt(e.currentTarget.getAttribute('data-y') || '0', 10),
    ctrlKey: e.ctrlKey,
  })
}
