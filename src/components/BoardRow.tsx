import * as React from 'react';
import { ACTION_ADD_UNIT } from '../reducers/addNewUnit';
import { store } from '../reducers/store';
import { IBox } from '../state/interfaces';
import { BaseComponent } from './BaseComponent';
import './BoardRow.css';
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
          <td 
            key={b.x+'_'+b.y}
            className={this.buildClassName(b)}
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
  protected buildClassName(b:IBox):string{
    const classes = ['BoardBox']
    if(this.state.uiState.unitSelection.find(s=>s.boxId===b.id)){
      classes.push('selected')
    }
    if(this.state.uiState.unitDeads.find(death=>death.attackedBox===b.id)){
      classes.push('death')
    }
    return classes.join(' ')
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
