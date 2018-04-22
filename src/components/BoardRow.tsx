import * as React from 'react';
import { State } from '../state/state';
import './BoardRow.css';
import { BaseComponent, IBaseComponent } from './BaseComponent';
import { ACTION_ADD_UNIT } from '../reducers/addNewUnit';
import { store } from '../reducers/store';
import { Units } from './Units';

export class BoardRow extends BaseComponent<{n:number}>  {
  constructor(props:{n:number}){
    super(props)
  }
  public render() {
    return (
      <tr className="BoardRow">
      {
        this.state.board.boxes.filter(b=>b.y===this.props.n).map(b=>
          <td key={b.x+'_'+b.y}
            className={this.state.uiState.unitSelection.find(s=>s.boxId===b.id) ? 'BoardBox selected' : 'BoardBox'}
            // TODO: add visual feeback for getAvailablePlacesFor so user knows where to put unit 
            onClick={boxClicked} 
            data-x={b.x} 
            data-y={b.y}>
              <Units 
                units={b.units} 
                box={b} />
          </td>
        )
      }  
      </tr>
    )
  }
  public getComponentName(): string {
    return 'BoardRow'
  }
}

function boxClicked(e:React.MouseEvent<HTMLElement>){
  store.dispatch({
    many: 1, 
    type: ACTION_ADD_UNIT,
    x: parseInt(e.currentTarget.getAttribute('data-x')||'0', 10), 
    y: parseInt(e.currentTarget.getAttribute('data-y')||'0', 10)
  })
}
