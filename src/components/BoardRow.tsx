import * as React from 'react';
import { State } from '../model/state';
import './BoardRow.css';
import { BaseComponent, IBaseComponent } from './BaseComponent';
import { ACTION_ADD_UNIT } from '../redurcers/addNewUnit';
import { store } from '../redurcers/store';

export class BoardRow extends BaseComponent<{n:number}>  {
  constructor(props:{n:number}){
    super(props)
  }
  public render() {
    return (
      <tr className="BoardRow">
      {
        this.state.board.boxes.filter(b=>b.x===this.props.n).map(b=>
          <td className="BoardBox" key={b.x+'_'+b.y} onClick={boxClicked} data-x={b.x} data-y={b.y}>{b.terrain} ({b.units.length})</td>
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
